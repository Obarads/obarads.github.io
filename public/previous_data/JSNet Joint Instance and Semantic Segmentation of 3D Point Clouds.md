# JSNet: Joint Instance and Semantic Segmentation of 3D Point Clouds

元の論文の公開ページ : [arxiv.org](https://arxiv.org/abs/1912.09654)  
提案モデルの実装 : [dlinzhao/JSNet](https://github.com/dlinzhao/JSNet)  
Github Issues : []()  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。

## どんなもの?
##### 点群に対するセマンティックセグメンテーションとインスタンスセグメンテーションを同時に行うモデル、JSNetを提案した。
- backboneネットワークの異なる層からの特徴を融合するpoint cloud feature fusion(PCFF)モジュールと、インスタンス特徴とセマンティック特徴を相互に集約するjoint instance semantic segmentation(JISS)モジュールを提案した。

##### 実験では、ins.seg.、sem.seg.、part seg.タスクを行った。
- セマンティックセグメンテーション、インスタンスセグメンテーションはS3DISでベンチマークを行った。
- パーツセグメンテーションはShapeNetで行った。

## 先行研究と比べてどこがすごいの? or 関連事項
- [IのASISに対する言及のみ取り上げる。理由はASISと趣旨が似ているから。]

##### k近傍(kNN)に対するパラメータを設定しなくて良い。
- ASISはkNNを使用してインスタンス特徴をセマンティック特徴へ集約する。
- しかしながら、kNNに対する適切なK値とdistance metric[(距離関数とか?)]を選択することが難しいため、パフォーマンスが制限される。
- また、訓練時に高次のスパーステンソルを生成するため、計算とメモリ消費の効率がいいとは言えない。

## 技術や手法のキモはどこ? or 提案手法の詳細
### 手法の概要
- 全体像は図2の通り。
- エンコーダー&デコーダーとしてPointNetとPointConvを利用している。
- 全体的な構造はASISと同じ。ただし、
  - ボトルネック構造を採用して余計なメモリを使わないようにした。
  - PCFFとJISSモジュールが本論文の提案であり、kNNのような距離計算を必要としない。
    - [処理スピードなどは変わらない?]
- 損失もASISやJSIS3Dと同じものを使っている模様。

![fig2](img/JJIaSSo3PC/fig2.png)

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
##### 不明(2020/2/13)

## 著者
##### Lin Zhao, Wenbing Tao

## 投稿日付(yyyy/MM/dd)
##### 2019/12/20

## コメント
##### あり
- 内容的にはASISと趣旨が似ている様に思える。
- Mは一部のみ。

## key-words
##### CV, Paper, Point_Cloud, Implemented, Instance_Segmentation, Semantic_Segmentation, 省略, Part_Segmentation

## status
##### 省略

## read
##### A, I, M

## Citation
##### 未記入
