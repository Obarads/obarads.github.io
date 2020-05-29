# Hierarchical Point-Edge Interaction Network for Point Cloud Semantic Segmentation

元の論文の公開ページ : [openaccess.thecvf.com](http://openaccess.thecvf.com/content_ICCV_2019/papers/Jiang_Hierarchical_Point-Edge_Interaction_Network_for_Point_Cloud_Semantic_Segmentation_ICCV_2019_paper.pdf)  
提案モデルの実装 : [2020/1/5:なし]()  
Github Issues : []()  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。
Note: 引用中の[*]は論文内の文献番号である。該当する論文は、論文関連リンクの各リストの末尾に基づいて調べられる。

## どんなもの?
##### 局所領域内の点間の意味関係を利用するために、点とcontextual neighborsの間にエッジを明示的に構築するモデルを提案した。
- decoding時に、点の情報を処理するPoint Branchとローカルコンテキスト情報を処理するEdge Branchを提案した。
  - ローカルコンテキスト情報は、点の近傍点から得られるエッジを扱ったもの。
- 損失も、Point branchとEdge branchのそれぞれから取得する。
  - Edge branchの損失は、二点間のセマンティックな一貫性を保つように学習される。
    - [セマンティックな一貫性は、2点間のセマンティックラベルの一致もしくは不一致から求める。]

##### 室内点群データセットを用いてベンチマークを行った。
- 使用したデータセットは以下の通り。
  - S3DIS
  - ScanNet

![fig1](img/HPINfPCSS/fig1.png)

## 先行研究と比べてどこがすごいの? or 関連事項
##### 省略

## 技術や手法のキモはどこ? or 提案手法の詳細
### 手法の概要
- 手法の概要は図2の通り。

![fig2](img/HPINfPCSS/fig2.png)

##### 1. PointNet++を模したEncoderを用いて点特徴量を取得する。
- 図を見ての通り、このとき特徴量のskip connectionも付属する。
- このPointNet++を模したネットワークはPoint Branchと呼ばれ、これはEncoding stageとDecoding stageによって構成されている。

##### 2. Encoding stageで得られた点の特徴量に基づいて、Edge BranchとPoint Branchによるセグメンテーション予測を行う。
- これらのBranchは、それぞれ別の損失を持っている。
- 詳細は工夫のedge branchとpoint branchを参照。

### 工夫
#### Edge Branch
##### 層の深度と点の数は比例する構造になっている。
- 層と点の関係は以下の通り。
- $N$個の点$\mathcal{P}=\{p_{1}, p_{2}, \ldots, p_{N}\}$を持つ点群が与えられる場合、有向グラフ$G=(V,E)$を構築する。
  - このとき、$V=\mathcal{P}$であり、$E$は点ごとにcontextual pointsを接続したエッジを示す。
- $G$はcoarse to fine的に、段階的[(層ごと)]に構築される。
- ここで、層$L$のグラフを$G_ L$と示す。
- $L$が大きいほど点の数が多い層となるため、層0が最も粗い層であり点が最も少ない。

#### Point Branch


- 図2は提案手法の概要図。本提案はPointNet++のようなencoder-decoder構造モデルを持つPoint Branch(図2の水色部分)と、Edge Branch(図2の黄色部分)からなる。
  - Edge Brachは違う層から点特徴(Point feature)を受け取って階層的にエッジ特徴(edge feature)を生成していく。
  - その後、局所グラフの情報を統合するために、Point branchへエッジ特徴を供給する。
- 各点に対して、対応するエッジ特徴が局所的な幾何学及び意味的な情報を提供して、点の表現を強化する。


## どうやって有効だと検証した?
##### 省略

## 議論はある?
##### 遠距離および近距離のコンテキスト情報を集計したマルチレンジ対応のものを開発するだろう。

## 次に読むべき論文は?
##### なし

## 論文関連リンク
##### なし
1. [なし]()[1]

## 会議, 論文誌, etc.
##### ICCV 2019

## 著者
##### Li Jiang, Hengshuang Zhao, Shu Liu, Xiaoyong Shen, Chi-Wing Fu, Jiaya Jia

## 投稿日付(yyyy/MM/dd)
##### 2019/09/23

## コメント
##### あり
- AとC、Iのcontributeをざっと確認

## key-words
##### Paper, CV, Point_Cloud, Semantic_Segmentation, 導入, Graph

## status
##### 導入

## read
##### A, I, C

## Citation
##### 未記入
