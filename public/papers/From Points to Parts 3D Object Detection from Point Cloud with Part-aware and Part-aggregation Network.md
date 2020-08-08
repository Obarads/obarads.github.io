# From Points to Parts: 3D Object Detection from Point Cloud with Part-aware and Part-aggregation Network

元の論文の公開ページ : [arxiv.org](https://arxiv.org/abs/1907.03670)  
提案モデルの実装 : [sshaoshuai/PCDet](https://github.com/sshaoshuai/PCDet)  
Github Issues : []()  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。  
Note: 引用中の[*]は論文内の文献番号である。該当する論文は、論文関連リンクの各リストの末尾に基づいて調べられる。

## どんなもの?
##### 新しい3Dオブジェクト検出モデル、Part-$A^2$Netを提案した。
- 貢献は以下の通り。
  - "(1) We proposed the Part-A 2 net framework for 3D object detection from point cloud, which boosts the 3D detection perfor-mance by using the free-of-charge intra-object part information to learning discriminative 3D features and by effectively aggregating the part features with RoI-aware pooling and sparse convolutions."
  - "(2)  We present two strategies for 3D proposal generation to handle different scenarios. The anchor-free strategy is more memory efficient while the anchor-based strategy results in higher object recall."
  - "(3) We propose a differentiable RoI-aware point cloud region pooling operation to eliminate the ambiguity in existing point cloud region pooling operations. The experiments show that the pooled feature representation benefits box refinement stage significantly."
  - "(4) Our proposed Part-A 2 net outperforms all published methods with remarkable margins and ranks 1 st with 14 FPS inference speed on the challenging KITTI 3D detection benchmark [33] as of August 15, 2019, which demonstrates the effectiveness of our method. "
- [いろいろ省略]

##### 実験では、車上からの点群オブジェクト検出ベンチマークを行った。
- 使用したデータセットはKITTIを使った3D detection benchmark。

## 先行研究と比べてどこがすごいの? or 関連事項
##### 省略

## 技術や手法のキモはどこ? or 提案手法の詳細
##### 省略

## どうやって有効だと検証した?
##### 省略

## 議論はある?
##### 省略

## 次に読むべき論文は?
##### なし

## 論文関連リンク
##### なし
1. [なし]()[1]

## 会議, 論文誌, etc.
##### T-PAMI 2020

## 著者
##### Shaoshuai Shi, Zhe Wang, Jianping Shi, Xiaogang Wang, Hongsheng Li

## 投稿日付(yyyy/MM/dd)
##### 2019/07/08

## コメント
##### なし

## key-words
##### Paper, CV, Point_Cloud, Voxel, Detection, 導入, Implemented

## status
##### 導入

## read
##### なし

## Citation
##### 未記入
