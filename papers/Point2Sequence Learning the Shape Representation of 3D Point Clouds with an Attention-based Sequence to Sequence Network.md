# Point2Sequence Learning the Shape Representation of 3D Point Clouds with an Attention-based Sequence to Sequence Network

## どんなもの?
点群から特徴を捉える際の局所領域内の異なるエリアの相関性などの細かい文脈情報を保持するためのモデルを提案した。領域の関係性を把握するためにRNNとattention機構を取り入れている。

## 先行研究と比べてどこがすごいの?
論文中の主張では、ShapeContextNetやDGCNNなどの既存の深層学習を用いた点群の特徴抽出モデルは局所領域の特徴抽出にhand-crafted(手作業)またはexplicit ways(明示された方法)な特徴を使っている。その結果、局所領域内のエリア間の相関などのきめ細かい文脈情報を保持することが困難になっている。この文脈情報も重要な情報を保持しており、形状解析に必要なものである。Point2Sequenceでは新たな暗黙的な手法を使い、その問題を解決する。

## 技術や手法のキモはどこ?
下のfig2を見ての通り、(a)から(f)までのパーツに分かれている(タスクによって(e)か(f)を選択する)。

![fig2](img/PLtSRo3PCwaAbStSN/fig2.png)

このモデルでは以下の工程を踏む。
1. (a)ではN個の点群PからM個の点群P'を選び出す。P'={p'_j∈R**3,j=1,2,...,M}であり、p'_jは局所領域{R_1,...,R_j,...,R_M}の中心点である。

![fig1](img/PLtSRo3PCwaAbStSN/fig1.png)

## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
-
-

### 論文関連リンク
1.
2.

### 会議
AAAI 2019

### 著者/所属機関

### 投稿日付(yyyy/MM/dd)

## コメント
