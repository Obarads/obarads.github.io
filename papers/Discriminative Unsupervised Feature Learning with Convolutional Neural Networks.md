# Discriminative Unsupervised Feature Learning with Convolutional Neural Networks

元の論文の公開ページ : [nips](https://papers.nips.cc/paper/5548-discriminative-unsupervised-feature-learning-with-convolutional-neural-networks.pdf)
Github Issues : [#74](https://github.com/Obarads/obarads.github.io/issues/74)

## どんなもの?
ラベルのない画像データのみを使用してCNNを学習できるアプローチを提案した。データに対して代理クラスを適応する。各代理クラスはランダムにサンプリングされた画像のパッチに変換を加えたデータで形成される。
このアプローチは、学習時にラベルに依存しないデータを使用することで、より安価にオブジェクトに対する識別性を上げることができる。

## 先行研究と比べてどこがすごいの?
省略

## 技術や手法のキモはどこ? or 提案手法の詳細
### Creating Surrogate Training Data
ここではラベル付されていないデータセットに代理クラスを割り振る前準備について述べる。

はじめに、入力はラベル付されていないデータセットのみとして、著者らは様々な画像内の多様な位置とスケールから$N \in[50,32000]$個の$32\times32$サイズの画像パッチを切り出し、初期トレーニングセット$X=\\{\mathbf{x}_ {1}, \ldots \mathbf{x}_ {N}\\}$を形成する。ただし、オブジェクトもしくはその一部を含む画像を取得するため、大幅な勾配が存在する領域のみサンプリングする。

次にサンプリングした初期トレーニングセットに対して、変換$\\{T_{\alpha} | \alpha \in \mathcal{A}\\}$($\alpha$はパラメータベクトル、$\mathcal{A}$は全ての可能なパラメータベクトル)を適応する。各変換$T_ \alpha$の機能は以下の通り。

- **translation**: パッチサイズの0.2(20%?)以内の距離で垂直もしく水平に平行移動する。
- **scaling**: パッチのスケールを0.7から1.4の間の係数で乗算する。
- **rotation**: 画像を最大20度回転させる。
- **contrast 1**: 0.5から2の間の係数で全てのピクセルのセットの主成分に各パッチのピクセルの投影を乗算する(?)。(係数は各主成分に対して独立しており、パッチ内の全てのピク説に対して同じである(?))
- **contrast 2**: 全てのピクセルの値と彩度(HSVのVとS)を0.25から4の間で累乗する(パッチ中の全てのピクセルに対し同じように)、0.7から1.4の間の係数をこれらの値に掛ける、-0.1から0.1の間の値をそれらに足す。
- **color**: -0.1から0.1の間の値をパッチ中の全ピクセルの色相(HSVのH)に追加する(同じ値がパッチ中の全ピクセルに対して使われる)。

具体的には、初期トレーニングセットの各パッチ$\mathbf{x}_ i$に対してベクトル$\\{\alpha_ {i}^{1}, \ldots, \alpha_ {i}^{K}\\}$($K \in[1,300]$)に基づく変換群$\mathcal{T}_ {i}=\\{T_ {\alpha_{i}^{1}}, \ldots, T_ {\alpha_ {i}^{K}}\\}$を適応する。その結果、変換された画像$S_ {\mathbf{x}_ {i}}=\mathcal{T}_ {i} \mathbf{x}_ {i}=\\{T \mathbf{x}_ {i} | T \in \mathcal{T}_ {i}\\}$を生成する。その後、データセット全体から各ピクセルの平均を減算する。

パッチは図1の様にサンプリングされ、図2の様に変換される。図2の元画像(サンプリング&変換前の画像)は一種類のみである。

[※個人メモ: 図2は赤枠画像$\mathbf{x_ i}$に基づく変換画像$S_ {\mathbf{x}_ i}$を示している。]

![fig1_2](img/DUFLwCNN/fig1_2.png)

### Learning Algorithm
ここでは、実際に代理クラスを割り振り、訓練する方法を述べる。

変換された画像パッチの集合が与えられたとき、著者らは$S_ {\mathbf{x}_ {i}}$に対して代理クラスのラベル$i$を割り振る。そのため、CNNはこれらのトレーニングセットを用いて式(1)を最小化するように訓練できる。

$$
L(X)=\sum_{\mathbf{x}_{i} \in X} \sum_{T \in \mathcal{T}_{i}} l\left(i, T \mathbf{x}_{i}\right) \tag{1}
$$

このとき、$l(i, T \mathbf{x}_ {i})$はラベル$i$による変換されたサンプル$T\mathbf{x}_ i$の損失を示す。$l$は以下のように定義される。

$$
\begin{aligned} l\left(i, T \mathbf{x}_{i}\right) &=M\left(\mathbf{e}_{i}, f\left(T \mathbf{x}_{i}\right)\right) \\ 
M(\mathbf{y}, \mathbf{f}) &=-\langle\mathbf{y}, \log \mathbf{f}\rangle=-\sum_{k} y_{k} \log f_{k} \end{aligned} \tag{2}
$$

このとき、$f(\cdot)$は畳み込み層などの出力値、$\mathbf{e}_ i$は$i$番目の標準基底ベクトルである。代理クラスごとの変換の数がかなり多い(an infinite number of)場合は式(1)を式(3)の様に書き換える。式(3)の内容はFormal Analysisにあるが省略する。

$$
\widehat{L}(X)=\sum_{\mathbf{x}_{i} \in X} \mathbb{E}_{\alpha}\left[l\left(i, T_{\alpha} \mathbf{x}_{i}\right)\right] \tag{3}
$$

### Formal Analysis と Conceptual Comparison to Previous Unsupervised Learning Methods
分類問題の特性と他の教師なし学習との比較をおこなう。省略。

## どうやって有効だと検証した?
省略

## 議論はある?
省略

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. なし

## 会議
NIPS 2014

## 著者
Alexey Dosovitskiy, Philipp Fischer, Jost Tobias Springenberg, Martin Riedmiller, Thomas Brox.

## 投稿日付(yyyy/MM/dd)
2014/07/26

## コメント
なし

## key-words
RGB_Image, Data_Augmentation, Unsupervised_Learning, CV, Paper, 修正

## status
修正

