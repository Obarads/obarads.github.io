# Deep Geometric Prior for Surface Reconstruction

元の論文の公開ページ : [arxiv](https://arxiv.org/abs/1811.10943)  
提案モデルの実装 : [fwilliams/deep-geometric-prior](https://github.com/fwilliams/deep-geometric-prior)
Github Issues : 
Note: 記事の見方や注意点については、[こちら](/)をご覧ください。  
Note: 引用中の[*]は論文内の文献番号である。該当する論文は、論文関連リンクの各リストの末尾に基づいて調べられる。

## どんなもの?
##### 表面再構成のための、深層学習を幾何学事前分布として使用した手法を提案した。
- 具体的には、Wisserstein距離を近似尺度を使って入力点群の一部分へ、local chart parameterizationを表現するニューラルネットをoverfitさせる。
  - このようなネットワークを点群の[一部分同士の]重複部分にフィットさせることで、一貫性を保ちつつ、多様な[アトラス](https://en.wikipedia.org/wiki/Atlas_(topology))を計算できる。
  - このアトラスをサンプリングすることによって、入力点群に沿って近似させた表面の密な再構築を達成できる。
- 手順全体では訓練データや明確な正則化を必要としないにもかかわらず、良いパフォーマンスを出している。
  - 典型的なoverfittingを取り込まず、形状特徴に近似する。

##### ベンチマークは[1]を用いて計測する。
- [ModelNetとかかと思ってた。[1]については未確認。]

## 先行研究と比べてどこがすごいの? or 関連事項
##### 省略

## 技術や手法のキモはどこ? or 提案手法の詳細
### 手法の概要
- 全体像は図1の通り。

![fig1](img/DGPfSR/fig1.png)

##### 1. ニューラルネットワークでlocal chartを取得する。
- 滑らかな表面(smooth surface)$\mathbf{S} \in \mathbb{R}^3$から得られたノイズ込の点群$\mathcal{X}$を入力として受け取り、点$p$周りのlocal chartを取得する。
  - [local charts: アトラスの概念に出てくるchartと同じ意味(多分)。見る感じ、その表面の一部分の領域を指している。]
- local chart$\varphi_ {p}(v)$はDNN(MLP)とそのパラメーター$\phi(v, \theta_ {p})$によって得られる。

##### 2. local chart間の一貫性を確保しつつアトラスを構築する。
- chart間で重複する箇所を基準に一貫性を示す損失を定義し、これを最小化する。
  - [ここで言う一貫性というのは、構築したlocal chartをすべて合体させる際にズレとかが起きないようにすることっぽい。]

## どうやって有効だと検証した?
##### 省略

## 議論はある?
##### 省略

## 次に読むべき論文は?
##### なし

## 論文関連リンク
##### あり
1. [M. Berger, J. A. Levine, L. G. Nonato, G. Taubin, and C. T. Silva. A benchmark for surface reconstruction. ACM TOG, 32(2):20:1–20:17, 2013.](http://vgc.poly.edu/files/berger/recon_bench/paper/tog.pdf)[5]

## 会議, 論文誌, etc.
##### CVPR 2019

## 著者
##### Francis Williams, Teseo Schneider, Claudio Silva, Denis Zorin, Joan Bruna, Daniele Panozzo

## 投稿日付(yyyy/MM/dd)
##### 2018/11/27

## コメント
##### あり
- Mは大雑把に見ただけ。
- もっと確信を持った説明を作るのであるなら、概念(正確には用語)の理解と実装の確認が必要となる。

## key-words
##### Point_Cloud, CV, Paper, Reconstruction, 省略, Implemented, Mesh

## status
##### 省略

## read
##### A, I, M

## Citation
##### 未記入
