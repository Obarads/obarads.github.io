# Fully Convolutional Instance-aware Semantic Segmentation

元の論文の公開ページ : [arxiv](https://arxiv.org/abs/1611.07709)  
Github Issues : [#78](https://github.com/Obarads/obarads.github.io/issues/78)

## どんなもの?
初めてinstance-aware semantic segmentation taskのためのfully convolutional end-to-endモデルを提案した。
- このアプローチはセマンティックセグメンテーション[1]とマスク提案[2]のメリットをすべて引き継ぐ。
- オブジェクトインスタンスに対して検出とセグメントを同時かつ共同で行う。
    - position-senstive inside/outside score mapsの導入により、畳み込み表現が2つのサブタスク間と全region of interest間で完全に共有される。

## 先行研究と比べてどこがすごいの?

## 技術や手法のキモはどこ? or 提案手法の詳細

## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- [なし]()[]

## 論文関連リンク
1. [J. Long, E. Shelhamer, and T. Darrell. Fully convolutional networks for semantic segmentation. In CVPR, 2015.](https://arxiv.org/pdf/1605.06211.pdf)[29]
2. [J. Dai, K. He, Y. Li, S. Ren, and J. Sun. Instance-sensitive fully convolutional networks. InECCV, 2016.](https://arxiv.org/abs/1603.08678)[5]

## 会議
CVPR 2017

## 著者
Yi Li, Haozhi Qi, Jifeng Dai, Xiangyang Ji, Yichen Wei.

## 投稿日付(yyyy/MM/dd)
2016/11/23

## コメント
なし

## key-words
RGB_Image, Instance_Segmentation, CV, Paper

## read
A

## status
導入