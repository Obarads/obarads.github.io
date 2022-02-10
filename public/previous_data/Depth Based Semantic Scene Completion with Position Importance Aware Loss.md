# Depth Based Semantic Scene Completion with Position Importance Aware Loss

元の論文の公開ページ : [https://arxiv.org/abs/2001.10709](arxiv.org)  
提案モデルの実装 : [UniLauX/PALNet](https://github.com/UniLauX/PALNet)  
Github Issues : []()  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。

## どんなもの?
##### セマンティックセグメンテーションと同時に3D形状の補完を行うモデル、PALNetを提案した。
- 入力はボクセルと深度画像、出力は補完されたボクセルにセマンティックラベルがついたものである。
- ネットワークの訓練中に位置の重要性を理解させるためのPosition Aware Loss (PA-Loss)を提案する。
  - オブジェクトの境界やシーンのコーナーなどの詳細を埋め合わせるために役に立つ。

## 先行研究と比べてどこがすごいの? or 関連事項
##### 位置に対する損失を提案した。
- 既存の手法では、ボクセルの位置を考慮することなく、全てのボクセルを平等に扱っていた。
  - オブジェクト内部にもボクセルが大量に含まれており、これらのボクセルは分類タスクで冗長になるにもかかわらず、他のボクセルと特性を共有&同じ扱いを受けている。
  - それに対し、人間の知覚[1,2]はコーナーや凹凸を見てオブジェクトをはっきり認識する。
- そこで、著者らはLocal Geometric Anisotropy(LGA)を提案し、位置の重要性を決定する。
- LGAに基づいて、基づいてボクセルに異なる重要性を与えるPA-Lossを提案する。

##### 深度とTSDFの両方の特徴量を合わせて処理する。
- TSDFは空間符号化に関する事前知識を与える&シーンの空の領域と占有領域を明確にできるため必要である。
- しかし、深度画像からTSDFは生成され、メモリの都合上解像度が落ち、深度画像に存在する詳細な情報が失われる。
- 深度画像は上の逆のことが言える。
- そこで、個別のネットワークに深度画像とTSDFをそれぞれ入れてあとで組み合わせることで、2つの利点を合わせる。

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
1. [P. H. Lindsay and D. A. Norman, Human information processing: An introduction to psychology. Academic press, 2013.](https://www.amazon.co.jp/Human-Information-Processing-Introduction-Psychology-ebook/dp/B01DT295VU)[10]
2. [K. Desingh, K. M. Krishna, D. Rajan, and C. Jawahar, “Depth really matters: Improving visual salient region detection with depth.” in Proc. BMVC, 2013, pp. 98.1–98.11.](https://www.semanticscholar.org/paper/Depth-really-Matters%3A-Improving-Visual-Salient-with-Desingh-Krishna/89163f33e3bb961bef1ceccd50135d937d1730f9)[11]

## 会議, 論文誌, etc.
##### ICRA 2020

## 著者
##### Yu Liu, Jie Li, Xia Yuan, Chunxia Zhao, Roland Siegwart, Ian Reid, Cesar Cadena

## 投稿日付(yyyy/MM/dd)
##### 2020/01/29

## コメント
##### なし

## key-words
##### CV, Paper, Voxel, Depth_Image, Semantic_Segmentation, 導入, Completion, Implemented

## status
##### 導入

## read
##### A, I

## Citation
##### 未記入
