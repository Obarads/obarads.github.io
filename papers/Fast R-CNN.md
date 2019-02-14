# Fast R-CNN

## どんなもの?
深層畳み込みネットワークを使ったオブジェクト検出用のフレームワークであるFast R-CNNを提案した。

## 先行研究と比べてどこがすごいの?
簡単に言えば、より正確に、より早く動作するようになった。

R-CNN(論文関連リンクの1)では以下の点が問題となっている。

1. 多数の段階に分かれた訓練
2. 訓練の時間と容量を必要とする訓練
3. オブジェクト検知が遅い。

R-CNNが遅い理由としてそれぞれのオブジェクト提案のためにConvNetのforward処理を計算共有なしで行っている。SSPnetsはその点を解決している。しかし、多段階訓練や空間ピラミッドプーリングを処置する畳み込み層の更新不可など問題点を抱えている。対して、Fast R-CNNは以下の優位性がある。

1. より正確な検知能力(mAP)を持つ
2. マルチタスク損失により訓練が1段階のみになった
3. 全てのネットワーク層を更新可能
4. 要求される容量の低減

## 技術や手法のキモはどこ?


## 提案の内容は?

Fast R-CNNのモデルは図1の通り。Fast R-CNNは入力として全ての画像と物体提案のセットを取る。ネットワークは畳み込みと畳み込み特徴マップを生成するためのmax pooling層が組み込まれており、これらですべての画像を処理する。次に、それぞれのオブジェクト提案region of interest(RoI)プーリング層が特徴マップから固定長の特徴ベクトルを抽出する。この各特徴ベクトルは二つのFCレイヤに渡される: Kクラス+背景クラスの確率を算出するsoftmaxと各Kオブジェクトクラスに対する実際の値を出力する。各4つの値のセットはKクラスのうちの一つに対して洗練された境界ボックスの位置を符号化する。

![fig1](img/FR/fig1.png)

### The RoI pooling layer

RoI pooling layerはmax poolingを使って任意の領域内の特徴をH*Wの固定サイズの小さな特徴マップに変換する。HとWは特定のRoIから独立したハイパーパラメータである(どういうこと?)。RoIは左上の隅からの位置を表すr,cと、高さと幅を表すh,wによって定義される。



## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
-
-

### 論文関連リンク
1. [R. Girshick, J. Donahue, T. Darrell, and J. Malik. Rich fea-ture hierarchies for accurate object detection and semantic segmentation. InCVPR, 2014.](https://arxiv.org/abs/1311.2524)
2. [K. He, X. Zhang, S. Ren, and J. Sun. Spatial pyramid pooling in deep convolutional networks for visual recognition. In ECCV, 2014.](https://arxiv.org/abs/1406.4729)

### 会議
ICCV 2015

### 著者
Ross Girshick

### 投稿日付(yyyy/MM/dd)
2015/04/30

## コメント
