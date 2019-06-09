# Unsupervised Learning of Depth and Ego-Motion from Monocular Video Using 3D Geometric Constraints

元の論文の公開ページ : [arxiv](https://arxiv.org/abs/1802.05522)  
Github Issues : 

## どんなもの?
単眼カメラで取ったビデオを用いて、深度と自己運動推定を教師なし学習で行う手法を提案した。貢献は以下の通り。

1. **新規損失関数** : 画像再構築による逆伝播を利用せず、推定された深度の矛盾を見つける損失関数を提案する。
2. **Principled masking** : 
3. **調節されていないビデオストリームから学習する** : 

## 先行研究と比べてどこがすごいの?

## 技術や手法のキモはどこ? or 提案手法の詳細
図1に著者らの提案手法の概要を示す。この提案手法の中核は損失関数である。

![fig1](img/ULoDaEfMVU3GC/fig1.png)

### Problem Geometry
連続的なフレーム$X_ {t-1}$と$X_ {t}$のペアを得るとき、$t-1$時の深度$D_ {t-1}$と$t$時の深度$D_ t$、$t-1$から$t$までのカメラの自己運動$T_ t$を推定することを目的とする。
このとき、画像上のピクセル座標$(i,j)$の深度を3D点群$Q_ t$に投影すると式(1)のようになる。式(1)の$K$はカメラの内部行列である。

$$
Q_{t}^{i j}=D_{t}^{i j} \cdot K^{-1}[i, j, 1]^{T} \tag{1}
$$

ここで、$t-1$から$t$へのカメラの動き$T_ t$の推定値から前のフレームの点群$\hat{Q}_ {t-1}=T_ {t} Q_ {t}$を得られる。
また、$\hat{Q}_ {t-1}$は$K\hat{Q}_ {t-1}$とすることで、フレーム$t-1$時のカメラ上に投影することができる。
これらの変換と式1を組み合わせることで、$t$時の画像の座標を$t-1$時の画像の座標へ写像することが可能な式を構築できる。この写像は式(2)に示すように、$D_ t,T_ t$に基づいて$X_ {t-1}$を変形させることで$K\hat{X}_ {t}$へ再構築することができる。

$$
\hat{X}_{t}^{i j}=X_{t-1}^{\hat{i} \hat{j}},[\hat{i}, \hat{j}, 1]^{T}=K T_{t}\left(D_{t}^{i j} \cdot K^{-1}[i, j, 1]^{T}\right) \tag{2}
$$

[2,3]に従い、$(\hat{i},\hat{j})$と重複する$X_ {t-1}$の座標の4つのピクセル(?)からソフトサンプリングを行うことで$\hat{X}_ {t}^{i j}$を計算する。
このプロセスは点群$Q_ {t-1}$に$D_ {t-1}$を投影し、$D_ {t-1}$と$T_ t^{-1}$に基づいて$X_ t$を変形させることでフレーム$\hat{X}_ {t-1}$を再構築するため、他の方向($t-1$から$t$だけでなく$t$から$t-1$もするということ)でも繰り返される。

### Principled Masks
式(2)を使って画像座標の写像を行いたいが、実際はカメラの動きにより、$X_ {t-1}$の画像の外側に$X_ t$のピクセル座標が写像される恐れがある。そのようなピクセルを損失に含むことで、パフォーマンスも低下してしまう。それに対応するため、principled maskingを使用する。図3に示すように、マスクは深度と自己運動推定から計算される。フレーム$X_ {t-1}$と$X_ t$のペアから、対となるマスクのペア$M_ {t-1}$,$M_ t$を作成でき、マスクは$X_ {t-1}$と$X_ t$における計算可能なピクセル座標を示す[1]。

### Image Reconstruction Loss
再構築画像$\hat{X}_ {t}, \hat{X}_ {t-1}$と入力フレーム$X_ t,X_ {t-1}$をそれぞれ比較することでphotometric consistency[2]に基づく微分可能な画像再構築損失を導き出せる。損失は式(3)の通り。式(3)を最小化させていく。

$$
L_{\mathrm{rec}}=\sum_{i j}\left\|\left(X_{t}^{i j}-\hat{X}_{t}^{i j}\right) M_{t}^{i j}\right\| \tag{3}
$$



## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. [望月紅葉さんと幸せな家庭を築きたい. unsupervised-learning-of-depth-and-ego-motion-from-monocular-video-using-3d-geometric-constraints - Speaker Deck. 2018. (アクセス:2019/06/09)](https://speakerdeck.com/momiji_fullmoon/unsupervised-learning-of-depth-and-ego-motion-from-monocular-video-using-3d-geometric-constraints)
2. [T. Zhou, M. Brown, N. Snavely, and D. Lowe. Unsupervised learning of depth and ego-motion from video. CVPR, 2017.](https://arxiv.org/abs/1704.07813)
3. [M. Jaderberg, K. Simonyan, A. Zisserman, et al. Spatial transformer networks. In Advances in Neural Information Processing Systems, pages 2017–2025, 2015.](https://arxiv.org/abs/1506.02025)

## 会議
CVPR 2018

## 著者
Reza Mahjourian, Martin Wicke, Anelia Angelova.

## 投稿日付(yyyy/MM/dd)
2018/02/15

## コメント
なし

## key-words
Video, Depth_Estimation, Point_Cloud

## status
未完

## read
A, I, M

## Citation
