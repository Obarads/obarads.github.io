# 3D-BEVIS: Bird's-Eye-View Instance Segmentation

元の論文の公開ページ : [arxiv.org](https://arxiv.org/pdf/1904.02199.pdf)  
Github Issues : []()  

## どんなもの?
著者らは点群に対する新規のインスタンス&セマンティックセグメンテーションモデル、3D-BEVIS(3D bird's-eye-view instance segmentation)を提案した。
- 提案フリーのインスタンスセグメンテーションアプローチに従って、モデルは埋め込みを学習し、そして埋め込み空間上で埋め込みをグループ分けする。
- 既存のポイントベースの手法では点群を小分けにして個別に処理を行い[(特にスケールと点の規模がでかいlarge-scaleにおいてそのような処理が多い)]、処理後の出力をマージする。しかしながら、クラスタリングによってインスタンスのセグメンテーションを得る場合は、グローバルに一貫した特徴量が必要となる。そこで、著者らは俯瞰図表現を使うことでグローバルな情報を得て、これをローカルな点情報と組み合わせる。

## 先行研究と比べてどこがすごいの? or 関連事項

## 技術や手法のキモはどこ? or 提案手法の詳細

## どうやって有効だと検証した?

## 議論はある?

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
Paper, CV, Point_Cloud, Instance_Segmentation, Semantic_Segmentation

## status
導入

## read
A

## Citation
