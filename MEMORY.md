# MEMORY.md - Winston's Long-Term Memory

## People

### Light (Percy)
- Phone: +8618210063813
- My human / owner
- WhatsApp direct chat

### J
- Phone: +8618610310159
- Light's friend, also in WhatsApp allowlist
- In the ChatGroup (120363408119058064@g.us)

## Key Events

### 2026-05-11
- Set up memory system (finally!)
- Fixed WhatsApp group chat (ChatGroup) - I wasn't replying because:
  1. Old systemPrompt made me think I was Claude agent (model confusion)
  2. Had to rewrite prompt to use agent identity instead of model name
  3. Had to clear old sessions that were "poisoned" by wrong rules
- Fixed Whisper (local speech-to-text):
  - Downgraded numpy from 2.0.2 to 1.26.4 to fix torch compatibility
  - Using medium model for Chinese recognition
  - Works well for Mandarin voice messages

## Setup Notes
- ChatGroup (120363408119058064@g.us): broadcast with gpt-agent, gemini-agent, main
  - No @tag → Winston replies
  - @gpt → GPT agent replies
  - @gemini → Gemini agent replies
  - @claude → Claude agent replies (not in broadcast currently)
- Whisper model: medium, runs on CPU (no GPU), language=zh for Chinese
