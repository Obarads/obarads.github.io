# Complex-YOLO: An Euler-Region-Proposal for Real-time 3D Object Detection on Point Clouds

元の論文の公開ページ : [arxiv.org](https://arxiv.org/abs/1803.06199)  
提案モデルの実装 : [AI-liu/Complex-YOLO](https://github.com/AI-liu/Complex-YOLO)  
Github Issues : []()  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。

## どんなもの?
##### 車載LiDARからの点群を取得して3Dバウンディングボックスと向きを推定するYOLOv2ベースの検出モデル、Complex-YOLOを提案した。
- 直角座標空間内に3Dバウンディングボックスと向きを推定するためのspecifc complex regression strategyをYOLOv2に導入する。
- 導入に際して、Euler-Region-Proposal Network (E-RPN)というオブジェクトのポーズを推定するネットワークを組み込む。

##### KITTIを使用してベンチマークを行い、効率の点で他の手法よりも優れていることを示す。
- 他の手法の5倍以上の高速化と他の手法と競合する程の精度を持つ。
- Nvidia TitanX gpuを使った計測では、50fpsよりも早い処理速度を持つ。

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
##### なし

## 著者
##### Martin Simon, Stefan Milz, Karl Amende, Horst-Michael Gross

## 投稿日付(yyyy/MM/dd)
##### 2018/03/16

## コメント
##### あり
- AとIのCont.を見た。

## key-words
##### Paper, CV, Point_Cloud, Detection, 導入, Implemented

## status
##### 導入

## read
##### A

## Citation
##### 未記入
