# Context Prediction for Unsupervised Deep Learning on Point Clouds

## どんなもの?
ラベルなし、生の点群を用いて2つの点群区分の空間的関係性を予測するself-supervised手法を提案した。

## 先行研究と比べてどこがすごいの?
Unsupervised Visual Representation Learning by Context Prediction(論文関連リンク3)の点群バージョンであり、多分これが点群分野で初めてのself-supervisedな手法となる。点群の教師なし学習で使われる類似性測定基準はEarth Mover's Distance(EMD)とChamfer distanceに依存している。特によく使われるChamfer distanceは点群が多ければ多いほど非効率的になり、さらに特定の異常なケースでは不正確な扱い方をされる(論文関連リンク2)。提案手法は分類問題であるためそのような類似性測定基準を使わずとも学習できる。

## 技術や手法のキモはどこ?


![fig2](img/CPfUDLoPC/fig2.png)

## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?

### 論文関連リンク
1. [Jonathan Sauder and Bjarne Sievers. Context Prediction for Unsupervised Deep Learning on Point Clouds. 2019.](https://arxiv.org/abs/1901.08396v1)
2. [Achlioptas Panos, Diamanti Olga, Mitliagkas Ioannis, and Guibas Leonidas. Representation learning and adversarial generation of 3d point clouds. 2017.](https://arxiv.org/abs/1707.02392)
3. [Carl Doersch, Abhinav Gupta, and Alexei A. Efros. Unsupervised Visual Representation Learning by Context Prediction. 2015.](https://arxiv.org/abs/1505.05192)

### 会議
なし(2019/01/26現在)

### 著者
Jonathan Sauder and Bjarne Sievers.

### 投稿日付(yyyy/MM/dd)
2019/01/26

## コメント
ついに出たか、この手の論文