# PIXOR: Real-time 3D Object Detection from Point Clouds

元の論文の公開ページ : [arxiv.org](https://arxiv.org/abs/1902.06326)  
Github Issues : []()  

## どんなもの?
自動運転を想定した、点群からのリアルタイム3Dオブジェクト検出タスクに対して取り組んだ。
- 既存の手法は点群の高次元性により、非常に計算量が非常に高価である。

著者らは新規モデルとしてPIXOR (ORiented 3D object de-tection from PIXel-wise neural network predictions)を提案した。
- 3Dデータを効率的に使用するため、Bird’s Eye View (BEV)からのシーンを利用する。
- 提案なし手法である。
- オブジェクト(車など)の向きを予測できる。
- single-stage検出モデルである。

KITTIとTOR4Dデータセットの2つで、車両検知ベンチマークを行った。
- Average Precision (AP)では他のSOTA手法の結果を超え、尚且つ28 FPS以上の処理速度を記録した。

詳しい内容は[1]を参照。

## 先行研究と比べてどこがすごいの? or 関連事項

## 技術や手法のキモはどこ? or 提案手法の詳細

## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. [fregu856, papers/PIXOR: Real-time 3D Object Detection from Point Clouds.md at master · fregu856/papers, 2018. (access:2019/10/31)](https://github.com/fregu856/papers/blob/master/summaries/PIXOR:%20Real-time%203D%20Object%20Detection%20from%20Point%20Clouds.md)

## 会議, 論文誌, etc.
Bin Yang, Wenjie Luo, and Raquel Urtasun

## 著者
CVPR 2018

## 投稿日付(yyyy/MM/dd)
2018/??/??

## コメント
なし

## key-words
CV, Point_Cloud, Detection, Supervised_Learning, Paper

## status
参照

## read
A

## Citation

