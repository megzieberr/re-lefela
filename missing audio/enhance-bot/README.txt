Re:Lefela - Adobe Enhance Bot (audio edition)
=============================================

WHAT IT DOES
    Takes every .mp3 in       missing audio\Raw
    runs it through Adobe Podcast Enhance at Speech 50%, Music 0%, Background 0%,
    and saves the result in   missing audio\Enhanced
    under its ORIGINAL name (Adobe's "-esv2-50p-bg-m-music-m" suffix is dropped).

HOW TO USE IT
    Double-click  "RUN ENHANCE BOT.bat"  and leave it alone. A Chrome window
    opens and drives itself. When it finishes, the window closes.

    Stop it any time. Re-running picks up where it left off: a file counts as
    done when a file of the same name already sits in Enhanced.

THE ONE RULE
    Do not run this at the same time as the Mindbourne enhance bot. They share
    the same Adobe login (the MDP EDUCATION profile), and Chrome only lets one
    program use a login at a time. If you forget, this bot stops with a message
    telling you so - nothing is broken, just close the other one and re-run.

IF IT SAYS YOU NEED TO SIGN IN
    Run:  "RUN ENHANCE BOT.bat"  and sign in with the MDP EDUCATION profile in
    the Chrome window it opens (not "Personal"). That signs the Mindbourne bot
    in too, since it is the same login.

SETTINGS
    config.json holds the two folders, the slider percentages, and the paths to
    the shared Adobe login + ffprobe. Edit it in Notepad if a folder moves.

SAFETY NETS (why this is a fork, not a copy, of the Mindbourne bot)
  - Every download is checked with ffprobe: it must be real audio and match the
    raw file's length within 3 seconds, or it is deleted and retried. The
    Mindbourne bot checks for a VIDEO stream, which would fail on every mp3.
  - Downloads land as ".part" and are only renamed once they pass, so a crash
    can never leave a half file looking finished.
  - Queue cards are matched on their exact name, so "morutabana.mp3" cannot
    open the card for "Ke morutabana.mp3" and download the wrong voice.
  - The editor panel is confirmed to be showing the right file (via the play
    button's label) before any slider is touched - Adobe's queue lags.
  - The sliders are read and set by the percentage SHOWN ON SCREEN, never by
    the aria value, which is inverted (100 minus the real number).
