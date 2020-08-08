# 3DMatch: Learning Local Geometric Descriptors from RGB-D Reconstructions

元の論文の公開ページ : [arxiv](https://arxiv.org/abs/1603.08182)  
提案モデルの実装 : [andyzeng/3dmatch-toolbox](https://github.com/andyzeng/3dmatch-toolbox)  
Github Issues : [#121](https://github.com/Obarads/obarads.github.io/issues/121)  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。

## どんなもの?
##### 不完全3Dデータ間の対応関係を確立するための局所体積領域(local volumetric region)の特徴記述子を学習するモデル、3DMatchを提案した。
- 不完全3Dデータ間の対応関係は図1の通り。[この不完全データとは、部分的にデータの欠損があったり、ノイズを多く含んだりするデータのこと。]
- データの形式はボクセルである。

##### また、既存のRGB-Dの復元物を用いた自己教師あり学習手法も提案する。
- モデルのトレーニングデータを蓄積するために、既存のRGB-D復元物にある数百万の対応ラベルを利用する自己教師有り学習法を提案する。
- 実験より、この学習によって局所マッチングのみならず他のタスクや空間スケールでも扱える汎用的な記述子を生成できる。

![fig1](img/3LLGDfRR/fig1.png)

## 先行研究と比べてどこがすごいの?
##### 深層学習で局所記述子を自動で学習できる。
- 既存の幾何学記述子はヒストグラムを用いた手法が一般的である。しかしながら、これらの手法はノイズ、低解像度と不完全なデータなどをうまく扱うことができていない。
- また、これらの手法は手動で設計されているため、他タスクに転用するにはそれ相応の調節が必要となる。
- 本提案では、与えられたデータから局所3D記述子を自動的に構築し、ロバストかつ良精度な3Dマッチング(Registration)を行う。

##### 不完全なデータに対しても動作する。
- 3D局所記述子を学習する点において著者らの研究に最も近いのは[1]で、これはメッシュラベリングのために局所幾何学特徴をもつ2DConvNet記述子を使う。
  - [つまり、[1]は空間的に畳み込みを行っていない(point-wiseな畳み込みを行っている)であるということか?]
- しかし、このアプローチは合成&完全な3Dデータに対してのみ使え、なおかついかなる種類の空間的相関も持たない連結された特徴ベクトルの入力パッチ上でConvNetを使っている。
- 著者らは不完全なデータを扱い、体積データにおいて空間的に一貫した3D ConvNetsを導入する。

##### 自己教師有り学習手法を用いた記述子の学習ができる。
- 環境に関する高度な推論に使用されている既存のRGB-Dデータは、対応ラベル付きの大規模なソースとして機能するものの、今までそのことについて見落とされていた。
- 既存のRGB-D復元物から対応ラベルと訓練データを自動的に作成する自己教師あり学習手法を提案した。

## 技術や手法のキモはどこ? or 提案手法の詳細
##### 省略

## どうやって有効だと検証した?
##### 省略

## 議論はある?
##### 省略

## 次に読むべき論文は?
##### なし

## 論文関連リンク
##### あり
1. [K. Guo, D. Zou, and X. Chen. 3d mesh labeling via deep convolutional neural networks. ACM Transactions on Graphics (TOG), 35(1):3, 2015.](https://dl.acm.org/citation.cfm?id=2835487)

## 会議
##### CVPR 2017

## 著者
##### Andy Zeng, Shuran Song, Matthias Nießner, Matthew Fisher, Jianxiong Xiao, Thomas Funkhouser

## 投稿日付(yyyy/MM/dd)
##### 2016/03/27

## コメント
##### なし

## key-words
##### Voxel, Self-Supervised_Learning, Registration, CV, Paper, 導入, Implemented

## status
##### 導入

## read
##### A, I, R

## Citation
##### github.comから引用
[リンク](https://github.com/andyzeng/3dmatch-toolbox)
@inproceedings{zeng20163dmatch,
    title={3DMatch: Learning Local Geometric Descriptors from RGB-D Reconstructions},
    author={Zeng, Andy and Song, Shuran and Nie{\ss}ner, Matthias and Fisher, Matthew and Xiao, Jianxiong and
            Funkhouser, Thomas},
    booktitle={CVPR},
    year={2017}
}