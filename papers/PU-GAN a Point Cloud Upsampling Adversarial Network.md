# PU-GAN: a Point Cloud Upsampling Adversarial Network

元の論文の公開ページ : [arxiv.org](https://arxiv.org/abs/1907.10844)  
提案モデルの実装 : [liruihui/PU-GAN](https://github.com/liruihui/PU-GAN)  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。  
Note: 引用中の[*]は論文内の文献番号である。該当する論文は、論文関連リンクの各リストの末尾に基づいて調べられる。

## どんなもの?
##### Authors propose a new point cloud upsampling network(based GAN) called PU-GAN.
- The purpose of this model is to generate dense, complete, and uniform point clouds.
  - "Given a sparse, noisy, and non-uniform point clouds"
  - Raw point clouds is often sparse, noisym and non-uniform.
  - "This is evidenced in various public benchmark datasets, such as KITTI, SUN RGB-D, and ScanNet."
  - This kind of data disturbs rendering and analysis.
- Authors propose a method and structure to overcome the difficulties of GAN training.

## 先行研究と比べてどこがすごいの? or 関連事項
##### This propose introduce GAN to oint cloud upsampling method.
- "Wanget al. introduced a 3D-ED-GAN for shape completion given a corrupted 3D scan as input."
  - Wanget al. method is [1].
- "However, these methods can only consume 3D volumes as inputs or output shapes in voxel representations."

## 技術や手法のキモはどこ? or 提案手法の詳細
### Method overview
- Given an unordered sparse point set $\mathcal{P}$, this method aim to generate a dense point set $\mathcal{Q}$.
- Authers want it to satisfy two requirements:
  - "$\mathcal{Q}$ should describe the same underlying geometry of a latent target object as $\mathcal{P}$ so in $\mathcal{Q}$ should lie on and cover the target object surface"
  - "points in $\mathcal{Q}$ should be uniformly-distributed on the target object surface, even for sparse and non-uniform input $\mathcal{P}$."
- Fig. 2 shows the overall network.

![fig2](img/PaPCUAN/fig2.png)


## どうやって有効だと検証した?
##### 省略

## 議論はある?
##### 省略

## 次に読むべき論文は?
##### なし

## 論文関連リンク
##### あり
1. [Weiyue Wang, Qiangui Huang, Suya You, Chao Yang, and Ulrich Neumann. Shape inpainting using 3D generative ad-versarial network and recurrent convolutional networks. In IEEE Int. Conf. on Computer Vision (ICCV), pages 2298– 2306, 2017.](http://openaccess.thecvf.com/content_ICCV_2017/papers/Wang_Shape_Inpainting_Using_ICCV_2017_paper.pdf)[30]

## 会議, 論文誌, etc.
##### ICCV 2019

## 著者
##### Ruihui Li, Xianzhi Li, Chi-Wing Fu, Daniel Cohen-Or, Pheng-Ann Heng

## 投稿日付(yyyy/MM/dd)
##### 2019/07/25

## コメント
##### なし

## key-words
##### Paper, CV, Point_Cloud, GAN, Completion, 導入

## status
##### 導入

## read
##### A, I, R

## Citation
##### 未記入


