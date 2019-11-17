# Learning Object Bounding Boxes for 3D Instance Segmentation on Point Clouds

元の論文の公開ページ : [arxiv.org](https://arxiv.org/abs/1906.01140v2)  
Github Issues : []()  

## どんなもの?
3D点群のためのインスタンスセグメンテーションのためのフレームワーク、3D-BoNetを提案した。
- 提案手法では、各インスタンスごとに3Dバウンディングボックスの回帰と点レベルのマスクの予測を同時に行う(シングルステージのモデル, 同種としてYOLOなど)。
- また、アンカーなし(提案フリー)、End-to-Endで訓練可能である。
- さらに、事後処理ステップを必要としない。後処理ステップとしてはnon-maximum suppression, feature sampling, clustering or votingなど。これらが必要ないのでより効率的にモデルを運用できる。
- 貢献は以下の通り。
    - 新規の3Dインスタンスセグメンテーションモデルを提案した。このフレームワークはシングルステージ、アンカーフリー、end-to-endな訓練を可能とする。また、事後処理を必要としない。
    - box prediction branchを教師あり学習させるためのmulti-criteria損失関数を提案する。
    - ベースラインよりも優れた性能を実証する。

## 先行研究と比べてどこがすごいの? or 関連事項

## 技術や手法のキモはどこ? or 提案手法の詳細

## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. なし

## 会議, 論文誌, etc.
NeurlPS 2019

## 著者
Bo Yang, Jianan Wang, Ronald Clark, Qingyong Hu, Sen Wang, Andrew Markham, Niki Trigoni

## 投稿日付(yyyy/MM/dd)
2019/09/05

## コメント
なし

## key-words
Paper, CV, Point_Cloud, Instance_Segmentation

## status
未完

## read

## Citation
