# Structured Prediction of Unobserved Voxels From a Single Depth Image

元の論文の公開ページ : [discovery.ucl.ac.uk](https://discovery.ucl.ac.uk/id/eprint/1533148/1/Firman_structured-prediction-unobserved.pdf)  
提案モデルの実装 : [mdfirman/voxlets](https://github.com/mdfirman/voxlets)  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。

## どんなもの?
##### 深度画像からボクセル表現による補間を行う手法を提案した。
- 著者らは[1]の形状学習からインスパイアされており、提案手法はセマンティックな情報を必要とせずとも予測(補間)が行えると主張している。
  - [インスパイアはそのような発想に影響を受けたということだけか?]
  - "We take inspiration from recent work that segments objects from images using silhouettes learned from different object classes [34]."
  - "They showed that shape can transcend class categories, enabling shape predictions to be made without requiring semantic understanding."
  - "As we care about shape, independent of semantic understanding, we are free to use training objects that are different from the objects present at test time."
- 貢献は以下の通り。
  - "Voxlets: a representation of local multi-voxel geometry. We use a structured Random Forest to learn a mapping from a point in a 3D reprojection of a depth image to a structured prediction of the geometry in the region around that point without requiring any semantic information."
  - "Dataset: we introduce both a real world dataset and a new measure for evaluating volumetric completion algorithms. The dataset contains 90 scans of different object configurations."
  - "Fitted predictions: we perform experiments evaluating the efficacy of different methods of selecting structured elements to use in the scene. We demonstrate that our proposed method outperforms naive alternatives."

## 先行研究と比べてどこがすごいの? or 関連事項
##### 省略

## 技術や手法のキモはどこ? or 提案手法の詳細
##### 省略

## どうやって有効だと検証した?
##### 省略

## 議論はある?
##### 省略

## 次に読むべき論文は?
##### あり
- From Point Clouds to Mesh using Regression, ICCV 2017.

## 論文関連リンク
##### あり
1. [J. Kim and K. Grauman. Shape sharing for object segmentation. In ECCV, 2012.](http://vision.cs.utexas.edu/projects/shapesharing/)[34]

## 会議, 論文誌, etc.
##### CVPR 2016

## 著者
##### Michael Firman, Oisin Mac Aodha, Simon Julier, Gabriel J. Brostow

## 投稿日付(yyyy/MM/dd)
##### 2016/06/??

## コメント
##### なし

## key-words
##### Paper, CV, 導入, Voxel, Completion, Reconstruction, Depth_Image, w/o_DL, Implemented

## status
##### 導入

## read
##### A, I

## Citation
##### github.comより引用
[リンク](https://github.com/mdfirman/voxlets)  
@inproceedings{firman-cvpr-2016,
  author = {Michael Firman and Oisin Mac Aodha and Simon Julier and Gabriel J Brostow},
  title = {{Structured Completion of Unobserved Voxels from a Single Depth Image}},
  booktitle = {Computer Vision and Pattern Recognition (CVPR)},
  year = {2016}
}
