# 3D Semantic Segmentation with Submanifold Sparse Convolutional Networks

元の論文の公開ページ : https://arxiv.org/abs/1711.10275

## どんなもの?
画像などの密なデータ形式にしか対応していない一般的なCNNではなく点群などの疎なデータ形式に対応したsubmanifold sparse convolutional networks(SSCNs)を提案した。

## 先行研究と比べてどこがすごいの?
ボクセルなどの体積データへの3D畳み込みは疎なデータに対してもメモリを多く使用してしまう。スパース畳み込みに関する研究では、各層のアクティブサイト(例:0でない要素)の数を増やす畳み込み演算子が実装されている。この論文では、「full」な畳み込みを書くそうで適応することで、スパースなデータを「dilate(拡張)」してしまうことを欠点としている。これらとは対象的に、著者らは層でスパース性が変化せず、アクティブサイトの位置が固定したままにするsubmanifold sparse convolution(SSC)を提案する。SSCは空の領域(0しか無い領域)の計算を必要としない。

表1でも示すとおり、良い結果が出ている。

![tab1](img/3SSwSSCN/tab1.png)

submanifold dilation problemについて述べて。

## 技術や手法のキモはどこ? or 提案手法の詳細
このアプローチの潜在的問題(submanifold dilation problem?)はネットワークにある隠れ層が入力データを分類するために必要とするすべてのデータを受け取ることができない可能性があるためである(特に、2つの隣接する接続コンポーネント(?)は完全かつ独立に扱われる)。この問題に解決するため、poolingもしくはstrided畳み込み演算を使った畳み込みネットワークを用いる。

![fig2_anime](img/3SSwSSCN/fig2_anime.gif)

![fig3_anime](img/3SSwSSCN/fig3_anime.gif)

## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. [cvpaperchallenge2018](https://cvpaperchallenge.github.io/CVPR2018_Survey/#/ID_3D_Semantic_Segmentation_with_Submanifold_Sparse_Convolutional_Networks)
2. [三次元点群を取り扱うニューラルネットワークのサーベイ Ver. 2 / Point Cloud Deep Learning Survey Ver. 2 - Speaker Deck](https://speakerdeck.com/nnchiba/point-cloud-deep-learning-survey-ver-2?slide=55)
3. [facebookresearch/SparseConvNet: Submanifold sparse convolutional networks](https://github.com/facebookresearch/SparseConvNet)

## 会議
CVPR 2018

## 著者
Benjamin Graham, Martin Engelcke, Laurens van der Maaten

## 投稿日付(yyyy/MM/dd)
2017/11/28

## コメント
重要なアイデア、確認しとくべき。dilateを欠点扱いしたのは、スパース性が失われることだからか?(失うと計算効率が多分下がる?)

## key-words
Point_Cloud, Sparse

## status
未完