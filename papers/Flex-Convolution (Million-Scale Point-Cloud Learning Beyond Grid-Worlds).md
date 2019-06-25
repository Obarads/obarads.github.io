# Flex-Convolution (Million-Scale Point-Cloud Learning Beyond Grid-Worlds)

元の論文の公開ページ : [arxiv](https://arxiv.org/abs/1803.07289)  
Github Issues : [#76](https://github.com/Obarads/obarads.github.io/issues/76)

## どんなもの?
点群処理向けの、複雑な層構造を使用せずにシンプルかつ少量の学習可能パラメータを持つネットワークアーキテクチャを提案した。貢献は以下の通り。

1. 任意の距離空間のための新規の畳み込み層を導入する。これは従来の格子ベースの畳み込み層の一般化を示すものである。
2. 非常に調節されたGPUベースの実装を行い、高速な処理を実現した。
3. 経験的評価により、後処理なしで大規模な点群に対するセグメンテーションの大幅な改善を確認した。小規模のベンチマークでは、より少ないメモリとパラメータだけで競争力のある結果を示した。

## 先行研究と比べてどこがすごいの?

## 技術や手法のキモはどこ? or 提案手法の詳細
局所領域における点の集合に対して畳み込み演算を行う。本手法ではこの畳込み演算に近傍点を用いる。ある位置$\ell$にある点が与えられたとき、$k$NNを使用してその点に近い位置$\mathcal{N}_ {k}(\ell)=\\{\ell_{0}^{\prime}, \ell_ {1}^{\prime}, \ldots, \ell_ {k-1}^{\prime}\\}$の点を集める。式で表すと、式(4)のようになる。

$$
f^{\prime}\left(c^{\prime}, \ell^{(i)}\right)=\sum_{c \in C} \sum_{\ell^{\prime} \in \mathcal{N}_{k}\left(\ell^{(i)}\right)} \tilde{w}\left(c, \ell^{(i)}, \ell^{\prime}\right) \cdot f\left(c, \ell^{\prime}\right) \tag{4}
$$



## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. なし

## 会議
ACCV 2018

## 著者
Fabian Groh, Patrick Wieschollek, Hendrik P.A. Lensch.

## 投稿日付(yyyy/MM/dd)
2018/03/20

## コメント
なし

## key-words
Point_Cloud

## status
未完

## read
A, I, M

## Citation
