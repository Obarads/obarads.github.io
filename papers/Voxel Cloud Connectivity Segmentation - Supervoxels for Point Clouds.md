# Voxel Cloud Connectivity Segmentation - Supervoxels for Point Clouds

元の論文の公開ページ : [cv-foundation.org](https://www.cv-foundation.org/openaccess/content_cvpr_2013/papers/Papon_Voxel_Cloud_Connectivity_2013_CVPR_paper.pdf)  
Github Issues : 

## どんなもの?
3D空間に対する新規のSupervoxel手法を提案した。

## 先行研究と比べてどこがすごいの?
- Depth-Adaptive Superpixel(DASP)[1]はSLICのアイデアを深度にまで拡張しているが、3次元的な接続やgeometric flowを明示的に考慮していないため、RGB-Dデータのアドバンテージを十分に扱えていない。
    - 本提案では、画像としてではなく3D空間上で幾何学的な処理を行う。
    - [これについては違いをあまり明確に言っていないように思える]
- 既存のSupervoxelは2Dアルゴリズムを3D体積に単純に拡張したものであり、その対象もビデオ(h,w,timeの3次元)に対するものである。
    - 本提案では、3D空間のセグメントを目的としており、その空間には空の空間が多く含まれているため、既存の手法は使えない。
    - [既存の方法を見ないと理解が進まない部分がある。]

## 技術や手法のキモはどこ? or 提案手法の詳細

## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. [D. Weikersdorfer, D. Gossow, and M. Beetz. Depth-adaptive superpixels. InPattern Recognition (ICPR), 2012 21st Inter-national Conference on, pages 2087–2090, 2012.](https://vision.in.tum.de/_media/teaching/ss2015/gpucourse_ss2015/dasp_slides.pdf)

## 会議, 論文誌
CVPR 2013

## 著者
Jeremie Papon, Alexey Abramov, Markus Schoeler

## 投稿日付(yyyy/MM/dd)
2013/??/??

## コメント
なし

## key-words
Point_Cloud, Supervoxel, CV, Paper, 修正

## status
修正

## read
A, I, R

## Citation
