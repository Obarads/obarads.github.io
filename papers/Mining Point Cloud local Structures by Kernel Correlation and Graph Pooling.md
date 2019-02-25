# Mining Point Cloud Local Structures by Kernel Correlation and Graph Pooling

元の論文の公開ページ : https://www.merl.com/publications/docs/TR2018-041.pdf

## どんなもの?
局所特徴の活用によってPointNetを改善したモデルであるKernel Correlation Net(KCNet)を提案した。

## 先行研究と比べてどこがすごいの?
点群には凹凸やコーナー等の判別しやすい表現(ローカル特徴)が含まれており、それらを学習できる拡張をPointNetにシンプルさを維持したまま適応する。

## 技術や手法のキモはどこ? or 提案手法の詳細
### **構造**
提案したアーキテクチャは図2の通り。点集合の形状の類似性を測定するkernel correlation(カーネル相関、発想はpoint cloud registrationから)と近傍点間のローカル特徴を伝播するK-Nearest Neighbor Graph(KNNG、K最近傍グラフ)を使ったアーキテクチャである。

![fig2](img/MPCLSbKCaGP/fig2.png)

### **Learning on Loacal Geometric Structure**  


## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- [Yaoqing Yang, Chen Feng, Yiru Shen and Dong Tian. FoldingNet: Point Cloud Auto-encoder via Deep Grid Deformation. CVPR 2018.](https://arxiv.org/abs/1712.07262)

### 論文関連リンク
1.
2.

### 会議
CVPR 2018

### 著者
Y. Shen, C. Feng, Y. Yang, and D. Tian.

### 投稿日付(yyyy/MM/dd)
2018/07/08

## コメント
なし

## key-words
PointCloud,Classification,Segmentaion