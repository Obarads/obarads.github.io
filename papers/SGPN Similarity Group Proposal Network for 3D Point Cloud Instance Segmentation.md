# SGPN: Similarity Group Proposal Network for 3D Point Cloud Instance Segmentation

元の論文の公開ページ : https://arxiv.org/abs/1711.08588

## どんなもの?
初の3D点群に対するインスタンス&セマンティックセグメンテーションが可能なモデルを提案した。

## 先行研究と比べてどこがすごいの?
インスタンスセグメンテーションはセマンティックセグメンテーションとタスクが似ているが、出力方法が違うため厄介である。

## 技術や手法のキモはどこ? or 提案手法の詳細
SGPN概要図は図2の通り。生の点群はPointNetもしくはPointNet++等に渡され、点の特徴を抽出する。この特徴は3つの枝に渡され、枝からそれぞれsimilalarity matrixｍ、confidence map、semantic predictionを得る。損失はこれらの3つの枝の損失の合計$L=L_ {SIM}+L_ {CF}+L_ {SEM}$となる。

![fig2](img/SSGPNf3PCIS/fig2.png)

### Similarity Matrix
著者らは、正確なインスタンスセグメンテーション結果を直接取り戻すためにグループ提案を定式化することができる新しいSimilarity Matrix(類似性行列)Sを提案する。点の数を$N_ p$とした時、Sは$N_p \times N_ p$の配列であり、要素$S_ {ij
}$は$P_ i$と$P_ j$が同じオブジェクトのインスタンスであるかどうか分類する。$S$の各行は候補のオブジェクトインスタン
を

## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
-
-

## 論文関連リンク
1. [三次元点群を取り扱うニューラルネットワークのサーベイ Ver. 2 / Point Cloud Deep Learning Survey Ver. 2 - Speaker Deck](https://speakerdeck.com/nnchiba/point-cloud-deep-learning-survey-ver-2?slide=191)
2. [cvpaper.challenge](https://cvpaperchallenge.github.io/CVPR2018_Survey/#/ID_SGPN_Similarity_Group_Proposal_Network_for_3D_Point_Cloud_Instance_Segmentation)

## 会議
CVPR 2018

## 著者
Weiyue Wang, Ronald Yu, Qiangui Huang, Ulrich Neumann.

## 投稿日付(yyyy/MM/dd)
2017/11/23

## コメント
なし

## key-words
Point_Cloud, Instance_Segmentation, Semantic_Segmentation

## status
未完