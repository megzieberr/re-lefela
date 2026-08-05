# SPEC — formal vs everyday Setswana ("register")

**Written 2026-08-05 (session 36). Nothing built yet — and nothing CAN be built until the words
arrive (§4).**

## 1. Where this came from

Megan now sits with a first-language Setswana speaker at break. That speaker's verdict on what
the app has taught her: **most of it is very deep Setswana.** Two examples she brought back:

| the app teaches | what is actually said |
|---|---|
| *Intshwarele* — the full apology | *Askies* |
| *O tsogile jang?* — how are you | *O siame?* — "are you good?" |

Her goal, in her own words: *"to teach me to start recognising those differences, so that
**O siame** doesn't throw me off as much as it did this morning."*

That sentence sets the target. **This is a recognition feature before it is a production
feature.** She does not need to start saying *Askies*; she needs to not freeze when someone says
it to her.

## 2. Why the app sounds like a textbook (it is not a bug)

Every word in Re:Lefela traces to a written source: the Peace Corps course, the Setswana Bible,
the Autshumato corpus, the wordnet, Davies. All of those are **written, careful, and older**.
The app has a library, not a mouth. It could not have known that nobody says *Intshwarele* at
break, because nothing in `corpus/` records what people say at break.

Her friend is a kind of source this project has never had. That is the whole value here.

## 3. ⚠️ It is not a formal/casual switch — her own example proves it

The obvious design is a two-way toggle: formal ↔ casual. **Her Afrikaans example rules that out**
before we build it:

> You would not say *Jammer* to someone much older than you — you would say *Ek vra om
> verskoning*. And *Askuus* is more for when someone is being rude, or you did not hear them.

Three different things are moving there, not one:

1. **Who you are talking to** — an elder, a lecturer, a friend. (*Jammer* vs *Ek vra om
   verskoning*.)
2. **What the situation is** — apologising vs "I did not catch that" vs pushing past someone.
   (*Askuus* is not a politer *Jammer*, it is a different job.)
3. **Written vs spoken** — what goes in a portfolio is not what goes in a corridor.

So the data model is **not** `formal: true`. It is: one English meaning, several Setswana ways to
say it, each carrying **who** and **when**.

## 4. What Megan collects — the only thing blocking this

Her plan, agreed this session: she writes phrases on her notepad, **her friend checks the
spelling**, and then she gives them to me. Nothing gets typed into `content.js` that her friend
has not seen in writing — that is what makes the source real rather than half-remembered.

**What to write down for each one** (this is the whole ask — keep it small or it won't happen):

1. The Setswana, spelled the way her friend spells it.
2. What it means in English.
3. **Who you would say it to** — anyone / a friend / an older person / a teacher.
4. **When** — the situation. This is the bit her Afrikaans example shows matters most.
5. If it replaces something the app already teaches, say which one.

Five short lines. If a phrase only gets the first two, it can still go in — the rest can be filled
in next time they talk.

## 5. The source tag

**Her ruling this session: yes, make her a source.** New tag **`spoken-2026`**, sitting alongside
`peace-corps-L2`, `beibele`, `davies-1992` and the rest, and documented in `toolkit/SOURCES.md` as:

> A first-language Setswana speaker, 2026. Phrases written down by Megan and **checked in writing
> by the speaker** before entry. Everyday spoken register, Mahikeng area.

⚠️ **No name, ever.** This repo is public and GitHub Pages serves every file in it. The friend is
credited as a speaker and never identified, exactly as the second learner is never named.

This does not bend the no-unsourced-Setswana rule — it satisfies it. A checked native speaker is a
*better* source for spoken register than any corpus this project holds. The rule was always
"traceable", never "printed in a book".

## 6. How it shows in the app

### 6.1 On the card — a small tag (her ruling: "the small tag on the card will work")

Every affected card gets one quiet label:

- 🎓 **written / formal** — what goes in the portfolio
- 💬 **everyday** — what is actually said
- both, when a phrase is genuinely fine either way (most of them)

Untagged cards stay untagged. This is not a re-labelling of all 307 cards; it is a mark on the
handful where the difference matters.

### 6.2 The paired card — the part that does the teaching

Where two phrases do the same job, they appear **together**, never on separate screens:

```
        "sorry"
   🎓 Intshwarele        the full apology — an elder, a lecturer, in writing
   💬 Askies             friends, small bumps, everyday
                         (borrowed from Afrikaans — normal spoken Setswana)
```

Seeing them side by side is what builds the distinction. Two separate cards would just teach two
words.

### 6.3 The recognition drill — this is the actual goal

A round that plays or shows the **everyday** form and asks what it means, drawing its wrong
answers from the same topic (the §2 word-bank rule from this session applies here too). *O siame?*
comes at her until it stops being a surprise. That is the feature she asked for; the tags and the
paired cards are the scaffolding under it.

### 6.4 ⚠️ The portfolio warning

SECL121 is 100% coursework, and a marker may not want *Askies* in a written portfolio. So the 🎓/💬
tag is not decoration — it has to say plainly **"say this, don't write this."** One line on the
card, no drama.

## 7. What I need before building

**The words.** Everything above is scaffolding around content that does not exist yet. Ten checked
phrases is enough to build and ship a first version; five is enough to prove the shape.

## 8. Open questions for her

1. Does *Askies* **replace** *Intshwarele* on the existing card, or sit beside it? (Recommendation:
   beside — she is examined on the formal one.)
2. Should the everyday forms be **drilled** (counted, XP, part of the Daily Quest), or held as a
   reference she can read? (Recommendation: drilled for recognition only — meeting them is the
   point; producing them is not what she is marked on.)
3. Her friend may be able to settle things the corpus cannot — is Megan comfortable bringing
   specific questions back to her, or does she want to keep it casual and only pass on what comes
   up naturally? (This one is about her friendship, not the app. Her call entirely.)
