# Disp R-CNN: Stereo 3D Object Detection via Shape Prior Guided Instance Disparity Estimation

元の論文の公開ページ : [arxiv.org](https://arxiv.org/abs/2004.03572)  
提案モデルの実装 : [zju3dv/disprcnn](https://github.com/zju3dv/disprcnn)  
Github Issues : []()  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。  
Note: 引用中の[*]は論文内の文献番号である。該当する論文は、論文関連リンクの各リストの末尾に基づいて調べられる。

## どんなもの?
##### ステレオ画像から3Dオブジェクト検出のための手法、Disp R-CNNを提案した。
- この手法では、関心あるオブジェクトのピクセルのみ視差を予測し、より正確な視差推定のためのカテゴリ固有の形状事前知識を学習する視差推定ネットワーク、iDispNetを導入している。
  - この手法により、わざわざ視差マップを画像全体で作る必要がなくなる。

##### 訓練データの視差アノテーション不足を解消するため、疑似GTを生成する方法を提案する。
- この方法では、LiDAR点群を必要としない。

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
##### CVPR 2020

## 著者
##### Jiaming Sun, Linghao Chen, Yiming Xie, Siyu Zhang, Qinhong Jiang, Xiaowei Zhou, Hujun Bao

## 投稿日付(yyyy/MM/dd)
##### 2020/04/07

## コメント
##### なし

## key-words
##### CV, Paper, 導入, Detection, RGB_Image, Implemented

## status
##### 導入

## read
##### A, I

## Citation
##### 未記入
