# Rethinking Task and Metrics of Instance Segmentation on 3D Point Clouds

元の論文の公開ページ : [arxiv.org](https://arxiv.org/abs/1909.12655)  
提案モデルの実装 : [なし]()  
Github Issues : []()  

## どんなもの?
##### 既存の計測手法を用いた小領域でのインスタンスセグメンテーションの評価は不適切であることを主張、これを実験的に示した。
- **また、以前の研究では徴されていない計測手法を使用して問題を明らかにする。**

##### 次に、大領域の処理を可能にする小さな空間の複雑さを用いた新規インスタンスセグメンテーション手法を提案する。[?]
- 新規インスタンスセグメンテーション手法では入力特徴空間から埋め込み空間へのマッピングを学習するための損失関数を用いる。
    - 埋め込み空間では、同じインスタンス同士が集まるため、埋め込み空間上でクラスタリングをかけることでインスタンスの判別を行う。
    - この方法はpoint pairs[?]を処理する必要がないため、空間の複雑さは$\mathcal{O}(N)$であり、点の数に対してスケーラブルである。
- 提案された手法が他のSOTA手法よりも優れていることを示す。

##### 更に、既存の計測手法の欠点に基づいて、新しい計測手法を提案する。

## 先行研究と比べてどこがすごいの? or 関連事項

## 技術や手法のキモはどこ? or 提案手法の詳細

## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. [Kousuke Arase, Twitter, 2019.](https://twitter.com/KosukeArase/status/1190500465772916736)

## 会議, 論文誌, etc.
ICCV WS 2019

## 著者
Kosuke Arase, Yusuke Mukuta, Tatsuya Harada

## 投稿日付(yyyy/MM/dd)
2019/09/27

## コメント
なし

## key-words
CV, Point_Cloud, Instance_Segmentation, Paper, 修正

## status
修正

## read

## Citation
