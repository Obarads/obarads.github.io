# JSIS3D: Joint Semantic-Instance Segmentation of 3D Point Clouds with Multi-Task Pointwise Networks and Multi-Value Conditional Random Fields

元の論文の公開ページ : [arxiv.org](https://arxiv.org/pdf/1904.00699.pdf)  
提案モデルの実装 : [pqhieu/jsis3d](https://github.com/pqhieu/jsis3d)  
Github Issues : []()  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。

## どんなもの?
##### 点群に対してセマンティックとインスタンスセグメンテーションが行える新規のモデルを提案した。
- インスタンスな情報もセマンティックな情報も相互に依存しているため、それらを同時に学習することが望ましい。本研究はそのようなスタンスでモデルを提案する。
- Multi-task pointwise network (MT-PNet)は同時に2つのタスクを行う。タスクは以下の2つである。
    - 3D点のカテゴリが何に属するのかを予測するタスク。
    - 3D点を高次元特徴ベクトルへ埋め込み、そこにクラスタリングをかけることでオブジェクトのインスタンスを予測するタスク。[ここの「そこ」というのは、特徴空間上に存在するベクトルに対してという意味。]
- クラスラベルとオブジェクトインスタンスの同時最適化を統一されたフレームワークに定式化したmulti-value conditional random field (MV-CRF)モデルは、variational mean field technique[?]を使用して効率的に解くことができる。著者らの知る限り、我々が統合されたフレームワーク内でのセマンティック&インスタンスの同時最適化を初めて研究した。

##### 実験によって、提案された手法が各タスクにおいてSOTAな結果を出すことを示した。
- 提案された手法と同等の方法を比較するために様々なベンチマークデータセットを用いた。使ったデータセットはScanNetのデータセットとS3DIS。

## 先行研究と比べてどこがすごいの? or 関連事項
##### 省略

## 技術や手法のキモはどこ? or 提案手法の詳細
#### 手法の概要
- 提案手法の概要は図1の通り。提案手法の処理の概要は図1の下に載せる。

![fig1](img/JJSSo3PCwMPNaMCRF/fig1.png)

##### 1. はじめにwindowと呼ばれる点群を領域重複ありの塊に分割(切り抜く)し、それを高次元ベクトルへの埋め込みと点のカテゴリクラス予測のためにニューラルネットワークへ入力する。
- この２つのタスクをこなすために、multi-task pointwise network (MT-PNet)を提案し、導入する。具体的な内容は、工夫の項のMulti-Task Pointwise Network (MT-PNet)を参照。
  - MT-PNetは同じインスタンスに属する点同士を引き寄せ、そうでない点を可能な限り引き離す。また、クラスラベルの予測も行う。[ここで言う点はおそらく特徴量空間の点を指す。]
 
##### 2. 1で出力されたクラスラベルと埋め込みはmulti-value conditional random field (MV-CRF)モデルで利用される。
- 具体的な内容は工夫の項のMulti-Value Conditional Random Fields (MV-CRF)を参照。

##### 3. 最終的に、2の出力であるvariational infereceを使用してセマンティック&インスタンスセグメンテーションを行う。
- 得になし

### 工夫
#### Multi-Task Pointwise Network (MT-PNet)
##### MT-PNetは点群を入力とし、セマンティックラベルとインスタンスの埋め込みを出力する。
- このネットワークの概要は図2の通り。
- ネットワークは途中で2つのブランチに分かれており、インスタンスまたは埋め込みを出力するようになっている。

![fig2](img/JJSSo3PCwMPNaMCRF/fig2.png)

##### インスタンス埋め込みを使った損失を定義する。
- このネットワークの損失は式(1)のとおりである。  

$$
\mathcal{L}=\mathcal{L}_{prediction}+\mathcal{L}_{embedding} \tag{1}
$$

- 予測損失$\mathcal{L}_ {prediction}$はクロスエントロピーによって定義される。埋め込み損失$\mathcal{L}_ {embeding}$には[1]から着想を得たdiscriminative functionを採用する。
- 具体的には、式(2)~(5)のようになっている。

$$
\mathcal{L}_{\text {embedding}}=\alpha \cdot \mathcal{L}_{\text {pull}}+\beta \cdot \mathcal{L}_{\text {push}}+\gamma \cdot \mathcal{L}_{\text {reg}} \tag{2}
$$

$$
\mathcal{L}_{p u l l}=\frac{1}{K} \sum_{k=1}^{K} \frac{1}{N_{k}} \sum_{j=1}^{N_{k}}\left[\left\|\boldsymbol{\mu}_{k}-\mathbf{e}_{j}\right\|_{2}-\delta_{v}\right]_{+}^{2} \tag{3}
$$

$$
\mathcal{L}_{\text {push}}=\frac{1}{K(K-1)} \sum_{k=1}^{K} \sum_{m=1, m \neq k}^{K}\left[2 \delta_{d}-\left\|\boldsymbol{\mu}_{k}-\boldsymbol{\mu}_{m}\right\|_{2}\right]_{+}^{2} \tag{4}
$$

$$
\mathcal{L}_{r e g}=\frac{1}{K} \sum_{k=1}^{K}\left\|\boldsymbol{\mu}_{k}\right\|_{2} \tag{5}
$$

- この式は、
  - $K$個のインスタントがある。
  - $k\in \\{1, \ldots, K\\}$番目のインスタンスは$N_ k$個の点を持つ。
  - 各インスタンス内にある点$v_ j$は、生成された埋め込み$e_ j\in \mathbb{R}^d$を持つ。
  - $\mu_ k$は$k$番目のインスタンスの埋め込みの平均である。
  - $[x]_ {+}=\max (0, x)$。
  - $\delta_ {v}$と$\delta_ d$はそれぞれpull損失$\mathcal{L}_ {pull}$とpush損失$\mathcal{L}_ {push}$のマージンである。
  - $\alpha=\beta=1, \gamma=0.001$。
  - 正則化損失$\mathcal{L}_ {reg}$は全ての重心を原点へ引き寄せることができる。

#### Multi-Value Conditional Random Fields (MV-CRF)
##### セマンティック&インスタンスラベルを持つ各点をノードとした点間のグラフを用いて、multi-value conditional random fields(MV-CRF)を定義する。
- このノードは2つのラベル$(l_ {j}^{S}, l_ {j}^{I})$を$S \times I$の形で関連付けられる。
  - [埋め込み$e$も後述するpotential function内で使われる。]
- そして、点群のセマンティックインスタンスセグメンテーションを、次のエネルギー関数(式(6))を最小化することで得る。

$$
\begin{aligned}
E\left(L^{S}, L^{I} | V\right)=& \sum_{j} \varphi\left(l_{j}^{S}\right)+\sum_{(j, k), j < k} \varphi\left(l_{j}^{S}, l_{k}^{S}\right) \\
&+\sum_{j} \psi\left(l_{j}^{I}\right)+\sum_{(j, k), j < k} \psi\left(l_{j}^{I}, l_{k}^{I}\right) \\
&+\sum_{s \in S} \sum_{i \in I} \phi(s, i)
\end{aligned} \tag{6}
$$

##### MV-CRFは点群に適切なラベルを振り分けるために、5つのpotential functionを使用する。
- 式(6)のエネルギー関数$E\left(L^{S}, L^{I} | V\right)$は、セマンティック及びインスタンスラベリングの両方に関して、セマンティックな制約(例:オブジェクトクラスとインスタンス間の形状の一貫性)と物理的制約(表面の平滑度、幾何学的な近接性)を組み込むpotentialsを持つ。
  - 具体的には、単項の**potential $\varphi\left(l_ {j}^{S}\right)$**はセマンティックラベル$l_ j^S$で定義され、MT-PNetの分類スコアから直接計算される(式(7))。  
  $$
  \varphi\left(l_{j}^{S}=s\right) \propto-\log p\left(v_{j} | l_{j}^{S}=s\right) \tag{7}
  $$
  - この式は、
    - $s$は$S$中で有力なクラスラベル。
    - $p(v_ {j} | l_ {j}^{S}=s)$は、ネットワークが$v_ j$[($v$は点群の点)]をセマンティッククラス$s$へ分類するprobability(softmax値等)。

- また、同じオブジェクトの点はよく同じ分類スコアを持つ($p(v_ {j} | l_ {j}^{S})$)。
- それ故、$v_ j$と$v_ k$の両方の分類スコアを介した**pairwise potential $\varphi(l_ {j}^{S}, l_ {k}^{S})$**を定義する。
  - 具体的には、
    $$
    \varphi\left(l_{j}^{S}, l_{k}^{S}\right)=\omega_{j, k} \exp \left\{-\frac{\left[p\left(v_{j} | l_{j}^{S}\right)-p\left(v_{k} | l_{k}^{S}\right)\right]^{2}}{2 \theta^{2}}\right\} \tag{8}
    $$  
    であり、$\omega_ {j, k}$はPott compatibility[?]から得られる。  
    $$
    \omega_{j, k}=\left\{\begin{array}{ll}
    {-1,} & {\text { if } l_{j}^{S / I}=l_{k}^{S / I}} \\
    {1,} & {\text { otherwise }}
    \end{array}\right. \tag{9}
    $$
  - [この$l_ {j}^{S / I}=l_ {k}^{S / I}$は...?これが同じオブエジェクトの点である時ない時の分岐になる..???]
- 単項の**potential $\psi(l_ {j}^{I})$**は同じインスンタンスに属する埋め込みを埋め込みをできるだけ、そのインスタンスの埋め込みの平均値に近づく様に強制する。
- 一方で、異なるインスタンスの埋め込みは離れるように強制する。
  - $L^I$が全ての点に割り振られているとして具体的には以下のようになる。
    $$
    \begin{aligned}
    \psi\left(l_{j}^{I}=i\right) &=-\frac{\exp \left[-\frac{1}{2}\left(\mathbf{e}_{j}-\boldsymbol{\mu}_{i}\right)^{\top} \mathbf{\Sigma}_{i}^{-1}\left(\mathbf{e}_{j}-\boldsymbol{\mu}_{i}\right)\right]}{\sqrt{(2 \pi)^{d}\left|\mathbf{\Sigma}_{i}\right|}} \\
    &-\log \left[\sum_{k} 1\left(l_{k}^{I}=i\right)\right]
    \end{aligned} \tag{10}
    $$
  - この式は、
    - $K$個のインスタンスがある。
    - 各インスタンスラベルは$i\in I$。
    - $\mu_ i$は上m込みの平均。
    - $\mathbf{\Sigma}_ i$はラベル$i$が割り振られている埋め込みの共分散行列。
    - $1(\cdot)$はindicator。[?]
    - $\sum_ {k} 1(l_{k}^{I}=i)$はインスタンス$i$のエリアを示し、大きなインスタンスを優先するために使用されます。
      - この項は、点群のノイズによって引き起こされる小さなインスタンスを削除するのに役立つ。
- **インスタンスラベルのpairwise potential $\psi(l_ {j}^{I}, l_ {k}^{I})$**はオブジェクトインスタンスの表面幾何学的特性を得る。
  - また、このpotentialは点$v_ j$と$v_ k$の色(c)、法線(n)、位置(l)のガウス分布の混合として定義される。[?]
  - 式は式(11)の通り。$\omega_{j, k}$は
    $$
    \begin{aligned}
    &\psi\left(l_{j}^{I}, l_{k}^{I}\right)=\\
    &\omega_{j, k} \exp \left(-\frac{\left\|\mathbf{l}_{j}-\mathbf{l}_{k}\right\|_{2}^{2}}{2 \lambda_{1}^{2}}-\frac{\left\|\mathbf{n}_{j}-\mathbf{n}_{k}\right\|_{2}^{2}}{2 \lambda_{2}^{2}}-\frac{\left\|\mathbf{c}_{j}-\mathbf{c}_{k}\right\|_{2}^{2}}{2 \lambda_{3}^{2}}\right)
    \end{aligned} \tag{11}
    $$
- **$\phi(s, i)$はセマンティックベースのpotentialsとインスタンスベースのpotentialsを関連付け、セマンティックラベルとインスタンスラベル間で一貫性を持つように促すものである。**
  - [省略]

#### Variational Inference
##### [未記入]

## どうやって有効だと検証した?
##### 省略

## 議論はある?
##### 省略

## 次に読むべき論文は?
##### なし
- なし

## 論文関連リンク
##### あり
1. [Bert De Brabandere, Davy Neven, and Luc Van Gool. Semantic instance segmentation with a discriminative loss function. arXiv preprint arXiv:1708.02551, 2017.](https://arxiv.org/pdf/1708.02551.pdf)[8]

## 会議, 論文誌, etc.
##### CVPR 2019

## 著者
##### Quang-Hieu Pham, Duc Thanh Nguyen, Binh-Son Hua, Gemma Roig, Sai-Kit Yeung

## 投稿日付(yyyy/MM/dd)
##### 2019/04/01

## コメント
##### あり
- 「実験によって、提案された手法が各タスクにおいてSOTAな結果を出すことを示した。」の項に関して、Eの内容を詳しく見ていないので、どのタスクをこなしたか具体的にはわからない。
- CRFなんもわからん(MV-CRFの節は丸写し)

## key-words
##### CV, Paper, Point_Cloud, Instance_Segmentation, Semantic_Segmentation, 修正, Implemented

## status
##### 修正

## read
##### A, I

## Citation
##### 未記入