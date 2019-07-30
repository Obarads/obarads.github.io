# PointRCNN: 3D Object Proposal Generation and Detection from Point Cloud

元の論文の公開ページ : [arxiv](https://arxiv.org/abs/1812.04244)
Github Issues : [#96](https://github.com/Obarads/obarads.github.io/issues/96)

## どんなもの?
2つのステージで構成される検知フレームワークPointRCNNを提案した。入力として点群を受け取る。

## 先行研究と比べてどこがすごいの?


## 技術や手法のキモはどこ? or 提案手法の詳細

![fig2](img/P3OPGaDfPC/fig2.png)

#### Foreground point segmentation
前景点から直接3Dボックス提案を生成する、すなわち、前景セグメンテーションと3Dボックス提案生成が同時に行われるようなボトムアップ3D提案生成方法を設計する。

エンコードされた点ごとの特徴が与えられた時、前景マスク推定のための一つのセグメンテーションヘッドと3D提案生成のための一つのボックス回帰ヘッドを追加する(ここで出てくるHeadは[1]で説明しているもの?[1]のものであるなら、このヘッドというのはそれらの予測器ということになる)。ポイントセグメンテーションのためのground-truthセグメンテーションマスクは3D ground-truthボックスから提供される。

#### Bin-based 3D bounding box generation
訓練中、前景点から3Dバウンディングボックスを回帰するためにボックス回帰ヘッドのみを必要とする。背景点は回帰されないが、ボックス生成のための補助的な情報を提供する。

3Dバウンディングボックスは$(x, y, z, h, w, l, \theta)$として表現される。ここで、$(x, y, z)$はオブジェクトの中心座標、$(h, w, l)$はオブジェクトサイズ(ボックスサイズ)、$\theta$は鳥瞰図から見たオブジェクトの向きを示す。

図3に示すように、各前景点はX軸とZ軸に沿ったbinに分けられる。

## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. [shtamura, 物体検出、セグメンテーションをMask R-CNNで理解してみる (初心者). (アクセス:2019/05/14)](https://qiita.com/shtamura/items/4283c851bc3d9721ed96)

## 会議
CVPR 2019

## 著者
Shaoshuai Shi, Xiaogang Wang, Hongsheng Li

## 投稿日付(yyyy/MM/dd)
2018/12/11

## コメント
なし

## key-words
Point_Cloud, Detection, CV

## status
未完