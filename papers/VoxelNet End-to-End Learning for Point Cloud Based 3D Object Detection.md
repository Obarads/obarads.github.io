# VoxelNet: End-to-End Learning for Point Cloud Based 3D Object Detection 

元の論文の公開ページ : https://arxiv.org/abs/1711.06396

## どんなもの?
手作業の特徴量の設計を必要とせず、特徴抽出とオブジェクトの境界ボックスの予測を行う汎用的でEnd-to-Endな3D検知ネットワーク、VoxelNetを提案する。ボクセルによって一定間隔ごとに点群をまとめそれを特徴表現に変換する。

## 先行研究と比べてどこがすごいの?
LiDARの様な100K程の大規模点群を使うような状況でも効率よくオブジェクトを検知できるような効率の良いネットワークを作成する。また、Region proposal network(領域提案ネットワーク)は密でtensor structure(画像、ビデオなど)である必要があり、LiDARのような3Dセンサーは必ずしも全体的に均一な点群を生成しない場合は適応できない。この論文ではそのギャップを埋める。

## 技術や手法のキモはどこ?
図2の様に提案するネットワークは特徴学習ネットワーク、畳み込み中間層、領域提案ネットワークの3つの構造からなる。

![fig2](img/VELfPCB3DOD/fig2.png)

### **特徴学習ネットワーク**
以下の1~5までの手順の図は図2にある。

1. **ボクセル分割**  
  ボクセルを分割する。ボクセルのサイズは正六面体でなくても問題なく、3D空間の範囲D, H, Wであり、ボクセルのサイズがvD, vH, vWであるとき、ボクセルの軸ごとの数はD'=D/vD, H'=H/vH, W'=W/vWとなるようにする。

1. **グルーピング**  
  ボクセルごとに点群を分割する。LiDARが点群を取得するため、図2のgroupingのボクセルの様にボクセルごとに保有する点群はまばらである。

1. **ランダムサンプリング**  
  計算の節約とボクセル内の点群の数による偏りを減らすためにT個以下の点群になるようランダムサンプリングする。

1. **スタックボクセル特徴のエンコーディング**  
  図3にボクセル特徴エンコーディング(VFE)層を示す。

  ![fig3](img/VELfPCB3DOD/fig3.png)

  ここでボクセルVに含まれる点piにはxyz座標のほかに反射率riを含んでおり、更にローカルな情報としてそれぞれのボクセル中の点群の中央点(vx, vy, vz)があるとすると、ボクセルVinに含まれる点p^iはxi, yi, zi, ri, xi-vx, yi-vy, zi-vzの情報を含める。このp^iはfully connected network(FCN)を介して特徴空間へ変換され、ここで点特徴fiから情報を集約できる。その後、局所集約特徴f\~を得るためelement-wise MaxPoolingをfiに使う。最後にfiとf\~をPoint-wise concatenated Featureで合体させる。合体させることにより、点ごとの特徴とローカルな特徴を兼ね備えることができる。

  <font color="Orange">要約すると、VFE層はT個以下の点群を含むボクセルを点ごとの特徴とそのボクセル内のローカル特徴を合体させたものを出力してくれるということである。</font>

1. **スパースなTensor表現**  
  空ではないボクセルのリストを作る。図2の様に、ボクセルごとの特徴の次元がCであるとき、スパースな3D tensorはC\*D'\*H'*W'のサイズとなる。基本的に90%のボクセルは空であり、空ではないボクセル特徴をsuper tensorとして扱うことは学習時のメモリ使用率や計算量を減らすことができる。

### **畳み込み中間層**
畳み込み中間層は、3D畳み込みを適応した層である。畳み込み中間層はボクセル単位特徴を集約し、形状記述のためのコンテキストをより多く与える。

### **領域提案ネットワーク**
点群で論文関連リンクの1の領域提案ネットワークを使うためにいくつか変更を加えた。図4にRPNのアーキテクチャを示す(先に論文関連リンクの1の内容を見たほうが良い)。

![fig4](img/VELfPCB3DOD/fig4.png)

### 損失関数  
先に論文関連リンク1のloss functionに目を通したほうが良い。

\{aipos\}i=1...Nposが一組のNpos個の正のアンカー、\{ajneg\}j=1...Nnegが一組のNneg個の負のアンカーであるとする。3Dのground truthボックスをパラメータ化したものを(xcg, ycg, zcg, lg, wg, hg, Θg)とする。xgc, ycg, zcgは中央座標、lg, wg, hgは全長, 幅, 高さ、Θgはzの軸周りのyaw回転である。(ground truthボックスに?)一致する正のアンカー(xca, yca, zca, la, wa, ha, Θa)からground truthボックスを検索するため、残差ベクトルu\*に含まれる7つの回帰値は式(1)のように定義される。

![eq1](img/VELfPCB3DOD/eq1.png)

この時、daはアンカーボックスの底面の対角線である。式(1)では、既存のものと違い3Dボックスを直接評価しながらΔxとΔyをdaで一様に標準化する。

これらより式(2)に損失関数を定義する。

![eq2](img/VELfPCB3DOD/eq2.png)

この時、piposとpjnegはそれぞれaiposとajnegに対するsoftmax出力を表す。また、uiとui*は回帰の出力とaiposに対するground truth(先ほどの残差ベクトル)である。

## どうやって有効だと検証した?



## 議論はある?

## 次に読むべき論文は?
- [S. Ren, K. He, R. Girshick, and J. Sun. Faster r-cnn: Towards real-time object detection with region proposal networks. In Advances in Neural Information Processing Sys-tems 28, pages 91–99. 2015.](https://arxiv.org/abs/1506.01497)

### 論文関連リンク
1. [S. Ren, K. He, R. Girshick, and J. Sun. Faster r-cnn: Towards real-time object detection with region proposal networks. In Advances in Neural Information Processing Sys-tems 28, pages 91–99. 2015.](https://arxiv.org/abs/1506.01497)

### 会議
CVPR 2018

### 著者
Yin Zhou and Oncel Tuzel

### 投稿日付(yyyy/MM/dd)
2017/11/17

## コメント
super tensorの扱いがわからないからなぜ効率が良くなるのかわからない(ただ単に並列処理がしやすいということ?)。損失関数についてはFast R-CNNをちゃんと理解していないため、説明もよくわからず書いている。uiもよくわからない。先に論文関連リンクの1を見ます(2019/02/11)

## key-words
Detection, Point Cloud