# 2D-Driven 3D Object Detection in RGB-D Images

元の論文の公開ページ : [ivul.kaust.edu.sa](https://ivul.kaust.edu.sa/Documents/Publications/2017/2D-Driven%203D%20Object%20Detection%20in%20RGB-D%20Images.pdf)  
提案モデルの実装 : [2019/12/23: なし]()  
Github Issues : []()  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。

## どんなもの?
##### 2D検出手法を恩恵を利用して、RGBと深度画像からオブジェクトの向きと3Dバウンディングボックスを高速で推定する手法を提案した。
- 2D検出を使用して、オブジェクトに対する3D検索範囲を制限し、時間の短縮を実現した。
- 点群座標をヒストグラム(密度)として利用し、3Dバウンディングボックスを回帰する。

## 先行研究と比べてどこがすごいの? or 関連事項
##### 既存の手法よりも高速な3D検出ができるようになった。
- 既存の3D検出手法[(おそらくRGB-Dカメラに限った話)]はGPUを使っているにもかかわらず、2D検出手法よりはるかに遅い。理由は以下の通り。[論文では以下三つを挙げているが、2番目と3番目の理由は高速化に関する直接的な話ではないように思える。]
  - 次元の多さ: 次元の多さ故、3D検出は2D検出よりも検索範囲が広い。そのため、処理速度が下がっている。また、
  - スパースなデータ: RGB-Dカメラによって生成される3D点群は2Dに見られる隣接性を持っていない。[要は、点群データをどうやって直接的に(ボクセル化なしに)処理すればよいかわかってないということ?]
  - 深度情報の利用: RGB-D画像の深度情報を効果的に扱う方法が確立されていない。
    - 深度情報を追加のチャンネルとして扱う方法は検出プロセスの高速化と容易化の恩恵を得られるが、現状、最終的な出力は2D検出に限定している。
    - 深度情報をボクセル化する手法は、センサーによって観測した部分のみをボクセル化する[(つまり、オブジェクトの表面のみをボクセルとして表現する)]ため、3D空間上に反映されるボクセルがほとんどない。これは、3Dデータとしては欠損がひどいため、処理できない。
- 本提案では、
  - 2D検出を利用して3Dの検索範囲[(処理する範囲)]を3D空間全体から一部分に狭めることで、検出速度を上げた。
  - オブジェクトの向きとオブジェクトの3次元点群座標のヒストグラムを使用して、3Dバウンディングボックスの回帰を行える様にした。

## 技術や手法のキモはどこ? or 提案手法の詳細
### 手法の概要
- 手法のパイプラインは図2の通り。

![fig2](./img/23ODiRI/fig2.png)

##### 1. Faster R-CNNでオブジェクトの2Dバウンディングボックス(BB)を取得し、そこから錐台3DBBを得る。
- 錐台3DBBは2DBBと深度画像から生成される。

##### 2. 3Dオブジェクトの方向を推定する。
- [1]で提案されている、Manhattan Frame Estimation(MFE)を利用して、全ての錐台3DBB内のオブジェクトの方向をそれぞれ推定する。

##### 3. 3DBBを推定する。
- 点群の重心と推定されたオブジェクトの方向を用いて正規直交系を設定する。
- 3次元点群座標のヒストグラムをMLPに入力し、3DBBの境界を推定する。
- 3DBBを得た後に、スコアの計算を行う。

##### 4. コンテキスト情報を用いて、スコアを洗練させる。
- 各BBの関係をグラフを用いて表して洗練のための計算をする。

## どうやって有効だと検証した?
##### 省略

## 議論はある?
##### 省略

## 次に読むべき論文は?
##### なし

## 論文関連リンク
##### あり
1. [B. Ghanem, A. Thabet, J. C. Niebles, and F. C. Heilbron. Ro-bust manhattan frame estimation from a single rgb-d image. InCVPR, pages 3772–3780. IEEE, 2015.](https://www.cv-foundation.org/openaccess/content_cvpr_2015/papers/Ghanem_Robust_Manhattan_Frame_2015_CVPR_paper.pdf)

## 会議, 論文誌, etc.
##### ICCV 2017

## 著者
##### Jean Lahoud, Bernard Ghanem

## 投稿日付(yyyy/MM/dd)
##### 2017/10/22

## コメント
##### あり
- Mは大雑把に読んだ。

## key-words
##### CV, Paper, RGB_Image, Depth_Image, Detection, 省略, Point_Cloud

## status
##### 省略

## read
##### A, I, R, M

## Citation
##### ieeexplore.ieee.orgより引用
[リンク](https://ieeexplore.ieee.org/document/8237757)  
{
    @INPROCEEDINGS{8237757,
    author={J. {Lahoud} and B. {Ghanem}},
    booktitle={2017 IEEE International Conference on Computer Vision (ICCV)},
    title={2D-Driven 3D Object Detection in RGB-D Images},
    year={2017},
    volume={},
    number={},
    pages={4632-4640},
    keywords={image colour analysis;learning (artificial intelligence);multilayer perceptrons;object detection;search problems;SUN RGB-D dataset;2D-driven 3D object detection;2D object detection techniques;3D information;multilayer perceptron;search space;3D bounding boxes;RGB-D images;sparse 3D domain;object class relations;object locations;score bounding boxes;Three-dimensional displays;Two dimensional displays;Object detection;Solid modeling;Computational modeling;Detectors;Search problems},
    doi={10.1109/ICCV.2017.495},
    ISSN={2380-7504},
    month={Oct},}
}