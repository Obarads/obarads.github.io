# JSIS3D: Joint Semantic-Instance Segmentation of 3D Point Clouds with Multi-Task Pointwise Networks and Multi-Value Conditional Random Fields

元の論文の公開ページ : [arxiv.org](https://arxiv.org/pdf/1904.00699.pdf)  
Github Issues : []()  

## どんなもの?
点群に対してセマンティックとインスタンスセグメンテーションが行える新規のモデルを提案した。
- インスタンスな情報もセマンティックな情報も相互に依存しているため、それらを同時に学習することが望ましい。本研究はそのようなスタンスでモデルを提案する。

本論文の貢献は以下の通り。
- Multi-task pointwise network (MT-PNet)は同時に2つのタスクを行う。タスクは以下の2つである。
    - 3D点のカテゴリが何に属するのかを予測するタスク。
    - 3D点を高次元特徴ベクトルへ埋め込み、そこにクラスタリングをかけることでオブジェクトのインスタンスを予測するタスク。[ここの「そこ」というのは、特徴空間上に存在するベクトルに対してという意味。]
- クラスラベルとオブジェクトインスタンスの同時最適化を統一されたフレームワークに定式化したmulti-value conditional random field (MV-CRF)モデルは、variational mean field technique[?]を使用して効率的に解くことができる。著者らの知る限り、我々が統合されたフレームワーク内でのセマンティック&インスタンスの同時最適化を初めて研究した。
- 提案された手法と同等の方法を検証するために様々なベンチマークデータセットを用いて実験した。実験によって、提案された手法が各タスクにおいてSOTAな結果を出すことを示した。

## 先行研究と比べてどこがすごいの? or 関連事項
省略

## 技術や手法のキモはどこ? or 提案手法の詳細
提案手法の概要は図1の通り。提案手法の処理の概要は図1の下に載せる。

![fig1](img/JJSSo3PCwMPNaMCRF/fig1.png)

1. はじめにwindowと呼ばれる点群を領域重複ありの塊に分割(切り抜く)し、それを高次元ベクトルへの埋め込みと点のカテゴリクラス予測のためにニューラルネットワークへ入力する。この２つのタスクをこなすために、multi-task pointwise network (MT-PNet)を提案し、導入する。
    - MT-PNetは同じインスタンスに属する点同士を引き寄せ、そうでない点を可能な限り引き離す。また、クラスラベルの予測も行う。[ここで言う点はおそらく特徴量空間の点を指す。]
2. 1で出力されたクラスラベルと埋め込みはmulti-value conditional random field (MV-CRF)モデルで利用される。
3. 最終的に、2の出力であるvariational infereceを使用してセマンティック&インスタンスセグメンテーションを行う。

### Multi-Task Pointwise Network (MT-PNet)
このネットワークの概要は図2の通り。MT-PNetは点群を入力とし、セマンティックラベルとインスタンスの埋め込みを出力する。

![fig2](img/JJSSo3PCwMPNaMCRF/fig2.png)

- ネットワークは途中で2つのブランチに分かれており、インスタンスまたは埋め込みを出力するようになっている。
- このネットワークの損失は式(1)のとおりである。  
    $$
    \mathcal{L}=\mathcal{L}_{p r e d i c t i o n}+\mathcal{L}_{e m b e d d i n g} \tag{1}
    $$
- 予測損失$\mathcal{L}_ {prediction}$はクロスエントロピーによって定義される。埋め込み損失$\mathcal{L}_ {embeding}$には[1]のdiscriminative functionを採用する。

### Multi-Value Conditional Random Fields (MV-CRF)


## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. [Bert De Brabandere, Davy Neven, and Luc Van Gool. Semantic instance segmentation with a discriminative loss function. arXiv preprint arXiv:1708.02551, 2017.](https://arxiv.org/pdf/1708.02551.pdf)[8]

## 会議, 論文誌, etc.
CVPR 2019

## 著者
Quang-Hieu Pham, Duc Thanh Nguyen, Binh-Son Hua, Gemma Roig, Sai-Kit Yeung

## 投稿日付(yyyy/MM/dd)
2019/04/01

## コメント
なし

## key-words
CV, Paper, Point_Cloud, Instance_Segmentation, Semantic_Segmentation

## status
導入

## read
A, I

## Citation
