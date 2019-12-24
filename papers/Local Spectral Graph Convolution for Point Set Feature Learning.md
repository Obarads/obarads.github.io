# Local Spectral Graph Convolution for Point Set Feature Learning

元の論文の公開ページ : [arxiv.org](https://arxiv.org/abs/1803.05827)  
提案モデルの実装 : [不完全?:fate3439/LocalSpecGCN](https://github.com/fate3439/LocalSpecGCN)  
Github Issues : [#84](https://github.com/Obarads/obarads.github.io/issues/84)

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。

## どんなもの?
##### PointNet++で使われているPointNet層を近傍点に考慮した構造に取り替える提案をした。
- 図2の左のように、PointNet++では、PointNetを使って入力の抽象化を行っているが、これは点単位の関係性を考慮していない。
- 本提案では、PointNet++のPointNet層を図2の右のような構造、Spectral Convolutionと新提案のRecurrsive Cluster Poolingに取り替える。

![fig2](img/LSGCfPSFL/fig2.png)

## 先行研究と比べてどこがすごいの?
##### 省略

## どうやって有効だと検証した?
##### 省略

## 議論はある?
##### 省略

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. なし

## 会議
ECCV 2018

## 著者
Chu Wang, Babak Samari, Kaleem Siddiqi.

## 投稿日付(yyyy/MM/dd)
2018/03/15

## コメント
なし

## key-words
Point_Cloud, Graph, CV, Paper, New_Pooling, 修正, Semantic_Segmentation, Classification

## status
修正

## read
A, I

## Citation
