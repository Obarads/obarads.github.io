# Geometry-Aware Neural Rendering

元の論文の公開ページ : [arxiv.org](https://arxiv.org/abs/1911.04554)  
提案モデルの実装 : [2019/12/14 なし]()  
Github Issues : []()  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。

## どんなもの?
##### 既存のニューラルレンダラーを今までのものよりも複雑かつ高次元のシーンに対応させた。
- 対応させるために、著者らはEpipolar Cross Attention (ECA)を提案した。
    - このアテンションメカニズムは効率的な非局所(non-local)作用を起こすためにシーンのジオメトリを利用する。[(?)]
    - $O(n^2)$の代わりに空間次元ごとの$O(n)$ comparisonsだけが求められる。[(?)]
-  ECAによってGenerative Query Networks (GQN)[1]のパフォーマンスを定量&質量的に向上させた。

##### 著者らは新しい3つの合成データセットを導入する。
- ロボティクスに触発されて作成した。

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
1. [SM Ali Eslami, Danilo Jimenez Rezende, Frederic Besse, Fabio Viola, Ari S Morcos, Marta Garnelo, Avraham Ruderman, Andrei A Rusu, Ivo Danihelka, Karol Gregor, et al. Neural scene representation and rendering. Science, 360(6394):1204–1210, 2018. ](https://science.sciencemag.org/content/360/6394/1204.abstract)[1]

## 会議, 論文誌, etc.
##### NeurlPS 2019

## 著者
##### Josh Tobin, OpenAI Robotics, Pieter Abbeel

## 投稿日付(yyyy/MM/dd)
##### 2019/10/28

## コメント
##### なし

## key-words
##### CV, Paper, Dataset, Robot, Rendering, 導入

## status
##### 導入

## read
##### A

## Citation
##### 未記入
