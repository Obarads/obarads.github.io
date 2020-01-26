# Classifying Signals on Irregular Domains via Convolutional Cluster Pooling

元の論文の公開ページ : [arxiv](https://arxiv.org/abs/1902.04850)  
提案モデルの実装 : []()  
Github Issues : [#119](https://github.com/Obarads/obarads.github.io/issues/119)

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。

## どんなもの?
##### Convolutional Cluster Pooling layerの導入をした。
- これは入力グラフ上の局所接続領域を異なる解像度で強調するためにマルチスケールクラスタリングを活用する。

## 先行研究と比べてどこがすごいの?
##### 省略

## 技術や手法のキモはどこ? or 提案手法の詳細
提案するConvolutional Cluster Pool-ing (CCP)層を使ったアーキテクチャは図1の通り。この層は以下の処理を行う。

1. 入力グラフをクラスタリング演算を実行する。
2. 1で得られた結果をもとに各クラスタに対して固定数の固定ノードを選択し、クラスタ内のcentrality-based rankでノードをソートする。

![fig1](img/CSoIDvCCP/fig1.png)

### Hierarchical Graph Clustering
##### 以降未読

## どうやって有効だと検証した?
##### 省略

## 議論はある?
##### 省略

## 次に読むべき論文は?
##### なし

## 論文関連リンク
##### なし

## 会議
##### International Conference on Artificial Intelligence and Statistics (AISTATS) 2019

## 著者
##### Angelo Porrello, Davide Abati, Simone Calderara, and Rita Cucchiara

## 投稿日付(yyyy/MM/dd)
##### 2019/02/13

## コメント
##### なし

## key-words
##### RGB_Image, Classification, CV, Paper, 未完, 旧版

## status
##### 未完

## read
##### A, I

## Citation
##### arxiv.orgより引用
[リンク](https://arxiv.org/abs/1902.04850)  
@misc{porrello2019classifying,
    title={Classifying Signals on Irregular Domains via Convolutional Cluster Pooling},
    author={Angelo Porrello and Davide Abati and Simone Calderara and Rita Cucchiara},
    year={2019},
    eprint={1902.04850},
    archivePrefix={arXiv},
    primaryClass={cs.LG}
}