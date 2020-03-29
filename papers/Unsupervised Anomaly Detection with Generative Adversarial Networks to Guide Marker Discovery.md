# Unsupervised Anomaly Detection with Generative Adversarial Networks to Guide Marker Discovery

元の論文の公開ページ : [arxiv.org](https://arxiv.org/abs/1703.05921)  
提案モデルの実装 : [非公式:LeeDoYup/AnoGAN-tf](https://github.com/LeeDoYup/AnoGAN-tf)  
Github Issues : [#2](https://github.com/Obarads/obarads.github.io/issues/2)  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。

## どんなもの?
##### 疾患のある部分を見つけるための教師なし手法、AnoGANを提案した。
- 疾患マーカー(図1)[(マスクデータみたいなもの)]の有無によって使用するデータの制限を受けないよう教師なし学習手法を利用する。
- また、疾患箇所を発見する必要があるため、与えられた画像ごとのラベル(異常か正常か)を予測するだけでなく、画像のピクセル単位で予測を行う必要がある。
- そこで、GANを用いて画像を生成し、その生成された画像と与えられた画像を比較し、疾患箇所を予測する手法を提案する。
  - 具体的には、与えられた画像の潜在空間 $\mathcal{Z}$ 上の入力ノイズ($\mathbf{z}$)を求めて、それが異常であるかどうか求める。
- 本提案はGANを用いた初の異常検知手法である。

![fig1](img/UADwGANtGMD/fig1.png)

## 先行研究と比べてどこがすごいの? or 関連事項
##### 画像から潜在空間へのマッピング方法を改良するための提案を行った。
- この改良の比較先は[5]の方法との比較である。

## 技術や手法のキモはどこ? or 提案手法の詳細
### 手法の概要
##### 1. GANを用いて正常な画像を学習する。
- 学習は通常のGANと同じように行われる(図2a)。アーキテクチャもDCGANをベースにしたものを使用している。
- GANの生成器$G$はデータ$x \in \mathcal{X}$上にある分布$p_ g$に従うように学習する。
  - このとき、$\mathcal{X}$は健康な画像の集合(図2bの青点、本論文では多様体)を示す。
  - つまり、$G$は潜在空間$\mathcal{Z}$上のサンプル$z$から正常な画像を生成する様に学習する(生成された画像は$G(\mathbf{z})$と表される)。
- $G$の学習が終わった後は、異常検知のためのアルゴリズムを用いて異常な画像(疾患のある画像)を分類、疾患マーカーの予測を行う。

![fig2](img/UADwGANtGMD/fig2.png)

##### 2. 与えられた画像$\mathbf{x}$に最も視覚的に類似する画像$G(\mathbf{z})$を発見する。
- $G$の学習が終了した後、$G$は$\mathcal{X}$上のデータを生成する様になっている。
- 本提案手法では、入力されるデータ$\mathbf{x}$に視覚的に最も似ている画像$G(\mathbf{z})$を生成するための$\mathbf{z}$を探す。
  - この$G(\mathbf{z})$は$\mathcal{X}$上のものである。
- ベストな$\mathbf{z}$を探すため、以下の過程をこなす。
  1. ランダムに選んだ$\mathbf{z}_ 1$を$\mathcal{Z}$上から選ぶ。
  2. $G(\mathbf{z_ 1})$を生成し、この画像に基づいて損失関数を定義する。この損失関数は$\mathbf{z_ 1}$の係数の更新を行うための勾配を提供し、$\mathcal{Z}$上の新たな地点$\mathbf{z}_ 2$への更新が可能になる。
  3. 最も似ている画像$G(\mathbf{z}_ \gamma)$($\gamma=1,2, \ldots, \Gamma$)になるまで、1と2は繰り返される。
- 2の損失関数は式(5)の様に示される。

$$
\mathcal{L}\left(\mathbf{z}_{\gamma}\right)=(1-\lambda) \cdot \mathcal{L}_{R}\left(\mathbf{z}_{\gamma}\right)+\lambda \cdot \mathcal{L}_{D}\left(\mathbf{z}_{\gamma}\right) \tag{5}
$$

- この損失の詳細は工夫の損失関数についてを参照。
- この損失関数ではGANのdiscriminator $D$と生成器 $G$が使われているが、ベストな$\mathbf{z}$を求めたいだけなので、これらのネットワークに使われている訓練されたパラメータは固定し、$\mathbf{z}$の係数のみに逆伝播を適応する。

##### 3. anomaly scoreなどのscoreに基づいて、異常か正常化を判断する。
- anomaly scoreは式(5)をそのまま使う。よって式(6)のようになる。

$$
A(\mathbf{x})=(1-\lambda) \cdot R(\mathbf{x})+\lambda \cdot D(\mathbf{x}) \tag{6}
$$

- $R(\mathbf{x})$と$D(\mathbf{x})$はそれぞれ$\mathcal{L}_ {R}(\mathbf{z}_ {\Gamma})$と$\mathcal{L}_ {D}(\mathbf{z}_ {\Gamma})$に基づく。
- このスコアが高いと$\mathbf{x}$は異常であり、低いと$\mathbf{x}$は正常(訓練中のデータと類似)であるということになる。
- また、生成された画像との差分をresidual image $\mathbf{x}_ {R}=|\mathbf{x}-G(\mathbf{z}_ {\Gamma})|$やreference anomaly score $\hat{A}(\mathbf{x})=(1-\lambda) \cdot R(\mathbf{x})+\lambda \cdot \hat{D}(\mathbf{x})$を定義する。
  - $\hat{D}(\mathbf{x})=\mathcal{L}_ {\hat{D}}(\mathbf{z}_ {\Gamma})$は[5]のreference discrimination score。

### 工夫
#### 損失関数について
##### 最も似ている画像$G(\mathbf{z}_ \gamma)$を探すため、2つの損失関数を定義する。
- 最も似ている画像$G(\mathbf{z}_ \gamma)$を見つけるため、[5]に従って新たな画像の潜在空間へマッピングするための２つの損失、residual lossとdiscrimination lossを定義する。
  - residual lossは$G(\mathbf{z}_ \gamma)$と$\mathbf{x}$間の視覚的類似性を強化する。
    - residual lossは式(3)に示すとおり。
    - $$\mathcal{L}_{R}\left(\mathbf{z}_{\gamma}\right)=\sum\left|\mathbf{x}-G\left(\mathbf{z}_{\gamma}\right)\right| \tag{3}$$
    - 理想的な状態では、与えられた画像$\mathbf{x}$と生成された画像$G(\mathbf{z}_ \gamma)$が一致する。結果として、式(3)の値は0となる。
  - discrimination lossは$G(\mathbf{z}_ \gamma)$を学習した$\mathcal{X}$上のものであるように強いる。
    - [5]で定義されているが、著者らはこれを改良する。

##### feature matching[6]のアイデアを利用したdiscrimination lossを提案する。
- [5]ではGANの識別器 $D$を騙すために$\mathbf{z_ \gamma}$を更新しているが、本提案では$G(\mathbf{z}_  \gamma)$と(学習した)正常な画像の分布が一致するように$\mathbf{z}_ \gamma$を更新する損失$\mathcal{L}_ D(\mathbf{z}_ \gamma)$を定義する。
- 著者らはfeature matching[6]のテクニックを利用して新たな損失を定義する。

$$
\mathcal{L}_{D}\left(\mathbf{z}_{\gamma}\right)=\sum\left|\mathbf{f}(\mathbf{x})-\mathbf{f}\left(G\left(\mathbf{z}_{\gamma}\right)\right)\right| \tag{4}
$$

- $\mathbf{f}$は$D$のネットワークの中間層である。
- この損失を使用することで、GANの学習によって得られた識別器の豊富な特徴表現を考慮に入れることができる。
  - 識別器を特徴抽出器として利用している。
  - [[5]のやり方はhard decisionであるとのこと、分類を行いたいのではなく似た表現を探すためなので、こちらのほうがいい?]

## どうやって有効だと検証した?
##### 3種類の評価に基づいて性能の計測している。
- モデルがリアルな画像を提案できるかどうか
  - 訓練セットまたはテストセットから抽出された健康な例(異常がない)の画像パッチおよびテストセットから抽出された疾患の例(異常がある)の画像について実行された。
- 異常検出精度の質は良いものかどうか
  - anomaly score、residual score、discrimination score、受信者動作特性曲線(以下ROC曲線)で評価する。
- 提案手法の利点の掘り下げ
  - 以下2つのアプローチの変更点に対してROC曲線と、Youden's indexを用いてROC曲線の最適なcut-off pointで再現率と精度、特異性、感度を計算し、AnoGANと比較する。
  - DCGANを用いた敵対的訓練を行わず敵対畳み込みオートエンコーダー(論文関連リンクの文献3)を用いて多様性Xを学習する。このとき、anomaly scoreの定義は変わらない。
  - GANRも評価する。このモデルにはanomaly scoreのために$A(\mathbf{x})$もしくは$D(\mathbf{x})$が使われる。また、一致損失(多分$\mathcal{L}_ D$と$\mathcal{L}_ R$)が画像から潜在空間へのマッピングに使われ、このときGANのパラメーターにはAnoGANで事前訓練したものが使われる。

## 議論はある?
##### 省略

## 次に読むべき論文は?
##### あり
- Improved techniques for training GANs. In: Advances in Neural Information Pro-cessing Systems (GANについてよく知らないし、特徴マッチングが気になった)  

## 論文関連リンク
##### あり
1. [aotamasaki. Hatena blog. 論文読み Unsupervised Anomaly Detection with Generative Adversarial Networks to Guide Marker Discovery. 2018. (アクセス:2020/3/27)](https://aotamasaki.hatenablog.com/entry/2018/04/14/212948#%E3%83%A1%E3%82%A4%E3%83%B3%E3%82%A2%E3%82%A4%E3%83%87%E3%82%A2)
2. [NakaokaRei. Qiita. AnoGANの論文を読んでMNISTの異常検知をしてみた. 2018. (アクセス:2020/3/27)](https://qiita.com/NakaokaRei/items/231ec4efe42dfe79d1ff)
3. [habakan6. Hatena blog. 【論文読み】GANを利用した異常検知まとめ. 2018. (アクセス:2020/3/27)](http://habakan6.hatenablog.com/entry/2018/04/29/013200)
4. [hakubisin104. Qiita. 「Generative Adversarial Nets」論文要約と、CNTKによるGANの実装紹介. 2017. (アクセス:2020/3/27)](https://qiita.com/hakubisin104/items/64662d19fa7ae41a87aa)
5. [Yeh, R., Chen, C., Lim, T.Y., Hasegawa-Johnson, M., Do, M.N.: Semantic image inpainting with perceptual and contextual losses. arXiv:1607.07539 (2016)](https://arxiv.org/abs/1607.07539)[13]
6. [Salimans, T., Goodfellow, I., Zaremba, W., Cheung, V., Radford, A., Chen, X.: Improved techniques for training GANs. In: Advances in Neural Information Pro-cessing Systems. (2016) 2226{2234](https://arxiv.org/abs/1606.03498)[14]

## 会議, 論文誌, etc.
##### IPMI 2017

## 著者
##### Thomas Schlegl, Philipp Seebock, Sebastian M. Waldstein, Ursula Schmidt-Erfurth, and Georg Langs.

## 投稿日付(yyyy/MM/dd)
##### 2017/03/17

## コメント
##### あり
- 豊富常々でなぜなぜ良くなるのかイマイチわからない、GANに詳しくないせいだろうか。

## key-words
##### Unsupervised_Learning, GAN, One-Class_&_Anomaly_Detection, CV, Paper, 完了, Intensity_Image

## status
##### 完了

## read
##### A, I, R, M, E

## Citation
##### 未記入

