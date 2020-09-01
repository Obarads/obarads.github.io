# Learning Superpixels with Segmentation-Aware Affinity Loss

元の論文の公開ページ : [openaccess.thecvf.com](https://openaccess.thecvf.com/content_cvpr_2018/papers/Tu_Learning_Superpixels_With_CVPR_2018_paper.pdf)  
提案モデルの実装 : [wctu/SEAL](https://github.com/wctu/SEAL)  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。  
Note: 引用中の[*]は論文内の文献番号である。該当する論文は、論文関連リンクの各リストの末尾に基づいて調べられる。

## どんなもの?
##### Superpixel segmentationタスクにdeep learningを適応し、より正確なセグメンテーション境界を得られるようにする手法を提案した。
- Superpixel segmentationタスクへdeep learningを適応するためには、以下の3つの問題に対処しなければいけない。
    1. superpixel用のgroud truthは用意されない。
    2. 異なるsuperpixelのindices(?)にも互換性がある。
    3. 既存のsuperpixelアルゴリズムは微分不可である。
- これらの問題に対処するために、著者はgraph-based superpixel segmentation手法を用いて、pixel affinitiesを学習するような方法を提案した。
  - Pixel affinitiesは、同じオブジェクトに属する2つの隣接ピクセルの尤度を計測できる。
  - 具体的には、Pixel affinitiesはセグメンテーションの境界線で低く、他の場所では高くなるような値である。
- これを提案する背景としては、事前学習済みのdeep feature(深層学習モデルの特徴)やdeep edge(深層学習モデルのエッジ表現)をsuperpixelにそのまま使用しても良い結果は得られないという理由がある。
  - この辺は、論文の3章で色々言及している。
- この提案では、
  - 既存のセグメンテーションデータセットでpixel affinitiesを学習するためのPixel Affinity Net(PAN)というネットワークを提案する。
  - 高クオリティなセグメンテーションを得るためにSEgmentation-Aware Loss (SEAL)を提案する。

##### BSDS500とCityscapesデータセットでsuperpixelセグメンテーションタスクにおける提案手法の性能を測った。
- superpixelの数とか、IoU等を測る。

## 先行研究と比べてどこがすごいの? or 関連事項
##### 省略

## 技術や手法のキモはどこ? or 提案手法の詳細
##### 手法の概要
- 提案手法の全体像は図2の通り。
- 提案で使用するセグメンテーションラベルはsuperpixel segmentationのものではなく、オブジェクトセグメンテーションのものである。
  - superpixelは画像のoversegmentation(オブジェクトレベルのセグメンテーションを更に分割した形)であるため、オブジェクトレベルのセグメンテーションラベルからでも適切な損失(今回は提案手法であるSEALが該当)を与えればsuperpixelを生成するのに役立つものを生成できる。
- ![fig2](img/LSwSAL/fig2.png)

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
##### CVPR 2018

## 著者
##### Wei-Chih Tu, Ming-Yu Liu, Varun Jampani, Deqing Sun, Shao-Yi Chien, Ming-Hsuan Yang, Jan Kautz

## 投稿日付(yyyy/MM/dd)
##### 2018/07/18

## コメント
##### なし

## key-words
##### CV, Paper, Point_Cloud, Superpixel, Oversegmentation, 省略, Implemented

## status
##### 省略

## read
##### A, I

## Citation
##### 未記入
