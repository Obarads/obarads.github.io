# DeepGCNs: Can GCNs Go as Deep as CNNs?

元の論文の公開ページ : [arxiv.org](https://arxiv.org/abs/1904.03751)  
提案モデルの実装 : [lightaime/deep_gcns](https://github.com/lightaime/deep_gcns)  
Github Issues : []()  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。

## どんなもの?
##### 浅い層による利用しかできないGraph Convolution Network(GCN)をより深くできる方法を提案した。
- ユークリッド空間上のデータに対するデータなどに対して使われるGCNは、図1の左に示すように浅い層でのみ学習がうまくいく。
- 本提案では、CNNからresidual/dense connectionsとdilated畳み込みのアイデアを借用し、通常よりも深いGCNを実現する。
  - 本提案の層の深さは56層となっている。

##### S3DISのベンチマークでSOTAを達成した。
- 特になし。

![fig1](img/DCGGaDaC/fig1.png)

## 先行研究と比べてどこがすごいの? or 関連事項
##### 省略

## 技術や手法のキモはどこ? or 提案手法の詳細
##### 省略

## どうやって有効だと検証した?
##### 省略

## 議論はある?
##### 省略

## 次に読むべき論文は?
##### なし

## 論文関連リンク
##### なし
1. [プロジェクトサイト](https://sites.google.com/view/deep-gcns)

## 会議, 論文誌, etc.
##### ICCV 2019 Oral

## 著者
##### Guohao Li, Matthias M ̈uller, Ali Thabet, Bernard Ghanem

## 投稿日付(yyyy/MM/dd)
##### 2019/08/19

## コメント
##### あり
- 非常に興味深い論文。今後の点群系の研究に大きく関わりそう。

## key-words
##### CV, Paper, Point_Cloud, Graph, Semantic_Segmentation, Implemented, 導入

## status
##### 導入

## read
##### A

## Citation
##### 未記入
