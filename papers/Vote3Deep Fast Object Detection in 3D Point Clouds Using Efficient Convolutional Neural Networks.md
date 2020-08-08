# Vote3Deep: Fast Object Detection in 3D Point Clouds Using Efficient Convolutional Neural Networks

元の論文の公開ページ : [arxiv.org](https://arxiv.org/abs/1609.06666)  
Github Issues : []()  

## どんなもの?
##### グリッドごとに点群を分割した表現をCNNに入力し、CNNの出力層は検出スコアを返す手法を用いた検出器を提案した。
- この提案は[1]からインスピレーションを得ており、[1]の手法に基づいて開発されている。

## 先行研究と比べてどこがすごいの? or 関連事項
##### 省略

## 技術や手法のキモはどこ? or 提案手法の詳細
#### 手法の概要
##### 最初に、グリッド状に点群を離散化する。
- [1]と同じ。

##### 次に、離散化した表現をCNNに入力する。
- 入力された表現はスパースであるため、点が含まれている領域(Cell)のみを計算する。
- このプロセスでは、出力層が検出スコアを予測する。
- また、[1]でしていたように、N個の異なる方向から同じプロセスを行い、オブジェクトの向きが変わっていたとしてちゃんと検知できるようにする。
- クラスが同じインスタンスはサイズが似ているという前提のもと、**各クラスごとに固定サイズのバウンディングボックスを想定する。**
    - これは回帰処理をなくすため。
    - 訓練セットの95%のGTバウンディングボックスに基づいて、関心のある[(前景の)]各クラスの3Dバウンディングボックスのサイズを選択する。

##### 最後に、Nono maximum suppressionで重複する検出領域をまとめる。
- [1]と同じ。


## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. [D. Z. Wang and I. Posner, “Voting for Voting in Online Point Cloud Object Detection,” Robotics Science and Systems, 2015. ](https://ieeexplore.ieee.org/document/6205760)[5]


## 会議, 論文誌, etc.
ICRA 2017

## 著者
Martin Engelcke, Dushyant Rao, Dominic Zeng Wang, Chi Hay Tong, Ingmar Posner

## 投稿日付(yyyy/MM/dd)
2016/09/21

## コメント
なし

## key-words
CV, Paper, Point_Cloud, Detection, 修正

## status
修正

## read

## Citation
