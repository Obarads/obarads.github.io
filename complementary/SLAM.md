# SLAM
## 概要
Simultaneous Localization and Mappingの略。自己位置推定と環境地図作成を同時に行うこと。カメラやLRF等で行われる。また、以下の説明は[3]の本を参考に作成している。

## 必要性
人間が一度通った場所を覚えどこにいるか把握するように、ロボットもSLAMを用いて場所の記憶と自己位置推定を行う。SLAMによりロボットは一度探索した場所を再探索せずとも行動できるようになる。

## 有効性
SLAMを使わずともオドメトリ(後述)を使えば地図とロボットの位置の把握を行うことができるが、地図の精度が低くなる。SLAMを使えば、この問題点を改善できる。

## SLAMの大まかな処理順序
### 1. データの取得
LRFやLiDAR、車輪エンコーダー、カメラなどから自分の位置や外界の形状を把握するための情報を取得する。

### 2. 地図の生成
オドメトリに基づいて現在のフレームの地図(点群地図など)を作成する。

### 3. スキャンマッチング
現在のフレームの一つ前のフレームで取得した2つの地図を組み合わせる。点群地図の場合、ICP等を用いて各フレームの地図中の点間の対応付けを行う。うまく対応付けされると下図の様になる。下図は[4]の図7.1を引用したものである。この時、ロボット位置も最適化する。

![fig7.1-Ohmsha-slam.png](img/SLAM/fig7.1-Ohmsha-slam.png)

ただし、ランドマークとなるような形状を補足できない時、退化が起こるためそれにも対処しなければならない。また、ループ閉じ込みで2度通った場所を基準とした地図の修正を行わなければならない。

## 技術用語 
- **自己位置推定(self localization, robot localization)**  
  地図上の自分の位置を把握すること。これには2種類ある。
  - 位置追跡(position tracking, pose tracking)  
    初期位置が与えられ、その初期位置と順次得られる位置情報を元に場所を把握していく。
  - 大域自己位置推定(global localization)  
    初期位置は与えられないため、初期位置がわからないまま自頭上の全領域を探索する。
  
- **経路計画(path planning)**  
  現在地から目的地までの走行路を計画するもの。

- **障害物回避(obstacle avoidance)**  
  そのままの意味。

- **ランドマーク(landmark)**  
  位置の目印になるもの。角とかくぼみとか、画像で言えば色と色の境目とか。

- **オドメトリ(odometry)**  
  与えられた初期位置からの移動量を導き出し、それらを累積させていきロボットの位置を推定する手法。車輪の回転数から移動量を求める車輪オドメトリ、カメラから連続した入力を受け取り、そこから移動量を求めるビジュアルオドメトリなどがある。ただし、オドメトリには、タイヤのスリップなどから生じる誤差の累積がある(累積誤差、accumulated error)。

- **フレーム(frame)**  
  ある一定周囲期で回ってくるデータを取得するタイミング。ゲームのフレームレートとかで出てくるフレームと同じ。

- **キーフレーム(key frame)**  
  [2]より。SLAMではリアルタイムに動作する必要があり、毎フレーム入力される画像を逐次処理していく必要がある。しかし単純にすべての画像をそのまま処理することは難しいため、自己位置推定は毎フレーム行い、画像に大きな変化が起こったフレームのみマップ作成を行う。このマップ作成を行うフレームをkey frameという。

- **ポーズグラフ(pose graph)**  
  ロボットの奇跡をグラフ構造で表したもの。頂点(vertex)と辺(edge)で構成される。辺の種類には時系列順にロボットの位置(頂点)をつなげるオドメトリ辺とループ検出時に生成される時系列的には離れた頂点を繋ぐループ辺がある。ループ辺はポーズグラフを修正するときに使う。

- **退化(degeneracy)**  
  移動しても風変わりせず、新たなランドマークに成り得るようなオブジェクトも無い場合、例えば床に平行な2次元レーザースキャナ(LRF等)で延々と続く廊下の風景を取る場合、スキャナから得られるデータは平行線のみになる。平行線だけではスキャンマッチングでも誤った位置合わせをしてしまう可能性が有り、結果として不安定になる。

- **ループとじ込み(loop closure)**  
  同じところを2回通った時、その場所を基準として通った場所の整合性が取れるように調節すること。累積誤差によりずれた部分を減らし、歪みを極力減らした地図を生成できる。

- **バンドル調節(Bundle adjustment)**  
  あとで編集。

## Visual SLAM
[2]を参照。Visual SLAMとしては以下のモデルや論文が挙げられる。Structure from Motion(SfM)との違いはリアルタイム処理を必要とするかどうか、またvisual SLAMは連続した画像を扱うことができる。

|モデル名 or 論文名 |参考資料  |発行年  |
|---|---|---|
|[CNN-SLAM](https://arxiv.org/abs/1704.03489)  |[第41回関東CV勉強会 CNN-SLAM](https://www.slideshare.net/KunihiroHasegawa/41cv-cnnslam)  |2017  |
|[DeepVO](https://arxiv.org/abs/1709.08429)  |なし  |2017  |
|[MonoSLAM](https://www.doc.ic.ac.uk/~ajd/Publications/davison_etal_pami2007.pdf)  |なし  |2007 |
|ORB-SLAM  |[ORB-SLAMの手法解説](https://www.slideshare.net/MasayaKaneko/orbslam-84842802)  |????  |
|[PTAM](http://www.robots.ox.ac.uk/~gk/publications/KleinMurray2007ISMAR.pdf)  |[SLAM勉強会(PTAM)](https://www.slideshare.net/MasayaKaneko/slamptam)  |2017|
|[DTAM](https://ieeexplore.ieee.org/document/6126513) | なし |2011|
|[LSD-SLAM](https://vision.in.tum.de/research/vslam/lsdslam)  |[SLAM勉強会（3） LSD-SLAM](https://www.slideshare.net/kazuya_tennis/slam3-lsdslam)|2017|
|[Visual SLAM: Why Bundle Adjust?](https://arxiv.org/abs/1902.03747)|なし |2019|
|[SVO](https://ieeexplore.ieee.org/abstract/document/6906584)|なし|2014|

## SLAMによる地図の作成例
論文名と年のみ掲載

1. Improved Techniques for Grid Mapping with Rao-Blackwellized Particle Filters. 2007.
2. Real-Time Loop Closure in 2D LiDAR SLAM. 2016.
3. LOAM: Lidar Odometry and Mapping in Real-time. 2014.
4. LSD-SLAM: Large-Scale Direct Monocular SLAM. 2014. (visual slam)
5. Deformaton-based Loop Closure for Large Scare Dense RGB-D SLAM. 2013.

## Reference
2. [掃除機. visual SLAM の歴史1(visual SLAMの誕生). 2017. (アクセス:2019/03/30)](https://noshumi.blogspot.com/2017/05/visual-slam-1visual-slam.html)
3. [友納正裕 (2018) SLAM入門 -ロボットの自己位置推定と地図構築の技術-, オーム社.](https://shop.ohmsha.co.jp/shopdetail/000000005234/)
4. [友納正裕 (2018) SLAM入門 -ロボットの自己位置推定と地図構築の技術-, オーム社. (アクセス:2019/04/07)](https://books.google.co.jp/books?id=QM5QDwAAQBAJ&pg=PA80&hl=ja&source=gbs_toc_r&cad=4#v=onepage&q&f=false)
5. [peisuke, ChainerでDeep Learningをしない（SfMからSLAMまで）. (アクセス:2019/04/08)](https://qiita.com/peisuke/items/fbe00bacb22df8115323)

## key-words
SLAM, CV