# MUU Codex Addendum — Future File Structure / Scale Strategy

## 0. Purpose

This document is an additional instruction for Codex.

Read together with:

```txt
AGENTS.md
MUU_Codex_Handoff_2026-06-29_current.md
```

This addendum explains how the current single-file public beta should be treated in relation to future large-scale development.

---

# 1. Current state

The current MUU public beta running on:

```txt
https://muu.life/
```

is currently managed as a mostly single-file app:

```txt
index.html
```

That file currently contains:

```txt
HTML
CSS
JavaScript
Three.js rendering
MUU character logic
movement logic
diary logic
food logic
wash logic
dirt logic
pet name logic
growth foundation
localStorage memory
OGP metadata
```

This is acceptable for the current public beta phase.

---

# 2. Important principle

The current `index.html` single-file structure is **not the final architecture**.

It is a public beta / prototype structure used to quickly define:

```txt
MUU's concept
MUU's emotional feel
diary tone
food interaction
wash interaction
dirt progression
name interaction
memory behavior
```

The goal right now is to protect and refine MUU's soul and experience.

Do not destroy this feeling by prematurely rewriting the app.

---

# 3. Do not split files immediately

Codex must not suddenly convert the current public beta into a multi-file architecture unless explicitly asked.

Do not do this without permission:

```txt
split index.html into many files
move all JS into src/
replace the app with the character-foundation version
merge character-foundation into main
rewrite the Three.js structure
convert to React / Vite / Next.js
```

The current `main` branch is the production beta.
It must remain stable.

---

# 4. But prepare for future scale

Even though the current beta should remain single-file for now, all future changes should be made with future separation in mind.

When editing `index.html`, Codex should mentally treat the code as if it will later be separated into modules.

Future module boundaries should be respected.

Avoid mixing unrelated logic.

Avoid placing new logic in random locations.

Keep feature blocks coherent.

---

# 5. Future target structure

A future larger MUU app may look like this:

```txt
index.html
styles.css

src/
  main.js
  character.js
  movement.js
  memory.js
  diary.js
  food.js
  wash.js
  dirt.js
  growth.js
  pet-name.js
  i18n.js
  config.js

data/
  diary-ja-hiragana.json
  growth-stages.json
  muu-parameters.json

assets/
  logo.png
  ogp.jpg
```

This structure is a future direction, not an immediate task.

---

# 6. Future module responsibilities

## 6.1 character.js

Responsible for:

```txt
MUU body
ears
eyes
tail
materials
dirt visual patches if tightly connected to body
sleeping eye visuals
character mesh creation
```

Do not put diary or localStorage logic here.

---

## 6.2 movement.js

Responsible for:

```txt
idle motion
walking / hopping
sleep state motion
eating movement
touch reactions
state machine movement transitions
```

Do not put diary text here.

---

## 6.3 memory.js

Responsible for:

```txt
localStorage
future cloud save
MUU unique ID
bornAt
lastOpenedAt
lastSeenAt
daily logs
totals
state
traits
petName
growth
dirt data
```

Memory values are internal.
Do not create visible stat UI.

---

## 6.4 diary.js

Responsible for:

```txt
diary open / close
diary selection
state-weighted random diary logic
lastDiaryId
diaryIndex
future AI diary connection
```

Diary text itself should eventually move to:

```txt
data/diary-ja-hiragana.json
```

Japanese diary entries must remain hiragana-only.

---

## 6.5 food.js

Responsible for:

```txt
placing food
food display
food reaction
approach food
eat food
ignore food
hunger changes
food logs
```

Do not display hunger value.

---

## 6.6 wash.js / dirt.js

Responsible for:

```txt
10-stage dirt system
24 hours = +1 dirt stage
lastWashedAt
wash button
bubble effect
reset dirt to stage 2
dirty visual state
```

Do not display dirt level as a number.

---

## 6.7 growth.js

Responsible for:

```txt
108-stage growth foundation
growth stage
growth points
future growth triggers
future visual variation mapping
```

Current rule:

```txt
Do not display growth stage yet.
Do not add evolution UI yet.
```

Growth is currently a hidden future foundation.

---

## 6.8 pet-name.js

Responsible for:

```txt
display name under logo
default name: なまえ
click to edit
prompt text
saving name to memory
updating name view
```

Do not turn this into a full settings screen yet.

---

## 6.9 i18n.js

Responsible for future multilingual support.

For now:

```txt
Japanese diary is hiragana-only.
MUU remains MUU.
むぅ is a voice / presence, not just text.
```

---

# 7. How to edit the current index.html safely

When editing current `index.html`, Codex should:

```txt
1. Identify which future module the change belongs to.
2. Modify only that logical block.
3. Avoid rewriting unrelated code.
4. Preserve localStorage compatibility.
5. Preserve OGP metadata.
6. Preserve all existing user-facing behavior.
7. Run or simulate syntax checks.
8. Report exactly what changed.
```

Example:

If changing diary text:

```txt
Treat it as diary.js / data/diary-ja-hiragana.json future area.
Do not touch character animation.
Do not touch food logic.
Do not touch memory schema unless necessary.
```

If changing wash bubbles:

```txt
Treat it as wash.js / dirt.js future area.
Do not touch diary logic.
Do not touch pet name.
```

---

# 8. Public beta is the source of truth

For now, the public beta in `main` is the source of truth.

```txt
main/index.html
```

is more important than the experimental branch.

`character-foundation` may be cleaner architecturally, but it does not yet contain all of the public beta's emotional and interaction features.

Do not overwrite the public beta with `character-foundation`.

---

# 9. When to start actual file splitting

Do not start actual file splitting until explicitly requested.

Good timing for splitting:

```txt
when the public beta feature set becomes stable
when changes to index.html become too risky
when AI diary is about to be added
when cloud save is about to be added
when character variations become complex
when multilingual support becomes real
```

The first file splitting should happen in a separate branch, for example:

```txt
structure-refactor
modular-beta
beta-v2-architecture
```

Do not do it directly on main.

---

# 10. Safe future refactor process

When the user approves file splitting, follow this process:

```txt
1. Create a new branch.
2. Keep main stable.
3. Extract only one area at a time.
4. Start with data files, not character code.
5. Move diary entries to JSON first.
6. Move memory helper functions second.
7. Move pet-name logic third.
8. Move food / wash / dirt next.
9. Move character / movement last.
10. Compare branch deploy with current main.
11. Do not merge until feature parity is confirmed.
```

Recommended first extraction order:

```txt
1. data/diary-ja-hiragana.json
2. src/memory.js
3. src/pet-name.js
4. src/diary.js
5. src/food.js
6. src/wash.js
7. src/dirt.js
8. src/growth.js
9. src/character.js
10. src/movement.js
```

Reason:

```txt
Diary data and memory are easier to extract safely.
Character / movement are more fragile and should be moved later.
```

---

# 11. Never lose MUU's feeling

Architecture must serve the experience.

Do not make MUU feel like:

```txt
a dashboard
a game UI
a chatbot
a productivity app
a pet simulator with stats
```

MUU should remain:

```txt
quiet
slightly mysterious
soft
present
non-verbal
memory-bearing
worth returning to
```

---

# 12. Current development workflow

The preferred workflow is:

```txt
1. User discusses concept and experience with @.
2. @ helps define the specification and feeling.
3. Codex updates main safely.
4. Codex keeps code stable and future-refactor-aware.
5. GitHub + Netlify deploy to muu.life.
```

In short:

```txt
@ creates the feeling.
Codex protects the implementation.
```

---

# 13. Codex instruction summary

Codex should follow this rule:

```txt
Do not split now.
Do not rewrite now.
Do not merge character-foundation now.

But from now on, edit the single-file beta as if it will later become a structured app.
Keep logical boundaries clean.
Protect the current experience.
Prepare for future scale.
```
