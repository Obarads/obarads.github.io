# Object detection at 200 Frames Per Second

元の論文の公開ページ : [arxiv.org](https://arxiv.org/abs/1805.06361)  
提案モデルの実装 : [2020/2/4:なし]()  
Github Issues : []()  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。

## どんなもの?
##### 数百フレームで処理が可能なオブジェクト検出器を提案した。
- この論文では、検出フレームワークのネットワークアーキテクチャ、損失関数、訓練データ(labeledとunlabeled)の3つの側面を調査する。
- コンパクトなネットワークを作成するため、既存のモデルをベースとして、様々な改良を加える。
- また、蒸留損失関数を利用して軽量なネットワークへの知識転用を行う。蒸留を効率的に行うための提案も行う。

##### 蒸留損失を元に、ラベルの内データを利用してどれだけパフォーマンスが上がるか検討する。
- 教師ネットワークのソフトラベルを利用して、ラベルのないデータでモデルを訓練する。
  - [ソフトラベルは[1]を参照。]

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
##### あり
1. [StackExchange. About the definition of “soft label” and “hard label”. (アクセス:2020/2/4)](https://ai.stackexchange.com/questions/9635/about-the-definition-of-soft-label-and-hard-label)
2. [なし]()[]

## 会議, 論文誌, etc.
##### ECCV 2018

## 著者
##### Rakesh Mehta, Cemalettin Ozturk

## 投稿日付(yyyy/MM/dd)
##### 2018/05/16

## コメント
##### なし

## key-words
##### CV, Paper, Detection, 導入, RGB_Image

## status
##### 導入

## read
##### A

## Citation
##### 未記入
