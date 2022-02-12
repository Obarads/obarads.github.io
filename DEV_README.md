# 本レポジトリの開発メモ
## Devcontainer
- I referred to [vscode-remote-try-node](https://github.com/Microsoft/vscode-remote-try-node)

## ページをリストや更新履歴に登録する
- python3.7が必要。以下のコマンドを実行。
  ```
  python scripts/listing.py
  ```

## サイトをローカルで表示する
- 表示される内容は、以下のコマンドを実行した際のもの。表示中にmdファイルの内容を変更しても、npmの仕様上更新されないので注意。
  ```
  npm start
  ```

## サイトをgithub pageにアップロードする
- 単にgit pushしてもmasterブランチの内容が更新されるだけなので注意。
  ```
  npm run deploy
  ```
