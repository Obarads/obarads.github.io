# PV-RCNN: Point-Voxel Feature Set Abstraction for 3D Object Detection

元の論文の公開ページ : [arxiv.org](https://arxiv.org/abs/1912.13192)  
提案モデルの実装 : [非公式:jhultman/vision3d](https://github.com/jhultman/vision3d)  
Github Issues : []()  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。  
Note: 引用中の[*]は論文内の文献番号である。該当する論文は、論文関連リンクの各リストの末尾に基づいて調べられる。

## どんなもの?
##### 点とボクセルベースの特徴を併合して利用する3D物体検出モデル、PV-RCNNを提案した。
- 2ステージのフレームワークとなっており、また本提案ではsparse convを用いたボクセル処理による適切な提案生成とPointNetに基づく詳細なコンテキスト情報の会得を行う。
  - [これは、ボクセルベース手法(点も利用はしている)によって提案を行い、その提案の微調整を点ベース手法によって行うというものか。]
- また、ボクセル畳み込みで必要とされるメモリなどを削減するための工夫を提案した。
- 上記の処理を行うために以下のモジュールを提案した。
  - Voxel Set Abstraction Module: 3DCNN特徴ボリュームからキーポイント表現へマルチスケールな特徴をエンコードする。拡張として、点と2D俯瞰特徴を利用したものも提案した。
  - RoI-grid Pooling Module: 上記のキーポイントなどの特徴表現をプーリングするモジュール。

##### 車上からの点群オブジェクト検出を用いてベンチマークを行った。
- データセットはKITTIとWaymo Open Datasetを使った。
- 訓練は、
  - "For the KITTI dataset, we train the entire network with the batch size 24, learning rate 0.01 for 80 epochs on 8 GTX 1080 Ti GPUs, which takes around 5 hours."
  - "For the Waymo Open Dataset, we train the entire network with batch size 64, learning rate 0.01 for 50 epochs on 32 GTX 1080 Ti GPUs, which takes around 25 hours."

## 先行研究と比べてどこがすごいの? or 関連事項
##### 省略

## 技術や手法のキモはどこ? or 提案手法の詳細
### 手法の概要
- 概要図は図2の通り。
- 従来の手法を統合する上で、voxelベースに対する以下の問題点を上げている。

![fig2](img/PPFSAf3OD/fig2.png)

##### Voxelベースの問題点を挙げた。
- 既存の検出器では以下の問題点が挙げられる。
  - (1) "These feature volumes are generally of low spatial resolution as they are downsampled by up to 8 times, which hinders accurate localization of objects in the input scene."
    - These feature volumeは3DCNNもしくは2DCNNによって生成されたもの。
  - (2) "Even if one can upsample to obtain feature volumes/maps of larger spatial sizes, they are generally still quite sparse."
    - "The commonly used trilinear or bilin-ear interpolation in the RoIPooling/RoIAlign operations can only extract features from very small neighborhoods (i.e., 4 and 8 nearest neighbors for bilinear and trilinear interpolation respectively). The conventional pooling approaches would therefore obtain features with mostly zeros and waste much computation and memory for stage-2 refinement."
      - [結局のところ、従来の補完による解像度向上によって得られる表現には無駄が多いと言っている。]
- この問題点を解決するには、マルチスケールな特徴ボリュームをRoI gridsに直接集約することであるが、これでは多くのメモリを占有してしまう。
  - 例えば、KITTIデータセットから4倍のダウンサンプリングで18000ボクセルを得たとき、$3\times 3 \times 3$グリッド内の提案を100個得る場合、$2700 \times 18000$サイズの処理を行うのはしきい値などを用いても効率的でない。
- **”To tackle this issue, we propose a two-step approach to first encode voxels at different neural layers of the entire scene into a small number of keypoints and then aggregate keypoint features to RoI grids for box proposal refinement.”**
  - この提案は工夫に示すとおり。

### 工夫
#### Voxel Set Abstraction Module
##### PointNet++で提案されたset abstraction operationを用いてvoxel-wiseの集約を行う。
- "The surrounding points of keypoints are now regular voxels with multi-scale semantic features encoded by the 3D voxel CNN from the multiple levels, instead of the neighboring raw points with features learned from PointNet."
- キーポイントからボクセルまでの相対3D座標値を計算し、任意の範囲内にあるボクセルのみ近傍として扱う。
  - ただし、空ではないボクセルのみ選ぶ。
- これらのボクセルの近傍の特徴はPointNetによってキーポイントのための特徴へ変換される。
  - なお、近傍ボクセルの数も最大$T_ k$個になるようにランダムサンプリングされた後にMLPなどが施される。
- 各レベルで生成されたキーポイントの特徴は連結される。

##### このモジュールの拡張として、生の点と俯瞰図の特徴量をキーポイント特徴に連結する。(Extended VSA Module)
- 生の点も上のPointNetによる処理を施した後に特徴として上記のキーポイントの特徴に連結する。
- 俯瞰図もキーポイントを2D俯瞰図に投影して、bilinear補間を施した後にキーポイントの特徴に連結する。
- これらをすべて連結したキーポイントの特徴$f_ i^{(p)}$は式(4)の通り。

$$
f_ i^{(p)} = [f_ i^{(pv)},f_ i^{(raw)},f_ i^{(bev)}], for i=i,\ldots,n \tag{4}
$$

##### キーポイントに対して重み付けを行う。
- 前景オブジェクトであるキーポイントは提案の洗練に役に立つが、背景オブジェクトのキーポイントはそれほど役に立たないと考えた。
- この考えを学習に組み込むため、3DBBアノテーションを用いてキーポイントがBBに含まれるか含まれないか予測する。
- この予測を行うためのモジュールをPredicted Keypoint Weighting (PKW)モジュールと名付け、このモジュールは図3のように示される。

![fig3](img/PPFSAf3OD/fig3.png)

#### Keypoint-to-grid RoI Feature Abstraction for Proposal Refinement
##### キーポイントからグリッドへのRoI feature abstractionを提案した。
- 各3D提案にて、キーポイントの特徴を$6\times6\times6$個のグリッドポイントへそれぞれ集約する。
- この集約も、任意の範囲内にあるグリッドポイントの近傍キーポイントを探し、PointNetによってそのキーポイント特徴を集約する。ここでもランダムサンプリングを施したあとにMLPなどを適応する。
  - この際に、複数の範囲を設けてマルチスケールに特徴を得る。
- このあと、提案ごとに、生成されたすべてのグリッドポイントを2層のMLPで256次元のRoI特徴へ変換する。

![fig4](img/PPFSAf3OD/fig4.png)

##### 生成された提案ごとのRoI特徴を用いてBBの向きやサイズ、中心座標を予測する。
- MLPを利用して予測する。

#### 訓練損失
##### [省略]

## どうやって有効だと検証した?
##### 省略

## 議論はある?
##### 省略

## 次に読むべき論文は?
##### なし

## 論文関連リンク
##### あり
1. [kawanokana, PV-RCNN: Point-Voxel Feature Set Abstraction for 3D Object Detection | Deep Learning JP. 2020. Accessed: 2020-04-26](https://deeplearning.jp/pv-rcnn-point-voxel-feature-set-abstraction-for-3d-object-detection/)

## 会議, 論文誌, etc.
##### なし

## 著者
##### Shaoshuai Shi, Chaoxu Guo, Li Jiang, Zhe Wang, Jianping Shi, Xiaogang Wang, Hongsheng Li

## 投稿日付(yyyy/MM/dd)
##### 2019/12/31

## コメント
##### なし

## key-words
##### CV, Paper, Detection, Point_Cloud, Voxel, 省略, Implemented

## status
##### 省略

## read
##### なし

## Citation
##### 未記入
