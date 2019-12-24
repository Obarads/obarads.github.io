# EdgeNet: Balancing Accuracy and Performance for Edge-based Convolutional Neural Network Object Detectors

元の論文の公開ページ : [arxiv.org](https://arxiv.org/abs/1911.06091)  
提案モデルの実装 : []()  
Github Issues : []()  

## どんなもの?
##### 高解像度のビデオのフレーム中にあるオブジェクトをSOTAなCNNベースの検出器並の精度で検出する階層型ネットワークを提案した。
- 計算資源が乏しいデバイス上でもリアルタイム(低遅延)で検出できるようなネットワークを作るという文脈。
- CNNのようなネットワークは精度が良い代わりに、計算資源が豊富なデバイスが必要となる。

##### 低出力の埋め込みプロセッサ上では、提案手法が従来の手法を処理速度の点で上回る。
- intelligent data reduction mechanism[(?)]を使う。

##### 更に、異なるプラットフォームに実装されたとき、提案された手法が感度、平均処理時間、消費電力に与える影響を、UAVからの歩行者検出の観点から示す。
- 提案された選択プロセスを用いて、フレームワークは処理されたデータは100[(倍?)]軽減する。
- 様々なエッジデバイスで4W未満の消費電力をなし得た。

## 先行研究と比べてどこがすごいの? or 関連事項

## 技術や手法のキモはどこ? or 提案手法の詳細

## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. [なし]()[1]

## 会議, 論文誌, etc.
ICDSC 2019

## 著者
George Plastiras, Christos Kyrkou, Theocharis Theocharides

## 投稿日付(yyyy/MM/dd)
2019/11/14

## コメント
なし

## key-words
CV, Paper, 修正, Detection

## status
修正

## read
A

## Citation
