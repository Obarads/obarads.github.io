# PointNet: Deep Learning on Point Sets for 3D Classification and Segmentation

元の論文の公開ページ : [arxiv](https://arxiv.org/abs/1612.00593)  
提案モデルの実装 : [charlesq34/pointnet](https://github.com/charlesq34/pointnet)  
Github Issues : [#1](https://github.com/Obarads/obarads.github.io/issues/1)  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。

## どんなもの?
##### 点群を直接入力することが可能な深層学習ネットワーク、PointNetを提案した。
- PointNetは点群を他の表現(ボクセルグリッド表現、collections of images(Multiview)等)へ変換する必要がない。
- 本論文では、点群に対してクラス分類、セマンティックセグメンテーション、パーツセグメンテーション、オブジェクト検出を教師ありで提案している。
- 点群では、点の順不同性と剛体変換されたオブジェクトに対処しなければいけない。PointNetはこれらの問題に対して対処できる様になっている。

![fig1](img/PDLoPSf3CaS/fig1.png)

## 先行研究と比べてどこがすごいの? or 関連事項
##### ネットワークに入力する際に、点群を他の表現へ変換する必要がない。
- 点群に対して機械学習を適応させるには、点群を別の表現や特徴量に変換する必要がある。しかしながら、それらには以下のような問題があると考えられる。
  - hand-crafted特徴
    - 基本的に、点特徴は点の統計的な特性をエンコードし、変換に対して普遍になるように設計されている。一般的に、これらはintrinsicとextrinsicに分類される。
    - しかしながら、これらの特徴を使ってタスクに対する最適な特徴を見つけるのは簡単ではない。
  - Volumetric
    - 点群を体積表現へ変換することで、既存の2D畳み込みを流用して畳み込みが可能になる。
    - しかしながら、体積表現を用いた深層学習はスパース性や計算コストの影響による解像度の制限を強く受ける。スパース性に取り組んだ手法[5,6]もあるが、依然として非常に大きな点群を扱うのは難しい。
  - Multiview
    - 3D点群もしくは3D形状を2D画像へレンダリングし、これに2DCNNを適応する。
    - 分類タスクや検索タスクにおいて高いパフォーマンスを誇るが、他の3Dタスクへの応用が難しいという問題がある。
- 畳み込みネットワークとしては以下の手法がある。
  - Spectral CNNsとFeature-based DNNs[(この記事では省略。)]
- 本提案では、点群を他の表現に変換せずとも処理できるため、他の点群タスクへの応用がしやすいという利点がある。

##### 点群の順不同に対処する。
- Oriol Vinyalsら[7]が順不同な入力に対する処理の提案を行っているが、これはNLPアプリケーションに対するものであり、点群などの幾何学的な性質を持つ集合に対する処理は提示されていない。

## 技術や手法のキモはどこ? or 提案手法の詳細
### 手法の概要
- PointNetの全体像は図2の通り。セマンティックセグメンテーションタスクの場合、途中の層で生成した点ごとの特徴とglobal featureを連結した新しい特徴を使用する。

![fig2](img/PDLoPSf3CaS/fig2.png)

### 工夫
#### Symmetry Function for Unordered Input
##### 順不同な入力である点群に対する処理を行うために、point-wise convolutionとmax poolingを使う。
- 入力する点群は順不同になる可能性があるが、それでも点群が表す表現は変わらないため、最終的なアーキテクチャの出力は変化しないようにしなければいけない。これを定式化すると式(1)の様になる。
- $$ f\left(\left\{x_{1}, \ldots, x_{n}\right\}\right) \approx g\left(h\left(x_{1}\right), \ldots, h\left(x_{n}\right)\right) \tag{1} $$

- $\\{x_ {1}, \ldots, x_ {n}\\}$がある時、順不同な関数$f$は入力内の順序が変化しても出力するものが一緒である。
- そのような関数に近似するような関数を実現するため、PointNetでは入力点群$\\{x_ {1}, \ldots, x_ {n}\\}$にMLP(ここでは点ごとに独立した変換を行うため、point-wise convolutionを使用)$h$を適応し、そこから抽出した入力点ごとの特徴量$h(x)$を**要素ごとの最大値を取るmax pooling**を$g$に入れることで達成する。
- max poolingは対称関数であるため、出力は入力順序の影響を受けない。また、最大プーリング層から出力する特徴をglobal featureとする。

#### Local and Global Information Aggregation
##### セグメンテーションタスクでは、点ごとの特徴とglobal featureを連結する。
- セグメンテーションの場合は点ごとにクラスのラベルを振り分ける必要があり、グローバル特徴量だけでは個々の点に的確なラベルを振り分けられるほどの情報を持てない。
- そこで、MLPが算出した点ごとの特徴量(ローカルな特徴量)とglobal featureを連結した特徴量を用いてセマンティックセグメンテーションを行う。

#### Joint Alignment Network
##### 剛体変換が施されたオブジェクトに対するネットワークを導入する。
- 剛体変換を受けた点群と元の点群の処理結果が同じであるようなアーキテクチャでなければいけない。
- そこでSTN[3]を元としたネットワークであるT-Netを導入する。
- T-Netは点群座標と特徴空間上の特徴に対して適応される(特徴の配置にも効果があるとされる)。
- しかしながら、特徴量が存在する高次元空間では最適化が難しいため、損失関数に式(2)のような正則化項を加える。
- この項は特徴変換行列が直交行列に近づくような役割を持つ。直交変換は入力の情報を失わないためである[?]。
- $$ L_{r e g}=\left\|I-A A^{T}\right\|_{F}^{2} \tag{2} $$

#### Theoretical Analysis
##### [具体的な内容は省略]
- 直感的な結論に言えば、このネットワークは形状を要約するような点を探索できるように学習できるということである。実験でも、グローバル特徴量の抽出に寄与した点を視覚化する実験を行っている。


## どうやって有効だと検証した?
##### 分類問題とセグメンテーションを用いた検証を行った。
- ClassificationはModelNet40、Part SegmentationはShapeNet part data set、Semantic SegmentationはStanford 3D semantic parsing data setを使った。
- オブジェクト検出の実験も行っている。

##### Max poolingによる集約とその他の方法を比較した。
- 本提案で利用している対称関数の有用性を検証するため、対称関数の代わりの処理候補(ソートとRNN)を用いて処理を行った。Poolingもmax、average、attention sumで比較を行っている。

## 議論はある?
##### 省略

## 次に読むべき論文は?
##### あり
- Pointwise Convolutional Neural Networks (このPointNetと同等の結果を示しているため)

## 論文関連リンク
##### あり
1. [Naoya Chiba, 三次元点群を取り扱うニューラルネットワークのサーベイ, (アクセス:2019/05/26)](https://www.slideshare.net/naoyachiba18/ss-120302579)
2. [Fujimoto Keisuke, Point net, (アクセス:2019/05/26)](https://www.slideshare.net/FujimotoKeisuke/point-net)
3. [M. Jaderberg, K. Simonyan, A. Zisserman, et al. Spatial transformer networks. InNIPS 2015.](https://papers.nips.cc/paper/5854-spatial-transformer-networks.pdf)[9]
4. [KYoshiyama, 点群×ディープラーニング【入門】. 2019.](https://qiita.com/KYoshiyama/items/802506ec397559725a1c)
5. [Y. Li, S. Pirk, H. Su, C. R. Qi, and L. J. Guibas. Fpnn: Field probing neural networks for 3d data. arXiv preprint arXiv:1605.06240, 2016.](https://arxiv.org/abs/1605.06240)
6. [D. Z. Wang and I. Posner. Voting for voting in online point cloud object detection. Proceedings of the Robotics: Science and Systems, Rome, Italy, 1317, 2015.](http://www.robots.ox.ac.uk/~mobile/Papers/2015RSS_wang.pdf)
7. [O. Vinyals, S. Bengio, and M. Kudlur. Order matters: Sequence to sequence for sets. arXiv preprint arXiv:1511.06391, 2015.](https://arxiv.org/abs/1511.06391)

## 会議, 論文誌, etc.
##### CVPR 2017

## 著者
##### Charles R. Qi, Hao Su, Kaichun Mo,  Leonidas J. Guibas  

## 投稿日付(yyyy/MM/dd)
##### 2016/12/02

## コメント
##### あり
- CVPR2018では、局所形状を取り込む手法を取り入れたモデルが大量に生まれた。「ローカルな構造」について論文中に出ているが、ローカルな構造=局所形状のイメージが強いせいか、ローカルな構造を言うほど活かしていないように思えた(Segmentationではちゃんと使っているが)。

## key-words
##### Classification, Point_Cloud, Semantic_Segmentation, CV, Paper, 完了, Part_Segmentation, Detection, Implemented

## status
##### 完了

## read
##### A, R, M, E

## Citation
##### 未記入
