# Unsupervised Object Segmentation in Video by Efficient Selection of Highly Probable Positive Features

元の論文の公開ページ : [CVF](http://openaccess.thecvf.com/content_ICCV_2017/papers/Haller_Unsupervised_Object_Segmentation_ICCV_2017_paper.pdf)  
Github Issues : 

## どんなもの?
ラベル付されていない2Dビデオを使ってオブジェクトのソフトセグメンテーションとバウンディングボックスを出力する教師なし手法を提案した。また、提案手法は競合する研究よりも少なくとも10倍早く処理する(計算効率が良い)。想定している検知対象は単体の目立つオブジェクトであり、目立つオブジェクトがない or 目立つオブジェクトが複数ある場合は正しく動作しない。

## 先行研究と比べてどこがすごいの?

## 技術や手法のキモはどこ? or 提案手法の詳細
提案手法のステップは以下の7つに分けられる。

1. 主成分分析(PCA)を用いて元のフレームとサブスペース(?)に投影されたフレーム間の差異に基づいて、ほぼ確実な前景ピクセルを選ぶ。
2. 

## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. なし

## 会議
ICCV 2017

## 著者
Emanuela Haller and Marius Leordeanu.

## 投稿日付(yyyy/MM/dd)
2017/12/25

## コメント
なし

## key-words
2D_Image

## status
未完

## BibTex
