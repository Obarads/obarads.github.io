# Boosting Self-Supervised Learning via Knowledge Transfer

元の論文の公開ページ : https://arxiv.org/abs/1805.00385

## どんなもの?

## 先行研究と比べてどこがすごいの?

## 技術や手法のキモはどこ? or 提案手法の詳細
提案する手法は図2の様に4つのステップに分けられる。また、新たなpretextであるJigsaw++を提案した。訓練全体の流れは以下の通りである。

- **(a) Self-Supervised Learning Pre-Training**: pretext taskを使ってモデルを訓練する。
- **(b) Clustring**: 各画像をモデルに入力し、その中間表現をクラスタリングする。各クラスタごとにcluster centerを用意する。
- **(c) Extracting Pesudo-Labels**: 各特徴ベクトルに最も近いcluster centerを割り振る。これが擬似ラベルとなる。
- **(d) Cluster Classification**: ターゲットのアーキテクチャに換装し、擬似ラベルと擬似ラベルを生成するのに使われたデータセットを使って分類する。

![fig2](img/BSLvKT/fig2.png)

#### The Jigsaw++ Pretext Task
著者らはResNetではなくAlexNetによるPASCALの認識タスクに興味がある。

Jigsawタスク[1]に

## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. [M. Noroozi and P. Favaro. Unsupervised learning of visual representations by solving jigsaw puzzles. In ECCV, 2016.](https://arxiv.org/abs/1603.09246)
2. [鈴⽊智之. Self-supervised Learningによる特徴表現学習. (アクセス日時 2019/04/22)](http://hirokatsukataoka.net/temp/cvpaper.challenge/SSL_0929_final.pdf)

## 会議
CVPR 2018

## 著者
Mehdi Noroozi, Ananth Vinjimoor, Paolo Favaro, Hamed Pirsiavash.

## 投稿日付(yyyy/MM/dd)
2018/03/01

## コメント
なし

## key-words
2D_Image, Classification, Self-supervised

## status
未完