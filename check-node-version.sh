#!/bin/bash

# .node-version ファイルが存在するか確認
if [ ! -f .node-version ]; then
  echo ".node-version ファイルが見つかりません。"
  exit 1
fi

# .node-version ファイルから指定された Node.js バージョンを読み取る
desired_version=$(cat .node-version)

# 実際の Node.js バージョンを取得
current_version=$(node --version | cut -c 2-)

# バージョンが一致するか確認
if [ "$desired_version" != "$current_version" ]; then
  echo "エラー: Node.js バージョンが一致しません。"
  echo "指定されたバージョン: $desired_version"
  echo "現在のバージョン: $current_version"
  exit 1
fi

echo "Node Version Check OK"
