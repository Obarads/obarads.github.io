# VoxelNet: End-to-End Learning for Point Cloud Based 3D Object Detection 

元の論文の公開ページ : [arxiv](https://arxiv.org/abs/1711.06396)
Github Issues : [#15](https://github.com/Obarads/obarads.github.io/issues/15)

## どんなもの?
手作業の特徴量の設計を必要とせず、特徴抽出とオブジェクトの境界ボックスの予測を行う汎用的でEnd-to-Endな3D検知ネットワーク、VoxelNetを提案する。ボクセルによって一定間隔ごとに点群をまとめそれを特徴表現に変換する。

## 先行研究と比べてどこがすごいの?
LiDARの様な100K程の大規模点群を使うような状況でも効率よくオブジェクトを検知できるような効率の良いネットワークを作成する。また、Region proposal network(領域提案ネットワーク)は密でtensor structure(画像、ビデオなど)である必要があり、LiDARのような3Dセンサーは必ずしも全体的に均一な点群を生成しない場合は適応できない。この論文ではそのギャップを埋める。

## 技術や手法のキモはどこ? or 提案手法の詳細
図2の様に提案するネットワークは特徴学習ネットワーク、畳み込み中間層、領域提案ネットワークの3つの構造からなる。

![fig2](img/VELfPCB3DOD/fig2.png)

### 特徴学習ネットワーク
以下の1~5までの手順の図は図2にある。

#### ボクセル分割
ボクセルを分割する。ボクセルのサイズは正六面体でなくても問題なく、3D空間の範囲D, H, Wであり、ボクセルのサイズがvD, vH, vWであるとき、ボクセルの軸ごとの数はD'=D/vD, H'=H/vH, W'=W/vWとなるようにする。

#### グルーピング
ボクセルごとに点群を分割する。LiDARが点群を取得するため、図2のgroupingのボクセルの様にボクセルごとに保有する点群はまばらである。

#### ランダムサンプリング
計算の節約とボクセル内の点群の数による偏りを減らすためにT個以下の点群になるようランダムサンプリングする。

#### スタックボクセル特徴のエンコーディング
図3にボクセル特徴エンコーディング(VFE)層を示す。

![fig3](img/VELfPCB3DOD/fig3.png)

ここでボクセルVに含まれる点piにはxyz座標のほかに反射率riを含んでおり、更にローカルな情報としてそれぞれのボクセル中の点群の中央点(vx, vy, vz)があるとすると、ボクセルVinに含まれる点p^iはxi, yi, zi, ri, xi-vx, yi-vy, zi-vzの情報を含める。このp^iはfully connected network(FCN)を介して特徴空間へ変換され、ここで点特徴fiから情報を集約できる。その後、局所集約特徴f\~を得るためelement-wise MaxPoolingをfiに使う。最後にfiとf\~をPoint-wise concatenated Featureで合体させる。合体させることにより、点ごとの特徴とローカルな特徴を兼ね備えることができる。

要約すると、VFE層はT個以下の点群を含むボクセルを点ごとの特徴とそのボクセル内のローカル特徴を合体させたものを出力してくれるということである。

#### スパースなTensor表現
空ではないボクセルのリストを作る。図2の様に、ボクセルごとの特徴の次元がCであるとき、スパースな3D tensorはC\*D'\*H'*W'のサイズとなる。基本的に90%のボクセルは空であり、空ではないボクセル特徴をsuper tensorとして扱うことは学習時のメモリ使用率や計算量を減らすことができる。

### 畳み込み中間層
畳み込み中間層は、3D畳み込みを適応した層である。畳み込み中間層はボクセル単位特徴を集約し、形状記述のためのコンテキストをより多く与える。

### 領域提案ネットワーク
点群で論文関連リンクの1の領域提案ネットワークを使うためにいくつか変更を加えた。図4にRPNのアーキテクチャを示す(先に論文関連リンクの1の内容を見たほうが良い)。

![fig4](img/VELfPCB3DOD/fig4.png)

### 損失関数
先に論文関連リンク1のloss functionに目を通したほうが良い。

$ { \\{ a^{pos}\_i \\} \_{i=1...N\_{pos}}} $ が一組の$ N_{pos} $個のpositiveアンカー、$ { \\{ a^{neg}\_j \\} \_{j=1...N\_{neg}}} $ が一組の$ N_{neg} $個のnegativeアンカーであるとする。3Dのground truthボックスをパラメータ化したものを$ (x_c^g, y_c^g, z_c^g, l^g, w^g, h^g, \theta^g) $とする。$ x_c^g, y_c^g, z_c^g $ は中央座標、$ l^g, w^g, h^g $は全長, 幅, 高さ、$ \theta^g $はzの軸周りのyaw回転である。(ground truthボックスに?)一致するpositiveアンカー$ (x_c^a, y_c^a, z_c^a, l^a, w^a, h^a, \theta^a) $からground truthボックスを探すため、残差ベクトル$ u^* \in \mathbb{R}^7 $に含まれる7つの回帰値は式(1)のように定義される。

![eq1](img/VELfPCB3DOD/eq1.png)

この時、$ d^a $はアンカーボックスの底面の対角線である。式(1)では、既存のものと違い3Dボックスを直接評価しながらΔxとΔyを$ d^a $で一様に標準化する。

これらより式(2)に損失関数を定義する。

![eq2](img/VELfPCB3DOD/eq2.png)

この時、$ p_i^{pos} $と$ p_j^{neg} $ はそれぞれ$ a^{pos}\_i $と$ a^{neg}\_j $に対するsoftmax出力を表す。また、$ u_i \in \mathbb{R}^7 $と$ u_i^* \in \mathbb{R}^7 $は回帰の出力とpositiveアンカー$ a^{pos}\_i $に対するground truthである。最初の2つの項は$ { \\{ a^{pos}\_i \\} \_{i=1...N\_{pos}}} $と$ { \\{ a^{neg}\_j \\} \_{j=1...N\_{neg}}} $に対する標準化された分類損失であり、この$ L_{cls} $は2値corss entropy損失であり、$ \alpha, \beta $はバランス調節用の変数である。最後の項の$ L_{reg} $は回帰損失であり、論文関連リンク2のSmooth L1関数を使用している。

その他にも効率的な実装、実装の詳細などが載っている。

## どうやって有効だと検証した?
KITTI 3Dオブジェクト検知ベンチマーク(論文関連リンクの3)を用いて評価した。鳥瞰図検知は表1に、3D検知は表2にVaidation setによるそれぞれ結果が載せられている。これらは3つの難易度で評価されている。

![table1](img/VELfPCB3DOD/table1.png)

![table2](img/VELfPCB3DOD/table2.png)

KITTIのTest setによる結果も表3に見せている。

![table2](img/VELfPCB3DOD/table2.png)

図6は検知の例をRGB画像とbounding boxで表示させたもの。ただし、検知処理自体にRGBデータは用いられていない。

![fig6](img/VELfPCB3DOD/fig6.png)

TitanX GPUと1.7GhzのCPUによる動作では一回の推論に33msかかる。これはvoxel input feature computationに5ms、feature learning networkに16ms、convolutional middle layersに1ms、RPNに11ms取られているからである。

## 議論はある?
RGB画像とLiDARを併用したEnd-to-Endな3D検知を行うことができれば、精度が更に向上するとしている。

## 次に読むべき論文は?
- [S. Ren, K. He, R. Girshick, and J. Sun. Faster r-cnn: Towards real-time object detection with region proposal networks. In Advances in Neural Information Processing Sys-tems 28, pages 91–99. 2015.](https://arxiv.org/abs/1506.01497)

## 論文関連リンク
1. [S. Ren, K. He, R. Girshick, and J. Sun. Faster r-cnn: Towards real-time object detection with region proposal networks. In Advances in Neural Information Processing Sys-tems 28, pages 91–99. 2015.](https://arxiv.org/abs/1506.01497)
2. [R. Girshick. Fast r-cnn. In Proceedings of the 2015 IEEE International Conference on Computer Vision (ICCV), ICCV ’15, 2015.](https://arxiv.org/abs/1504.08083)
3. [A. Geiger, P. Lenz, and R. Urtasun. Are we ready for au-tonomous driving? the kitti vision benchmark suite. In Conference on Computer Vision and Pattern Recognition (CVPR), 2012.](http://www.cvlibs.net/datasets/kitti/)

## 会議
CVPR 2018

## 著者
Yin Zhou and Oncel Tuzel

## 投稿日付(yyyy/MM/dd)
2017/11/17

## コメント
super tensorの扱いがわからないからなぜ効率が良くなるのかわからない(ただ単に並列処理がしやすいということ?)。損失関数についてはFast R-CNNをちゃんと理解していないため、説明もよくわからず書いている。uiもよくわからない。先に論文関連リンクの1を見ます(2019/02/11)

## key-words
Detection, Point_Cloud, CV, Supervised_Learning, Paper

## status
更新済