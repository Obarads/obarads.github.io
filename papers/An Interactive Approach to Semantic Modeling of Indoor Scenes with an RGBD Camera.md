# An Interactive Approach to Semantic Modeling of Indoor Scenes with an RGBD Camera

元の論文の公開ページ : [kunzhou.net](http://kunzhou.net/2012/SIGGRAPHASIA12-IndoorSceneModeling.pdf)  
提案モデルの実装 : []()  
Github Issues : [#131](https://github.com/Obarads/obarads.github.io/issues/131)

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。

## どんなもの?
##### 室内空間のシーンを3Dモデル化するだけでなく、シーン内に存在するオブジェクトに対してクラスラベルを付与する対話型アプローチを提案した。
- 本アプローチでは、RGB-Dデータを入力として受け取る。RGB-Dデータは(オブジェクトカテゴリごとの)セグメンテーションが施され、そのセグメンテーションを元に3Dモデルと特徴マッチングを行い、一致したオブジェクトを再構築するための空間に設置する。
- また、セグメンテーションが十分でない場合のために、セグメンテーション結果を改善するためのstroke-base対話インターフェイスがユーザーに提供されている。
- さらに、一枚の画像からシーン全体が見えない場合は、シーンの一部を写している他の画像を用意することで再構築を手助けするように設計されている。
- アルゴリズムのプロセス概要図は図2の通り。

![fig2](img/AIAtSMoISwaRC/fig2.png)

## 先行研究と比べてどこがすごいの?
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

## 会議
##### SIGGRAPH ASIA 2012

## 著者
##### Tianjia Shao, Weiwei Xu, Kun Zhou, Jingdong Wang, Dongping Li, and Baining Guo

## 投稿日付(yyyy/MM/dd)
##### 2012/11/01

## コメント
##### なし

## key-words
##### RGB_Image, Depth_Image, Reconstruction, Labeling, CV, Paper, 導入

## status
##### 導入

## read
##### A, I

## Citation
##### www.microsoft.comより引用
[リンク](https://www.microsoft.com/en-us/research/publication/interactive-approach-semantic-modeling-indoor-scenes-rgbd-camera/)  
@InProceedings{shao2012an,
author = {Shao, Tianjia and Xu, Weiwei and Zhou, Kun and Wang, Jingdong and Li, Dongping and Guo, Baining},
title = {An Interactive Approach to Semantic Modeling of Indoor Scenes with an RGBD Camera},
booktitle = {ACM Transactions on Graphics (TOG)},
year = {2012},
month = {November},
abstract = {We present an interactive approach to semantic modeling of indoor scenes with a consumer-level RGBD camera. Using our approach, the user first takes an RGBD image of an indoor scene, which is automatically segmented into a set of regions with semantic labels. If the segmentation is not satisfactory, the user can draw some strokes to guide the algorithm to achieve better results. After the segmentation is finished, the depth data of each semantic region is used to retrieve a matching 3D model from a database. Each model is then transformed according to the image depth to yield the scene. For large scenes where a single image can only cover one part of the scene, the user can take multiple images to construct other parts of the scene. The 3D models built for all images are then transformed and unified into a complete scene. We demonstrate the efficiency and robustness of our approach by modeling several real-world scenes.},
publisher = {ACM},
url = {https://www.microsoft.com/en-us/research/publication/interactive-approach-semantic-modeling-indoor-scenes-rgbd-camera/},
volume = {31},
chapter = {6},
edition = {ACM Transactions on Graphics (TOG)},
}