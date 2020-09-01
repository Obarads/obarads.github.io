# Deep Grouping Model for Unified Perceptual Parsing

元の論文の公開ページ : [openaccess.thecvf.com](https://openaccess.thecvf.com/content_CVPR_2020/papers/Li_Deep_Grouping_Model_for_Unified_Perceptual_Parsing_CVPR_2020_paper.pdf)  
提案モデルの実装 : [2020/08/16:なし]()  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。  
Note: 引用中の[*]は論文内の文献番号である。該当する論文は、論文関連リンクの各リストの末尾に基づいて調べられる。

## どんなもの?
- 近年のCNNによる処理について、論文では
    1. CNNベースの手法は、ピクセルレベルのground-truth(GT)ラベルに対するクロスエントロピー損失のみによって学習がなされているため、人間の視覚システムに不可欠なperceptual grouping processの明確なモデリングがなされていない[1]。
        - [Perceptual groupingとは、どこからどこまでを一つのまとまりとして見るか、みたいなこと]
        - Perceptual grouping processは、ピクセルからパーツ、パーツからオブジェクト、オブジェクトからシーンというような、入力のグループの階層構造を考慮することっぽい(図1より)
        - ![fig1](img/DGMfUPP/fig1.png)
    2. 殆どのモデリングは、規則的な形状特徴マップに注目するため、feature-to-feature attentionを考慮した際[?]のマルチスケール表現にオーバーヘッドが生じるだけでなく、画像上の不規則な形状のsemantic regionsのモデリングにも最適ではない。[?]
- という制約があると指摘している。
- 本論文では、perceptual grouping processを明示的に導入することがCNNに有益な影響を与えるかどうか調査する。

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
1. [Timothy F Brady, Anna Shafer-Skelton, and George A Al-varez. Global ensemble texture representations are critical to rapid scene perception. Journal of Experimental Psychology: Human Perception and Performance, 43(6):1160, 2017.](https://psycnet.apa.org/record/2017-10123-001)[4]

## 会議, 論文誌, etc.
##### CVPR 2020

## 著者
##### Zhiheng Li, Wenxuan Bao, Jiayang Zheng, Chenliang Xu

## 投稿日付(yyyy/MM/dd)
##### 2020/03/25

## コメント
##### なし

## key-words
##### CV, RGB_Image, 導入, Paper

## status
##### 導入

## read
##### A, I

## Citation
##### 未記入




