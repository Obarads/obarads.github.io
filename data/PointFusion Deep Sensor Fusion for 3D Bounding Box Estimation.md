# PointFusion: Deep Sensor Fusion for 3D Bounding Box Estimation

元の論文の公開ページ : [openaccess.thecvf.com](http://openaccess.thecvf.com/content_cvpr_2018/papers/Xu_PointFusion_Deep_Sensor_CVPR_2018_paper.pdf)  
提案モデルの実装 : [malavikabindhi/CS230-PointFusion](https://github.com/malavikabindhi/CS230-PointFusion)  
Github Issues : []()  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。

## どんなもの?
##### PointNetとResNetを用いた3Dバウンディングボックス予測を行う手法、PointFusionを提案した。
- PointNetとResNet(RGB画像用)によって出力される特は、融合特徴(fusion feature)として3Dバウンディングボックスの予測と信頼スコアの予測に使われる。
  - 提案手法は図1の通り。
  - [損失などの方は見ていない。]

##### KITTIデータセットとSUN-RGBDデータセットを利用して測定した。
- SOTAな結果を出した。

![fig1](img/PDSFf3BBE/fig1.png)

## 先行研究と比べてどこがすごいの? or 関連事項
##### 省略

## 技術や手法のキモはどこ? or 提案手法の詳細
##### 省略

## どうやって有効だと検証した?
##### 省略

## 議論はある?
##### 2D検出器と3D検出器を組み合わせて、ストリームを用いた物体追跡などができるだろう。

## 次に読むべき論文は?
##### なし

## 論文関連リンク
##### なし
1. [なし]()[1]

## 会議, 論文誌, etc.
##### CVPR 2018

## 著者
##### Danfei Xu, Dragomir Anguelov, Ashesh Jain.

## 投稿日付(yyyy/MM/dd)
##### 2017/11/29

## コメント
##### なし

## key-words
##### Paper, CV, Point_Cloud, Detection, 導入, RGB_Image, Sensor_Fusion

## status
##### 導入

## read
##### A, C

## Citation
##### 未記入
