# RandLA-Net: Efficient Semantic Segmentation of Large-Scale Point Clouds

元の論文の公開ページ : [arxiv.org](https://arxiv.org/abs/1911.11236)  
提案モデルの実装 : [QingyongHu/RandLA-Net](https://github.com/QingyongHu/RandLA-Net)  
Github Issues : []()  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。

## どんなもの?
##### 大規模点群に対して点ごとのセマンティックラベルを推定する効率的かつ軽量なニューラルネットワーク、RandLA-Netを提案した。
- 複雑な点選択アプローチの代わりにランダムサンプリングを使用することがこのアイデアの重要な点である。
- ランダムサンプリングは計算とメモリ効率に優れるが、偶然に重要な特徴量を破棄してしまう恐れがある。
- これを克服するために、**各3D点の受容体を進歩的に増加させる新たなローカル特徴集約機構を導入して**、幾何学的情報を効果的に保存する。

##### 計算速度もかなり早く、Semantic3DとSemanticKITTIでSOTAアプローチに勝る精度を持つ。
- 既存の手法よりも最大200倍早く、100万点に対する処理も一回の入力で処理できる。

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
##### なし

## 著者
##### Qingyong Hu, Bo Yang, Linhai Xie, Stefano Rosa, Yulan Guo, Zhihua Wang, Niki Trigoni, Andrew Markham

## 投稿日付(yyyy/MM/dd)
##### 2019/11/25

## コメント
##### なし

## key-words
##### CV, Paper, Point_Cloud, Semantic_Segmentation, 導入

## status
##### 導入

## read
##### A

## Citation
##### 未記入
