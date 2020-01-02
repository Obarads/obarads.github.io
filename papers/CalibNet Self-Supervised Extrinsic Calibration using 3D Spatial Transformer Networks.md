# CalibNet: Self-Supervised Extrinsic Calibration using 3D Spatial Transformer Networks

元の論文の公開ページ : [arxiv](https://arxiv.org/abs/1803.08181)  
提案モデルの実装 : [epiception/CalibNet](https://github.com/epiception/CalibNet)  
Github Issues : [#115](https://github.com/Obarads/obarads.github.io/issues/115)

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。

## どんなもの?
##### リアルタイムで3D LIDARと2Dカメラ間の6-DoF剛体変換を自動的に推定することができる自己教師ありネットワーク、CalibNetを提案した。
- CalibNetは結果的に、Camera Calibration Targets(チェック模様のボードを用意してキャリブレーションするやつ)の必要性を緩和してキャリブレーションの手間を減らすことができる。
- CalibNetは入力として3D LiDARとそれに対応する2Dカメラ、カメラのキャリブレーション行列$K$(カメラの内在値とは別物?)を受け取る。
- 訓練時は、直接的な教師を使用しない(つまり、キャリブレーションパラメータを直接的に回帰しない(?))代わりに、入力点群と2D画像の幾何学的&光度的な一貫性を最大化するキャリブレーションパラメータを予測する。
- これにより、CalibNetは反復的に幾何学問題を解決する術を学習し、正確な外部キャリブレーションパラメータを予測する。
- 貢献は以下の通り。
  - **新規モデル** : CalibNetはLiDAR-Camera間の複数のセンサーの自己キャリブレーション問題に取り組んだ最初の教師なし(どちらかといえば自己教師あり)深層学習アプローチである。
  - **カメラの内在値等に依存しない学習手法** : CalibNetは3D Spatial Transformers[1]に基づいた新規のアーキテクチャであり、幾何学&光度的な一貫性を学習することで内在する物理的問題(キャリブレーション)を解決する。これは、微調整や再学習をせず&カメラの内在値などに依存せずに複数のセンサーデータを一般化することができる。
  - **幾何学とテクスチャ情報の融合** : より大きな事柄で捉えるなら、本論文はテクスチャと幾何学の長所を利用した教師なしmodel-to-image registrationアプローチである。

## 先行研究と比べてどこがすごいの?
##### 省略

## 技術や手法のキモはどこ? or 提案手法の詳細
##### 省略

## どうやって有効だと検証した?
##### 省略

## 議論はある?
##### 省略

## 次に読むべき論文は?
##### なし

## 論文関連リンク
##### なし

## 会議
##### IROS 2018

## 著者
##### Ganesh Iyer, Karnik Ram R., J. Krishna Murthy, K. Madhava Krishna.

## 投稿日付(yyyy/MM/dd)
##### 2018/03/22

## コメント
##### なし

## key-words
##### Point_Cloud, RGB_Image, Self-Supervised_Learning, Sensor_Fusion, CV, Paper, 導入, Implemented

## status
##### 導入

## read
##### A, I

## Citation
##### arxiv.orgより引用
[リンク](https://arxiv.org/abs/1803.08181v1)  
@misc{iyer2018calibnet,
    title={CalibNet: Geometrically Supervised Extrinsic Calibration using 3D Spatial Transformer Networks},
    author={Ganesh Iyer and R. Karnik Ram. and J. Krishna Murthy and K. Madhava Krishna},
    year={2018},
    eprint={1803.08181},
    archivePrefix={arXiv},
    primaryClass={cs.RO}
}