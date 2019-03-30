# CNN-SLAM: Real-time dense monocular SLAM with learned depth prediction

元の論文の公開ページ : https://arxiv.org/abs/1704.03489

## どんなもの?

## 先行研究と比べてどこがすごいの?

## 技術や手法のキモはどこ? or 提案手法の詳細
提案手法のパイプラインは図2に示す通り。高フレームレートを維持するために、キーフレーム上でのみCNNを介してデプスマップを予測するように提案している。さらに、訓練データとテストデータの内容の違いがあることを踏まえ、ピクセル単位のデプス予測の信頼度を測定するuncertainry mapを作成する。

![fig2](img/CRdmSwldp/fig2.png)

### **Camera Pose Estimation**
カメラポーズ推定は[1]を参考にしている。各フレーム$t$において、最新のカメラポーズ$T_ t^{k_ i}=[R_ t, t_ t]\in\mathbb{SE}(3)$を予測する。この$T_ t^{k_ i}$はフレーム$t$と直近キーフレーム$k_ i$間の変換であり、$R_ t\in\mathbb{SO}(3)$は$3\times 3$の回転行列、$t_ t\in\mathbb{R}^3$は3D変換ベクトルである。最新の輝度画像$\mathcal{I}_ t$と直近のキーフレーム$k_ i$の輝度画像$\mathcal{I}_ {k_ i}$間の輝度誤差を最小化するような変換を求める。$T_ t^{k_ i}$は目的関数の式(1)に基づく重みづけされたGauss-Newton最適化を使って求められる。

$$
E(T_ t^{k_ i})=\sum_ {\tilde{u}\in\Omega}\rho\Biggl(\frac{r(\tilde{u},T_ t^{k_ i})}{\sigma(r(\tilde{u},T_ t^{k_ i}))}\Biggl) \tag{1}
$$

ここで、$\rho$はHuberノルム、$\sigma$は[1]のresidual uncertaintyを測る関数である。ここで、$r$は式(2)の様に定義される輝度誤差である。

$$
r(\tilde{u},T_ t^{k_ i}) = \mathcal{I}_ {k_ i}(\tilde{u}) - \mathcal{I}_ t(\pi(KT_ t^{k_ i}\tilde{\mathcal{V}_ {k_ i} }(\tilde{u}))) \tag{2}
$$

デプスマップが密である&効率を考慮して、高い色勾配領域内にある画素の一部$\tilde{u}\subset u\in\Omega$のみに残光誤差の計算を制限する。また、$\pi$は3D点を2D画像座標へマッピングする透視投影関数であり、式(3)の様に表される。

$$
\pi([xyz]^T)=(x/z,y/z)^T \tag{3}
$$

このとき、$\mathcal{V}_ {k_ i}(u)$はキーマップのデプスマップから計算された頂点マップの3D要素であり、式(4)の様に表される。

$$
\mathcal{V}_ {k_ i}(u)=K^{-1}\dot{u}\mathcal{D}_ {k_ i}(u) \tag{4}
$$

このとき、$K$はカメラの内部行列である。  
$T_ t^{k_ i}$が得られたのち、世界座標系中の最新のカメラポーズは$T_ t=T_ t^{k_ i}T_ {k_ i}$として計算される。

### **CNN-based Depth Prediction and Semantic Segmentation**
新しいキーフレームが作られたとき、CNNを介してデプスマップが推定される。

## どうやって有効だと検証した?

## 議論はある?


## 次に読むべき論文は?
-
-

### 論文関連リンク
1. [J. Engel, T. Schps, and D. Cremers. LSD-SLAM: Large-Scale Direct Monocular SLAM. InEuropean Conference on Computer Vision (ECCV), 2014.](https://vision.in.tum.de/research/vslam/lsdslam)
2.

### 会議
CVPR2017

### 著者
Keisuke Tateno, Federico Tombari, Iro Laina, Nassir Navab.

### 投稿日付(yyyy/MM/dd)
2017/04/11

## コメント
なし

## key-words
2D_Image, SLAM