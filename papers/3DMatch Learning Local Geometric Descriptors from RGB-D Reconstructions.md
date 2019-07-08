# 3DMatch: Learning Local Geometric Descriptors from RGB-D Reconstructions

元の論文の公開ページ : [arxiv](https://arxiv.org/abs/1603.08182)  
Github Issues : [#121](https://github.com/Obarads/obarads.github.io/issues/121)

## どんなもの?
不完全3Dデータ間の対応関係(図1)を確立するための局所体積領域(local volumetric region)の特徴記述子を学習するモデル、3DMatchを提案した。また、既存のRGB-Dの復元物を用いた自己教師あり学習手法も提案する。

![fig1](img/3LLGDfRR/fig1.png)

## 先行研究と比べてどこがすごいの?
既存の幾何学記述子はヒストグラムを用いた手法が一般的である。しかしながら、これらの手法はノイズ、低解像度と不完全なデータなどをうまく扱うことができていない。また、これらの手法は手動で設計されているため、他タスクに転用するにはそれ相応の調節が必要となる。本提案では、与えられたデータから局所3D記述子を自動的に構築し、ロバストかつ良精度な3Dマッチング(Registration)を行う。

3D局所記述子を学習する点において著者らの研究に最も近いのは[1]で、これはメッシュラベリングのために局所幾何学特徴をもつ2DConvNet記述子を使う。しかし、このアプローチは合成&完全な3Dデータに対してのみ使え、なおかついかなる種類の空間的相関も持たない連結された特徴ベクトルの入力パッチ上でConvNetを使っている。著者らは不完全なデータを扱い、体積データにおいて空間的に一貫した3D ConvNetsを導入する。

また、既存のRGB-D復元物から対応ラベルと訓練データを自動的に作成する自己教師あり学習手法を提案した。

[※ つまり、[1]は空間的に畳み込みを行っていない(point-wiseな畳み込みを行っている)であるということか?]

## 技術や手法のキモはどこ? or 提案手法の詳細

## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. [K. Guo, D. Zou, and X. Chen. 3d mesh labeling via deep convolutional neural networks. ACM Transactions on Graphics (TOG), 35(1):3, 2015.](https://dl.acm.org/citation.cfm?id=2835487)

## 会議
CVPR 2017

## 著者
Andy Zeng, Shuran Song, Matthias Nießner, Matthew Fisher, Jianxiong Xiao, Thomas Funkhouser

## 投稿日付(yyyy/MM/dd)
2016/03/27

## コメント
なし

## key-words
Voxel, Self-Supervised_Learning, Registration

## status
導入

## read
A, I, R

## Citation
