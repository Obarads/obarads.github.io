# Range Adaptation for 3D Object Detection in LiDAR

元の論文の公開ページ : [arxiv.org](https://arxiv.org/abs/1909.12249)  
提案モデルの実装 : [2020/01/05:なし]()  
Github Issues : []()  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。

## どんなもの?
##### 遠距離の物体検出を近距離の物体検出と同様のパフォーマンスに最適化する手法を提案した。
- LiDARを使った3D物体検出に対するクロスレンジ適応を開発する。
  - [この処理は、遠距離の内容にも近距離の内容を処理する際の事柄を適応する的なものだと思われる。]
- 著者らは鳥瞰図(BEV)検出フレームワークに対して本提案を適応する。
- クロスレンジ適応に対する試みは、この論文が初めてだとしている。
- 本提案は、fine-grained local adaptationとadversarial global adaptationによって構成されている。

##### このクロスレンジ適応フレームワークを3つのSOTA LiDAR物体検出モデルに適応し、遠距離オブジェクトの観測時のパフォーマンス向上を観測した。
- このとき、補助パラメータをモデルに追加していない。

##### さらなる研究のため、注釈付き点群を備えた新たなLiDARデータセットをリリースした。
- 特になし。

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
##### ICCV 2019 WS

## 著者
##### Ze Wang, Sihao Ding, Ying Li, Minming Zhao, Sohini Roychowdhury, Andreas Wallin, Guillermo Sapiro, Qiang Qiu

## 投稿日付(yyyy/MM/dd)
##### 2019/09/26

## コメント
##### あり
- おもしろい提案。

## key-words
##### Paper, CV, 導入, Domain_Adaptation, Detection, Point_Cloud

## status
##### 導入

## read
##### A

## Citation
##### 未記入
