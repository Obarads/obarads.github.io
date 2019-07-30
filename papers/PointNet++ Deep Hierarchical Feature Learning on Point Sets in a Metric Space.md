# PointNet++: Deep Hierarchical Feature Learning on Point Sets in a Metric Space

元の論文の公開ページ : [arxiv](https://arxiv.org/abs/1706.02413)
Github Issues : [#94](https://github.com/Obarads/obarads.github.io/issues/94)

## どんなもの?
PointNetは設計上、距離空間上の局所構造を取得できなかったが、本論文のPointNet++はその欠点を克服したモデルである。距離空間上の局所構造を得ることでメトリック空間上のコンテキストを取得し、結果としてPointNetよりもロバストな処理を行うことができるようになる。

## 先行研究と比べてどこがすごいの?
どんなもの?に示した通り。

## 技術や手法のキモはどこ? or 提案手法の詳細
PointNet++のアーキテクチャは図2の通り。PointNet++はSampling層、Grouping層、PointNet層の3種類の層から成り立つ。

![fig1](img/PDHFLoPSiMS/fig2.png)

### Hierarchical Point Set Feature Learning
#### Sampling layer
入力点 $\\{x_ 1,x_ 2,\ldots,x_ n\\}$が与えられたとき、farthest points sampling(FPS)を繰り返し使って点のサブセット $\\{x_ {i_ 1},x_ {i_ 2},\ldots,x_ {i_ m}\\}$を選択する。このとき、$x_ {i_ j}$は$\\{x_ {i_ 1},x_ {i_ 2},\ldots,x_ {i_ {j-1} } \\}$のセットから一番遠い残りの点である。通常のランダムサンプリングよりも全体的に点を取得できる。

#### Grouping layer
入力として$N\times(d+C)$サイズの点の集合と$N'\times d$サイズの重心の集合の座標を受け取る。出力は$N'\times K \times (d+C)$サイズの点集合のグループであり、各グループは局所領域に対応し、$K$は重心点の近傍中の点の数である。$K$はグループによって異なるが、後続のPointNet層は、自由な数の点を固定長の局所領域特徴ベクトルに変換することができる。

グループ化には$K$の上限値が決まっているボールクエリ(重心点から指定した距離内にある点を選択する)を使う。kNNではなくボールクエリである理由は選ばれる点の距離範囲が固定長の上限を持ち、それによって一般化可能になるからである。

#### PointNet layer
入力として$N^{\prime} \times K \times(d+C)$サイズの$N^{\prime}$個の局所領域(グループ)点情報をもつデータを扱う(上記の訳が間違っていなければこの$K$はグループごとにちがうはず、本来は$K$がグループごとに違うことを書かなければいけない)。出力は$N^{\prime} \times(d+C^{\prime})$サイズの近傍情報を要約した$N^{\prime}$個の特徴量である。なお、局所領域内の近傍点の座標には重心点との相対距離が使われる。

### Robust Feature Learning under Non-Uniform Sampling Density
入力点群の密度が不均一な場合でも、適切に局所構造を認識できる密度適応型PointNet layerを提案する。そして、そのPointNet layerを持つ階層的ネットワークをPointNet++と呼称する。

点群の密度は不均一である場合が多く、点群密度が高い領域は詳細な情報を提供する一方で点群密度が低い領域ではスパースな情報を提供する。機械学習モデルは高密度領域から詳細な構造情報を認識するべきであるが、それに特化した場合にスパースな情報しか持たない低密度領域における構造情報を認識できなくなる可能性がある。

本提案手法では、各抽象化過程で局所パターンを複数の尺度で抽出した後、各局所領域の密度に従ってそれらを組み合わせる方法を導入する。方法として以下の2つの提案する。2つの方法のイメージを図3に示す(下から上に過程が進んでいることに注意)。

![fig3](img/PDHFLoPSiMS/fig3.png)

#### Multi-scale grouping (MSG)
MSGの順序は以下の通り。

1. 点群に異なるスケール(ボールクエリの半径が異なる?)をもつgrouping layerを適応する。
2. PointNetに従って各スケールの特徴量を抽出する。
3. 各スケールの特徴量を連結する。

複数のスケールの特徴を組み合わせるこの方法を最適化するため、入力点群のいくつかの点をランダムに削除して学習する。

#### Multi-resolution grouping (MRG)
MSGは全ての重心点とその近傍点に対してPointNetを実行するため計算コストが高い。そこで、抽象化レベル$L_ i$(図2のset abstractionの過程を経るごとにレベルが1上がる)の領域特徴を２つのベクトルの連結で得る方法を提案する。このベクトルは以下の通り。

1. 図3(b)の左のベクトルは$L_ {i-1}$から各小領域の特徴を集約したもの。
2. 図3(b)の右のベクトルは単体のPointNetを使って局所領域上の生の点を直接計算して得たもの。

局所領域の点密度が低い場合、左のベクトルにサンプリング不足の影響が出て右のベクトルよりも信頼性が低くなる可能性がある。その場合は右のベクトルの重みを大きくする必要がある(?)。  
逆に点密度が高い場合、左のベクトルはより詳細な情報を提供する(?)。

### Point Feature Propagation for Set Segmentation
省略

## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. なし

## 会議
NIPS 2017

## 著者
Charles R. Qi, Li Yi, Hao Su, Leonidas J. Guibas.

## 投稿日付(yyyy/MM/dd)
2017/06/07

## コメント
なし

## key-words
Point_Cloud, Classification, Semantic_Segmentation, CV

## status
修正

## read
A, M

## Citation
@article{qi2017pointnetplusplus,
    title={PointNet++: Deep Hierarchical Feature Learning on Point Sets in a Metric Space},
    author={Qi, Charles R and Yi, Li and Su, Hao and Guibas, Leonidas J},
    journal={arXiv preprint arXiv:1706.02413},
    year={2017}
  }