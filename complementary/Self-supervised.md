# self-supervised
## About
self-supervisedとは、アノテーションなしで有用な特徴量を抽出できるネットワークを構築すること。ネットワークを構築するにあたって、pretext taskと呼ばれる事前トレーニングを行う。通常、下図の様にfine-tuningや転移学習でネットワークの性能を上げるために事前学習済みのモデルを使う。通常の事前訓練とself-supervised学習との違いは以下の通り。

- **通常の事前学習**  
  教師ありのデータセットを使って事前訓練を行う。分類問題などをするだけで、ネットワーク移転後の性能が上がる。しかし、データセットは教師ラベルがあるもののみしか使えない。

- **self-supervised学習**  
  教師ラベルがないデータセットを使いpre textタスクと呼ばれる疑似学習を事前訓練として行う。よって、使えるデータが無限大にある(YahooやGoogleで出てきた画像でも使える)。

![fig1](img/self-supervised/fig1.png)

## fine-tuningとは?
fine-tuningについて\[3\]では以下のように説明している。

あらかじめ汎用性の高い大規模教師付データセットでネットワークを学習しておき、これを初期値としてターゲットタスクの学習データでさらに細かい学習を進める（＝Fine-tuning）  
(Unsupervised pre-trainingとは違う概念であることに注意）

例えば、ImageNetのデータセットで訓練させたAlexNetの出力層だけを取り除き、PASCAL VOC 2007で分類や検知を行うために出力層を付け替え、fine-tuning(PASCAL VOC 2007の訓練データでさらに訓練)する。

\[2\]のImage Classificationの実験でも言っているが、最初の方の層は入力の意味的な特徴量を捉えるが、後ろの層はタスク固有の形式に特化する。なので、タスク固有の形式に特化してしまった出力層を取り外しても問題ない。  
fine-tuningの恩恵は、適応先のモデルの精度向上である。

## 転移学習とは?
あるモデルを訓練させ、訓練後は重みを固定し(出力層のみ取り外して)特徴抽出器として扱うことである。出力層をタスクに合わせたものに変更せずに、特徴抽出器として入力の特徴量を出力させて、SVMに先ほどの出力を入力して分類するということもできる。

## pretext taskとは?
fine-tuningや転移学習で使われる事前学習させたモデルは教師あり学習のモデルであることが多い。理由としてはそちらのほうが性能が良いからである。しかし、ラベルあり以外の画像は無限に近い量であること、ラベル付けのコストが高いことを踏まえると、教師なしで事前学習されたモデルでありながら教師ありの事前学習モデルに勝るとも劣らない性能を持ち合わせることが理想的である。これらの目標を達成するために、教師なし事前学習のタスクとして生まれたのがpretext task(擬似的なタスク)である。

pretext taskはラベルを使わなければ基本的にどんなタスクでも良い。共起表現っぽいこと(\[4\]もしくは\[6\])をさせても、ジグゾーパズル(\[2\]もしくは\[5\])をさせても良い。

## Technical terms
- **target task**  
ネットワークで行いたい目的のタスク。分類問題とかのこと。

- **pretext task**  
target taskをこなす前に行う仮のタスク。このタスクを行うことで、target taskを解くカギになる画像が持っている形状情報等の抽出が可能なネットワークを作ることがこのタスクの目的である。例えば、ネットワークにジグゾーパズルを解かせたり、画像の向きを当てさせたりする。

- **low-level statistics(informationsも?)**  
pretextタスクをこなすためだけの情報。edge continuity、the pixel intensity/color distributionやchromatic aberration等が含まれるが、これらの情報はtargetタスクにおいて有用ではない。

- **high-level primitives(informationsも?)**  
targetタスクで必要なオブジェクトの形状などの情報。オブジェクトの形状を認識できるネットワークは、たとえ色が変わったりしても正しい認識が可能となるため有用である。

- **shortcuts**  
参考文献2より。pretextタスクをこなす為だけの手法を指す。この手法を取り入れたネットワークはtargetタスクでいまいちな結果を残す。

## Reference
1. [教師なし学習特徴表現の動向](https://www.slideshare.net/cvpaperchallenge/un-self-supervised-representation-learning-cvpr-2018)
2. [Mehdi Noroozi nad Paolo Favaro. Unsupervised Learning of Visual Represejtation by Solving Jigsaw Puzzles. 2016.](https://arxiv.org/abs/1603.09246)
3. [画像認識分野におけるdeep learningの発展と最新動向](http://www.nlab.ci.i.u-tokyo.ac.jp/pdf/asj20141215.pdf)
4. [Doersch, C., Gupta, A., Efros, A.A.: Unsupervised visual representation learning by context prediction. ICCV (2015)](https://arxiv.org/abs/1505.05192)
5. [Paper-Reminder Unsupervised Learning of Visual Representations by Solving Jigsaw Puzzles](https://obarads.github.io/papers/#Unsupervised%20Learning%20of%20Visual%20Representations%20by%20Solving%20Jigsaw%20Puzzles.md)
6. [Paper-Reminder Unsupervised Visual Representation Learning by Context Prediction](https://obarads.github.io/papers/#Unsupervised%20Visual%20Representation%20Learning%20by%20Context%20Prediction.md)

## key-words
Self-supervised, 2D_Image, Fine-tuning, Transfer_learning