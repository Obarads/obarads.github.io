## どんなもの?
Point Cloud(以下点群)に対してClassification、Part Segmentation、Semantic Segmentationを行う教師あり学習PointNetを提案した。入力される点群の以下のような特性があり、これらに対して学習できるモデルを提案する。

- **入力に順序なし**  
画像のようにグリッドに沿った値ではない。つまり、入力値の順序が変化する。ボクセルを使うことで対策できるがこのモデルはそれを使わない。(ボクセル表現は値を離散化させ、本来の不変性を曖昧にする(おそらく離散化した影響で細かい値が消えるせいで出力値にずれが出る)。)

- **ポイント間の相互作用**  
点群中の点は周りの点によって意味を形成する。なので、点からローカルな構造を取得できるようにする必要がある。

- **変換の不変性**  
幾何学的オブジェクトは剛体変換されている可能性がある。回転、平行移動されたオブジェクトであっても結果が変わらないようにしなければならない。

## 先行研究と比べてどこがすごいの?
通常、voxelなどで点群をグリッドに合わせ処理しやすいようにするが、PointNetはそれをせずとも処理を行うことができる上、SOTAに勝るとも劣らない結果を出した。
また、提案したモデルの汎用性が高い(元にCVPR2018にacceptされているモデルのいくつかには、PointNetを使った特徴空間の取得を行っている。)

## 技術や手法のキモはどこ?
以下にこのモデルの工夫を示す。

- **入力に順序がない問題への対策**  
入力の順序の変化に対しても出力は変わらないので  
f({x1, … ,xn}) ≈ g(h(x1), … ,h(xn));  
で定義される。このとき、x1やx2などの順番は変化する。このモデルの場合、hをMLPと畳込み(ただしPointwise convolution)で、gをsingle variable function(単一の値を入れる関数?)とmax pooling関数で近似する。

- **ローカルな特徴とグローバルな特徴の集約**  
セグメンテーションの場合、ローカル&グローバルな特徴が必要になる。そこで、点ごとの特徴とgobal featureを結合することで解決した。

- **剛体変換への対策**  
T-netと呼ばれるアフィン変換の役目を持つネットワークを導入した。T-netも学習可能なネットワークである。
T-netを作るに当たって参考にされたもの→Spatial transformer networks. In NIPS 2015.

## どうやって有効だと検証した?
ClassificationはModelNet40、Part SegmentationはShapeNet part data set、Semantic SegmentationはStanford 3D semantic parsing data setを使った。また、対称関数の有用性を検証するため、対称関数の代わりの処理候補(ソートとRNN)を用いて処理を行った。Poolingもmax、average、attention sumで比較を行っている。

## 議論はある?
局所的な形状情報を取り扱うための仕組みがないので、それをどう取り入れるか改善の余地がある。

## 次に読むべき論文は?
Pointwise Convolutional Neural Networks (このPointNetと同等の結果を示しているため)

### 論文関連リンク
論文:https://arxiv.org/abs/1612.00593  
本家実装(TensorFlow):https://github.com/charlesq34/pointnet  
Chainer実装:https://github.com/corochann/chainer-pointnet  
紹介:http://stanford.edu/~rqi/pointnet/  

### 参考リンク
参考1:https://www.slideshare.net/naoyachiba18/ss-120302579  
参考2:https://www.slideshare.net/FujimotoKeisuke/point-net

### 会議
CVPR2017

### 著者/所属機関
Charles R. Qi, Hao Su, Kaichun Mo,  Leonidas J. Guibas  
Stanford University 
### 投稿日付(yyyy/MM/dd)
2018/11/27

## コメント
CVPR2018では、局所形状を取り込む手法を取り入れたモデルが大量に生まれた。「ローカルな構造」について論文中に出ているが、ローカルな構造=局所形状のイメージが強いせいか、ローカルな構造を言うほど活かしていないように思えた(Segmentationではちゃんと使っているが)。