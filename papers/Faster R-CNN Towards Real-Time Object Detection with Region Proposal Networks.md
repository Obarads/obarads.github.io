# Faster R-CNN: Towards Real-Time Object Detection with Region Proposal Networks

## どんなもの?
オブジェクト検知ネットワークと領域提案アルゴリズムをEnd-to-Endの単体のネットワークに統合したFaster R-CNNを提案した。

## 先行研究と比べてどこがすごいの?
既存の研究では領域提案の時間がボトルネックになっている。本論文で提案するネットワークはその提案の計算をほぼコストフリーにする。

## 技術や手法のキモはどこ?
Faster-R-CNNはRegion Proposal Network(RPN)とFast R-CNNの2つのモジュールからなる単体のネットワークである。

### **Region Proposal Network(PRN)**
PRNは画像を取り込み、objectnessなスコア付きの長方形のオブジェクト提案を行う(objectnessはオブジェクトっぽさ)。これらのプロセスはfully convolutional network(FCN)で作られる。これは最終的な目標にFast R-CNNと共通の畳み込み層のセットを共有することがあるためである。

図3の左に示す内容を説明する。領域提案を行うため、最後の共有畳み込み層によってsmall networkをconvolutional feature mapの出力上でスライドさせる。このsmall networkは入力としてn\*nの入力convolutional feature mapの空間的なwindow(図3ではsliding window)を取る。このsliding windowは低次元の特徴へ写像される。この特徴はbox-regression層(reg)とbox-classification層(cls)に渡される。このとき、それぞれの位置の提案の最大個数はkとする。k個の提案はk個の参照ボックスに関連してパラメーター化される。この時、この参照ボックスをAnchor(アンカー)と呼ぶ。

![fig3](img/FRTRODwRPN/fig3.png)

- **Ancchors**  
    各sliding windowの位置において、同時に複数の領域提案を予測する。アンカーはsliding windowの中心にあり、スケールと縦横比が関連付けられている。デフォルトでは3つのスケールと3つの縦横比を使って各sliding windowの位置で9個のアンカーが生成される。

- **Translation-Invariant Anchors**  
    自分たちの提案手法は並進不変(論文関連リンク2がわかりやすい)である。これは論文関連リンク3と同様、提案手法のネットワークがネットワークのストライドの合計次第の並進不変を持つからである。

- **Multi-Scale Anchors as Regression References**  
    提案するマルチスケールなアンカーを図1の(c)に示す。以下に、図1にある(a)\~(b)の手法について説明する。
    - (a)は複数のサイズ変更された画像からそれぞれのサイズに合った特徴マップを生成する。有用性を持っているが時間がかかる。

    - (b)は特徴マップの上で複数の縮尺のsliding windowを使用する。異なるアスペクト比とスケールのモデルは異なるサイズのフィルタを使って別々にトレーニングされる(このフィルタをフィルターのピラミッドともいう)。この場合、(a)同様の処理がなされる。

    - (c)は複数のスケールとアスペクト比のアンカーボックスに関する境界ボックスを分類または回帰する。それは画像と単一サイズの特徴マップと単一サイズのフィルターだけに依存する。




## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
-
-

### 論文関連リンク
1. [みんな大好き物体検出のデファクトスタンダードFaster R-CNNの特許を読んだ - Qiita](https://qiita.com/yu4u/items/6bc9571c19181c1600a7)
2. [machine learning - What is translation invariance in computer vision and convolutional neural network? - Cross Validated](https://stats.stackexchange.com/questions/208936/what-is-translation-invariance-in-computer-vision-and-convolutional-neural-netwo)
3. [J. Long, E. Shelhamer, and T. Darrell, “Fully convolutional networks for semantic segmentation,” in IEEE Conference on Computer Vision and Pattern Recognition (CVPR), 2015.](https://arxiv.org/abs/1411.4038)

### 会議
NIPS 2015

### 著者
Shaoqing Ren, Kaiming He, Ross Girshick and Jian Sun

### 投稿日付(yyyy/MM/dd)
2015/07/04

## コメント
Faster R-CNNは特許がある(論文関連リンクの1)。