# Transductive Centroid Projection for Semi-supervised Large-scale Recognition

元の論文の公開ページ : [cvf](http://openaccess.thecvf.com/content_ECCV_2018/html/Yu_Liu_Transductive_Centroid_Projection_ECCV_2018_paper.html)  
Github Issues : [#106](https://github.com/Obarads/obarads.github.io/issues/106)

## どんなもの?
最後の全結合層をTransductive Centroid Projection (TCP)と呼ばれるモジュールに替えて半教師あり学習(教師なし学習も?)を効率化する提案をした。貢献は以下の通り。

1. **観測による解釈** : モデルの収束に伴って、最後の全結合層の写像行列$\mathbf{W}$の各列(つまり$\mathbf{w}_ n$、以下アンカーと呼ぶ)の方向が徐々に重心と一致する観測を調査する。(この方向って、0からアンカーへの方向という意味か?)
2. **新規提案のTransductive Centroid Projection層** : 上記の観測に基づき、Transductive Centroid Projection(TCP)と名付けられた新規の層を導入し、識別能力を向上させる非/半教師あり学習メカニズムを提案する。self-traningのような反復処理を使わずともTCPは訓練することができる。
3. **顔認識とperson re-identification(ReID)で優れた実績** : 顔認識とReIDで教師/半教師あり学習に対する優位性の評価を行う。

## 先行研究と比べてどこがすごいの?
半教師あり学習でself-traningの様な反復処理を使わない、inter-class conflictの確率を減少させるという点。

## 技術や手法のキモはどこ? or 提案手法の詳細
### Observation inside the Softmax Classifier
まずは式(1)のような$\mathbf{y}$があり、$\mathbf{b} \equiv \mathbf{0}$であり、SGDによるソフトマックス損失の教師あり学習でうまく収束したとする。
この時、$\mathbf{w}_ {i}=\mathbf{W}_ {[i] } \in \mathbb{R}^{D}$(アンカー)が、クラス$i$の重心方向に向くことを観測する。観測するためにToy Examples (軽い実験)を行う。

$$
\mathbf{y}=\mathbf{W}^{T} \mathbf{f}+\mathbf{b} \tag{1}
$$

#### Toy Examples
前述の内容を観測するため、小規模データセットから大規模データセットまでの分類タスクを行う。使われるデータセットはMNIST(10クラス)、CIFAR-100(100クラス)、MS1M(100000クラス)の3つ。実験では表1のBackbornに示されているアーキテクチャをそれぞれ使う。各アーキテクチャの畳み込み後に全結合層のFC1とFC2を装着する。FC1は表1のFeature Dimと同じ次元(MNISTなら2次元)の特徴ベクトル$\mathbf{f}$を出力し、FC2はその$\mathbf{f}$をクラス空間へ写像する。(おそらく)FC1の結果を視覚化したものが図2である。以下、各データセットの結果を説明する。

![tab1](img/TCPfSLR/tab1.png)

![fig2](img/TCPfSLR/fig2.png)

##### MNIST
図2(a)は0,2,10エポックの結果を示す。徐々に特徴量の差異が表れている。0エポック時はアンカーの向きがランダムであったが、訓練していく過程で徐々に特徴量の重心の方向に向くことを確認した。図2(d)は、クラスの重心とアンカーの方向のコサイン類似度の移り変わりを示す。

##### CIFAR-100 & MS1M
図2(b,c)にその結果を視覚化する。これらはt-SNEを用いて次元削減したものを視覚化している。赤点がアンカーであり、アンカーが各クラスの重心の知覚にいることを観測した。

### Investigate in Gradients
訓練手順の勾配効果の観点から、アンカーと重心が徐々に一致する理由を探す。

n番目のクラスに属する線形写像$\mathbf{f}$の入力と出力$\mathbf{y}=\mathbf{W}^{T} \mathbf{f}$を考慮すると、n番目のクラスに属する$\mathbf{f}$のソフトマックス確率は式(2)によって計算される。

$$
p_{n}=\operatorname{softmax}(y)=\frac{\exp \left(\mathbf{y}_{n}\right)}{\sum_{i=1}^{N} \exp \left(\mathbf{y}_{i}\right)} \tag{2}
$$

そして、式(3)のように負の対数尤度(ソフトマックス損失$\ell$)を最小化するように学習される。

$$
\underset{\theta}{\arg \min } \ell=\underset{\theta}{\arg \min }-\log (p) \tag{3}
$$

ここで、$\theta$はCNNの全てのパラメータを指す。ここで、単体のサンプル$\mathbf{f}$が与えられたときのアンカー$\mathbf{w}_ n$に関するソフトマックス損失$\ell_ \mathbf{f}$の勾配を推察できる。それを式(4)に示す。

$$
\nabla_{\mathbf{w}_{n}} \ell_{\mathbf{f}}=\frac{\partial \ell_{\mathbf{f}}}{\partial \mathbf{w}_{n}}=-\sum_{\mathbf{f} \in \mathcal{I}}\left(\mathbb{I}\left[\mathbf{f} \in \mathcal{I}_{n}\right]-\frac{\exp \left(\mathbf{y}_{n}\right)}{\sum_{i=1}^{N} \exp \left(\mathbf{y}_{i}\right)}\right) \cdot \mathbf{f} \tag{4}
$$

ここで、$\mathcal{I}_ n$はクラス$n$のサンプル、$\mathbf{y}_ {n}$は$\mathbf{y}$の$n$番目の要素である。$\mathcal{I}$は$\mathbf{f}$が$\mathcal{I}_ {n}$にあるとき、indicatorが1になり、その逆は0になる。つまり、0と1の場合分けの部分を書き換えると以下の式になる(下の式は論文のものをそのまま使用、分母の$n$は$i$では?)。

$$
\nabla_{\mathbf{w}_{n}} \ell=-\sum_{\mathbf{f} \in \mathcal{I}_{n}}\left(1-\frac{\exp \left(\mathbf{y}_{n}\right)}{\sum_{n=1}^{N} \exp \left(\mathbf{y}_{n}\right)}\right) \cdot \mathbf{f}+\sum_{\mathbf{f} \notin \mathcal{I}_{n}} \frac{\exp \left(\mathbf{y}_{n}\right)}{\sum_{n=1}^{N} \exp \left(\mathbf{y}_{n}\right)} \cdot \mathbf{f}
$$

ここから、$\mathbf{w}_ n$の更新値(更新による変化値)は以下の式で導ける。なお、$\eta$は学習率である(下の式は論文のものをそのまま使用、分母の$n$は$i$では?)。

$$
\Delta \mathbf{w}_{n}=-\eta \dot{\nabla}_{\mathbf{w}_{n}} \ell=\eta \sum_{\mathbf{f} \in \mathcal{I}_{n}}\left(1-\frac{\exp \left(\mathbf{y}_{n}\right)}{\sum_{n=1}^{N} \exp \left(\mathbf{y}_{n}\right)}\right) \cdot \mathbf{f}-\eta \sum_{\mathbf{f} \notin \mathcal{I}_{n}} \frac{\exp \left(\mathbf{y}_{n}\right)}{\sum_{n=1}^{N} \exp \left(\mathbf{y}_{n}\right)} \cdot \mathbf{f}
$$

上記の式の前者の項は、クラス$n$のサンプルのスケールされた総和としてみなすことができ、クラスの重心$\mathbf{c}_ n$にほぼ比例する(上の自分の指摘が正しければ、このスケールは全クラスの指数関数によるもの)。後者の項も、普通、特徴サンプルが特徴空間に均一に分布するため、これらも重心$\mathbf{c}_ n$の負の方向にほぼ従う。図3は、これらの過程を図で表したもの。

![fig3](img/TCPfSLR/fig3.png)

### Approach
前述した$w_ {n} \approx c_ {n}$の特性を利用し、ラベルなしデータセット$\mathcal{X}^\mathbf{U}$に[1]を用いたクラスタからのad hoc重心$\mathbf{c}^{\mathrm{U}}$で、それに対応するアンカーベクトル$\mathbf{w}^{\mathrm{U} }$を構築する。

#### Transductive Centroid Projection (TCP)


![fig4](img/TCPfSLR/fig4.png)

## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. なし

## 会議
ECCV 2018

## 著者
Yu Liu, Guanglu Song, Jing Shao, Xiao Jin, Xiaogang Wang.

## 投稿日付(yyyy/MM/dd)
2018/10/06

## コメント
なし

## key-words
RGB_Image, CV, Paper, 修正, 旧版

## status
修正

## read
A, I, R, M

## Citation
@InProceedings{Liu_2018_ECCV,
author = {Liu, Yu and Song, Guanglu and Shao, Jing and Jin, Xiao and Wang, Xiaogang},
title = {Transductive Centroid Projection for Semi-supervised Large-scale Recognition},
booktitle = {The European Conference on Computer Vision (ECCV)},
month = {September},
year = {2018}
}