# DeepSDF: Learning Continuous Signed Distance Functions for Shape Representation

元の論文の公開ページ : [arxiv](https://arxiv.org/abs/1901.05103)  
Github Issues : [#135](https://github.com/Obarads/obarads.github.io/issues/135)

## どんなもの?
3D形状の表面を決定境界線で表現する新しい連続表現、DeepSDF(SDF=Signed Distance Function)を提案した。この表現を図で表すと、図2のようになる。図2は(a)に示すとおり、サンプリングされた点は内部SDF(青点、SDF<0)もしくは外部SDF(赤点、SDF>0)として表現される。これらのSDFの決定境界線となるSDF=0は形状の表面を表す(図2(c))。

![fig2](img/DLCSDFfSR/fig2.png)

貢献は以下の通り。

- 連続的で暗黙の表面を持つ、generative shape-conditioned 3D modelingの定式化をした。
- 確率的auto-encoderに基づく3D形状のための学習手法の提供をした。
- 形状モデリングと補完への定式化に関するデモンストレーションを行った。

## 先行研究と比べてどこがすごいの?
著者らの知る限り、暗黙的な表面としてSDFは知られているが、SDFを連続的な表現として学習を行う研究はない。

[※ [1]など、自分が知る限りSDFは離散的な表現として使われる。]

## 技術や手法のキモはどこ? or 提案手法の詳細


## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. [Cherdsak Kingkan, Coichi Hashimoto, Generating Mesh-based Shapes From Learned Latent Spaces of Point Clouds with VAE-GAN, ICPR 2018.](https://ieeexplore.ieee.org/document/8546232)

## 会議
CVPR 2019

## 著者
Jeong Joon Park, Peter Florence, Julian Straub, Richard Newcombe, Steven Lovegrove.

## 投稿日付(yyyy/MM/dd)
2019/01/16

## コメント
なし

## key-words
Reconstruction, AutoEncoder, Point_Cloud, Completion, CV, Paper

## status
導入

## read
A, I

## Citation
