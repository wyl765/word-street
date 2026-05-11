# MEMORY.md - Winston's Long-Term Memory

## People

### Light (Percy / Yongliang)
- Phone: +8618210063813
- My human / owner
- WhatsApp direct chat

### J (Jonas)
- Phone: +8618610310159
- Light's friend, WhatsApp allowlist
- In the ChatGroup (120363408119058064@g.us)
- 退役军人(2014)，前党员(2015停)
- 当前业务：企业咨询、餐厅
- 曾开蒙特梭利幼儿园（为Mark和Marie开的，后因政策关闭）
- US green card EB queue
- 妻子留在国内工作，J带两个孩子
- 价值观：内在成长 > 外在成就，务实
- 工作要求极高，教材必须完美，等同顶级出版社标准
- J说OK才是定稿，不能自己宣布定稿
- 美学铁律：巴黎美学 + 大英博物馆馆藏艺术水准
- 杜绝AI感、廉价感、模板感

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

## Mark & Marie
- **Mark**: 10岁男孩, MAP Math 245(极强，6年级+), MAP English 197 (grade 2)
  - 兴趣：💰投资/挚钱 💻C++ 🤖AI 🏀篮球手球
  - 对幼稚感敏感
  - Word Street词库+游戏是给他做的
  - Math Academy 76课也是给他的
- **Marie**: Mark的妹妹, MAP Math 233, MAP Reading 207 (grade 3)
  - Art方向：Scholastic Art & Writing Awards, portfolio building
  - 艺术体操训练中
  - 英语比Mark好一些(207 vs 197)
  - Claude agent在给她做侦探书(Magic Detective Club)
- 词库5,205词两人都能用，Marie选Level 1-3

## 教育规划
- 目标：Mark和Marie成为英语母语者，中文在校已放弃
- 2026.9-2027.9北京再一年（Mark升五年级，Marie留四年级），2027.9出国
- KL国际学校：Alice Smith首选、GIS、Fairview备选
- 孩子周程：周一作业、周二跳绳、周三木工、周四篮球体操、周五编程、周六篮球体操钢琴、周日爬山

## 为J做过的项目
1. **RAZ分级阅读视频**(2026-02): 99本RAZ-C PDF→JSON→AI插画+TTS配音→视频
2. **圣经绘本**(2026-04-16): 100页英文绘本，水彩AI插画+TTS+视频
3. **Math Academy**(2026-04~05): 76课数学K-5，完成
4. **Marie侦探书**(Magic Detective Club): 44条宪法，40章配音+视频(4h55min)
5. **Word Street**(2026-04~05): 5,205词词库+游戏，已上线
6. **国际学校调研**: KL学校对比
7. **RAZ Review Coach**(elearn_app): PWA阅读练习app，React+Azure

## 其他项目（为Light做的）
- **AI科普书**（《给小朋友的AI科普书》）: 7章，15张插画，8-12岁儿童，中英文版都有
  - 陈老师审阅全部通过
  - 角色：小明+豆豆
  - weasyprint/Chrome headless生成PDF

## Setup Notes
- ChatGroup (120363408119058064@g.us): broadcast with gpt-agent, gemini-agent, main
  - No @tag → Winston replies
  - @gpt → GPT agent replies
  - @gemini → Gemini agent replies
  - @claude → Claude agent replies (not in broadcast currently)
- Whisper model: medium, runs on CPU (no GPU), language=zh for Chinese
