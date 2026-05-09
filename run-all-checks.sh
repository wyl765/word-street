#!/bin/bash
# Word Street — 一键全流程审校
# 用法: ./run-all-checks.sh
# 按QA-STANDARD.md Step 1-6顺序执行

set -e
cd "$(dirname "$0")"

echo "================================================"
echo "🔍 Word Street 全流程审校 — $(date '+%Y-%m-%d %H:%M')"
echo "================================================"
echo ""

FAIL=0

# Step 1: 基础规则检查
echo "📋 Step 1: proofcheck.mjs (规则引擎)"
echo "----------------------------------------"
node proofcheck.mjs
echo ""

# Step 2: 可读性检查
echo "📋 Step 2: fk-check.mjs (FK可读性)"
echo "----------------------------------------"
if [ -f fk-check.mjs ]; then
  node fk-check.mjs
else
  echo "⚠️  fk-check.mjs not found, skipping"
fi
echo ""

# Step 3: 歧义检测
echo "📋 Step 3: quiz-test.mjs (定义歧义)"
echo "----------------------------------------"
if [ -f quiz-test.mjs ]; then
  node quiz-test.mjs
else
  echo "⚠️  quiz-test.mjs not found, skipping"
fi
echo ""

# Step 4: 定义模式检查
echo "📋 Step 4: dict-verify.mjs (定义模式)"
echo "----------------------------------------"
if [ -f dict-verify.mjs ]; then
  node dict-verify.mjs
else
  echo "⚠️  dict-verify.mjs not found, skipping"
fi
echo ""

# Step 5: NLP深度验证
echo "📋 Step 5: nlp-verify.py (WordNet+语义)"
echo "----------------------------------------"
if [ -f nlp-verify.py ]; then
  python3 nlp-verify.py
else
  echo "⚠️  nlp-verify.py not found, skipping"
fi
echo ""

# Step 6: 高级验证（L1干扰+间隔重复+CLIP）
echo "📋 Step 6: advanced-verify.mjs (高级验证)"
echo "----------------------------------------"
if [ -f advanced-verify.mjs ]; then
  node advanced-verify.mjs
else
  echo "⚠️  advanced-verify.mjs not found, skipping"
fi
echo ""

# Step 7: 干扰项测试
echo "📋 Step 7: distractor-test.mjs"
echo "----------------------------------------"
if [ -f distractor-test.mjs ]; then
  node distractor-test.mjs
else
  echo "⚠️  distractor-test.mjs not found, skipping"
fi
echo ""

# Step 8: 认知负荷检测
echo "📋 Step 8: cognitive-load-check.mjs (认知负荷)"
echo "----------------------------------------"
if [ -f cognitive-load-check.mjs ]; then
  node cognitive-load-check.mjs
else
  echo "⚠️  cognitive-load-check.mjs not found, skipping"
fi
echo ""

# Step 9: 视觉混淆检测
echo "📋 Step 9: visual-collision-check.mjs (视觉混淆)"
echo "----------------------------------------"
if [ -f visual-collision-check.mjs ]; then
  node visual-collision-check.mjs
else
  echo "⚠️  visual-collision-check.mjs not found, skipping"
fi
echo ""

# Step 10: 记忆干扰预测
echo "📋 Step 10: memory-interference-check.mjs (记忆干扰)"
echo "----------------------------------------"
if [ -f memory-interference-check.mjs ]; then
  node memory-interference-check.mjs
else
  echo "⚠️  memory-interference-check.mjs not found, skipping"
fi
echo ""

# Step 11: 词汇依赖图
echo "📋 Step 11: vocab-dependency-check.mjs (词汇依赖)"
echo "----------------------------------------"
if [ -f vocab-dependency-check.mjs ]; then
  node vocab-dependency-check.mjs
else
  echo "⚠️  vocab-dependency-check.mjs not found, skipping"
fi
echo ""

# Step 12: 拼写难度评分
echo "📋 Step 12: spelling-difficulty-check.mjs (拼写难度)"
echo "----------------------------------------"
if [ -f spelling-difficulty-check.mjs ]; then
  node spelling-difficulty-check.mjs
else
  echo "⚠️  spelling-difficulty-check.mjs not found, skipping"
fi
echo ""

# Step 13: 原型效应检查
echo "📋 Step 13: prototype-check.mjs (原型效应)"
echo "----------------------------------------"
if [ -f prototype-check.mjs ]; then
  node prototype-check.mjs
else
  echo "⚠️  prototype-check.mjs not found, skipping"
fi
echo ""

# Step 14: 变异测试
echo "📋 Step 14: mutation-test.mjs (变异测试)"
echo "----------------------------------------"
if [ -f mutation-test.mjs ]; then
  node mutation-test.mjs
else
  echo "⚠️  mutation-test.mjs not found, skipping"
fi
echo ""

echo "================================================"
echo "✅ 自动化检查全部完成"
echo "📋 下一步: 三模型对抗式审校 (Step 5 in QA-STANDARD)"
echo "================================================"
