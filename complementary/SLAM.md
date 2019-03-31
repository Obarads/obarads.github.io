# SLAM
## About
Simultaneous Localization and Mappingの略。自己位置推定と環境地図作成を同時に行うこと。カメラやLRF等で行われる。

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

## key-words
SLAM, 2D_Image