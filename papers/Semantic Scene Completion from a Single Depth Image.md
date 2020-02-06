# Semantic Scene Completion from a Single Depth Image

元の論文の公開ページ : [arxiv.org](https://arxiv.org/abs/1611.08974)  
提案モデルの実装 : [shurans/sscnet](https://github.com/shurans/sscnet)  
Github Issues : []()  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。

## どんなもの?
##### 深度画像から補完とセマンティックセグメンテーションを行うモデル、SSCNetを提案した。
- もともと、補完とセマンティックセグメンテーションのタスクは別々に扱われていたが、この2つのタスクは密接な関係があると考えられるため、この2つのタスクを組み合わせたタスクとそれを解くモデルを提案した。
- 深度画像からボクセル(TSDF)を生成し、そのボクセルをネットワークに入力、出力は補完とセマンティックセグメンテーションが施されたボクセルとなる。

##### 補完とセマンティックセグメンテーションを同時に行うためのデータを作成するため、SUNCGデータセットを提案した。
- 室内環境を想定したCGを用いた合成データセットである。
- [このデータセットは2020/2/6現在使用不可。詳しくはコメント参照。]

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
##### CVPR 2017

## 著者
##### Shuran Song, Fisher Yu, Andy Zeng, Angel X. Chang, Manolis Savva, Thomas Funkhouser

## 投稿日付(yyyy/MM/dd)
##### 2016/11/28

## コメント
##### あり
- Datasetとあるが、SUNCGデータセットは会社との揉め事で裁判沙汰となり、使用不可となっている。
  - 詳しくは[こちら](https://futurism.com/tech-suing-facebook-princeton-data)を参照のこと。

## key-words
##### CV, Paper, Depth_Image, Voxel, Completion, 導入, Implemented, Semantic_Segmentation, Dataset

## status
##### 導入

## read
##### A

## Citation
##### 未記入
