# Voting for Voting in Online Point Cloud Object Detection

元の論文の公開ページ : [robots.ox.ac.uk](http://www.robots.ox.ac.uk/~mobile/Papers/2015RSS_wang.pdf)  
Github Issues : []()  

## どんなもの?
##### 点群をグリッドへ離散化した後に、スライディングウィンドウアプローチを適応してオブジェクトの検出を行う手法を提案した。
- より具体的には、ブーティングスキームを利用してsparse nature of the problem[(問題となるスパース特性?みたいな意味かな)]を利用し、オブジェクト推定を行う。
- 通常、そのまま3D離散空間にスライディングウィンドウを組み込む場合、膨大な時間がかかってしまうが、本提案アルゴリズムはかなりの速度でその処理をこなせる。
- [点群をグリッドへ離散化した場合、殆どのセル(離散化した際にできた小分けの領域)には点群ががない(つまり元の空間がスパースである)。本提案では、これらのなにも含まないセルにうまく対処する提案をしている。]
- [本提案は、車載LiDARなどの上下が決まっている点群のみを想定する。]


## 先行研究と比べてどこがすごいの? or 関連事項
##### 省略

## 技術や手法のキモはどこ? or 提案手法の詳細
### 手法の概要
##### はじめに、点群をグリッド状に離散化した特徴ベクトル表現に変換する。
- 変換は図1の右上の通り。
- グリッドは固定解像度である。
- 点を含まないセルはゼロ特徴ベクトルにする。図で言えば、中央の左で、色のついていないセルがそれである。

##### 次に、表現上でスライディングウィンドウを設け、各ウィンドウ位置でそのウィンドウ内のセルの特徴ベクトルをスタックした単体の長い特徴ベクトルを作成する。
- 図で言えば、左下のように赤枠ウィンドウをずらしてそれごとに特徴量を作成する。

##### 次に、この長い特徴ベクトルをSVM等の分類器に入れて、そのウィンドウが車などのオブジェクトの境界であるかどうか判断する。
- 分類器の検出スコアに基づいて判断を行う。
- [ここに**提案手法の肝**がある。この部分はまだ見ていない。]

##### 最後に、Non-Maximum Suppressionを適応して重複する領域をまとめ上げる。
- 具体的には、[2]の貪欲アプローチを使用する。

##### 問題への対応
- 3Dはスケールが絶対的であるため、画像のような縮尺の問題が存在しない。
- オブジェクトの方向に対する問題は存在するため、オブジェクトが垂直方向に直立していると仮定して、工夫を加える。
    - 具体的には、360度をN個方向のビンに分割し、各ビン方向に回転した点群のために、N回の同じ検出プロセスを行う。
    - [要は点群を様々な角度から点群を見て特徴量を得る。]

![fig1](img/VfViOPCOD/fig1.png)

### SLIDING WINDOW, SPARSE CONVOLUTION AND VOTING (著者が言う提案手法の肝)
##### スパース畳み込みとブーティング(voting)処理が数学的に同じであることを証明する。これによって、sparse nature of the problemを活用し、検出スコアを効率的に計算できるようになる。
- **著者らはこれをこの論文の主な貢献とする。**
- スライディングウィンドウ検出において、線形分類器は畳み込みと同等である。それゆえ、高速フーリエ変換等のテクニックを使って検出スコアを効率的に算出している[1]。
- しかしながら、この手法は3Dの場合には適用されない。
    - Sparsity in the spatial domain does not imply sparsity in the frequency domain, thus the Fourier transform of the sparse feature grid will be dense.[?]
- ここで説明する手法は、線形分類機の場合に飲み適応可能である。
- **ここでは、この証明を省略する。[自分にとって今はこれが必要ではないため。]**

## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. [C. DuboutA and F. Fleuret. Exact Acceleration of Linear Object Detectors. In Proceedings of the European Conference on Computer Vision (ECCV), pages 301–311, 2012.](https://link.springer.com/content/pdf/10.1007%2F978-3-642-33712-3_22.pdf)[3]
2. [P.F. Felzenszwalb, R.B. Girshick, D. McAllester, and D. Ramanan. Object Detection with Discriminatively Trained Part-Based Models. Pattern Analysis and Ma-chine Intelligence, IEEE Transactions on, 32(9):1627– 1645, Sept 2010. ISSN 0162-8828.](http://cs.brown.edu/people/pfelzens/papers/lsvm-pami.pdf)[6]

## 会議, 論文誌, etc.
Proceedings of Robotics: Science and Systems

## 著者
Dominic Zeng Wang and Ingmar Posner

## 投稿日付(yyyy/MM/dd)
2015/??/??

## コメント

## key-words
Paper, CV, Detection, Point_Cloud, 省略

## status
省略

## read

## Citation
