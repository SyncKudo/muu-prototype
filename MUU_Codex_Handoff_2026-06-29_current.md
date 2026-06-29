# MUU Codex Handoff — 2026-06-29 Current

Read together with:

```txt
AGENTS.md
```

This document describes the current public beta and today's updates.

---

## 1. Current production target

Public beta:

```txt
https://muu.life/
```

Production branch:

```txt
main
```

Current public beta is the @ version, not the Codex modular version.

Latest working beta file from ChatGPT:

```txt
index_muu_name_growth_v1.html
```

When applying to GitHub:

```txt
index_muu_name_growth_v1.html → index.html
ogp_name_growth_v1.jpg → ogp.jpg
```

---

## 2. Branch separation

```txt
main
→ public beta
→ @ version
→ single HTML structure
→ deployed to muu.life

character-foundation
→ Codex experimental version
→ modular src/ structure
→ not production
```

Do not merge them yet.

Do not replace the public beta with the Codex experimental structure unless explicitly approved.

---

## 3. MUU concept

MUU is:

```txt
AIあるデジタルいきもの
```

But MUU is not a chatbot.

Absolute principle:

```txt
MUUとは会話しない。
MUUは返事をしない。
MUUの内面は、あとから日記で知る。
```

Do not add chat UI.

---

## 4. OGP

Current OGP title:

```txt
MUU｜AIあるデジタルいきもの
```

Current OGP image:

```txt
https://muu.life/ogp.jpg
```

Keep file name:

```txt
ogp.jpg
```

unless explicitly changed.

---

## 5. Today's implemented updates

### 5.1 localStorage memory

MUU's state is stored per user in the browser.

```txt
localStorage key: muu_v03_memory
```

Purpose:

```txt
When the user comes back, the same MUU remains.
```

Stored data includes:

```txt
id
bornAt
living
livingSince
lastVisitDay
lastOpenedAt
lastSeenAt
petName
growth
days
totals
state
traits
diaryIndex
lastDiaryId
dirtLevel
lastWashedAt
```

Do not show these as visible stats.

---

### 5.2 Pet name

A name is displayed under the top `muu` logo.

Current behavior:

```txt
initial name: なまえ
display position: under top muu logo
font: round Japanese style
click name → prompt opens
input name → save to localStorage
reload → name persists
```

Prompt text:

```txt
なまえをいれてね
```

UI title:

```txt
なまえをかえる
```

This is a pet name / individual name.

Do not turn this into a settings screen yet.

---

### 5.3 Growth foundation

An internal 108-stage growth parameter has been prepared.

```js
memory.growth = {
  maxStage: 108,
  stage: 1,
  points: 0,
  updatedAt: "..."
}
```

Current rule:

```txt
Do not display growth stage.
Do not add evolution UI.
Do not add stats.
```

This is only a future foundation.

---

### 5.4 Hiragana Japanese diary

Japanese diary text is now all hiragana.

Current diary count:

```txt
106 entries
```

Composition:

```txt
6 original diary entries
100 additional diary entries
```

Date labels are also hiragana-style:

```txt
きょう
きのう
さんにちまえ
```

Do not reintroduce kanji or katakana in Japanese diary display.

---

### 5.5 State-weighted random diary

Diary selection is random, but weighted by MUU's state.

The diary logic considers:

```txt
hunger
food placed today
food eaten today
touches today
total touches
return after days
dirt level
washed today
slept today
last diary id
```

Examples:

```txt
hungry → hungry diary appears more often
food eaten → full / food diary appears more often
many touches → touched_many diary appears more often
no touches → quiet / untouched diary appears more often
returned after days → return diary appears more often
dirty → dirty diary appears more often
washed today → clean diary appears more often
slept → sleepy diary appears more often
```

Do not make it deterministic.
Do not display why an entry was chosen.

---

### 5.6 Dirt system

MUU gets dirty over time.

Current behavior:

```txt
10 dirt stages
24 hours = +1 dirt stage
maximum = 10
saved in localStorage
```

Visual behavior:

```txt
body color darkens slightly
soft dirt patches appear
not too ugly
still cute / quiet
```

Do not show:

```txt
汚れレベル
dirt level number
cleanliness meter
```

---

### 5.7 Wash button

There is a wash button to the right of the food button.

Bottom layout:

```txt
left: diary
center: food
right: wash
```

Wash behavior:

```txt
bubble design
same size and color feeling as food button
click → bubbles appear around MUU
click → dirt resets to stage 2
lastWashedAt updated
```

Why reset to stage 2, not 0:

```txt
MUU should keep a little lived-in presence.
Not sterile.
```

---

### 5.8 Sleeping eyes

When MUU sleeps, the eyes close.

Current behavior:

```txt
sleep state → eyes close
tired state → eyes partly close
awake state → eyes return to normal
```

Keep it quiet and subtle.

---

## 6. Current UI overview

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
diary button
food button
wash button
```

Living state text:

```txt
いっしょにくらす
くらしている
```

Do not add visible stat panels.

---

## 7. Japanese display rule

For the Japanese version, user-facing diary text should be hiragana.

Allowed:

```txt
むぅ
……
ごはん
なまえ
きょう
きのう
```

Avoid in diary:

```txt
漢字
カタカナ
English
numbers
```

OGP and technical metadata may keep their current text.

---

## 8. Files to put in GitHub

Use the latest beta files:

```txt
index_muu_name_growth_v1.html → index.html
ogp_name_growth_v1.jpg → ogp.jpg
```

Also put these docs at repository root:

```txt
AGENTS.md
MUU_Codex_Handoff_2026-06-29_current.md
```

Recommended root:

```txt
muu-prototype/
  AGENTS.md
  MUU_Codex_Handoff_2026-06-29_current.md
  index.html
  ogp.jpg
  README.md
```

---

## 9. Safe next tasks

Safe small tasks for main:

```txt
adjust pet name position
adjust pet name font size
add more hiragana diary entries
adjust wash bubble position
adjust dirt opacity
fix mobile spacing
minor OGP text changes
minor localStorage bug fixes
```

Unsafe unless explicitly approved:

```txt
full character redesign
large Three.js rewrite
AI diary API connection
account login
cloud save
merge character-foundation into main
add chat UI
show stats
add game progression UI
```

---

## 10. Codex prompt template

Use this when starting Codex:

```txt
AGENTS.md と MUU_Codex_Handoff_2026-06-29_current.md を読んで、MUUの方針に従ってください。

作業対象は main ブランチの @版βです。
character-foundation とは別物として扱ってください。

今回の作業は【ここに作業内容】だけです。

守ること：
- MUUは会話しない
- チャットUIを追加しない
- 数値やステータスを表示しない
- 日本語版の日記はひらがな
- localStorageの記憶を壊さない
- ごはん / 洗う / 日記 / 名前編集 / 眠る目つぶり を壊さない
- OGPを壊さない
- 変更は小さく

確認：
1. MUUが表示される
2. 名前がロゴ下に表示される
3. 名前をクリックして変更できる
4. 変更した名前がリロード後も残る
5. 日記が開く
6. 日記がひらがな
7. ごはんが動く
8. 洗うと泡が出る
9. 眠ると目をつぶる
10. console error が出ない
```

---

## 11. Direction

Today's update moved MUU closer to:

```txt
また会いたくなる存在
```

Because now MUU:

```txt
remembers the user
keeps its own name
gets dirty over time
can be washed
sleeps with closed eyes
writes many quiet diaries
has hidden growth potential
```

Keep this direction.

MUU should not become more useful.
MUU should become more present.
