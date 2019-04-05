# Learning Localized Generative Models for 3D Point Clouds via Graph Convolution

元の論文の公開ページ : https://openreview.net/forum?id=SJeXSo09FQ

## どんなもの?
グラフ畳み込みタイプの局所演算を使った生成器を含むGANの提案をした。

## 先行研究と比べてどこがすごいの?
従来にはない(従来はFC層もしくは畳み込みベースのデコーダー)アップアンプリング用の演算子の提案を行った。

## 技術や手法のキモはどこ? or 提案手法の詳細
### GRAPH-BASED GENERATOR
グラフ畳み込みを用いた生成器には、教師あり学習やAutoencoderを含む教師なし学習で使う点群は事前にわかっているが、GANの生成器の中間層は生成演算の結果のようなそれ(点群)を事前に知ることができない問題がある。それ故、前もって知らされていないグラフの近傍へ局所化される演算を定義する手法が明らかではない。これを解決するために、前の層のノードの特徴間の相対距離を使ったk近傍グラフを作成する。図1では、各グラフ畳み込みブロックが自身のブロックの入力特徴から構築したグラフ(=k近傍グラフ(多分))を使うグラフベースの生成器のブロック図を示している。

![fig1](img/LLGMf3PCvGC/fig1.png)

### UPSAMPLING

![fig2](img/LLGMf3PCvGC/fig2.png)

## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
-
-

### 論文関連リンク
1.
2.

### 会議
ICLR 2019

### 著者
Diego Valsesia, Giulia Fracastoro, Enrico Magli.

### 投稿日付(yyyy/MM/dd)
2018/09/28

## コメント
難しい、もし間違いがあるのであれば教えてほしい....。事前のそれを知らないの下りがよくわからなかったため、先にプログラムコードを調べたほうが良さそう。

## key-words
Point_Cloud, GAN