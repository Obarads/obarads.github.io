# このレポジトリの概要
## 目的
このレポジトリは本来以下の条件を満たすために作成された。
1. 本システムは自分のために論文を要約、翻訳した記事をどの端末(最新の端末に限る)でも見ることが可能なように公開できる。
2. HTMLとJavascriptしか使えない環境でもWebアプリケーションとして扱うことができる。
3. 本レポジトリさえダウンロードすればローカルですぐに扱えるようにする。もしくは少しツールをインストールするだけで扱えるようにする。
4. 論文を検索できるようなシステムにする。
5. 記事に数式が使えるようにする。また、記事はマークダウン式で書ける。
6. 本レポジトリがインターネットに繋げられないローカル環境でも機能するようにする。

1が大本の目的である。最初はarixivtimesと同じようにgithubのissuesに記事を残す方法を取ろうとしたが、その場合に数式(条件5)を満たすことができなかったため、本レポジトリのシステムを開発するに至った。2と5と6は今の所、達成している。3はpythonとローカル環境でサーバを立てるツール(VScodeのLive ServerやXAMPPなど)が必要となる。条件6のような環境で動かす場合は、MathJaxをダウンロードする必要がある。4はタグと記事タイトルでのみ検索が可能となる。

## 利用方法
このレポジトリは主にpapersディレクトリを中心に扱う。papersディレクトリでは主に作業が以下のステップに分けられる。

1. mdファイル作成: papersディレクトリでmarkdownファイルを作成する。このファイルが記事となる。
2. 記事の編集: papersディレクトリにある作成ファイルもしくは既存ファイルの記事をmd形式とlatexの数式形式で書く。
3. pythonによる更新: 検索できるように作成&更新したファイルの内容を検索テーブルに反映させる。

以下にこれらのステップの詳細について載せる。

### mdファイル作成
mdファイルをpapersディレクトリに作成する。ここで作成したファイルのファイル名が検索テーブルのタイトルとなる。ファイル作成後は、otherディレクトリのTEMP.mdの内容を作成ファイルに反映し、それをもとに記事を作成する。ここで、検索テーブルに反映される(正確には表示される)記事の内容は以下の通り。

- ファイル名
- \#\# 投稿日付(yyyy/MM/dd)
- \#\# key-words
- \#\# status

これらの書き方は他のファイルを参考にして書くこと。

### 記事の編集
papersディレクトリ中の作成したファイルもしくは更新したい既存ファイルを編集する。記事のフォーマットにはマークダウンとLatexの数式(明確にはMathJax)を使用できる。このフォーマットはlegokichiさんの記事[1]を利用している。実際に書く際の注意として、\$任意の数式\$
でアンダーバーを利用する際は、アンダーバーの前に半角スペースを挿入すること。\$\$ 任意の数式 \$\$の場合は問題ない。

### pythonによる更新
いろいろ説明することがあり、今回は書く気を使い果たしたため、この部分はまた今度更新する。

## 参考文献
1. [markdown+mathjaxをブラウザで](https://qiita.com/legokichi/items/27b7b865a0ab28b5d530)
2. [ButTaiwan/gensen-font: A free font family derived from Source Han Sans.](https://github.com/ButTaiwan/gensen-font/tree/master/JP)
4. [MathJax で利用可能な TeX コマンド（非公式）](http://memopad.bitter.jp/web/mathjax/TeXSyntax.html)
5. [CSSで作る！押したくなるボタンデザイン100（Web用）](https://saruwakakun.com/html-css/reference/buttons)
6. [inputイベントでフォーム入力値をリアルタイム取得できるよ. （あとjQuery例. ） | Ginpen.com](https://ginpen.com/2018/01/30/realtime-form-values/)
7. [テーブルのキーワードにマッチする行だけ表示する at softelメモ](https://www.softel.co.jp/blogs/tech/archives/4330)
8. [jQuery tablesorter 2.0](https://mottie.github.io/tablesorter/docs/)
9. [MathJax | Beautiful math in all browsers.](https://www.mathjax.org/)