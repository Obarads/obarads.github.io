# Unsupervised Detection of Distinctive Regions on 3D Shapes

元の論文の公開ページ : [arxiv](https://arxiv.org/abs/1905.01684)  
Github Issues : 

## どんなもの?
教師なしで3D形状のdistinctive region(以下識別領域と呼ぶ)を探す手法を提案する。貢献は以下の通り。

1. 識別領域を検知する教師なしアーキテクチャの提案した。
2. クラスタリングベースのノンパラメトリックソフトマックス分類器を設計し、教師なしでネットワークを学習するためのadapted contrastive lossを適応した。
3. 提案手法の評価と、識別性が3Dシーンの形状検索、サンプリング、視界選択にどのように貢献するか示す。

## 先行研究と比べてどこがすごいの?
クラスラベルを必要としない3D形状の識別領域検出が可能にしている。また、Grad-CAMなどのニューロン活動視覚化手法ではクラスラベルを必要とする方法を紹介しているが、本提案では教師なしで視覚化する。

## 技術や手法のキモはどこ? or 提案手法の詳細
提案では柔軟性と計算量の軽さから点群で形状の識別領域を予測する。提案手法の概要図は図2の通り。以下に(後ほど説明)

![fig2](img/UDoDRo3S/fig2.png)

### Feature Embedding
図2のFeature embeddingモジュールはパラメータ$\theta$を持つ埋め込み関数$f_ \theta$を学習する。この時、$j$番目の形状内にある$i$番目の点の埋め込み特徴$f_ {i,j}$は式(1)で表される。$f_ {i,j}$により、点レベルの識別性を測ることができるようになる。

$$
f_ {i,j} = f_ \theta(p_ {i,j}) \tag{1}
$$

提案手法では$f_ \theta$にPointCNNを利用する。

さらに、他のオブジェクと比べて識別できるような形状レベルの識別性を探すために先程の埋め込みをオブジェクトごとに集約する。点の数が$N$である時、式(2)の様に表すことができる。

$$
\mathrm{g}_{j}=\frac{\sum_{i=1}^{N} \mathrm{f}_{i, j}}{N} \tag{2}
$$

このモジュールが計算した２つの特徴量$f$と$g$をそれぞれローカル(点単位)特徴とグローバル(形状単位)特徴と呼ぶ。

### Clustering-based Nonparametric Softmax
一般的なソフトマックス分類器はラベルが無いと動かすことができない。そこで、本提案手法ではオブジェクトごとのグローバル特徴を再帰的にクラスタリング

## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. [Kai Zhang, James T. Kwok, Bahram Parvin. Prototype Vector Machine for Large Scale Semi-supervised Learning.](https://pdfs.semanticscholar.org/9809/2daf04509fc5cc615d39760451d58f458ecc.pdf)
2. [Kai Zhang, James T. Kwok, Bahram Parvin. Prototype Vector Machine for Large Scale Semi-Supervised Learning. ICML 2009.](https://icml.cc/Conferences/2009/papers/198.pdf)

## 会議
不明(提出先はSIGGRAPH?)

## 著者
Xianzhi Li, Lequan Yu, Chi-Wing Fu, Daniel Cohen-Or, Pheng-Ann Heng.

## 投稿日付(yyyy/MM/dd)
2019/05/05

## コメント
なし

## key-words
Point_Cloud, Analytics

## status
未完

## read
A, I, R, M

## Citation
