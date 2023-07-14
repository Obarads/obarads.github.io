# 本レポジトリの開発メモ
## 環境作成
vscodeの.devcontainerを用いた環境作成を行うこと。なお、Codespace寄りのイメージを使用している。

## ページをリストや更新履歴に登録する
python3.7以降が必要。
```
python scripts/listing.py
```

## node_modulesをインストールする
```
npm install
```


## サイトをローカルで表示する
表示される内容は、以下のコマンドを実行した際のもの。表示中にmdファイルの内容を変更しても、npmの仕様上更新されないので注意。更新したページに該当する場所(記事なら`src/Detail.js`)を上書き保存すれば更新される。
```
npm start
```

## サイトをgithub pageにアップロードする
単にgit pushしてもmasterブランチの内容が更新されるだけなので注意。
```
npm run deploy
```

## pipでrequirements.txt作成
```bash
pip freeze > requirements.txt
```