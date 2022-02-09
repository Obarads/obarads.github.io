# HandFoldingNet: A 3D Hand Pose Estimation Network Using Multiscale-Feature Guided Folding of a 2D Hand Skeleton

Cite : [Cheng, Wencan, Jae Hyun Park, and Jong Hwan Ko. 2021. “HandFoldingNet: A 3D Hand Pose Estimation Network Using Multiscale-Feature Guided Folding of a 2D Hand Skeleton.” In Proceedings of the IEEE/CVF International Conference on Computer Vision, 11260–69.](https://arxiv.org/abs/2108.05545)  
Implementation : [cwc1260/HandFold](https://github.com/cwc1260/HandFold)  

## どんなもの?
> With increasing applications of 3D hand pose estimation in various human-computer interaction applications, convolution neural networks (CNNs) based estimation models have been actively explored. However, the existing models require complex architectures or redundant computational resources to trade with the acceptable accuracy. To tackle this limitation, this paper proposes HandFoldingNet, an accurate and efficient hand pose estimator that regresses the hand joint locations from the normalized 3D hand point cloud input.

## 先行研究と比べてどこがすごいの?
### Existing pose estiomation
- 2D CNNs method (with depth image)
    > However, 2D CNNs cannot fully take advantage of 3D spatial information of the depth image, which is essential for achieving high accuracy.
- 3D CNNs method with 3D voxels
    > However, its critical limitation is the cubic growth of memory consumption with an increase in the image resolution [31]. Thus, application of 3D CNNs has been limited to low-resolution images, which may lead to lose of critical details for estimation. 
- PointNet-based model with regression or detection
    - Regression based method
        > The regression-based methods process only a sin-gle global feature, which is not sufficient for highly com-plex mapping into 3D hand poses.  
    - Detection based method
        > On the other hand, the detection-based methods propagate hierarchical features to each point including the points that contribute little to the specific joint estimation. Therefore, this redundant feature propagation significantly increases the computational cost and slows down the estimation. 

### Propose method
model idea: 
> The key idea of HandFoldingNet is to fold a 2D hand skeleton into the 3D pose, guided by multi-scale features extracted from both global and local information.

modules in the propose method:
> Utilization of local features is supposed to compensate for the weakness of conventional regression-based methods. Additionally, unlike the detection-based methods that propagate local features to all the points, we only extract a small region of local features near each joint, in order to avoid massive computations.


## 技術や手法のキモはどこ? or 提案手法の詳細
The propose consept is based on FoldingNet:
> The motivation of adopting the folding-based design in FoldingNet [45] is that it is suitable for a 3D hand pose estimation task. Essentially, a specific hand pose is a result of applying a force on the human hand skeleton. The folding operation can be interpreted as emulating the ”force” applied to the fixed 2D hand skeleton, as shown in Figure 1.

![fig1](img/HA3HPENUMGFoa2HS/fig1.png)

### Architecture

![fig2](img/HA3HPENUMGFoa2HS/fig2.png)

### The two novel modules in propose models
- global-feature guided folding (global folding) decoder  
    > The proposed decoder folds a fixed 2D hand skeleton into the 3D coordinates of joints, being guided by a global feature.
- joint-wise local-feature guided folding (local folding) block  
    ![fig3](img/HA3HPENUMGFoa2HS/fig3.png)

## どうやって有効だと検証した?
> Experimental results show that the proposed model outperforms the existing methods on three hand pose benchmark datasets with the lowest model parameter requirement.  
> We evaluate our network on ICVL [36], MSRA [35] and NYU [40] datasets, which are challenging benchmarks commonly used for evaluation of a 3D hand pose estimation task.

## 議論はある?
##### 省略

## Reference
##### なし
1. [なし]()[1]

## コメント
##### なし

## key-words
##### なし

## status
##### 未完
