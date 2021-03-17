# On Isometry Robustness of Deep 3D Point Cloud Models under Adversarial Attacks

元の論文の公開ページ : [arxiv.org](https://arxiv.org/abs/2002.12222)  
提案モデルの実装 : [skywalker6174/3d-isometry-robust](https://github.com/skywalker6174/3d-isometry-robust)  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。  
Note: 引用中の[*]は論文内の文献番号である。該当する論文は、論文関連リンクの各リストの末尾に基づいて調べられる。

## どんなもの?
##### Isometry transformationsに対して既存の深層3D点群モデルが脆弱であることを調査した。
- [Isometry transformationsとは、[1]とか本論文の内容を見るあたり、剛体変換と同じようなものっぽい。]
  - [[1]で関係ありそうな内容->"For example, all possible bendings of a given surface that includes all length preserving deformations without tearing or stretching the surface are considered to be isometric."]
  - [本論文中の内容-> It is also important to note that isometry represents a large class of geometry transformations includ-ing translation, rotation, and reflection as the most common examples.]
    - Isometryが、一般的な例として並進、回転、反影を含む様々なクラスの幾何学変換を表すことに注意することも重要である。
- 本提案では、最新のモデルの脆弱性を探査するためのアルゴリズムを提案し、それらのモデルを攻撃する。
- 図1に著者らの提案であるDemonstration of Thompson Sampling Isometry attackでPointNetを攻撃し、パイロンを傾けただけでPointNetに誤分類させたことを示す。
  - PointNetはModelNet40で訓練済み。
- 著者らは、Thompson Sampling (TS)を用いたブラックボックスアタックフレームワークを提案し、PointNet, PointNet++, DG-CNN, RS-CNNの分類問題に対して攻撃を行った。
- contibutionsは以下の通り。
  - "We utilize Thompson Sampling to design an efficient black-box attack with zero loss in the sense of isome-try. It achieves success rates over 95% on ModelNet40 data set, which is the first work to fully reveal the vul-nerability of deep 3D point cloud models under isom-etry transformations in black-box settings. To the best of our knowledge, this is the first black-box attack in 3D point cloud adversarial settings."
  - "Inspired by the theoretical results of Restricted Isome-try Property, we introduce a novel framework of white-box attack on point cloud with success rates more than 98.11% over several state-of-the-art models. Even for imperceptible rotation angles in [−π/64, π/64] (±2.81°), it achieves a success rate over 95%."
  - "In contrast to previous works, 3D adversarial samples generated by our algorithms have significantly strong transferability. This property further shows the vulner-ability of current models under isometry projections. It also suggests huge potential of our approach in developing further black-box attacks."
  - "Our adversarial samples are pervasive in practice. For example, calibration in self-driving car system is sometimes inaccurate [38], thus the input signals are often subjected to small perturbations, which can be viewed as our adversarial samples. Hence, our approach might offer insights for improving robustness of real-world applications."
- このアイデアの根源は、[2]でY軸を中心とした回転(90° or 180°)によってPointNetの精度が40%ほどまで落ちたという報告から至った。

![fig1](img/OIRoD3PCMuAA/fig1.png)

## 先行研究と比べてどこがすごいの? or 関連事項
##### よく使われている既存のデータ拡張戦略が思うほどのものではないことを示した。
- ここで言うデータ拡張とは、simple strategies, such as random scaling, translation, and rotationのこと。
- その結果、データ拡張の研究が深層3Dモデルの制度と堅牢性の両方を向上させるであろうと結論づけた。

##### Isometryのアイデアを用いた手法の問題点を洗い出し、深層3Dモデルへの適応を促した。
- Isomeryによる堅牢性を用いたアイデア([3]など)がいくつかあるが、一般的に構造の複雑化、計算時間の増加、精度の低下が起こる可能性がある。
- 本提案では、脆弱性への説明を行い、アイデアの重要性を正当化する。
- 更に、これらのアイデアによってIsometryの堅牢さに着目した深層3D手法が提案されることを促す。

## 技術や手法のキモはどこ? or 提案手法の詳細
##### 省略

## どうやって有効だと検証した?
##### 省略

## 議論はある?
##### 省略

## 次に読むべき論文は?
##### なし

## 論文関連リンク
##### あり
1. [Asi Elad and Ron Kimmel. On bending invariant signatures for surfaces. IEEE Transactions on pattern analysis and ma-chine intelligence, 25(10):1285–1295, 2003.](http://graphics.stanford.edu/courses/cs468-08-fall/pdf/elad-kimmel.pdf)[11]
2. [Yongcheng Liu, Bin Fan, Shiming Xiang, and Chunhong Pan. Relation-shape convolutional neural network for point cloud analysis. In Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition, pages 8895– 8904, 2019.](https://arxiv.org/abs/1904.07601)[21]
3. [Adrien Poulenard, Marie-Julie Rakotosaona, Yann Ponty, and Maks Ovsjanikov. Effective rotation-invariant point cnn with spherical harmonics kernels. In 2019 International Conference on 3D Vision (3DV), pages 47–56.IEEE, 2019.](https://arxiv.org/abs/1906.11555)[29]

## 会議, 論文誌, etc.
##### CVPR 2020

## 著者
##### Yue Zhao, Yuwei Wu, Caihua Chen, Andrew Lim

## 投稿日付(yyyy/MM/dd)
##### 2020/02/27

## コメント
##### あり
- PointNetのtrans netがちゃんと機能しているか気になったことがあったが、これはその関係の論文っぽい。

## key-words
##### Paper, CV, Adversarial_Examples, Point_Cloud, 導入

## status
##### 導入

## read
##### A, I, R

## Citation
##### 未記入