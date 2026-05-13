# 发音音频说明

## 文件结构
- `audio/` — 5205个mp3文件（42MB总计）
- `audio-index.json` — 词→文件映射

## audio-index.json 结构
```json
{
  "totalWords": 5205,
  "humanRecordings": 3733,
  "synthesized": 1472,
  "files": {
    "word": { "file": "word.mp3", "source": "freedictionary|macos-samantha|cambridge-verb|macos-samantha-v2" }
  }
}
```

## 来源说明
- **freedictionary**: Free Dictionary API 真人录音
- **cambridge-verb**: Cambridge Dictionary 动词发音真人录音（异读词专用）
- **macos-samantha**: macOS Samantha TTS合成
- **macos-samantha-v2**: 重新生成的TTS（异读词修复版）

## 已处理的异读词（13个）
appropriate, attribute, contrast, project, transport, subordinate, graduate, deliberate, delegate, convict, by contrast, in contrast, live up to

这些词有 `pronunciationNote` 字段标注正确发音。

## 前端集成
index.html / arcade.html / party.html 已集成发音播放功能。

- **pronunciation.js** — 共享发音引擎，加载 `audio-index.json` 一次并缓存
- **index.html** (经典模式): 答对后自动播放发音；反向模式显示🔊按钮
- **arcade.html** (街机模式): 射击/炸弹/跑酷答对后自动播放
- **party.html** (派对模式): 踩对平台后自动播放

播放机制：从 `audio-index.json` 的 `files` 字段查找文件名，通过 HTML5 Audio API 播放 `audio/{filename}.mp3`。
