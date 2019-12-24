# 3D-BEVIS: Bird's-Eye-View Instance Segmentation

元の論文の公開ページ : [arxiv.org](https://arxiv.org/pdf/1904.02199.pdf)  
提案モデルの実装 : [2019/12/23: なし]()  
Github Issues : []()  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。

## どんなもの?
##### 鳥瞰図より得た2D特徴と生の点群から得た3D特徴を利用してInstance-aware Semantic Segmentationを行う手法、3D-BEVISを提案した。
- 3D-BEVISは3D bird's-eye-view instance segmentationの略。
- 提案フリーのインスタンスセグメンテーションアプローチに従って、モデルは埋め込みを学習し、そして埋め込み空間上で埋め込みをグループ分けする。
- クラスタリングによってインスタンスのセグメンテーションを得る場合は、グローバルに一貫した特徴量が必要となる。そこで、著者らは俯瞰図表現を使うことでグローバルな特徴を得ている。
  - この特徴は、DGCNN(生の点群を特徴量にするネットワーク)でも使われる。
  - [クラスタリングでインスタンスを得る方法はバウンディングボックス提案なし手法でよく使われる。]

## 先行研究と比べてどこがすごいの? or 関連事項
##### 2D表現である鳥瞰図を利用してモデルの性能を向上させる。
- 3Dシーン理解のタスクで性能を向上させるために2D表現を利用する。
- 今回は、点群の全体像を得るための特徴を生成するために使われる。

##### インスタンスを直接抽出できる。
- [この論文がins.seg.タスクの生の点群を処理するモデルであるSGPNのみに着目していることに注意、この時点で他にもモデルは出ている。]

## 技術や手法のキモはどこ? or 提案手法の詳細
##### 省略

## どうやって有効だと検証した?
##### 省略

## 議論はある?
##### 省略

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. なし

## 会議, 論文誌, etc.
GCPR '19

## 著者
Cathrin Elich, Francis Engelmann, Theodora Kontogianni, Bastian Leibe

## 投稿日付(yyyy/MM/dd)
2019/04/03

## コメント
なし

## key-words
Paper, CV, Point_Cloud, Instance_Segmentation, Semantic_Segmentation, 導入

## status
導入

## read
A, I, R

## Citation
