# Learning Loss for Active Learning

元の論文の公開ページ : [arxiv.org](https://arxiv.org/abs/1905.03677)  
提案モデルの実装 : [非公式:Mephisto405/Learning-Loss-for-Active-Learning](https://github.com/Mephisto405/Learning-Loss-for-Active-Learning)  
Github Issues : []()  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。

## どんなもの?
##### タスクにとらわれないアクティブラーニング手法を提案する。
- 提案するモジュールでは、loss prediction module(損失予測モジュール)を提案する。これは、ラベル付されていない入力データに対するネットワークの損失を予測するものである。
- このモジュールはタスクに依存せず、実験でも様々なタスクに対してこのモジュールの優位性を示した。

##### 実験は画像分類、オブジェクト検出、人の姿勢推定のタスクに対して行った。
- 画像分類: CIFAR-10
- オブジェクト検出: PASCAL VOC 2007と2012
- 人の姿勢推定: MPII dataset

## 先行研究と比べてどこがすごいの? or 関連事項
##### タスク固有の設計を必要としない、アクティブラーニング手法を提案した。
- 既存のアクティブラーニング手法の大部分は、タスク固有の設計を必要としてしている。
- 本提案では、近年のディープラーニングのあらゆるタスクに直接利用可能な損失予測モジュールを提案した。

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
##### CVPR 2019

## 著者
##### Donggeun Yoo, In So Kweon

## 投稿日付(yyyy/MM/dd)
##### 2019/05/09

## コメント
##### あり
- 比較について、もしかしたらネットワークの構造に対する優位性の言及もあるかも。
- 実験は項とその冒頭を参照したのみ。

## key-words
##### CV, Paper, Active_Learning, 導入, Detection, Classification, Pose_Estimation, RGB_Image, Implemented

## status
##### 導入

## read
##### A, I

## Citation
##### 未記入
