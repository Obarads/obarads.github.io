# obarads.github.io

github repository: [Obarads/obarads.github.io](https://github.com/Obarads/obarads.github.io)

## About
##### このレポジトリは読んだ論文(点群と教師なし学習多め)の内容を日本語で書き残しておくものです.  
- **他人に見てもらうことを第一とするブログと違い, こちらは自分のための書き残しをするものとして扱っています. また, 論文の内容を勘違いしている場合もあります.**
- もし論文と見比べて怪しい部分がある場合は, 該当する論文のIssueにコメントをしていただけると幸いです. 該当Issueがない場合は, Issueを立てていただけると助かります.
- Papersの内容は[https://obarads.github.io/](https://obarads.github.io/)で表示されます. 
- ブラウザはGoogle Chromeのみで確認をとっているため, その他は表示が崩れる可能性が有ります.
- 論文に関する記事更新情報は[Twitterの@obarads](https://twitter.com/obarads)で公開していました. 現在は休止しています.

## Directories & Files
### Papers
#### 概要
##### 読んだ論文の内容がファイルごとに分かれて保存されています.
- [Papers(papersディレクトリ)](./papers)には各論文のmdファイルが入っています. 
- [arXivTimesのIssue](https://github.com/arXivTimes/arXivTimes)と[落合フォーマット](https://www.slideshare.net/Ochyai/1-ftma15?ref=http://lafrenze.hatenablog.com/entry/2015/08/04/120205)に従う形で書いたり書かなかったりしてます. 
- **文章中に存在する[X]の意味はXの内容によって変化します. 意味は以下の通り.**
    - 数字のみ: 引用のための数字
    - ?マークのみ: よくわかっていない or 疑問が残る部分
    - 上以外: 個人的なメモ
- **[@ X]がある場合でも、Xには上の意味が適応されます. この形式は、引用内に存在する場合もあります.**
- 以下の項にあるstatusとreadは各ファイル内に書かれている内容です.
- **記述内容がどこを参照して書かれているか把握するために、コメントが「あり」の場合はコメントの内容を確認してください。**
- 引用は " で囲んでいます。基本的に論文から引用を行いますが、引用で囲んだあとに[*]がある場合、*の番号の参考文献から引用している。

#### status
##### ページ内の進行具合を示すものです. 以下6つに分けられます. statusが同じでも載っている内容の量に差があるため, 大まかな目安として利用してください.  
- 完了: 全項目を埋め, 今後の更新予定がなくなったものです. ただし詳細などを省いている場合もあります. 今後更新されるとしたら間違いの修正もしくは詳細の追記が行われます. 
- 導入: イントロ(「どんなもの?」　もしくは　「先行研究と比べてどこがすごいの? or 関連事項」)の項目のみを埋めているものです. 近いうちではないものの, 省略した部分は更新される可能性があります.
- 省略: イントロ以外にも項目を埋めているが、すべてを埋めているわけではないものです。近いうちではないものの, 省略した部分は更新される可能性があります.
- 修正: あまり理解できていないものを指します(ただし、単に節の途中で更新が止まっているだけ、つまり途中までしか読んでいないものは除く). また、レイアウトの変更を行うものも振り分けています。
- 参照: 他のページを参照するようにリンクを貼っています.
- 未完: 更新中もしくは更新を放棄しています.
- 旧版: 内容の書き方が古いもの。

#### read
##### 論文内で読んだ部分を示します. 
- A: Abstract, 要約. 
- R: Related Work, 関連研究. 
- M: Method, 提案手法. 
- I: Implement, 実装. 
- E: Experiments, 実験. 
- C: Conclusion, 結論. 
- D: Discussion, 議論(そのような項目がある論文のみ).
- AP: Appendix, 付録(そのような項目がある論文のみ).

## 開発メモ
### ページをリストや更新履歴に登録する
- python3が必要。以下のコマンドを実行。
  ```
  python scripts/listing.py
  ```

### サイトをローカルで表示する
- 表示される内容は、以下のコマンドを実行した際のもの。表示中にmdファイルの内容を変更しても、npmの仕様上更新されないので注意(めんどい)。
  ```
  npm start
  ```

### サイトをgithub pageにアップロードする
- 単にgit pushしてもmasterブランチの内容が更新されるだけなので注意。
  ```
  npm run deploy
  ```

