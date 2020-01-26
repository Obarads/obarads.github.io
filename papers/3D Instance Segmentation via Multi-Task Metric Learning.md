# 3D Instance Segmentation via Multi-Task Metric Learning

元の論文の公開ページ : [openaccess.thecvf.com](http://openaccess.thecvf.com/content_ICCV_2019/papers/Lahoud_3D_Instance_Segmentation_via_Multi-Task_Metric_Learning_ICCV_2019_paper.pdf)  
提案モデルの実装 : [2020/01/05:なし]()  
Github Issues : []()  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。

## どんなもの?
##### マルチタスク学習戦略を用いてボクセルに3Dインスタンスラベルを振り分けるモデルを提案した。
- この論文では2つの目標を置いている。
  - 1つめの目標は同じインスタンスラベルを持つボクセルの特徴を近く、異なるインスタンスラベルを持つボクセルの特徴を離すようにする抽象的な埋め込みを学習すること。
  - 2つめの目標は各ボクセルのインスタンスの重心の方向情報[(?)]を推定することで、インスタンス情報を学習すること。

##### ScanNet 3DインスタンスセグメンテーションのベンチマークでSOTAを達成した。
- 特になし。

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
##### ICCV 2019 Oral

## 著者
##### Jean Lahoud, Bernard Ghanem, Marc Pollefeys, Martin R. Oswald

## 投稿日付(yyyy/MM/dd)
##### 2019/06/20

## コメント
##### あり
- 読んだのはAのみ
- メトリック学習中心の論文。重心というのは、特徴空間内の重心への方向推定か、それともオブジェクト重心への方向推定か?

## key-words
##### Paper, CV, Voxel, Instance_Segmentation, 導入

## status
##### 導入

## read
##### A

## Citation
##### 未記入
