"""
Adobe Podcast Enhance bot  -  Re:Lefela AUDIO edition
=====================================================
Uploads raw MP3 recordings to podcast.adobe.com/enhance, waits for the
enhancement, sets the Speech / Music / Background sliders, downloads the
result and saves it under the ORIGINAL filename (Adobe renames downloads
to things like "leina-esv2-50p-bg-m-music-m.mp3" - that suffix never
survives here).

This is a fork of the Mindbourne video bot at
    Desktop\\MINDBOURNE VIDEO PROJECT\\Adobe Enhance Bot (SHARE)\\enhance_bot.py
with four differences, all of which matter:
  1. It works on audio (*.mp3), and verifies the download has an AUDIO
     stream. The video bot checks for a VIDEO stream, which would fail on
     every single file here and delete good downloads.
  2. Queue cards are matched by their exact name, not by a substring, so
     "morutabana.mp3" cannot open the card for "Ke morutabana.mp3".
  3. Filenames with spaces are handled ("Ke rata nama thata.mp3").
  4. It borrows the Mindbourne bot's Chrome profile, so it is already
     signed into the MDP EDUCATION Adobe account. Because Chrome locks a
     profile while it is open, DO NOT run this bot and the Mindbourne bot
     at the same time.

A file counts as "done" when a same-named file exists in the Enhanced
folder, so you can stop and re-run this at any time and it picks up where
it left off.

Settings (folders, slider percentages, the shared Chrome profile and
ffprobe) live in config.json next to this script.

Usage - normally you just double-click "RUN ENHANCE BOT.bat":
    python enhance_bot.py            # process up to the batch limit
    python enhance_bot.py --all      # keep going until quota/error/none left
    python enhance_bot.py --limit 3  # process at most 3 files
    python enhance_bot.py --login    # just open Adobe to sign in, then quit
"""

import argparse
import json
import subprocess
import sys
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

HERE = Path(__file__).resolve().parent
CONFIG_PATH = HERE / "config.json"

# ------------------------- FIXED SETTINGS -------------------------
BATCH_LIMIT   = 10          # default max files per run (--all / --limit override)
UPLOAD_CHUNK  = 5           # how many files to put in the queue at once
ENHANCE_TIMEOUT_MIN = 25    # max minutes to wait for one file to finish enhancing
DURATION_TOLERANCE_S = 3.0  # enhanced file must match raw duration this closely
ENHANCE_URL   = "https://podcast.adobe.com/en/enhance"
# ------------------------------------------------------------------

LIMIT_PHRASES = ["daily limit", "limit reached", "try again tomorrow", "out of enhancement"]

# filled in from config.json by load_config()
RAW_DIR = ENHANCED_DIR = PROFILE_DIR = None
SPEECH = MUSIC = BACKGROUND = None
EXT = ".mp3"
FFPROBE = "ffprobe"


def log(msg):
    print(time.strftime("[%H:%M:%S] ") + msg, flush=True)


# ---------------- configuration ----------------

def load_config():
    global RAW_DIR, ENHANCED_DIR, PROFILE_DIR, SPEECH, MUSIC, BACKGROUND, EXT, FFPROBE
    if not CONFIG_PATH.exists():
        sys.exit(f"config.json is missing. It should sit next to this script:\n    {CONFIG_PATH}")
    # utf-8-sig: tolerate a BOM if the file was ever saved from Notepad/PowerShell
    cfg = json.loads(CONFIG_PATH.read_text(encoding="utf-8-sig"))

    try:
        RAW_DIR      = Path(cfg["raw_folder"])
        ENHANCED_DIR = Path(cfg["enhanced_folder"])
        PROFILE_DIR  = Path(cfg["profile_dir"])
        SPEECH       = int(cfg.get("speech", 50))
        MUSIC        = int(cfg.get("music", 0))
        BACKGROUND   = int(cfg.get("background", 0))
        EXT          = str(cfg.get("extension", ".mp3")).lower()
        FFPROBE      = str(cfg.get("ffprobe", "ffprobe"))
    except (KeyError, ValueError) as e:
        sys.exit(f"config.json is invalid ({e}). Fix it in Notepad:\n    {CONFIG_PATH}")

    if not EXT.startswith("."):
        EXT = "." + EXT
    for pct, nm in ((SPEECH, "speech"), (MUSIC, "music"), (BACKGROUND, "background")):
        if not 0 <= pct <= 100:
            sys.exit(f"config.json: '{nm}' must be between 0 and 100 (got {pct}).")


# ---------------- ffprobe verification ----------------

class ProbeUnavailable(Exception):
    """ffprobe itself could not run (missing binary, timeout, crash). This is a
    TOOLING problem, NOT the file's fault - so a download must be KEPT, never
    deleted, when this is raised."""


def ffprobe_available() -> bool:
    """True if ffprobe can actually be launched. Checked once at startup so we
    never sit deleting good downloads because the checker is missing."""
    try:
        r = subprocess.run([FFPROBE, "-version"], capture_output=True, text=True, timeout=30)
        return r.returncode == 0
    except Exception:
        return False


def _ffprobe(path: Path, extra):
    """Low-level ffprobe call. Returns (tag, data):
        ("no-tool",  None)  - ffprobe could not be launched (missing/timeout)
        ("bad-file", None)  - ffprobe RAN but could not read the file
        ("ok",       dict)  - ffprobe read the file; data is the parsed JSON
    Telling 'the checker is broken' apart from 'the file is broken' is the whole
    point: only the second may lead to deleting a download."""
    try:
        out = subprocess.run(
            [FFPROBE, "-v", "error", *extra, "-of", "json", str(path)],
            capture_output=True, text=True, timeout=60,
        )
    except Exception:
        return "no-tool", None
    if out.returncode != 0:
        return "bad-file", None
    try:
        return "ok", json.loads(out.stdout or "{}")
    except Exception:
        return "bad-file", None


def media_duration(path: Path):
    """Duration in seconds. Raises ProbeUnavailable if ffprobe can't run;
    returns None if ffprobe ran but the file has no readable duration."""
    tag, data = _ffprobe(path, ["-show_entries", "format=duration"])
    if tag == "no-tool":
        raise ProbeUnavailable()
    if tag == "bad-file" or not data:
        return None
    try:
        return float(data["format"]["duration"])
    except (KeyError, TypeError, ValueError):
        return None


def has_audio_stream(path: Path) -> bool:
    """True if the file has an audio stream. Raises ProbeUnavailable if ffprobe
    can't run; returns False if ffprobe ran but found no audio."""
    tag, data = _ffprobe(path, ["-select_streams", "a", "-show_entries", "stream=codec_type"])
    if tag == "no-tool":
        raise ProbeUnavailable()
    if tag == "bad-file" or not data:
        return False
    return bool(data.get("streams"))


def pending_files():
    done = {f.name for f in ENHANCED_DIR.glob("*" + EXT)}
    return sorted(f for f in RAW_DIR.glob("*" + EXT) if f.name not in done)


def page_hit_limit(page):
    try:
        body = page.inner_text("body", timeout=5000).lower()
    except Exception:
        return False
    return any(p in body for p in LIMIT_PHRASES)


def wait_for_login(page):
    """If Adobe shows a sign-in wall, wait for the human to complete it."""
    time.sleep(3)
    for _ in range(2):
        if page.locator("#enhance-file-upload").count():
            return
        time.sleep(3)
    if "auth" in page.url or "ims" in page.url or not page.locator("#enhance-file-upload").count():
        log("*** Please sign in to Adobe in the browser window (MDP EDUCATION profile). "
            "Waiting (up to 10 min)...")
        deadline = time.time() + 600
        while time.time() < deadline:
            if "podcast.adobe.com" in page.url and page.locator("#enhance-file-upload").count():
                log("Signed in.")
                return
            time.sleep(2)
        sys.exit("Timed out waiting for sign-in.")


# ---------------- queue / editor helpers ----------------

def queue_names(page):
    """Filenames currently shown in the left-hand track queue.

    The video bot matched /\\S+\\.mp4/ which silently drops every name with a
    space in it ("Ke rata nama thata.mp3") - that made it re-upload files it
    had already queued. Here each queue line is read whole instead."""
    try:
        return page.evaluate(
            """(ext) => {
                const c = document.querySelector("[data-testid='track-list-container']");
                if (!c) return [];
                const out = [];
                for (const line of (c.innerText || '').split('\\n')) {
                    const i = line.toLowerCase().indexOf(ext);
                    if (i !== -1) out.push(line.slice(0, i + ext.length).trim());
                }
                return out;
            }""",
            EXT,
        )
    except Exception:
        return []


def open_file_name(page):
    """Which file the editor panel is actually showing (via the play button label).

    Adobe's queue persists server-side for ~10 days and clicking a card does not
    always switch the editor - without this check you download the wrong file."""
    try:
        aria = page.locator("[data-testid='track-preview-play-button']").first.get_attribute(
            "aria-label", timeout=3000
        )
        if aria and aria.lower().startswith("play"):
            return aria.split(":", 1)[1].strip() if ":" in aria else aria
    except Exception:
        pass
    return None


def _exact_card(page, name):
    """The queue element whose own text is exactly `name`, or None.

    Substring matching is not safe with this file set: text=morutabana.mp3 also
    matches the card for "Ke morutabana.mp3", and .first would open the wrong
    one."""
    try:
        handle = page.evaluate_handle(
            """(name) => {
                const c = document.querySelector("[data-testid='track-list-container']");
                if (!c) return null;
                for (const el of c.querySelectorAll('*')) {
                    if (el.children.length === 0 && (el.textContent || '').trim() === name)
                        return el;
                }
                return null;
            }""",
            name,
        )
        return handle.as_element()
    except Exception:
        return None


def select_card(page, name, attempts=3) -> bool:
    """Click a queue card and confirm the editor actually switched to it."""
    for _ in range(attempts):
        clicked = False
        el = _exact_card(page, name)
        if el is not None:
            try:
                el.click(timeout=5000)
                clicked = True
            except Exception:
                pass
        if not clicked:
            # Fallback: Adobe may truncate a long name in the card ("Le ene ke
            # moithaopi wa..."), so no element holds the exact text. Try every
            # substring candidate and let the verify below reject wrong ones.
            loc = page.locator(f"[data-testid='track-list-container'] >> text={name}")
            try:
                count = loc.count()
            except Exception:
                count = 0
            for i in range(count):
                try:
                    loc.nth(i).click(timeout=5000)
                    clicked = True
                except Exception:
                    continue
                time.sleep(1.5)
                if open_file_name(page) == name:
                    return True
            if not clicked:
                return False
        time.sleep(1.5)
        if open_file_name(page) == name:
            return True
        time.sleep(2)
    return False


def download_ready(page) -> bool:
    btn = page.locator("[data-testid='download-button']")
    try:
        return btn.count() > 0 and btn.first.is_enabled()
    except Exception:
        return False


# ---------------- sliders ----------------
# IMPORTANT: Adobe's rc-sliders are inverted - the aria-valuenow attribute is
# 100 minus the percentage shown on screen. The DISPLAYED percentage is what
# controls the render, so all logic below drives the displayed number only.
# (Driving aria once rendered Background/Music at 100% - caught by ear.)

def slider_states(page):
    """Return {label: {'index': handle_index, 'disp': displayed_percent}}."""
    mapping = page.evaluate(
        """() => [...document.querySelectorAll('.rc-slider-handle')].map((h, i) => {
              let el = h, label = null, disp = null;
              for (let d = 0; d < 8 && el; d++) {
                el = el.parentElement;
                if (!el) break;
                const m = (el.textContent || '').match(/^(Speech|Music|Background)/);
                if (m) {
                  label = m[1];
                  const p = (el.innerText.match(/(\\d{1,3})%/) || [])[1];
                  disp = p === undefined ? null : parseInt(p);
                  break;
                }
              }
              return {i, label, disp};
           })"""
    )
    return {m["label"]: {"index": m["i"], "disp": m["disp"]}
            for m in mapping if m["label"] and m["disp"] is not None}


def set_slider(page, label, target):
    """Move a slider until its DISPLAYED percentage equals target."""
    def disp():
        s = slider_states(page)
        if label not in s:
            raise RuntimeError(f"Slider '{label}' not found on page")
        return s[label]["disp"]

    states = slider_states(page)
    if label not in states:
        raise RuntimeError(f"Slider '{label}' not found on page")
    h = page.locator(".rc-slider-handle").nth(states[label]["index"])
    h.click()
    value = disp()
    if value != target:
        # learn which arrow key increases the DISPLAYED percentage
        h.press("ArrowRight")
        time.sleep(0.1)
        after = disp()
        if after == value:
            h.press("ArrowRight")
            time.sleep(0.1)
            after = disp()
        inc_key, dec_key = ("ArrowRight", "ArrowLeft") if after > value else ("ArrowLeft", "ArrowRight")
        value = after
        for _ in range(250):
            if value == target:
                break
            h.press(inc_key if value < target else dec_key)
            value = disp()
    if value != target:
        raise RuntimeError(f"Could not set {label} to {target}% (stuck at {value}%)")
    log(f"    {label} = {value}% (displayed)")


def verify_sliders(page):
    """Final gate before download: displayed values must match the targets."""
    s = slider_states(page)
    want = {"Speech": SPEECH, "Music": MUSIC, "Background": BACKGROUND}
    got = {k: v["disp"] for k, v in s.items()}
    if got != want:
        raise RuntimeError(f"slider verification failed: displayed {got}, wanted {want}")


# ---------------- per-file processing ----------------

def process_one(page, raw_path: Path) -> bool:
    """Editor is already showing this file. Set sliders, download, verify."""
    name = raw_path.name
    log(f"  -> {name}: setting sliders")
    for label, target in (("Speech", SPEECH), ("Music", MUSIC), ("Background", BACKGROUND)):
        set_slider(page, label, target)

    if open_file_name(page) != name:
        raise RuntimeError("editor switched files while setting sliders")
    verify_sliders(page)

    log(f"  -> {name}: downloading")
    out = ENHANCED_DIR / name          # <- Adobe's "-esv2-50p-..." suffix dropped here
    # Download to a ".part" file first and rename into place ONLY after it passes
    # verification, so a crash mid-download can't leave a half file sitting under
    # the real name looking finished.
    part = out.with_name(out.name + ".part")
    part.unlink(missing_ok=True)
    with page.expect_download(timeout=10 * 60 * 1000) as dl:
        page.locator("[data-testid='download-button']").first.click()
    dl.value.save_as(str(part))

    try:
        raw_d = media_duration(raw_path)
        out_d = media_duration(part)
        has_a = has_audio_stream(part)
    except ProbeUnavailable:
        # The CHECKER couldn't run (not the file's fault). Deleting here is how the
        # old bug burned the daily quota forever. Keep the download and warn.
        part.replace(out)
        log(f"  ?? {name}: saved but could NOT be verified (ffprobe didn't respond) "
            f"- KEPT it. Please listen to this one.")
        _remove_from_queue(page, name)
        return True

    if not has_a or raw_d is None or out_d is None or abs(raw_d - out_d) > DURATION_TOLERANCE_S:
        part.unlink(missing_ok=True)
        raise RuntimeError(
            f"verification failed (raw {raw_d}s vs enhanced {out_d}s) - deleted, will retry next run"
        )
    part.replace(out)          # atomic: appears under its real name only now
    log(f"  OK {name} saved ({out.stat().st_size/1e3:.0f} KB, {out_d:.1f}s vs raw {raw_d:.1f}s)")

    _remove_from_queue(page, name)
    return True


def _remove_from_queue(page, name):
    """Delete a finished track from the queue to keep the page snappy.
    Leftover queue entries are harmless, so any failure here is ignored."""
    try:
        if select_card(page, name):
            page.locator("[data-testid='delete-track-button']").first.click()
            time.sleep(1)
            confirm = page.locator("button:has-text('Delete')")
            if confirm.count():
                confirm.first.click()
            time.sleep(1)
    except Exception:
        pass


def _launch(p):
    """Open the persistent Chrome carrying the Mindbourne bot's Adobe login."""
    try:
        return p.chromium.launch_persistent_context(
            str(PROFILE_DIR),
            channel="chrome",
            headless=False,
            accept_downloads=True,
            viewport={"width": 1400, "height": 900},
        )
    except Exception as e:
        # Chrome locks a profile directory while it is open. The usual cause is
        # the Mindbourne enhance bot running right now - they share one login.
        if "ProcessSingleton" in str(e) or "SingletonLock" in str(e) or "already" in str(e).lower():
            sys.exit(
                "Chrome could not open the shared Adobe login, because something else "
                "is already using it.\n"
                "    This bot shares the Mindbourne enhance bot's login, and Chrome only "
                "lets one of them\n"
                "    use it at a time. Close the Mindbourne bot's Chrome window and run "
                "this again.\n"
                f"    (profile: {PROFILE_DIR})")
        raise


def do_login():
    """Open Adobe so a human can sign in, then quit."""
    PROFILE_DIR.mkdir(parents=True, exist_ok=True)
    print("\nA Chrome window will open on Adobe. Sign in with the MDP EDUCATION "
          "profile (not 'Personal').\nThe window closes by itself once you're signed in.\n",
          flush=True)
    with sync_playwright() as p:
        ctx = _launch(p)
        page = ctx.pages[0] if ctx.pages else ctx.new_page()
        page.goto(ENHANCE_URL, wait_until="domcontentloaded")
        time.sleep(3)
        deadline = time.time() + 900
        ok = False
        while time.time() < deadline:
            try:
                if not ctx.pages:
                    break
                for pg in ctx.pages:
                    if "podcast.adobe.com" in pg.url and pg.locator("#enhance-file-upload").count():
                        ok = True
                        break
            except Exception:
                break
            if ok:
                break
            time.sleep(2)
        try:
            ctx.close()
        except Exception:
            pass
    log("Signed in - you can run the bot now." if ok else
        "The window closed before sign-in finished. Run this again to retry.")
    sys.exit(0 if ok else 2)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--all", action="store_true", help="process every pending file")
    ap.add_argument("--limit", type=int, default=BATCH_LIMIT, help="max files this run")
    ap.add_argument("--login", action="store_true", help="just sign into Adobe, then quit")
    args = ap.parse_args()

    load_config()

    if args.login:
        do_login()
        return

    # ffprobe checks every download is real audio of the right length. If it can't
    # run, verification would fail on EVERY file and delete good downloads, burning
    # the daily Adobe quota. Stop now with a clear message instead.
    if not ffprobe_available():
        sys.exit(
            "Can't find the audio checker 'ffprobe', so downloads can't be verified.\n"
            f"    Looked for: {FFPROBE}\n"
            "    Fix the 'ffprobe' path in config.json. Nothing was changed.")

    if not RAW_DIR.is_dir():
        sys.exit(f"The Raw folder does not exist:\n    {RAW_DIR}\nFix 'raw_folder' in config.json.")
    if not PROFILE_DIR.is_dir():
        sys.exit(f"The shared Adobe login folder does not exist:\n    {PROFILE_DIR}\n"
                 f"Fix 'profile_dir' in config.json (it should point at the Mindbourne "
                 f"bot's chrome-profile).")
    ENHANCED_DIR.mkdir(parents=True, exist_ok=True)

    # sweep half-finished downloads left by an earlier crash (see process_one)
    for leftover in ENHANCED_DIR.glob("*.part"):
        try:
            leftover.unlink()
        except OSError:
            pass

    todo = pending_files()
    if not todo:
        log("Nothing to do - every raw file already has an enhanced copy.")
        return
    if not args.all:
        todo = todo[: args.limit]
    log(f"Sliders: Speech={SPEECH} Music={MUSIC} Background={BACKGROUND}")
    log(f"{len(todo)} file(s) to process: {', '.join(f.name for f in todo[:10])}"
        + (" ..." if len(todo) > 10 else ""))

    with sync_playwright() as p:
        ctx = _launch(p)
        page = ctx.pages[0] if ctx.pages else ctx.new_page()
        page.goto(ENHANCE_URL, wait_until="domcontentloaded")
        wait_for_login(page)

        done_count = 0
        for chunk_start in range(0, len(todo), UPLOAD_CHUNK):
            chunk = todo[chunk_start : chunk_start + UPLOAD_CHUNK]
            # skip uploading anything that already has a queue card (e.g. from a
            # previous interrupted run) - re-uploading would create duplicates
            already_queued = set(queue_names(page))
            to_upload = [f for f in chunk if f.name not in already_queued]
            if to_upload:
                log(f"Uploading batch of {len(to_upload)}: {', '.join(f.name for f in to_upload)}")
                page.locator("#enhance-file-upload").set_input_files([str(f) for f in to_upload])

            remaining = {f.name: f for f in chunk}
            deadline = time.time() + ENHANCE_TIMEOUT_MIN * 60 * len(chunk)
            while remaining and time.time() < deadline:
                if page_hit_limit(page):
                    log("*** Adobe reports the daily enhancement limit is reached. Stopping.")
                    log(f"Done this run: {done_count}. Re-run tomorrow to continue.")
                    ctx.close()
                    return
                for name in list(remaining):
                    if not select_card(page, name):
                        continue
                    if not download_ready(page):
                        continue
                    try:
                        if process_one(page, remaining[name]):
                            done_count += 1
                    except Exception as e:
                        log(f"  !! {name} failed: {e}")
                    del remaining[name]
                if remaining:
                    time.sleep(10)
            for name in remaining:
                log(f"  !! {name}: timed out waiting for enhancement")

        log(f"Run complete. {done_count} file(s) enhanced and saved to:\n    {ENHANCED_DIR}")
        ctx.close()


if __name__ == "__main__":
    main()
