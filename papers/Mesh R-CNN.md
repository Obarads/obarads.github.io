# Mesh R-CNN

元の論文の公開ページ : [arxiv](https://arxiv.org/abs/1906.02739)  
Github Issues : 

## どんなもの?
入力としてRGB画像を受け取り、そこからオブジェクトの検知を行ったのちにオブジェクトを3D表現に変換するMesh R-CNNを提案した。Mesh R-CNNの流れと出力結果は図1,2の通りである。検出自体はMask R-CNNに任せ、3D表現の生成はMask R-CNN内のVoxel Branch(分岐)から行っていく。

![fig1,2](img/MR_2/fig1_2.png)

## 先行研究と比べてどこがすごいの?

## 技術や手法のキモはどこ? or 提案手法の詳細
### 構造
Mesh R-CNNの全体的な構造は図3の通り。メッシュの予測器はVoxel Branch、Cubify、Mesh Refinement Branchで構成される。

![fig3](img/MR_2/fig3.png)

#### Voxel Branch
fully-convolutional NetworkにRoIAlignからの入力特徴マップを適応することで$G\times G \times G$の3D体積表現を生成する。画像平面に沿ったボクセル占有率を予測するため、既知のカメラ内部値$K$を使ってグリッドを変換する(図4)。

![fig4](img/MR_2/fig4.png)

[※　$K$をどの様に使うのかわからなかった]

#### Cubify
Voxel Branchから生成された体積表現をより繊細な3D表現に変換するため、ボクセルからメッシュへ変換するこのCubifyを使用する。

#### Mesh Refinement Branch
このブランチはメッシュの頂点の位置を改善するものである。省略

### 損失
省略

## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. なし

## 会議
不明

## 著者
Georgia Gkioxari, Jitendra Malik, Justin Johnson

## 投稿日付(yyyy/MM/dd)
2019/06/06

## コメント
なし

## key-words
Mesh, Voxel, Detection, 3D_Estimation, Reconstruction,CV

## status
修正

## read
A, I

## Citation
