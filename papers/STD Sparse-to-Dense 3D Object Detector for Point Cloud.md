# STD: Sparse-to-Dense 3D Object Detector for Point Cloud

元の論文の公開ページ : [https://arxiv.org/abs/1907.10471](arxiv.org)  
提案モデルの実装 : [なし:2020/4/9]()  
Github Issues : []()  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。

## どんなもの?
##### 点ごとのスコアから球型アンカーを生成するtwo-stageの3D物体検出モデルを提案した。
- バックボーンからスコアを生成し、そのスコアに基づいて点ごとのアンカーを生成する。
  - その後、それらのアンカーの点から正確なアンカーの生成を行う。
- 貢献は以下の通り。
  - 球型のアンカーを使用した点群オブジェクト検出のためのpoint-base提案生成パラダイムを提案する。これは高い再現率を達成できる。
  - 提案されたPointsPool層はpoint-baseとvoxel-baseの手法の両方の利点を統合して、効率的で効果的な予測を可能とする。
  - 新しい3D IoU予測ブランチは分類スコアと位置の調節を支援し、著しい改善につながる。KITTIデータセットの実験結果は著者らのフレームワークが高いocclusionとcrowdednessを持つケースを処理し、SOTAなパフォーマンスを達成できる。

## 先行研究と比べてどこがすごいの? or 関連事項
##### 省略

## 技術や手法のキモはどこ? or 提案手法の詳細
### 手法の概要
- 手法の概要は図1の通り。

![fig1](img/SS3ODfPC/fig1.png)

##### 1. バックボーンの出力を元に球型アンカーを生成する。
- この手法により、アンカーの数を500まで減らすことができる。
- [ここで使用されるIoUは球専用のものである。詳細は工夫のAssignment Strategyにて。]
- [この提案のキモ。この手法の詳細は工夫のSpherical Anchorにて。]

##### 2. 生成されたアンカーから分類スコア、回帰オフセット、方向を予測する。
- 正確なアンカーを得るためにPointNetを用いて回帰と分類を行う。
- 角度はbinを元に計算する。
- 分類や回帰の損失は[1]のものを使用する。
- 最終的に分類スコアとBEV IoUに基づいてNMSを適応する。
- この方法により、学習時には300件、テスト時には100件の提案を保持する。

##### 3. 省略


### 工夫
#### Spherical Anchor
##### [省略]

#### Assignment Strategy
##### [省略]

## どうやって有効だと検証した?
##### 省略

## 議論はある?
##### 省略

## 次に読むべき論文は?
##### なし

## 論文関連リンク
##### あり
1. [C. R. Qi, W. Liu, C. Wu, H. Su, and L. J. Guibas. Frustum pointnets for 3d object detection from RGB-D data. CoRR, 2017.](https://arxiv.org/abs/1711.08488)[26]
2. [Y. Zhou and O. Tuzel. Voxelnet: End-to-end learning for point cloud based 3d object detection. CoRR, 2017.](https://arxiv.org/abs/1711.06396)[37]

## 会議, 論文誌, etc.
##### ICCV 2019

## 著者
##### Zetong Yang, Yanan Sun, Shu Liu, Xiaoyong Shen, Jiaya Jia

## 投稿日付(yyyy/MM/dd)
##### 2019/07/22

## コメント
##### なし

## key-words
##### CV, Paper, Point_Cloud, Detection, 省略

## status
##### 省略

## read
##### A, I, R

## Citation
##### 未記入
