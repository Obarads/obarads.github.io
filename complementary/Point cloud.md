# point cloud
## 概要
日本語では点群と呼ばれる、3D表現の一つ。下の図の様にすべてを点で表す。データが軸に沿って規則的に並んでいる2D画像と違い、点群は不規則かつバラバラにデータが表現されている。

![椅子の点群](img/point_cloud/chair.png)

## 日本の先駆者の資料
2019年4月現在、点群に関する日本語資料は少ないがその方面に強い方がいくつか資料を上げてくださっているので見るべし。

- 参考文献の[3] 2019年 [千葉直也, 戸田幸宏. 三次元点群を取り扱うニューラルネットワークのサーベイ Ver. 2 / Point Cloud Deep Learning Survey Ver. 2 - Speaker Deck. (アクセス:2019/04/29)](https://speakerdeck.com/nnchiba/point-cloud-deep-learning-survey-ver-2)
- 参考文献の[4] 2019年 [Keisuke Fujimoto. 20190414 Point Cloud Reconstruction Survey. (アクセス:2019/04/30)](https://www.slideshare.net/FujimotoKeisuke/20190414-point-cloud-reconstruction-survey-140757963)
- 参考文献の[5] 2019年 [neka-nat. 確率モデルを用いた3D点群レジストレーション. (アクセス:2019/04/30)](https://docs.google.com/presentation/d/1zlVC7TNLcui29h1VyZxMk2rFXTA_1KlCfefoq6eeYsU/edit#slide=id.p)
- 参考文献の[6] 2015年、数式とコードがメイン [Toru Tamaki. 3次元レジストレーション（PCLデモとコード付き）. (アクセス:2019/04/30)](https://www.slideshare.net/ttamaki/3pcl)
- 参考文献の[7] 2019年 [千葉直也. 点群深層学習 Meta-study. (アクセス:2019/04/30)](https://www.slideshare.net/naoyachiba18/metastudy)

## データセット
点群処理の実証や実験で使われるデータセットたち(使えないものもあるかも)。

- [ModelNet: Princeton ModelNet. (アクセス:2019/04/30)](http://modelnet.cs.princeton.edu/)
- ShapeNet(何故かhttpsではないからプライバシーがどうのこうの言われる)
- [KITTI: The KITTI Vision Benchmark Suite. (アクセス:2019/04/30)](http://www.cvlibs.net/datasets/kitti/)
- [IKEA Dataset: IKEA Dataset. (アクセス:2019/04/30)](http://ikea.csail.mit.edu/)
- [PASCAL3D+: Computational Vision and Geometry Lab. (アクセス:2019/04/30)](http://cvgl.stanford.edu/projects/pascal3d.html)
- [Pix3D: Pix3D. (アクセス:2019/04/30)](http://pix3d.csail.mit.edu/)
- [ObjectNet3D: Computational Vision and Geometry Lab. (アクセス:2019/04/30)](http://cvgl.stanford.edu/projects/objectnet3d/)
- [NYUV2: NYU Depth V2 « Nathan Silberman. (アクセス:2019/04/30)](https://cs.nyu.edu/~silberman/datasets/nyu_depth_v2.html)
- [S3DIS: Large Scale Parsing. (アクセス:2019/04/30)](http://buildingparser.stanford.edu/dataset.html)

## ツール
点群用のライブラリ等。

- [Open3D](http://www.open3d.org/)
- Point Cloud Library(PCL、公式ホームページにアクセスすると不審なサイトへ何故か飛ばされる)
- [python-pcl](https://github.com/strawlab/python-pcl)
- [iai_kinect2](https://github.com/code-iai/iai_kinect2)
- [librealsense](https://github.com/IntelRealSense/librealsense)

## センサー
点群データを扱えるセンサー類。

- [Azure Kinect DK](https://azure.microsoft.com/ja-jp/services/kinect-dk/)
- [Xtion2](https://www.asus.com/jp/3D-Sensor/Xtion-2/)
- [Structure Sensor](https://structure.io/)
- [RealSense](https://www.intel.co.jp/content/www/jp/ja/architecture-and-technology/realsense-overview.html)
- [Orbbec系](https://orbbec3d.com/)
- [3Dカメラ一覧](https://www.unipos.net/find/find_input.php?ffind=1&find_key=3D%E3%82%AB%E3%83%A1%E3%83%A9%20%E5%8F%96%E6%89%B1%E4%B8%80%E8%A6%A7&product_category=-1)
- [北陽のセンサー(LRF等)](https://www.hokuyo-aut.co.jp/)
- [Velodyne Lidar](https://velodynelidar.com/)

## シミュレータ
LiDAR用のシミュレータ

- [LiDAR GTA V(別途Lゲームが必要)](https://github.com/UsmanJafri/LiDAR-GTA-V)
- [CARLA](http://carla.org/)

## 技術用語
- **Registration**  
  点群Aと点群Bに共通する箇所がある場合、その個所をもとに点群Aと点群Bを合体させるタスクである。下の図([1]の図1からの引用)の一番下が2つの点群をRegistrationしたものである。

  ![椅子の点群](img/point_cloud/ppfnet-fig1.png)

  [2]によるとCoarse registration algorithmとFine registration algorithmsの二つがある。以下の2つの説明は[2]の引用、修正したものである。
  - Coarse registration algorithm  
    このアルゴリズムは各点群の位置が近接していると事前に仮定しておらず、おおざっぱな位置合わせを目的としており、損失関数のポリシーも穏やかである。
  - Fine registration algorithm  
    入力される点群が大体位置合わせされており、先ほどの[1]の図の様に点群が大きくかぶっている場合はこのアルゴリズムが使われる。また、Coarse registration algorithmの補助としても使われる。

## Reference
1. [Haowen Deng, Tolga Birdal, Slobodan Ilic. PPFNet: Global Context Aware Local Features for Robust 3D Point Matching. CVPR2018.](https://arxiv.org/abs/1802.02669)
2. [Gil Elbaz, Tamar Avraham, Anath Fischer. 3D Point Cloud Registration for Localization Using a Deep Neural Network Auto-Encoder. CVPR2017](http://openaccess.thecvf.com/content_cvpr_2017/papers/Elbaz_3D_Point_Cloud_CVPR_2017_paper.pdf)
3. [千葉直也, 戸田幸宏. 三次元点群を取り扱うニューラルネットワークのサーベイ Ver. 2 / Point Cloud Deep Learning Survey Ver. 2 - Speaker Deck. (アクセス:2019/04/29)](https://speakerdeck.com/nnchiba/point-cloud-deep-learning-survey-ver-2)
4. [Keisuke Fujimoto. 20190414 Point Cloud Reconstruction Survey. (アクセス:2019/04/30)](https://www.slideshare.net/FujimotoKeisuke/20190414-point-cloud-reconstruction-survey-140757963)
5. [neka-nat. 確率モデルを用いた3D点群レジストレーション. (アクセス:2019/04/30)](https://docs.google.com/presentation/d/1zlVC7TNLcui29h1VyZxMk2rFXTA_1KlCfefoq6eeYsU/edit#slide=id.p)
6.  [Toru Tamaki. 3次元レジストレーション（PCLデモとコード付き）. (アクセス:2019/04/30)](https://www.slideshare.net/ttamaki/3pcl)
7. [千葉直也. 点群深層学習 Meta-study. (アクセス:2019/04/30)](https://www.slideshare.net/naoyachiba18/metastudy)

## key-words
Point_Cloud, Registration