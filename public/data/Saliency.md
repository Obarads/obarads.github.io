# Saliency

## 概要
##### 画像処理分野で使われる"Saliency"より。
- ここでは、基本的に論文のIntroductionなどに書かれているその年の分野の傾向について引用している。
- Deep Learning導入前の手法なども含んだりしている。

## メモの内容
### 履歴
#### 2013年(3/28)より、Saliency Detection via Graph-Based Manifold Ranking[1]より
##### "The task of saliency detection is to identify the most important and informative part of a scene."
- "It has been applied to numerous vision problems including image segmentation [11], object recognition [28], image compression [16], content based image retrieval [8], to name a few."

##### "Saliency methods in general can be categorized as either bottom-up or top-down approaches."
- "Bottom-up methods [1, 2, 6, 7, 9–12,14,15,17,21,24,25,27,32,33,37] are data-driven and pre-attentive,"
- "while top-down methods [23, 36] are task-driven that entails supervised learning with class labels. "
- "We note that saliency models have been developed for eye fixation prediction [6, 14, 15, 17, 19, 25, 33] and salient object detection [1, 2, 7, 9, 23, 24, 32]."
- **"The former focuses on identifying a few human fixation locations on natural images, which is important for understanding human attention."**
- **"The latter is to accurately detect where the salient object should be, which is useful for many high-level vision tasks. "**

##### Salient object detection algorithmsについて
- [先程の内容はsaliencyにおける手法の方針であったが、ここからはsaliency object detectionにおける手法の紹介である。]
- "Salient object detection algorithms usually generate bounding boxes [7, 10], binary foreground and background segmentation [12, 23, 24, 32], or saliency maps which indicate the saliency likelihood of each pixel."
  - [この段は、既存手法の概要について記してある。]
  - "Liu et al. [23] propose a binary saliency estimation model by training a conditional random field to combine a set of novel features."
  - "Wang et al. [32] analyze multiple cues in a unified energy minimization framework and use a graph-based saliency model [14] to detect salient objects."
  - "In [24] Lu et al. develop a hierarchical graph model and utilize concavity context to compute weights between nodes, from which the graph is bi-partitioned for salient object detection."
  - "Cheng et al. [9] consider the global region contrast with respect to the entire image and spatial relationships across the regions to extract saliency map."
  - "In [11] Goferman et al. propose a context-aware saliency algorithm to detect the image regions that represent the scene based on four principles of human visual attention."
  - "The contrast of the center and surround distribution of features is computed based on the Kullback-Leibler divergence for salient object detection [21]."
  - "Xie et al. [35] propose a novel model for bottom-up saliency within the Bayesian framework by exploiting low and mid level cues."
  - "Sun et al. [30] improve the Xie’s model by introducing boundary and soft-segmentation."
  - "Recently, Perazzi et al. [27] show that the complete contrast and saliency estimation can be formulated in a unified way using high-dimensional Gaussian filters."


## 関連リンク
##### あり
1. [C. Yang, L. Zhang, H. Lu, X. Ruan, and M.-H. Yang, ”Saliency Detection via Graph-Based Manifold Ranking”, IEEE Conf. on Computer Vision and Pattern Recognition (IEEE CVPR), 2013.](https://faculty.ucmerced.edu/mhyang/project/cvpr13_saliency/cvprsaliency.htm)

## 投稿日付(yyyy/MM/dd)
##### 2020/08/24

## コメント
##### なし

## key-words
##### Memo, Detection

## status
##### 未完
