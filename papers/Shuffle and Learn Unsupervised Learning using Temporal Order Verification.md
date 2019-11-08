# Shuffle and Learn: Unsupervised Learning using Temporal Order Verification

元の論文の公開ページ : [arXiv](https://arxiv.org/abs/1603.08561)  
Github Issues : [#70](https://github.com/Obarads/obarads.github.io/issues/70)

## どんなもの?
ビデオのフレームを並べたタプルを用意し、そのタプル内のフレームが入れ替えられていないかどうか判定することでネットワークを訓練するSelf-Supervised Learning手法を提案した。

## 先行研究と比べてどこがすごいの?

## 技術や手法のキモはどこ? or 提案手法の詳細
入力されるタプルは図1の通り。元のビデオからいくつかのフレームを抜き取り、それをただ並べたもの(ポジティブタプル)と入れ替えたもの(ネガティブタプル)を用意する。

![fig1](img/SaLULuTOV/fig1.png)

一つのタプルにつき3つのフレームを使う。視覚的な変化があまりないフレームの組み合わせは曖昧な訓練データとなるため、オプティカルフロー[1]を用いてフレーム間の変化が激しい部分を使用する。  
また、データもただ無作為に並べ替えるわけではない。図2に示すように$f_ a~f_ e$までのフレームを用意する。この時、ポジティブタプルとなるのは$(f_ b, f_ c, f_ d)$と$(f_ d, f_ c, f_ b)$(時系列が逆のものも追加する)とする。またネガティブタプルは$f_ c$の代わりに$f_ a$もしくは$f_ e$が入れられたものを使う。この時重要なのは、始まりと終わりのフレームが$f_ b$と$f_ d$のどちらかで、その中間にあるフレームを替えるということである。ネットワークにはこの中間フレームの微妙な違いを見分けられるようになってもらうことが目標である。  
尚、ここでも$f_ a$と$f_ e$が$f_ c$に似るような状況を減らすため、RGBピクセル値のSSDによって訓練に最適な$f_ a$と$f_ e$を探す。  
実験で使われるアーキテクチャはAlexNet、訓練時はネットワークには3つのフレームが入力される。入力時のネットワークのパラメータは共有されている。出力として、入力されたタプルが正しい並びであるかどうかを予測する。

![fig2](img/SaLULuTOV/fig2.png)

## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. [Farneback, G.: Two-frame motion estimation based on polynomial expansion. In: Image analysis. Springer (2003)](http://www.diva-portal.org/smash/get/diva2:273847/FULLTEXT01.pdf)

## 会議
ECCV 2016

## 著者
Ishan Misra, C. Lawrence Zitnick, Martial Hebert.

## 投稿日付(yyyy/MM/dd)
2016/03/28

## コメント
なし

## key-words
Video, Self-Supervised_Learning, CV, Paper

## status
未完

## BibTex
