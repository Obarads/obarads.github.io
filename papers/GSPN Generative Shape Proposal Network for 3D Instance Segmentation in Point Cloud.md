# GSPN: Generative Shape Proposal Network for 3D Instance Segmentation in Point Cloud

元の論文の公開ページ : https://arxiv.org/abs/1812.03320

## どんなもの?


## 先行研究と比べてどこがすごいの?
バウンドボックスによるオブジェクト検知はシンプルであるがあまり幾何学的形状の理解を必要としない(オブジェクトの境界に沿った分割を行わないため)。そのため、オブジェクト提案の領域が重複する箇所が発生する場合がある。また、オブジェクト提案はobjectness(物体っぽさ)をあまり考慮していない(Fast R-CNNなどが例)。これとは対照的にこの研究では幾何学的理解をより重視する手法を提案した。

## 技術や手法のキモはどこ? or 提案手法の詳細
オブジェクトを再構築し、オブジェクト提案を行うというanalysis-by-synthesis(合成による分析)戦略をとる。具体的には、本物のオブジェクトの分布を明確にした生成器から生成されたサンプルを引用することで候補オブジェクトを提案する。


著者らはpoint cloud向けに2D Mask R-CNNと似た構造をしているR-PointNetを提案した。重要なこととして、これは3Dオブジェクトを効率的に生成するGenerative Shape Proposal Network(GSPN)と名付けられたネットワークを使用する。

![fig2](img/GGSPNf3ISiPC/fig2.png)


## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. なし

## 会議
不明

## 著者
Li Yi, Wang Zhao, He Wang, Minhyuk Sung, Leonidas Guibas.

## 投稿日付(yyyy/MM/dd)
2018/12/08

## コメント
なし

## key-words
Point_Cloud, Semantic_Segmentation, Instance_Segmentation

## status
未完