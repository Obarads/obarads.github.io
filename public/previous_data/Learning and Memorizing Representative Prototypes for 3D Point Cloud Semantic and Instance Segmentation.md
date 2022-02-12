# Learning and Memorizing Representative Prototypes for 3D Point Cloud Semantic and Instance Segmentation

元の論文の公開ページ : [arxiv.org](https://arxiv.org/abs/2001.01349)  
提案モデルの実装 : [2020/10/26:なし]()  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。  
Note: 引用中の[*]は論文内の文献番号である。該当する論文は、論文関連リンクの各リストの末尾に基づいて調べられる。

## どんなもの?
##### 様々なパターンを学習させておくのではなく、記憶させることで点群Seg.の推論をより正確にするネットワーク、MPNetを提案した。
- 既存の手法によるベンチマーク結果(S3DIS, ScanNet)で、category imbalanceとpattern imbalanceの影響が見られる。
  - 第一に、異なるカテゴリ間の比率が釣り合っていない。
  - 第二に、点(複数形)のパターンは不均衡かつ多様な分布を持つ。このパターンは複雑な幾何学情報(位置、形状、インスタンス間の相対関係)によって引き起こされる。
- よく学習されたサンプルに対する重みを軽減することでこれらに対処する方法もあるが、非支配的[(レアな)]パターンに直接対処できるわけではないため忘れられる可能性がある。
- 著者らの提案では、discriminativeでrepresentativeなprototypes[(模範)]を記憶または学習するネットワーク、MPNetを提案し、これらの問題に取り組む。

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
1. [なし]()[1]

## 会議, 論文誌, etc.
##### ECCV 2020

## 著者
##### Tong He, Dong Gong, Zhi Tian, Chunhua Shen

## 投稿日付(yyyy/MM/dd)
##### 2020/1/6

## コメント
##### なし

## key-words
##### Point_Cloud, Instance_Segmentation, Semantic_Segmentation, CV, 導入

## status
##### 導入

## read
##### A, I

## Citation
##### 未記入

