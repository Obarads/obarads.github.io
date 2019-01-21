# Deep Clustring for Unsupervised Learning of Visual Features

## どんなもの?
convnetsを使った新しいend-to-endのclustring手法の提案をした。

## 先行研究と比べてどこがすごいの?


## 技術や手法のキモはどこ?
convnetを介した出力をクラスタリングして、その分割されたものを疑似ラベル(pseudo-labels)として扱い、式(1)を最適化する。

![eq1](img/DCfULoVF/eq1.png)

上の式のf_Θをconvnetの写像であり、Θは対応するパラメータたちを指す。また、N個の画像からなる学習データX={x_1, x_2, ..., x_N}とした時、良い特徴量を出力できるf_Θ\*が持つパラメータΘ\*を求める。ラベルの種類がk個あり、各画像x_nはラベルy_nと紐づけされている。パラメータ化された分類器gwはf_Θ(x_ｎ)を用いて正しいラベルを予測する。lは多項ロジスティック損失である。(1)は分類器のパラメータWとパラメータΘを最適化するための式である。


## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- Representation Learning with Contrastive Predictive Coding
- ConvNets and ImageNet Beyond Accuracy: Understanding Mistakes and Uncovering Biases

### 論文関連リンク
- https://www.slideshare.net/cvpaperchallenge/un-self-supervised-representation-learning-cvpr-2018
- ほぼこちらから引用: https://hazm.at/mox/machine-learning/computer-vision/clustering/deepcluster/index.html

### 会議
ECCV 2018

### 著者/所属機関
Mathilde Caron, Piotr Bojanowski, Armand Joulin, and Matthijs Douze

### 投稿日付(yyyy/MM/dd)
2019/1/21

## コメント
ここで言うrandom featuresはself-learningで生成した特徴量?