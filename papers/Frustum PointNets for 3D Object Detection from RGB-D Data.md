# Frustum PointNets for 3D Object Detection from RGB-D Data

元の論文の公開ページ : [arxiv](https://arxiv.org/abs/1711.08488)  
Github Issues : [#77](https://github.com/Obarads/obarads.github.io/issues/77)

## どんなもの?
RGB-Dデータを使用した3D検知モデル、Frustum PointNetを提案した。領域提案はRGBデータをもとに行われる。貢献は以下の通り。

- **新規RGB-D検知モデル** : 著者らは、RGB-Dデータを使った新しい3D検知フレームワークであるFrustum PointNetを提案した。
- **SOTA** : 著者らの提案手法は標準的な3Dオブジェクト検知ベンチマークでSOTAを達成した。
- **多様な実験** : 本提案モデルの特徴および設計の妥当性を示すため、様々な実験を行う。

## 先行研究と比べてどこがすごいの?

## 技術や手法のキモはどこ? or 提案手法の詳細
2D画像で検知した範囲から3D錐台状に点群を切り抜き、そこからオブジェクトの検出を行う。各オブジェクトはクラスとアモーダル3Dバウンディングボックスを持つ。アモーダルボックスはオブジェクトの一部が欠けていてもバウンディングする。このボックスはサイズ$h,w,l$、中央座標$c_ x,c_ y, c_ z$、方向$\theta,\phi,\psi$の値によって表現される。ただし、実装では鳥瞰図から見た方向$\theta$のみを扱う。

提案手法の概要図は図2の通り。

![fig2](img/FPf3ODfRD/fig2.png)

### Frustum Proposal
本提案手法ではRGB-Dカメラなどから得たRGB-Dデータを使用するが、今のRGB-Dカメラの深度データの解像度は低い。また、検知に関しては2D分野の方が成熟しているため、本提案ではRGB情報を含む画像を用いて提案領域を生成する。2D提案領域生成後、以下の手順を踏む。著者らは以下の手順をfrustum proposal generationと呼ぶ。

1. カメラの射影行列を用いて、2Dバウンディングボックスをオブジェクトのための錐台3D探索空間(多分、どの点がオブジェクトか判明してないため「探索」とつけている)へ拡張することができる。この錐台3D探索空間内のすべての点をfrustum point cloud(フラスタム点群)と呼ぶことにする(図4(a))。
2. 錐台の向きは2Dバウンディングボックスの位置ごとに異なり、その影響でフラスタム点群の位置に大きな変動が生まれる(図4(a))。そこで、錐台の中心軸を錐台方向へ回転させることで点を正規化させる(図4(b)、ここで言う正規化は値の拡大縮小ではない、座標系をずらすことである)。

![fig4](img/FPf3ODfRD/fig4.png)

### 3D Instance Segmentation
2DCNNを使って深度マップから3Dオブジェクトの位置(3Dバウンディングボックス)を直接回帰する方法があるが、図3に示すように、この方法はoccluding objectsとbackground clutterの問題に対処する必要があるため簡単ではない。

![fig3](img/FPf3ODfRD/fig3.png)

物理的な空間では、オブジェクトは距離的に分離されている傾向があるため、著者らは2D深度マップを使用する手法に代わって距離情報を元に処理を行う3D点群を用いた手法を採用する。Mask-RCNNと同様に、錐台内の点群にPointNetベースのネットワークを使用して3Dインスタンスセグメンテーションを行う。これを使うことにより、ローカル座標系における3Dバウンディングボックスの中心を予測できる(図4(c))。

#### 3D Instance Segmentation PointNet
このネットワークは錐台内の点群を取り、各点の確率スコアを予測する。このスコアは、その点が対象オブジェクトに属する可能性を示す。この時、各錐台の中には一つの関心のあるオブジェクトが入っている。しかしながら、そのオブジェクトはclutterやオクルージョンの影響を受けている可能性がある。そこで、著者らのPointNetはオブジェクト認識とオクルージョンやclutterのパターンの学習を行う(学習を行うと言っても、普通にPointNetで処理しているだけっぽい)。

ここで、より良い予測(マルチクラスの場合)が行える様に、2D領域提案時に予測したクラス予測値(one-hot class vector)を中間点群特徴と連結して処理する。こうすることで、このネットワークは与えられたクラス情報に沿った確率スコアの予測を行うことができる。

3D Instance Segmentation PointNetの出力である点ごとの確率スコアに沿って関心対象とされている点を抽出する(図2の"masking")。

処理の並進不変性を高めるため、抽出された点群の重心を原点とする座標系へ点群を変換する(図4(c))。  
ただし、この時に抽出された点群のみを使って座標値を0~1へ変換するなどの拡大縮小は行わない。理由は実サイズがボックス推定の役に立つためである。  
ここの座標変換と前の円錐台回転が3D検出で役に立つことを実験で示している。

### Amodal 3D Box Estimation
このモジュールは、分割された点群が与えられたときにオブジェクトのamodal oriented 3D bounding box(一部が見えてない状態のオブジェクトの領域ボックス)を推定する。

#### Learning-based 3D Alignment by T-Net
この段階でも図4(c)を見ればわかる通り、実際のオブジェクトが存在しその中心点であろう位置からまだ離れている可能性がある。そこで、light-weight regression PointNet(T-Net)を用いてオブジェクトの真の中心位置を推定する(図4(d))。T-NetはオリジナルのPointNetのT-Netと同様のものである。

[※ light-weight regression PointNetは軽い回帰を行うPointNet、つまりPointNetそのものの亜種ではなくPointNetの一部分を指していると考えたほうがよさそう]

#### Amodal 3D Box Estimation PointNet
box estimation networkはamodal bouding boxesを予測する(図4(d))。ネットワークアーキテクチャはPointNetとほぼ同様であるが、最後の出力をクラス予測から3Dバウンディングボックスパラメータの回帰に変更する。

3Dバウンディングボックスパラメータは中央値$(c_ {x}, c_ {y}, c_ {z})$、サイズ$(h, w, l)$、heading angle $\theta$である。3Dバウンディングボックスの中心推定は「残差」アプローチによって決まる。これは、box estimation networkが出力した中心残差、maskingされた点の重心、T-Netから算出された以前の中心残差を組み合わし、最終的な絶対的な中心座標を回帰する(式1)。

$$
C_{p r e d}=C_{m a s k}+\Delta C_{t-n e t}+\Delta C_{b o x-n e t} \tag{1}
$$

また、ボックスサイズとheading angleは[1,2]に従い、分類と回帰公式のハイブリッドを使う。具体的な内容は省略。

[※ 「絶対的な」はおそらく実世界の採寸、最終的な位置などの意味を指すと思われる。]

### Training with Multi-task Losses
著者らはマルチタスク損失(式2)を用いて3つのネットワーク(3D instance segmentation PointNet, T-Netとamodal box estimation PointNet)を最適化する。分類問題にはソフトマックス、回帰にはsmooth-$l_ 1$損失が使われる。

$$
\begin{aligned} L_{\text {multi}-\text {task}}=& L_{\text {seg}}+\lambda\left(L_{c 1-r e g}+L_{c 2-r e g}+L_{h-c l s}+\right.\\ & L_{h-r e g}+L_{s-c l s}+L_{s-r e g}+\gamma L_{corner} ) \end{aligned} tag{2}
$$

式(2)はT-Netの$L_ {c1-reg}$、box estimation netの中心回帰の$L_ {c2-reg}$、$L_ {h-cls}$と$L_ {h-reg}$のheading angle予測損失、$L_ {s-cls}$と$L_ {h-reg}$のボックスサイズから構成されている。$L_{corner}$は後ほど。

#### Corner Loss for Joint Optimization of Box Parameters
上記の3つのネットワークの損失を足し合わせた損失だけでは3つのパラメータが個々に最適化されない(例:中心とサイズは正確だがheading angleがずれ、3D IoU値がheading angleに依存する)。そこで、IoU測定法の下、3つのパラメータを共同で最適化する、corner損失と呼ばれる新規正則化損失(式3)を追加する。

$$
L_{\text {corner}}=\sum_{i=1}^{N S} \sum_{j=1}^{N H} \delta_{i j} \min \left\{\sum_{k=1}^{8}\left\|P_{k}^{i j}-P_{k}^{*}\right\|, \sum_{i=1}^{8}\left\|P_{k}^{i j}-P_{k}^{* *}\right\|\right\} \tag{3}
$$

この損失は、予測した3Dボックスとground truth boxにある8つの角の距離比較を行っている。詳細は省略。

## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. [S. Ren, K. He, R. Girshick, and J. Sun. Faster r-cnn: Towards real-time object detection with region proposal networks. In Advances in neural information processing systems, pages 91–99, 2015.](https://arxiv.org/pdf/1506.01497.pdf)
2. [A. Mousavian, D. Anguelov, J. Flynn, and J. Kosecka. 3d bounding box estimation using deep learning and geometry. arXiv preprint arXiv:1612.00496, 2016.](https://arxiv.org/abs/1612.00496)

## 会議
CVPR 2018

## 著者
Charles R. Qi, Wei Liu, Chenxia Wu, Hao Su, Leonidas J. Guibas.

## 投稿日付(yyyy/MM/dd)
2017/11/22

## コメント
なし

## key-words
Point_Cloud, Detection, RGB_Image, Depth_Image

## status
省略

## read
A, I, M