# Occupancy Networks: Learning 3D Reconstruction in Function Space

元の論文の公開ページ : https://arxiv.org/abs/1812.03828  
Github Issues : [#67](https://github.com/Obarads/obarads.github.io/issues/67)

## どんなもの?
点群、ボクセル、メッシュに変わる、占有率関数を使った3D表現を提案した。

## 先行研究と比べてどこがすごいの?
3Dの表現としてはボクセル、点群、メッシュが挙げられる。

- **ボクセル** : ピクセルを3Dに一般化したもの(図1(a))。シンプルな表現であるが、解像度が高くなるに連れてボクセルの処理に要するメモリの量が非常に多くなるため、そのままだと$32^3,64^3$ほどの解像度しか持たない。octreeを用いることで$256^3$まで上げることができるが、解像度としては依然として小さい上にoctreeによって複雑な実装をしなければならなくなる。

- **点群** : 3次元座標を含む点を使った3D表現(図1(b))。ボクセルよりも低メモリで処理を行うことが可能であるが、点同士でつながりを持つような情報を持ち合わせていないため、モデルから幾何学的情報(表面表現など)を抽出する必要がある。

- **メッシュ** : メッシュ(図1(c))。通常、既存のメッシュ表現はテンプレートメッシュの変形に基づいているため、任意のトポロジーを使えない。

今回提案する3D表現は任意の解像度設定が可能であり、幾何学情報も持ち合わせている。

![fig1](img/ONL3RiFS/fig1.png)

## 技術や手法のキモはどこ? or 提案手法の詳細
### Occupancy Networks
ボクセルや点群における表現の占有率を推論できる式(1)の関数を求める。式(1)を3Dオブジェクトの占有関数とする。

$$
o : \mathbb{R}^{3} \rightarrow\{0,1\} \tag{1}
$$

この占有率関数は3D次元空間上のあらゆる位置$p\in \mathcal{R}^3$に占有確率を0と1の間で振り分ける。

上記の占有率関数にニューラルネットワークを導入する。具体的には、観測$x\in\mathcal{X}$(点群、画像など)がある時、ペア$(p,x)\in\mathbb{R}^3\times \mathcal{X}$を入力として受け取り、占有確率を表す実数を出力するニューラルネットワーク$f_ \theta$は式(2)の様に示すことができる。

$$
f_{\theta} : \mathbb{R}^{3} \times \mathcal{X} \rightarrow[0,1]\tag{2}
$$

これをOccupancy Networkと呼ぶ。  
尚、オブジェクトの表面を暗黙的に表現する決定境界を求めること以外はバイナリ分類ニューラルネットワークに相当する。

### Training
パラメータ$\theta$を持つニューラルネットワーク$f_ \theta(p,x)$を訓練する。トレーニングバッチ中の$i$番目のサンプルから取った$K$個の点$p_ {i j} \in \mathbb{R}^{3}, j=1, \ldots, K$(座標点?)がある時、ミニバッチ損失$\mathcal{L}_ {\mathcal{B}}$は式(3)になる。

$$
\mathcal{L}_{\mathcal{B}}(\theta)=\frac{1}{|\mathcal{B}|} \sum_{i=1}^{|\mathcal{B}|} \sum_{j=1}^{K} \mathcal{L}\left(f_{\theta}\left(p_{i j}, x_{i}\right), o_{i j}\right) \tag{3}
$$

ここで、$x_ i$はバッチ$\mathcal{B}$の$i$番目の観測、$o_ {i j} \equiv o\left(p_ {i j}\right)$は点$p_ {ij}$の真の占有率、$\mathcal{L}(\cdot,\cdot)$はクロスエントロピー分類損失を示す。このネットワークの性能は位置$p_ {ij}$に依存し、その点に関しては実験を行う。

また、著者らの3D表現は確率潜在変数モデルを学習することも可能であり、損失を式(4)として定義できる。

$$
\begin{aligned} \mathcal{L}_{\mathcal{B}}^{\mathrm{gen}}(\theta, \psi)=& \frac{1}{|\mathcal{B}|} \sum_{i=1}^{|\mathcal{B}|} [ \sum_{j=1}^{K} \mathcal{L}(f_{\theta}(p_{i j}, z_{i}), o_{i j})\\ &+\mathrm{KL}(q_{\psi}(z |(p_{i j}, o_{i j})_{j=1 : K}) \| p_{0}(z)) ] \end{aligned} \tag{4}
$$

式(4)には、入力に$p_ {ij}$と$o_ {ij}$を取り、予測平均 $\mu_ {\psi}$(?)と標準偏差$\sigma_ \psi$から成る潜在$z\in\mathbb{R}^L$のガウス分布$q_ {\psi}(z |\left(p_ {i j}, O_{i j})_ {j=1 : K}\right)$を出力するエンコーダーネットワーク$g_ \psi(\cdot)$を挿入している。

### Inference


## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. なし

## 会議
CVPR 2019

## 著者
Lars Mescheder, Michael Oechsle, Michael Niemeyer, Sebastian Nowozin, Andreas Geiger.

## 投稿日付(yyyy/MM/dd)
2018/12/10

## コメント
なし

## key-words
2D_Image, Voxel, Point_Cloud, 3D_Estimation

## status
未完