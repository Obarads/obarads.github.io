# SLAM
## 概要
Simultaneous Localization and Mappingの略。自己位置推定と環境地図作成を同時に行うこと。カメラやLRF等で行われる。また、以下の説明は[3]の本を参考に作成している。

## 必要性
人間が一度通った場所を覚えどこにいるか把握するように、ロボットもSLAMを用いて場所の記憶と自己位置推定を行う。SLAMによりロボットは一度探索した場所を再探索せずとも行動できるようになる。

## 有効性
SLAMを使わずともオドメトリ(後述)を使えば地図とロボットの位置の把握を行うことができるが、地図の精度が低くなる。SLAMを使えば、この問題点を改善できる。

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
  位置の目印になるもの。

- **オドメトリ(odometry)**  
  与えられた初期位置からの移動量を導き出し、それらを累積させていきロボットの位置を推定する手法。車輪の回転数から移動量を求める車輪オドメトリ、カメラから連続した入力を受け取り、そこから移動量を求めるビジュアルオドメトリなどがある。ただし、オドメトリには、タイヤのスリップなどから生じる誤差の累積がある(累積誤差、accumulated error)。

## SLAMによる地図の作成例
論文名と年のみ掲載

1. Improved Techniques for Grid Mapping with Rao-Blackwellized Particle Filters. 2007.
2. Real-Time Loop Closure in 2D LiDAR SLAM. 2016.
3. LOAM: Lidar Odometry and Mapping in Real-time. 2014.
4. LSD-SLAM: Large-Scale Direct Monocular SLAM. 2014. (visual slam)
5. Deformaton-based Loop Closure for Large Scare Dense RGB-D SLAM. 2013.

## visual SLAM
[2]を参照。
- **key frame(キーフレーム)**  
  [2]より。SLAMではリアルタイムに動作する必要があり、毎フレーム入力される画像を逐次処理していく必要がある。しかし単純にすべての画像をそのまま処理することは難しいため、自己位置推定は毎フレーム行い、画像に大きな変化が起こったフレームのみマップ作成を行う。このマップ作成を行うフレームをkey frameという。
- **pose graph(ポーズグラフ)**  
  

## PTAM
[1]を参照。

## Reference
1. [Masaya Kaneko. SLAM勉強会(PTAM). 2017. (アクセス:2019/03/30)](https://www.slideshare.net/MasayaKaneko/slamptam)
2. [掃除機. visual SLAM の歴史1(visual SLAMの誕生). 2017. (アクセス:2019/03/30)](https://noshumi.blogspot.com/2017/05/visual-slam-1visual-slam.html)
3. [友納正裕 (2018) SLAM入門 -ロボットの自己位置推定と地図構築の技術-, オーム社.](https://shop.ohmsha.co.jp/shopdetail/000000005234/)

## key-words
SLAM, 2D_Image