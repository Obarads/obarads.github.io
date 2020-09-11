# Focal Loss for Dense Object Detection 

元の論文の公開ページ : [arxiv.org](https://arxiv.org/abs/1708.02002)  
提案モデルの実装 : [facebookの実装](https://github.com/facebookresearch/fvcore/blob/fb679749e3ba2714ac66680c9207c96a7e8e06d1/fvcore/nn/focal_loss.py)※  
※Detectron -> Detectron2 -> fvcoreで探した

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。  
Note: 引用中の[*]は論文内の文献番号である。該当する論文は、論文関連リンクの各リストの末尾に基づいて調べられる。

## どんなもの?
##### dense detectorsの訓練中に発生する、前景と背景クラスの不均衡の問題に対処する損失を提案した。
- YOLOを始めとするone-stage detectors[(具体的にはdense detectors)]は、R-CNNのようなtwo-stage detectorsに精度の面で負けているが、この原因が訓練中の前景と背景クラスの不均衡によるものであると主張した。
  - [dense detectorsとあるが、YOLOなどのone-stage detectorsを中心とした話を展開している。]
  - [調べた限りだと、dense detectorsはYOLOなどで採用されている1セルごとにいくつかの境界線を生成する方法指すみたい。]
  - [今(2020年)では、dense detectors ≒ one-stage detectorsみたいな形式にはならないかも。(最近の2D検出器には疎いためわからん)]
- [この不均衡により、hard exampleとeasy exampleの問題が起こる。]
  - [hard exampleとeasy exampleの問題は、Bootstrapping (Hard negative miningとも)で取り扱われている。]
- R-CNNをもととした検出器はtwo-stage detectorの構造を持っており、これが不均衡に対処している。
  - proposal stage (e.g., Selective Sarch, RPN)によってオブジェクトの候補位置(cadidate object locations, サンプル)を少数(e.g., 1-2K)に抑え、背景を写したものをほとんど取り除いてくれる。その次のsecond classification stageでは、sampling heuristicsに基づいて前景と背景のバランスを保つ。
- これとは対象的に、one-stage detectorでは最大100k個の膨大なサンプルを処理する必要があり、これらのサンプルには分類が容易な背景のサンプル(easily classified background examples)が多く含まれている。
  - [このeasily classified background examplesはeasy exampleを指し、これの割合が大きいと学習効率が悪くなる。]
  - [また、この不均衡に対する他の方法は1章より、]
    - "While similar sampling heuristics may also be applied, they are inefficient as the training procedure is still dominated by easily classified background examples."
    - "This inefficiency is a classic problem in object detection that is typically addressed via techniques such as bootstrapping [33, 29] or hard example mining [37, 8, 31]."
- 著者らは、このクラス不均衡により効率的に対処するための損失であるFocal lossを提案した。
  - 1章より、"The loss function is a dynamically scaled cross entropy loss, where the scaling factor decays to zero as confidence in the correct class increases, see Figure 1. Intuitively, this scaling factor can automatically down-weight the contribution of easy examples during training and rapidly focus the model on hard examples."
  - [fig1は提案手法の詳細にて]
- また、この損失の効果を示すためのネットワークとしてRetinaNetを設計した。
- **"Finally, we note that the exact form of the focal loss is not crucial, and we show other instantiations can achieve similar results."**

##### Note
1. [Fast R-CNNとその派生ではbootstrapを使っていないことをOHEM[2]の論文の時点で言っている。]
   1. [2]より: "It may seem odd then that the current state-of-the-art object detectors, embodied by Fast R-CNN [14] and its descendants [24], do not use bootstrapping."
2. [Hard examples miningとHard negative miningの名称については、OHEM[2]の論文で述べられている。述べた内容は以下の通り。]
   1. "We use the term hard example mining, rather than hard negative mining, because our method is applied in a multi-class setting to all classes, not just a “negative” class."

## 先行研究と比べてどこがすごいの? or 関連事項
##### 省略

## 技術や手法のキモはどこ? or 提案手法の詳細
### 手法の概要
- Focal lossは、前景と背景クラス間に極端な不均衡(e.g. 1:1000)が存在するone-stage detectorsの訓練を想定した設計となっている。
- 提案されるFocal lossは、(binary) cross entropy(以下CE)損失を拡張した形となっている。

#### CE損失の定義とexamplesに関して
##### CEの定義を行う。
- CEを以下のように定義する。
- $$
  \mathrm{CE}(p, y)=\left\{\begin{array}{ll}
  -\log (p) & \text { if } y=1 \\
  -\log (1-p) & \text { otherwise }
  \end{array}\right. \tag{1}
  $$
  - $y \in\{\pm 1\}$はground-truthクラス
  - $p \in[0,1]$は、モデルが$y=1$である可能性を推定した値。
- 表記を楽にするために、$p_t$を定義(式(2))する。
- $$
  p_{\mathrm{t}}=\left\{\begin{array}{ll}
  p & \text { if } y=1 \\
  1-p & \text { otherwise }
  \end{array}\right. \tag{2}
  $$
- よって、$\mathrm{CE}(p, y)=\mathrm{CE}\left(p_{\mathrm{t}}\right)=-\log \left(p_{\mathrm{t}}\right)$とする。

##### 大量のeasy examplesによって、数の少ないクラスの学習が進みづらくなる。
- CEで学習した場合、図1の青曲線のような流れとなる。
- この図が示す損失で重要なのは、簡単に分類できる例$\left(p_{t} \gg .5\right)$が明らかに大きな損失を持つということ。
- easy examplesが大量にある場合、これらの損失が他の比較的レアなクラスを圧倒してしまう。
- ![fig1](img/FLfDOD/fig1.png)

##### クラスの不均衡に対する一般的なCE損失の拡張手法として$\alpha$-balanced CE損失を定義する。
- クラスの不均衡に対する一般的なCE損失の拡張手法は、重み付け係数$alpha$を導入したCE損失である。
  - クラスラベル1に対して、$\alpha \in[0,1]$
  - クラスラベル-1に対して、$1-\alpha$
- 実際には、クラスの頻度の逆数もしくはクロスバリデーションに基づいたハイパーパラメーター値がセットされる。
- $alpha_t$をバランスとして定義したとき、この重み付けされたCE損失である$\alpha$-balanced CE損失は

### 工夫
#### Focal Loss

### Balanced Cross Entropy
#### 

## どうやって有効だと検証した?
##### 省略

## 議論はある?
##### 省略

## 次に読むべき論文は?
##### なし

## 論文関連リンク
##### あり
1. [A. Shrivastava, A. Gupta, and R. Girshick. Training region-based object detectors with online hard example mining. In CVPR, 2016.](https://arxiv.org/abs/1604.03540)[31]

## 会議, 論文誌, etc.
##### ICCV 2017

## 著者
##### Tsung-Yi Lin, Priya Goyal, Ross Girshick, Kaiming He, Piotr Dollár

## 投稿日付(yyyy/MM/dd)
##### 2017/08/07

## コメント
##### なし

## key-words
##### Paper, CV, RGB_Image, Detection, 省略

## status
##### 省略

## read
##### I, A, M

## Citation
##### 未記入
