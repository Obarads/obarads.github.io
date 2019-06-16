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
一般的なソフトマックス分類器はラベルが無いと動かすことができない。一般的なソフトマックス関数は式(3)の通り。式(3)の$y_ j$は$j$番目のオブジェクトのクラスラベル、$C$はクラスの個数、$q\in\\{1,\ldots,C\\}$は$j$番目のオブジェクトに対するクラス割り当て、$\mathbf{w}_ {k}$は$k\in\\{1,\ldots,C\\}$番目のクラスに対する重みベクトル、$\mathbf{w}_ {k}^{T} \mathbf{g}_ {j}$は$g_ j$がどれほど$k$番目のクラスに一致しているかを測ることを表す。$\mathbf{w}_ {k}^{T} \mathbf{g}_ {j}$と$g_ j$の関係より、$w_ k$は$k$番目のクラスの指標とみなすことができる。

$$
P\left(y_{j}=q | \mathbf{g}_{j}\right)=\frac{\exp \left(\mathbf{w}_{q}^{T} \mathbf{g}_{j}\right)}{\sum_{k=1}^{C} \exp \left(\mathbf{w}_{k}^{T} \mathbf{g}_{j}\right)} \tag{3}
$$

教師あり学習では、クラスラベルとそれに対応する訓練データを用いて各クラスの$w_ k$を決定することができる。最近になって、[3]の観測により、$w_ k$はクラスに属する全ての特徴ベクトルの平均と一致するということがわかった。

本論文の場合、教師なしであるためラベルは無いがクラスタを使うことができる。そこで、クラスタリングに基づくノンパラメトリックソフトマックス分類器を定式化することで上記の観測を本研究の問題に当てはめる。具体的には、形状単位の特徴ベクトル(グローバル特徴)を反復的に再クラスタリングを行い、各クラスタの指標を推定することで各クラスタの平均特徴ベクトルを得る。確率$P\left(y_{j}=q | g_{j}\right)$を式(4)の様に近似することができる。式(4)の$C$はクラスタの数、$\overline{\mathbf{g}}_ {k}=\frac{1}{|\mathbb{C}_ {k}|} \sum_ {t \in \mathbb{C}_ {k} } \mathbf{g}_ {t}$はクラスタ$\mathbb{C}_ k$の全ての形状単位の特徴ベクトルにわたる平均特徴ベクトルを示す。ここで、著者らは$w_ k$に近似するような$\overline{\mathbf{g} }_ k$(クラスごと)を取る。

$$
P\left(y_{j}=q | \mathbf{g}_{j}\right) \approx \frac{\exp \left(\overline{\mathbf{g}}_{q}^{T} \mathbf{g}_{j} / \tau\right)}{\sum_{k=1}^{C} \exp \left(\overline{\mathbf{g}}_{k}^{T} \mathbf{g}_{j} / \tau\right)} \tag{4}
$$

更に、$\|\|\mathbf{g}_{j}\|\|=1$を強制するために$\mathrm{L}_ {2}$正規化層を付け加え、分布の濃度レベルを調節するために$\tau$(temperature parameter, 0.07)を使用する[5]。  
これを損失関数に組み込む場合、$P(y_ {j}=q | \mathbf{g}_ {j})$を最大化することを目的とするため、負の対数尤度を最小化するようにする。式(5)の通り。式(5)の$q$はクラスタ処理後の形状$S_ j$に振り分けられたクラスタを示す。

$$
L_{c l u s t e r}=-\sum_{j=1}^{N_{\mathrm{obi}}} \log P\left(y_{j}=q | \mathbf{g}_{j}\right) \tag{5}
$$

実験では、スペクトルクラスタリングを使い、各訓練エポック中にグローバル特徴$g_ j$をグループ化する。

### Adapted Contrastive Learning
特徴学習の効果を向上させるため、著者らはadapted cotrastive lossを導入する。この損失は、クラスタリングの結果がほぼランダムに近い状態である訓練開始時に特に重要となる。各訓練エポックでの入力点集合$P_ j$をアンカーとして、著者らは$P_ j$に対してpositive点集合サンプルを$P_ {j}^{+}$、negative点集合$P_{j}^{-}$を定義する。この時、$P_ {j}^{+}$に関連するグローバル特徴$g _{j}^{+}$は$g_ j$に近く、逆に$P_ {j}^{-}$に関連する$g _{j}^{-}$は$g_ j$から遠いものとする。



## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. [Kai Zhang, James T. Kwok, Bahram Parvin. Prototype Vector Machine for Large Scale Semi-supervised Learning.](https://pdfs.semanticscholar.org/9809/2daf04509fc5cc615d39760451d58f458ecc.pdf)
2. [Kai Zhang, James T. Kwok, Bahram Parvin. Prototype Vector Machine for Large Scale Semi-Supervised Learning. ICML 2009.](https://icml.cc/Conferences/2009/papers/198.pdf)
3. [Yu Liu, Guanglu Song, Jing Shao, Xiao Jin, and Xiaogang Wang. 2018. Transductive centroid projection for semi-supervised large-scale recognition. In European Conf. on Computer Vision (ECCV). 70–86.](http://openaccess.thecvf.com/content_ECCV_2018/html/Weiwei_Shi_Transductive_Semi-Supervised_Deep_ECCV_2018_paper.html)
4. [Geoffrey Hinton, Oriol Vinyals, and Jeff Dean. 2015. Distilling the knowledge in a neural network. arXiv preprint arXiv:1503.02531 (2015).](https://arxiv.org/abs/1503.02531)

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
