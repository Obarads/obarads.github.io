# DeepVIO: Self-supervised Deep Learning of Monocular Visual Inertial Odometry using 3D Geometric Constraints

元の論文の公開ページ : [arxiv](https://arxiv.org/abs/1906.11435)  
Github Issues : [#116](https://github.com/Obarads/obarads.github.io/issues/116)

## どんなもの?
オプティカルフロー特徴(2D optical flow feature, OFF)と慣性計測装置(Inertial Measurement Unit, IMU)の情報を直接統合することにより、絶対軌道推定を提供するDeepVIOを提案した。

貢献は以下の通り。

- **初めてのモデル** : stereo sequences(連続したステレオ画像)から取得した教師信号を用いた自己教師ありEnd-to-End単眼VIOネットワークを提案する。この提案は最初の提案である。
- **3D制約(罰則)** : 推定された2D OFFとIMU姿勢、VIOの軌道にある矛盾を罰するために6-DoF姿勢と3Dオプティカルフローを含む3D幾何学的な制約を用いる。
- **IMUへのバイアス補正** : 従来の密結合VIO手法と同様のFC-fusion networkからの姿勢フィードバックを用いてIMUに対して追加のバイアスを更新する。
- **良好な実験結果** : KITTiとEuRoCデータセットでVOとVIOシステムに基づいたSOTAな学習手法と比べて精度とデータ適応の面から良好な結果を出した。

## 先行研究と比べてどこがすごいの?

## 技術や手法のキモはどこ? or 提案手法の詳細

## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- [Ke Sun, Kartik Mohta, Bernd Pfrommer, Michael Watterson, Sikang Liu, Yash Mulgaonkar, Camillo J Taylor, and Vijay Kumar. Robust stereo visual inertial odometry for fast autonomous flight. IEEE Robotics and Automation Letters, 3(2):965–972, 2018.](https://arxiv.org/abs/1712.00036)
- [Friedrich Fraundorfer and Davide Scaramuzza. Visual odometry: Part ii: Matching, robustness, optimization, and applications. IEEE Robotics & Automation Magazine, 19(2):78–90, 2012.](https://www.zora.uzh.ch/id/eprint/71030/1/Fraundorfer_Scaramuzza_Visual_odometry.pdf)

## 論文関連リンク
1. なし

## 会議
IROS 2019

## 著者
Liming Han, Yimin Lin, Guoguang Du, Shiguo Lian

## 投稿日付(yyyy/MM/dd)
2019/06/27

## コメント
なし

## key-words
RGB_Image, Self-Supervised_Learning

## status
導入

## read
A, I

## Citation
