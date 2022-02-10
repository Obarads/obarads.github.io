# Know What Your Neighbors Do: 3D Semantic Segmentation of Point Clouds

元の論文の公開ページ : [arxiv.org](https://arxiv.org/abs/1810.01151)  
提案モデルの実装 : [2020/08/09:なし]()  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。  
Note: 引用中の[*]は論文内の文献番号である。該当する論文は、論文関連リンクの各リストの末尾に基づいて調べられる。

## どんなもの?
##### 点群に対して近傍畳み込みと、距離学習手法の提案を行った。
- モジュールに関しては、以下を提案した。
  - Feature Networks: N個の点を入力し、$N\times F$特徴を出力する。
  - $\mathcal{N}_F$-module: 特徴空間上でkNNを取り、点とその近傍に対してMLPとmax-poolingを適応し、$N \times F$個の特徴量を得る。
  - $\mathcal{N}_W$-module: 3D空間上の特徴などを用いてK-means clustringを行う(※下のNote参照)。この際に使うのはpositionやcolorなどの特徴である。K-means clustringで得られるグループごとに特徴の平均値を求める。プーリング操作として扱っている。
- 損失関数に関しては以下の通り。
  - Pairwise Similarity Lossを設けた。これは、$\mathcal{N}_F$-moduleを連続して使用している最中に使用する。
  - Centroid lossを設けた。これは、モデルの最後の出力に対して使用する。

##### Note
- [Feature Networkには近傍情報を集約する機能がない。]
- [$\mathcal{N}_F$-moduleは特徴空間上でkNNを使用し、その近傍を利用した畳み込みを行う。]
  - [畳み込みモジュールの提案はPointNet++と比較している。特徴空間上のkNNはDGCNNと同じだが、特に言及なし。]
- [$\mathcal{N}_W$-moduleはK-means clustringでグループを得る際に、$\mathcal{N}_F$-moduleで生成した特徴は利用していないのかなと思ったら、多分利用してた。]
  - " In this context, the world space corresponds to the features of the input point cloud, such as position and color."
  - "We then feed these features into three stacked NF-modules. The subsequent NW-module computes a regional descriptors for each cluster (based on world space with descriptors form the feature space)."
- [Pairwise Similarity lossは、特徴空間上の近傍に対して、同じラベルに属する特徴が近づき、別のラベルの特徴を離す損失。]
- [Centroid lossは同じラベルの特徴の平均値を求めて、その平均値へ同じラベルの特徴が近づくようにするもの。]

## 先行研究と比べてどこがすごいの? or 関連事項
##### 省略

## 技術や手法のキモはどこ? or 提案手法の詳細
##### 省略

## どうやって有効だと検証した?
##### S3DISとScanNet、VKITTI3Dを使用して検証した。
- S3DISに関してはSPGが一人勝ちしていた。
- ScanNetはPointNet++との比較で優位な結果を残した。
- VKITTI3Dでも優位性を確認(比較対象は2つ)。
  - 定性的評価では、色を入力に利用した際にTerrainラベルがかなり割り当てられることがあった。

## 議論はある?
##### 省略

## 次に読むべき論文は?
##### なし

## 論文関連リンク
##### なし
1. [なし]()[1]

## 会議, 論文誌, etc.
##### ECCV 2018 WS

## 著者
##### Francis Engelmann, Theodora Kontogianni, Jonas Schult, Bastian Leibe

## 投稿日付(yyyy/MM/dd)
##### 2018/10/09

## コメント
##### なし

## key-words
##### CV, Paper, Point_Cloud, Semantic_Segmentation, 省略

## status
##### 省略

## read
##### A, I, M, E

## Citation
##### 未記入
