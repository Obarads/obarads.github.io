# Cost-Effective Active Learning for Deep Image Classification

元の論文の公開ページ : [arxiv](https://arxiv.org/abs/1701.03551)  
Github Issues : [#72](https://github.com/Obarads/obarads.github.io/issues/72)

## どんなもの?
漸次的学習手法で、限られた量しかないラベル付された訓練インスタンスを介して、最適な特徴表現を持つ分類機を作成できる新規のアクティブラーニングフレームワーク、Cost-Effective Active Learning (CEAL)を提案した。
- 著者らの手法は2つの面で既存のアクティブラーニング手法を進展させた。
    1. 深層学習モデルをアクティブラーニングに導入する。漸進的に得られる注釈情報を用いて分類器と特徴表現を更新していく。
    2. 少数の手製アノテーションを用いて、分類性能を向上させるためのcost-effecticve sample selection strategyを提案する。低い予測信頼度の不確実なサンプルのみに焦点を当てる従来手法と異なり、特徴学習のためののラベルなしサンプル群から大量の信頼できるサンプルを発見できる。

## 先行研究と比べてどこがすごいの?

## 技術や手法のキモはどこ? or 提案手法の詳細

## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. なし

## 会議
TCSVT 2016

## 著者
Keze Wang, Dongyu Zhang, Ya Li, Ruimao Zhang, Liang Lin.

## 投稿日付(yyyy/MM/dd)
2017/01/13

## コメント
なし

## key-words
RGB_Image, Active_Learning, CV, Paper, Classification

## status
導入

## read
A

## Citation
@article{article,
author = {Wang, Keze and Zhang, Dongyu and Li, Ya and Zhang, Ruimao and Lin, Liang},
year = {2016},
month = {01},
pages = {1-1},
title = {Cost-Effective Active Learning for Deep Image Classification},
volume = {27},
journal = {IEEE Transactions on Circuits and Systems for Video Technology},
doi = {10.1109/TCSVT.2016.2589879}
}