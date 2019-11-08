# Faster R-CNN: Towards Real-Time Object Detection with Region Proposal Networks

元の論文の公開ページ : [arxiv](https://arxiv.org/abs/1506.01497)
Github Issues : [#54](https://github.com/Obarads/obarads.github.io/issues/54)

## どんなもの?
オブジェクト検知ネットワークと領域提案アルゴリズムをEnd-to-Endの単体のネットワークに統合したFaster R-CNNを提案した。

## 先行研究と比べてどこがすごいの?
既存の研究では領域提案の時間がボトルネックになっている。本論文で提案するネットワークはその提案の計算をほぼコストフリーにする。

## 技術や手法のキモはどこ? or 提案手法の詳細

全体の構造は図2の通り。Faster-R-CNNはRegion Proposal Network(RPN)とFast R-CNN検知器(RoI pooling以降の構造)の2つのモジュールからなる単体のネットワークである。

![fig2](img/FRTRODwRPN/fig2.png)

### Region Proposal Network(PRN)
PRNは画像を取り込み、objectnessなスコア付きの長方形のオブジェクト提案を行う(objectnessはオブジェクトっぽさ)。これらのプロセスはfully convolutional network(FCN)で作られる。これは最終的な目標にFast R-CNNと共通の畳み込み層のセットを共有することがあるためである。

図3の左に示す内容を説明する。領域提案を行うため、最後の共有畳み込み層によって出力された畳み込み特徴マップ上でsmall networkをスライドさせる。small networkは入力として、n\*nの入力畳み込み特徴マップの空間的なwindow(図3ではsliding window)を取る。このsliding windowは低次元の特徴へ写像される。この特徴はbox-regression層(reg)とbox-classification層(cls)に渡される。

![fig3](img/FRTRODwRPN/fig3.png)

#### Ancchors
各sliding windowの位置において、同時に複数の領域提案を予測する。この時、各位置の最大提案数をkで表す。よってreg層は4k、cls層は2kの出力(regは一つの提案につき、4つの座標に関する回帰値、clsは2つのオブジェクトであるかどうかの分類値を出力する、詳細は損失関数へ)を行う。k個の提案は、アンカーと呼ばれるk個の参照ボックスを基準にしてパラメータ化される。アンカーはsliding windowの中心にあり、スケールと縦横比が関連付けられている。デフォルトでは3つのスケールと3つの縦横比を使って各sliding windowの位置で9個のアンカーが生成される。

#### Translation-Invariant Anchors
自分たちの提案手法は並進不変(論文関連リンク2がわかりやすい)である。これは論文関連リンク3と同様、提案手法のネットワークがネットワークのストライドの合計次第の並進不変を持つからである。

#### Multi-Scale Anchors as Regression References
提案するマルチスケールなアンカーを図1の(c)に示す。以下に、図1にある(a)\~(b)の手法について説明する。

- (a)は複数のサイズ変更された画像からそれぞれのサイズに合った特徴マップを生成する。有用性を持っているが時間がかかる。
- (b)は特徴マップの上で複数の縮尺のsliding windowを使用する(multiple filter sizes)。異なるアスペクト比とスケールのモデルは異なるサイズのフィルタを使って別々にトレーニングされる(このフィルタをフィルターのピラミッドともいう)。この場合、(a)同様の処理がなされる。
- (c)は提案したアンカーベースの手法であり、アンカーのピラミッド上に作られる。複数のスケールとアスペクト比のアンカーボックスを参照(multiple references)して境界ボックスを分類または回帰する。これは単一の画像と特徴マップにのみ依存しており、単一のサイズのフィルタ(sliding window)を使用する。

つまり、(c)は(b)のように複数のサイズのフィルターを使わないため、それに必要な処理を省ける。

![fig1](img/FRTRODwRPN/fig1.png)

#### Loss Function
RPNをレーニングするにあたってそれぞれのアンカーに2値クラスラベル(オブジェクトかそうでないか)を割り振る。ラベルの振り方とそれに関する説明はは以下のようになる。

- positiveラベル  
  以下の二つのどちらかに合うものをpositiveのラベルとする。

  1. 最も高いIntersection-over-Union(IoU)を持つアンカーが、ground-truthボックスと重複する。
  2. アンカーとground-truthボックスがIoUで0.7以上重複している。

  尚、一つのground-truthボックスが複数のアンカーにpositiveのラベルを割り振ることがある。普段は2つめの条件で十分にpositiveな標本を決めることができるが、ごくまれに2つ目の条件でpositiveラベルの標本を見つけることができない場合があるため、一つ目の条件を適応している。

- negativeラベル  
  negativeラベルの条件は次の一つのみ。
  
  1. アンカーとground-truthボックスがIoUで0.3以下重複している。  
  
positiveでもnegativeでもないアンカーはトレーニングには使われない。以上の定義があるとき、最小化する目的関数をFast R-CNN(論文関連リンクの5)に従って式(1)のように定義する。
  
![eq1](img/FRTRODwRPN/eq1.png)

ここで、
  
1. iはミニバッチ中のアンカーのインデックスである。
1. $ p_i $はiのアンカーがオブジェクトである予測確率である。$ p_i^* $はアンカーがpositiveなら1、negativeなら0である。
1. $ t_i $は予測した境界ボックスの座標を4つの値でパラメーター化させたベクトルである。4つのパラメータについては式(2)に示す。$ t_i^* $はpositiveアンカーに関連するground-truthボックスの4の記述のベクトルである。
1. 分類損失$ L_{cls} $は2クラス(オブジェクトかそうでないか)のlog損失です。回帰損失$ L_{reg} $は、$ L_{reg}(t_i,t_i^\*)=R(t_i-t_i^\*) $である。Rは論文関連リンクの5で定義されているrubust損失関数(smooth L1)である。
1. $ p_i^*L_{reg} $は損失関数はpositiveアンカーのみで活性化し、そのほかでは無効になる。
1. cls層とreg層の出力はそれぞれp_iとt_iからなる。
1. 二つの項は$ N_{cls} $と$ N_{reg} $で正規化され、λによって重みづけされる。実装では、$ N_{cls} $をmini-batchサイズ($ N_{cls} $=256)に、$ N_{reg} $をアンカーの位置の数($ N_{reg} $\~2400)で正規化している。λはデフォルトで10に設定している。

境界ボックスの回帰のために論文関連リンクの6に従い、4つの座標のパラメータを適応する。これを式(2)に示す。

![eq2](img/FRTRODwRPN/eq2.png)

この時、
1. xとyはボックスの中央座標、wとhはそれぞれ幅と高さである。
2. 変数$ x, x_a, x^* $はそれぞれ予測したボックス, アンカーボックス, ground-truthボックスである(y, w, hも同様)。

この式は、アンカーボックスからすぐ近くのground-truthへの境界ボックスの回帰だと考えられる。最終的にFast R-CNNへ渡す領域はNMSを用いて渡しているらしい(論文関連リンクの8参照、節3.1からまともに読んでいない)。

他にもトレーニング戦略や、RPNとFast R-CNN検知器との特徴マップの共有の記述がある。

## どうやって有効だと検証した?
省略

## 議論はある?
省略

## 次に読むべき論文は?
- [Yin Zhou and Oncel Tuzel. 
VoxelNet: End-to-End Learning for Point Cloud Based 3D Object Detection. CVPR 2018.](https://arxiv.org/abs/1711.06396)

## 論文関連リンク
1. [みんな大好き物体検出のデファクトスタンダードFaster R-CNNの特許を読んだ - Qiita](https://qiita.com/yu4u/items/6bc9571c19181c1600a7)
2. [machine learning - What is translation invariance in computer vision and convolutional neural network? - Cross Validated](https://stats.stackexchange.com/questions/208936/what-is-translation-invariance-in-computer-vision-and-convolutional-neural-netwo)
3. [J. Long, E. Shelhamer, and T. Darrell, “Fully convolutional networks for semantic segmentation,” in IEEE Conference on Computer Vision and Pattern Recognition (CVPR), 2015.](https://arxiv.org/abs/1411.4038)
4. [論文紹介: Fast R-CNN&Faster R-CNN](https://www.slideshare.net/takashiabe338/fast-rcnnfaster-rcnn)
5. [R. Girshick, “Fast R-CNN,” inIEEE International Conference on Computer Vision (ICCV), 2015.](https://arxiv.org/abs/1504.08083)
6. [R. Girshick, J. Donahue, T. Darrell, and J. Malik, “Rich feature hierarchies for accurate object detection and semantic seg-mentation,” in IEEE Conference on Computer Vision and Pattern Recognition (CVPR), 2014.](https://arxiv.org/abs/1311.2524)
7. [最新のRegion CNN(R-CNN)を用いた物体検出入門 ~物体検出とは? R-CNN, Fast R-CNN, Faster R-CNN, Mask R-CNN~ - Qiita](https://qiita.com/arutema47/items/8ff629a1516f7fd485f9)
8. [私がわかりにくいと思った「Faster RCNN」のポイントの解説 - のんびりしているエンジニアの日記](http://nonbiri-tereka.hatenablog.com/entry/2018/03/07/075835)

## 会議
NIPS 2015

## 著者
Shaoqing Ren, Kaiming He, Ross Girshick and Jian Sun

## 投稿日付(yyyy/MM/dd)
2015/07/04

## コメント
Faster R-CNNの特許がある(論文関連リンクの1)。VoxelNetの予習用に見たため、省略多め。

## key-words
RGB_Image, Detection, CV, Paper

## status
省略