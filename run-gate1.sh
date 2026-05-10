#!/bin/bash
# Gate 1: 规则引擎全量检查
# 用法: ./run-gate1.sh words-level1.js

FILE=$1
cd /Users/percy/.openclaw/workspace/projects/word-street

if [ -z "$FILE" ]; then
  echo "用法: ./run-gate1.sh <words-levelX.js>"
  exit 1
fi

if [ ! -f "$FILE" ]; then
  echo "错误: 文件 $FILE 不存在"
  exit 1
fi

echo "=== Gate 1: 规则引擎 ==="
echo "文件: $FILE"
echo "时间: $(date)"
echo ""

# 运行proofcheck
echo "--- proofcheck ---"
node proofcheck.mjs 2>&1

# 运行其他已有工具
for tool in fk-check dict-verify advanced-verify quiz-test distractor-test mutation-test anchor-verify cognitive-load-check memory-interference-check visual-collision-check spelling-difficulty-check prototype-check vocab-dependency-check; do
  if [ -f "${tool}.mjs" ]; then
    echo ""
    echo "--- $tool ---"
    node ${tool}.mjs $FILE 2>&1 | tail -5
  fi
done

echo ""
echo "=== Gate 1 Complete ==="
