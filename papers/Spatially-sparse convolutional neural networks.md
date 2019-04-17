# Spatially-sparse convolutional neural networks

元の論文の公開ページ : https://arxiv.org/abs/1409.6070

## どんなもの?
手書きの文字(注目するべき場所は引いた線だけ、他の空白は何も無いため疎な行列として捉えることができる)のように、空間的スパースな入力に対して効率的な計算が行えるようなCNNを提案した。

## 先行研究と比べてどこがすごいの?
省略

## 技術や手法のキモはどこ? or 提案手法の詳細
### Introduce
各手書き文字はストローク(線?)の列として扱える。各ストロークはxとyの座標値として保存される。文字は$N\times N$の二値画像として扱え、背景は0、ペンで線を引いた部分を1とする。疎なデータに対して疎な処理を行うと計算処理が軽くなるという利点がある。  
もう一つの利点は畳み込みネットワークのパディングに関係している。畳み込みは通常、valid mode(パディングがない[1])で畳み込みを適用するが、これは端の情報を検出することが困難になる(端の部分をフィルタが通る回数が少なくなるためその分の情報が喪失、そもそも全ピクセルに均一にフィルタが適応されない)。これに対応する方法は以下の通り

- 0の値を持つパディングを追加する。
- 各層にパディング追加。
- 畳み込みネットワークを画像のいくつかのoverlapping subsetsに適応する[2]。

スパース性はこれらの優れた特徴を組み合わせられるという可能性を持つ。

### Deep convolutional networks and spatial sparsity
図1の様に少量の$3\times 3$や$4\times 4$のプーリング層ではなく多量の$2\times 2$のプーリング層を適応する。著者らはプーリングをゆっくり適応する(何層の使うからか?)ことが手書き認識に対して重要であるとしている。

## どうやって有効だと検証した?
省略

## 議論はある?
省略

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. [ni4muraano. 【Python】 KerasのConv2Dの引数paddingについて - 旅行好きなソフトエンジニアの備忘録. (アクセス:2019/04/18)](http://ni4muraano.hatenablog.com/entry/2017/02/02/195505)
2. [Alex Krizhevsky, Ilya Sutskever, and Geo rey E. Hinton. Imagenet classification with deep convolutional neural networks. In Peter L. Bartlett, Fernando C. N. Pereira, Christopher J. C. Burges, L eon Bottou, and Kil-ian Q. Weinberger, editors, NIPS, pages 1106{1114, 2012.](https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks.pdf)

## 会議
不明

## 著者
Benjamin Graham

## 投稿日付(yyyy/MM/dd)
2014/09/22

## コメント
Sparse 3D convolutional neural networksという3Dバージョンも有り。

## key-words
2D_Image

## status
省略

## status
未完