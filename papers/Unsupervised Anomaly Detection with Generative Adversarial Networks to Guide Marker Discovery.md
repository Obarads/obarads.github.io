# Unsupervised Anomaly Detection with Generative Adversarial Networks to Guide Marker Discovery

## どんなもの?
医療画像に写っている疾患を発見するために発案された。画像とそれに関わる語彙をわざわざ結びつけるのは画像情報の使用を制限するため教師なし学習を使う。また、疾患を発見するのに利用される医療画像は限られている上、それらを学習させたとしても学習データの量によっては異常検知力に限りがある(未知のデータに対応できない)。そこで、GANの画像生成を用いて、GANに入力した画像とジェネレータから出力した画像の差異から異常検出を行うモデル、AnoGANを提案した。

## 先行研究と比べてどこがすごいの?
GANを使って異常検出を可能にした。確率分布pに従う様にG(z)を訓練させたGANがあるとき、入力がxであるとしてpに従うxをGANに入力すればG(z)≈xとなるが、pに従わないxを入力したとき、G(z)≈xとなるようなzが存在しないため異常と判断できる。pに従うxならG(z)はxとそっくりであるが、pに従わないxとG(z)には差があるため、そこを論文中の図1の様にマーキングすることもできる。  
しかし、GANは潜在空間Z内に存在するある地点zを生成器G(z)を介して出力(写像)xする(G(z)=z↦x)ことは可能であるが、xに対応するzを探すために、逆写像関数μ(x)を介してxからzへ逆写像する(μ(x)=x↦z)ことは出来ない。
そこである初期値z0を用意し、勾配法とxとG(zγ){γ=0,1,2,...,Γ}の誤差を用いて、xに対応するzΓを求める。

## 技術や手法のキモはどこ?
最適なzγを勾配法によって探すため、以下の様な式を定義する。  
- **損失関数**  
L(zγ)=(1-λ)・LR(zγ)+λ・LD(zγ)  
    - LR(zγ) (Residual Loss)  
    LRは視覚的相違を表す。G(zγ)がxと全く同じなら、L(zγ)=0となる。定義式は以下の通り  
    LR(zγ)=Σ|x-G(zγ)|

    - LD(zγ) (discrimination Loss)  
    LDはGANのdiscriminatorが抽出する特徴の相違である。下の定義式のfはdiscriminatiorの中間層であり、多様性X(pに従うxの集合)に当てはまるよう学習されているため、正常なxが入力されればfからの出力は一致する。逆に異常なxが入力されれば、xに一致するzγは存在しないため特徴は一致しない。なお、特徴マッチングの元は論文関連リンクの文献1から。  
    LD(zγ)=Σ|f(x)-f(G(zγ))|

- **anomaly score**  
anomaly scoreと呼ばれるスコアを算出する。定義は以下の通り。  
A(X)=(1-λ)・R(x)+λ・D(x)  
R(x)(residual score)はLR(zΓ)によって、D(x)(discrimination score)はLD(zΓ)によって定義され、小さければ小さいほどxとG(zΓ)は似ている。

- **residual image**  
追加で、画像内の異常領域特定のために残差画像を使う。定義は以下の通り。  
XR=|x-G(zΓ)|

- **reference anomaly score**  
提案した手法との比較のため、reference anomaly scoreを以下のように定義する。  
A^(x) = (1-λ)・R(x)+λ・D^(x)  
ここで、reference discrimination scoreはD^(x)=LD^(zΓ)であり論文関連リンクの文献2で使われている。

## どうやって有効だと検証した?
性能評価について以下の3点で計測している。

- **モデルがリアルな画像を提案できるかどうか**  
訓練セットまたはテストセットから抽出された健康な例(異常がない)の画像パッチおよびテストセットから抽出された疾患の例(異常がある)の画像について実行された。

- **異常検出精度の質は良いものかどうか**  
anomaly score、residual score、discrimination score、受信者動作特性曲線(以下ROC曲線)で評価する。

- **提案手法の利点の掘り下げ**  
    以下2つのアプローチの変更点に対してROC曲線と、Youden's indexを用いてROC曲線の最適なcut-off pointで再現率と精度、特異性、感度を計算し、AnoGANと比較する。
    - DCGANを用いた敵対的訓練を行わず敵対畳み込みオートエンコーダー(論文関連リンクの文献3)を用いて多様性Xを学習する。このとき、anomaly scoreの定義は変わらない。
    - GANRも評価する。このモデルにはanomaly scoreのためにA^(x)もしくはD^(x)が使われる。また、一致損失(多分LDとLR)が画像から潜在空間へのマッピングに使われ、このときGANのパラメーターにはAnoGANで事前訓練したものが使われる。

## 議論はある?
ジェネレーターへの写像ができるのであれば、それを使って画像検索とかできそう。

## 次に読むべき論文は?
- Improved techniques for training GANs. In: Advances in Neural Information Pro-cessing Systems (GANについてよく知らないし、特徴マッチングが気になった)  

### 論文関連リンク
- 本家:https://arxiv.org/abs/1703.05921
- 文献1:Salimans, T., Goodfellow, I., Zaremba, W., Cheung, V., Radford, A., Chen, X.: Improved techniques for training GANs. In: Advances in Neural Information Pro-cessing Systems. (2016) 2226-2234.
- 文献2:Yeh, R., Chen, C., Lim, T.Y., Hasegawa-Johnson, M., Do, M.N.: Semantic image inpainting with perceptual and contextual losses. arXiv:1607.07539 (2016)
- 文献3:Pathak, D., Kraahenbuhl, P., Donahue, J., Darrell, T., Efros, A.A.: Context en-coders: Feature learning by inpainting. CoRR abs/1604.07379 (2016)

### 参考リンク
- 参考1:https://aotamasaki.hatenablog.com/entry/2018/04/14/212948#%E3%83%A1%E3%82%A4%E3%83%B3%E3%82%A2%E3%82%A4%E3%83%87%E3%82%A2
- 参考2:https://qiita.com/NakaokaRei/items/231ec4efe42dfe79d1ff
- 参考3:http://habakan6.hatenablog.com/entry/2018/04/29/013200
- GANを学ぶ:https://qiita.com/hakubisin104/items/64662d19fa7ae41a87aa  

### 会議
IPMI2017

### 著者/所属機関
Thomas Schlegl, Philipp Seebock, Sebastian M. Waldstein, Ursula Schmidt-Erfurth, and Georg Langs.

### 投稿日付(yyyy/MM/dd)
2017/03/17

## コメント
なし