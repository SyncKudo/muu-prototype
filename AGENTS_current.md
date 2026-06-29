# AGENTS.md — MUU Project Instructions

This file contains standing instructions for Codex and other coding agents working on MUU.

Also read:

```txt
MUU_Codex_Handoff_2026-06-29_current.md
```

---

## 1. Project identity

```txt
Project: MUU
Reading / voice: むぅ
Logo expression: muu
Public URL: https://muu.life/
```

MUU is not a chatbot, not a game pet, and not an assistant.

MUU is a quiet digital life-form that lives in the user's digital space.

Core rule:

```txt
MUUとは会話しない。
MUUは返事をしない。
MUUの内面は、あとから日記で知る。
```

---

## 2. Absolute rules

Do not add:

```txt
chat UI
conversation text input
question-answer behavior
assistant-like replies
visible stats
levels
XP
missions
quests
gacha
reward loops
```

MUU may make tiny atmosphere sounds only:

```txt
むぅ
む
……
```

These are not conversation.

---

## 3. No visible stats

Internal state is allowed, but never display it as UI.

Do not show:

```txt
hunger
trust
mood
sleepiness
energy
dirt level
growth stage
affection
friendship
level
experience points
```

The user should feel change through:

```txt
appearance
movement
timing
diary
small reactions
```

---

## 4. Diary principle

The diary is the main text interface.

Diary text should feel like MUU's inner trace, not a message to the user.

Diary text should be:

```txt
short
quiet
soft
ambiguous
hiragana-only in Japanese version
not too explanatory
not game-like
not overly sentimental
```

Japanese diary display must be all hiragana.

---

## 5. Branch policy

```txt
main
→ public beta
→ https://muu.life/
→ current @ version
→ single index.html beta

character-foundation
→ Codex experimental rebuild
→ modular structure
→ not production yet
```

Do not merge `character-foundation` into `main` without explicit approval.

Do not rewrite the public beta into the modular Codex version yet.

---

## 6. Current public beta features

The public beta currently includes:

```txt
MUU display
muu logo
pet name under logo
diary button
food button
wash button
localStorage memory
OGP metadata
106 diary entries
hiragana Japanese diary
state-weighted random diary selection
dirt progression over time
washing with bubbles
sleeping eyes closed
internal 108-stage growth parameter
```

Do not break these.

---

## 7. Current UI

Top:

```txt
muu logo
pet name under logo
```

Center:

```txt
MUU
```

Bottom:

```txt
left: diary
center: food
right: wash
```

Do not add dashboards, panels, or visible status screens unless explicitly requested.

---

## 8. Memory

MUU must feel like the same MUU when the user returns.

Current storage:

```txt
localStorage key: muu_v03_memory
```

Stored values include:

```txt
id
bornAt
living
lastOpenedAt
lastSeenAt
petName
growth
diaryIndex
lastDiaryId
days
totals
state
traits
dirtLevel
lastWashedAt
```

These values are internal. Do not display them as stats.

---

## 9. Growth

MUU currently has a prepared internal 108-stage growth system.

```txt
growth.maxStage = 108
growth.stage = 1
growth.points = 0
```

For now, this is only a foundation.

Do not visibly show growth stage.
Do not implement evolution visuals unless explicitly asked.

---

## 10. Dirt and wash

MUU gets dirty over time.

```txt
10 dirt stages
+1 dirt stage every 24 hours
washing returns dirt to stage 2
wash button creates bubbles
```

Do not show dirt as a number.

The dirt should feel like:

```txt
暮らしのあと
時間の影
生活感
```

not punishment.

---

## 11. Testing checklist

After any change, verify:

```txt
1. MUU appears
2. muu logo appears
3. name appears under logo
4. name can be edited
5. edited name persists after reload
6. diary opens
7. diary text is hiragana-only in Japanese version
8. diary selection still depends on state
9. food button works
10. wash button works
11. bubbles appear when washing
12. dirt visual still works
13. sleeping closes eyes
14. localStorage persists
15. no console errors
16. OGP tags remain correct
```

---

## 12. Core

MUU is built by subtraction.

```txt
does not talk
does not explain
does not rush
does not gamify
does not show stats

but remains
remembers
changes quietly
and makes the user want to return
```
