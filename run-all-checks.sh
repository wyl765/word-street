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

echo "================================================"
echo "✅ 自动化检查全部完成"
echo "📋 下一步: 三模型对抗式审校 (Step 5 in QA-STANDARD)"
echo "================================================"
