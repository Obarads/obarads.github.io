# Unsupervised Detection of Distinctive Regions on 3D Shapes

元の論文の公開ページ : [arxiv](https://arxiv.org/abs/1905.01684)  
Github Issues : 

## どんなもの?
教師なしで3D形状のdistinctive region(以下識別領域と呼ぶ)を探す手法を提案する。貢献は以下の通り。

1. 識別領域を検知する教師なしアーキテクチャの提案した。
2. クラスタリングベースのノンパラメトリックソフトマックス分類器を設計し、教師なしでネットワークを学習するためのadapted contrastive lossを適応した。
3. 提案手法の評価と、識別性が3Dシーンの形状検索、サンプリング、視界選択にどのように貢献するか示す。

## 先行研究と比べてどこがすごいの?
クラスラベルを必要としない3D形状の識別領域検出が可能にしている。また、Grad-CAMなどのニューロン活動視覚化手法ではクラスラベルを必要とする方法を紹介しているが、本提案では教師なしで視覚化する。

## 技術や手法のキモはどこ? or 提案手法の詳細
提案では柔軟性と計算量の軽さから点群で形状の識別領域を予測する。提案手法の概要図は図2の通り。

![fig2](img/UDoDRo3S/fig2.png)

## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. なし

## 会議
不明

## 著者
Xianzhi Li, Lequan Yu, Chi-Wing Fu, Daniel Cohen-Or, Pheng-Ann Heng.

## 投稿日付(yyyy/MM/dd)
2019/05/05

## コメント
なし

## key-words
Point_Cloud, Analytics

## status
未完

## read
A, I, R

## Citation
