# 3D Instance Segmentation via Multi-Task Metric Learning

元の論文の公開ページ : [openaccess.thecvf.com](http://openaccess.thecvf.com/content_ICCV_2019/papers/Lahoud_3D_Instance_Segmentation_via_Multi-Task_Metric_Learning_ICCV_2019_paper.pdf)  
提案モデルの実装 : [2020/01/05:なし]()  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。

## どんなもの?
##### マルチタスク学習戦略を用いてボクセルに3Dインスタンスラベルを振り分けるモデルを提案した。
- この論文では2つの目標を置いている。
  - 1つめの目標は同じインスタンスラベルを持つボクセルの特徴を近く、異なるインスタンスラベルを持つボクセルの特徴を離すようにする抽象的な埋め込みを学習すること。
  - 2つめの目標は各ボクセルのインスタンスの重心の方向情報を推定することで、インスタンス情報を学習すること。
- [オブジェクトが接触しているという文脈にも着目しているっぽい。]

##### 合成データと現実のデータ(ScanNet)で検証を行った。
- 合成データは自作した。

## 先行研究と比べてどこがすごいの? or 関連事項
##### 省略

## 技術や手法のキモはどこ? or 提案手法の詳細
### 問題設定
##### 予めセマンティックラベルが振り分けられたボクセルに対して、インスタンスセグメンテーションを行う。
- このモデルは、セマンティックセグメンテーションのラベルが振り分けられたボクセルに対して、インスタンスセグメンテーションを割り振るというpost-processのためのモデルである。
- よって、入力はセマンティックセグメンテーションによって得られる局所特徴ベクトルもしくはセマンティックラベルを含むボクセルとなる。
- 出力は、各ボクセルに対してインスタンスラベルを割り振ったものとなる。
- また、提案する損失のために、ボクセルサイズを固定する。これにより、シーン内の全てのボクセル間の3D距離を保存できる。

### 手法の概要
##### 1. ネットワークアーキテクチャへボクセルを入力する。
- SSCNetをベースとしたアーキテクチャを使用する。アーキテクチャは図2の通り。
- ![fig2](img/3ISvMML/fig2.png)
- 出力はDirection EmbeddingとFeature Embeddingの2つであり、この2つに対して損失を取る。つまり、feature embedding loss $\mathcal{L}_{FE}$とDirectional loss $\mathcal{L}_{dir}$、損失に対する重み$\alpha$が2種類ある時、
  $$
  \mathcal{L}_{\text {joint }}=\alpha_{\mathrm{FE}} \mathcal{L}_{\mathrm{FE}}+\alpha_{\text {dir }} \mathcal{L}_{\text {dir }} \tag{6}
  $$
  となる。
- Feature Embeddingの学習では、同じインスタンスに属する特徴同士が異なるインスタンスに属する特徴よりも近づくように訓練する。
  - 損失は、Discriminative loss[1]を使用している。
  - 異なるクラスタリングのfeature embeddingは互いに影響しあい、各feature embeddingはクラスタの中心位置やその数に左右される。
  - これは、同じシーンに多数のインスタンスが存在する場合に不利になる。
  - **そこで、他のインスタンスの影響を受けずにインスタンスの分離に不可欠なローカル情報を提供する追加の損失(Directional loss)を著者らが提案する。**
- Direction Embeddingでは、すべてのボクセルに3次元のベクトルを割り振る。この特徴の学習では、ベクトルがオブジェクトの物理的な中心を指すように訓練する。
  - 学習方法は、工夫のDirectional Lossにて。

##### 2. feature embeddingとdirection featureを用いて領域の提案を行う。
- 各特徴空間のイメージ図は図3の通り。
- ![fig3](img/3ISvMML/fig3.png)
- feature embeddingとdirection embeddingを用いて提案を生成する。
  - [この提案というのは、おそらくDetection分野でよく出る提案と同じ。]
- [ここ以降、理解しきれていない。修正必要箇所]
  - [ここで言われているconnected componetnsはおそらくインスタンスラベルの振り分け方を指している。]
- fearute embeddingのcoherencyは、特徴クラスタの中心からしきい値内にあるfeature embeddingの数によって決められる。
- 方向特性のcoherencyは$\mathcal{L}_{dir}$によって決められる。これは、予測されたnoramlized direction featureとボクセルからオブジェクトの中心を指すnormalized vector間の平均コサイン類似度である。
- 次に、すべての提案に対してNMSを実行して重複するオブジェクトの削除を行う。
- インスタンスへのラベル付は、インスタンス内のすべての点[ボクセル?]で最も多いセマンティックラベルによって決められる。

### 工夫
#### Directional Loss
##### ボクセルごとに、ボクセルの座標からオブジェクトの中心座標への方向ベクトルを予測するように学習する。
- この損失では、他のクラスタの影響を受けずに、クラス内の関係を記したベクトルを生成することを目標とする。
- このベクトルとして、提案ではオブジェクトの中心を示すベクトルを扱う。
- このベクトルを生成できるように、以下の損失を用いてモデルを学習する。
- $$
  \mathcal{L}_{\text {dir }}=-\frac{1}{C} \sum_{c=1}^{C} \frac{1}{N_{c}} \sum_{i=1}^{N_{c}} \mathbf{v}_{i}^{\top} \mathbf{v}_{i}^{G T} \quad \text { with } \mathbf{v}_{i}^{G T}=\frac{\mathbf{z}_{i}-\mathbf{z}_{c}}{\left\|\mathbf{z}_{i}-\mathbf{z}_{c}\right\|} \tag{5}
  $$
  - $\mathbf{v}_i$はnormalized方向ベクトルの特徴を示し、
  - $\mathbf{v}_i^{GT}$はオブジェクトの中心への方向を示し、
  - $\mathbf{z}_i$はボクセルの中心位置を示し、
  - $\mathbf{z}_c$はオブジェクトの中心位置を示す。

## どうやって有効だと検証した?
### Synthetic Toy Dataset
##### 自作した合成データセットを用いて評価した。
- 合成データセット(Synthetic Toy Dataset)では、異なるサイズとアスペクト比を持つオブジェクトを扱う。合成データは図4の通り。
- 各オブジェクトの形状は、現実のデータのオブジェクトクラスに類似したものとなっている。
- 次に、オブジェクトをランダムに位置づけ(平面上)&方向に向けて、オブジェクトが他のオブジェクトと接触するかどうかランダムに指定する[訳変か?]。
- 1000シーン生成、900シーン訓練データ、100シーンテストデータ。
- ![fig4](img/3ISvMML/fig4.png)
- [**ここでの評価は、最新の手法を比べるわけではなく、ラベルを振り分ける手法を比較している。**]

##### 結果は提案手法が最も良かった。
- 結果は表1の通り。
- ![tab1](img/3ISvMML/table1.png)
  - Connected comp: (セマンティック)セグメンテーションのGTラベルが与えられたとき、connected componentsアルゴリズムはオブジェクト同士が接触しない限り、ラベルを正確に振り分けることが可能である。そのようなアルゴリズムを比較対象に入れている。
    - ただし、オブジェクト同士が接触している場面のほうが多い。
  - Ours: FEはfeature embeddingのみの利用、Multi-taskはFE+directional featureを利用したもの。
    - directional featureのみがない理由は、単体利用が不可能なレベルでノイジーだから。
      - この理由は、4.1節冒頭にあり。
- 視覚的結果を図5に示す。
- ![fig5](img/3ISvMML/fig5.png)  
  - [黄色オブジェクトなんでこうなった?]

### ScanNet
##### 結果は提案手法が最も良かった。
- AP50におけるスコア。また、壁と地面のラベルは無視する。
- 表2がablation study、表3が他の手法との比較となる。
- ![tab2](img/3ISvMML/tab2.png)
- ![tab3](img/3ISvMML/tab3.png)

## 議論はある?
##### 省略

## 次に読むべき論文は?
##### なし

## 論文関連リンク
##### あり
1. [Bert De Brabandere, Davy Neven, and Luc Van Gool. Semantic instance segmentation with a discriminative loss function. CoRR, abs/1708.02551, 2017.](https://arxiv.org/abs/1708.02551)[3]

## 会議, 論文誌, etc.
##### ICCV 2019 Oral

## 著者
##### Jean Lahoud, Bernard Ghanem, Marc Pollefeys, Martin R. Oswald

## 投稿日付(yyyy/MM/dd)
##### 2019/06/20

## コメント
##### なし

## key-words
##### Paper, CV, Voxel, Instance_Segmentation, 修正

## status
##### 修正

## read
##### A, I, M, E

## Citation
##### 未記入
