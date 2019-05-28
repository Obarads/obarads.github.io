# Dynamic Edge-Conditioned Filters in Convolutional Neural Networks on Graphs

元の論文の公開ページ : https://arxiv.org/abs/1704.02901
Github Issues : 

## どんなもの?
グラフ上の各頂点(点)の近傍の頂点を重み付け集約して畳み込むEdge-Conditioned Convolution(ECC)を提案した。要はグラフ表現におけるCNNのようなもの。

## 先行研究と比べてどこがすごいの?

## 技術や手法のキモはどこ? or 提案手法の詳細
この手法では、頂点$i$におけるフィルター処理された信号(頂点、点に含まれる情報)を近傍の(複数の)信号の加重和として計算する。

## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. [B. D. Brabandere, X. Jia, T. Tuytelaars, and L. V. Gool. Dynamic filter networks. InNIPS, 2016.](https://papers.nips.cc/paper/6578-dynamic-filter-networks.pdf)

## 会議
CVPR 2017

## 著者
Martin Simonovsky, Nikos Komodakis.

## 投稿日付(yyyy/MM/dd)
2017/04/10

## コメント
自分のグラフへの理解がほぼないため、おそらくミス多め

## key-words
Graph, Point_Cloud

## read
A, I

## status
未完

## Citation
@inproceedings{Simonovsky2017ecc,
    author = {Martin Simonovsky and Nikos Komodakis},
    title = {Dynamic Edge-Conditioned Filters in Convolutional Neural Networks on Graphs},
    url = {https://arxiv.org/abs/1704.02901},
    booktitle = {CVPR},
    year = {2017}}