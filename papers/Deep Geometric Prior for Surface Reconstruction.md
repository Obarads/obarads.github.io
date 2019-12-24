# Deep Geometric Prior for Surface Reconstruction

元の論文の公開ページ : [arxiv](https://arxiv.org/abs/1811.10943)  
Github Issues : 

## どんなもの?
表面再構成のための、深層学習を幾何学事前分布として使用した手法を提案した。
- 具体的には、Wisserstein距離を近似尺度を使って入力点群の一部分へ、local chart parameterizationを表現するニューラルネットを過剰適合させる。
    - このようなネットワークを点群の[一部分同士の]重複部分にフィットさせることで、一貫性を保ちつつ、多様なアトラスを計算できる。
    - このアトラスをサンプリングすることによって、入力点群に沿って近似させた表面の密な再構築を達成できる。
- 手順全体では訓練データや明確な正則化を必要としないにもかかわらず、良いパフォーマンスを出している。
    - 典型的なオーバーフィッティングを取り込まず、形状特徴に近似する。

## 先行研究と比べてどこがすごいの?

## 技術や手法のキモはどこ? or 提案手法の詳細

## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. なし

## 会議
CVPR 2019

## 著者
Francis Williams, Teseo Schneider, Claudio Silva, Denis Zorin, Joan Bruna, Daniele Panozzo

## 投稿日付(yyyy/MM/dd)
2018/11/27

## コメント
なし

## key-words
Point_Cloud, CV, Paper, Reconstruction, 修正

## status
修正

## read
A

## Citation
