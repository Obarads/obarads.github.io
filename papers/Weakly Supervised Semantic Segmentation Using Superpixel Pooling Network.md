# Weakly Supervised Semantic Segmentation Using Superpixel Pooling Network

元の論文の公開ページ : []()  
Github Issues : []()  

## どんなもの?
##### 著者らはimage-levelラベルのみを用いてセグメンテーションアノテーションを生成するためのプーリング層にスーパーピクセルを利用する、新規のスーパーピクセルネットワーク(SPN)を提案した。
- 提案されたSPNはweakly supervised semantic segmentationに関して既存のDecoupledNetを組み合わせられる。
- 訓練するための堅牢な初期セグメンテーションラベルを構築するため、著者らは最終的なセグメンテーションのパフォーマンスを改善するのに役立つ、信頼できる画像識別とセグメンテーションラベルの洗練のためのテクニックを導入する。

## 先行研究と比べてどこがすごいの? or 関連事項
##### 従来のセマンティックセグメンテーションモデル(教師あり学習手法)は高いパフォーマンスを持つが、大量のセグメントアノテーションを必要とする欠点がある。
- これは他のアプリケーションへの適応を妨げる要因となる。

##### データが足りないような状況でも動くようにした、弱教師あり学習手法が提案されている。
- これらの手法では、image-levelのラベルのみ[1]、scribbles[2]、バウンディングボックス[3]を用いて訓練される。

##### ただし、これらのアプローチは教師あり学習手法よりも性能が遥かに低い。
- これらのアプローチは、セグメンテーションの監視が欠落しており、オブジェクトの特徴的な部分を僅かに見つける傾向にあるため、性能が低い。[要は、満足な教師を得られていないため、オブジェクトの輪郭をうまく見つけられないということ?]
- この問題を軽減するため、転移学習や形状の事前分布調査などが提案された。また、オブジェクトサイズに関する1ビットの情報等の小さい注釈も、セグメンテーションの性能改善に著しく影響を及ぼすことが示されている[4]。

##### 著者らは、特徴箇所と形状推定のギャップを埋めるアプローチを提案する。
- これは、形状推定の単位にスーパーピクセルを使用し(SPN)、複数のイブジェクトクラスにわたる共有セグメンテーションネットワークの統合(DecoupledNet)によって達成される。

## 技術や手法のキモはどこ? or 提案手法の詳細

## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. [Pinheiro, P. O., and Collobert, R. 2015. From image-level to pixel-level labeling with convolutional networks. In CVPR.](https://arxiv.org/abs/1411.6228)[Pinheiro and Collobert 2015]
2. [Lin, D.; Dai, J.; Jia, J.; He, K.; and Sun, J. 2016a. Scribble-sup: Scribble-supervised convolutional networks for seman-tic segmentation. In CVPR.](https://arxiv.org/abs/1604.05144)[Lin et al. 2016a]
3. [Dai, J.; He, K.; and Sun, J. 2015. Boxsup: Exploiting bound-ing boxes to supervise convolutional networks for semantic segmentation. In ICCV.](https://arxiv.org/abs/1503.01640)[Dai, He, and Sun 2015]
4. [Pathak, D.; Kr ̈ ahenb ̈ uhl, P.; and Darrell, T. 2015. Con-strained convolutional neural networks for weakly super-vised segmentation. In ICCV.](https://arxiv.org/abs/1506.03648)[Pathak, Kr ̈ ahenb ̈ uhl, and Darrell 2015]

## 会議, 論文誌, etc.
AAAI 2017

## 著者
Suha Kwak, Seunghoon Hong, Bohyung Han

## 投稿日付(yyyy/MM/dd)
2017/??/??

## コメント
なし

## key-words
CV, RGB_Image, Semantic_Segmentation, Superpixel, Weakly_Supervised_Learning, Paper

## status
導入

## read
A, I, R

## Citation
