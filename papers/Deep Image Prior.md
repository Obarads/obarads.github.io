# Deep Image Prior

元の論文の公開ページ : [arxiv](https://arxiv.org/abs/1711.10925)  
Github Issues : 

## どんなもの?
ランダムに初期化されたニューラルネットワークを使って逆問題(ノイズ除去、趙改造、修復)を解く方法を提案した。この論文は、タスクをこなすには(画像データらしさ[1]の)事前分布を構築するための学習を使用するという考えとは対照的に、事前分布はネットワークの構造(それも学習していないもの)によって得られるという主張をしている。ここでいう事前分布とは、劣化過程で失われた情報を補完するために必要とされる分布を指し、この分布は画像復元問題(先ほどの逆問題)を解くために使われる。

著者らは主張が正しいことを示すため、訓練していないConvNetsを逆問題に適応し、それを解決する。そのため、著者らはConvNetを大規模なデータセットで訓練するという一般的な方法を使用せず、生成器ネットワークを劣化画像に適合(fit)させる。

## 先行研究と比べてどこがすごいの?
著者らの知る限り、画像からネットワークパラメータを学習することとは無関係に、深層畳み込み生成ネットワークによって得られた事前分布を直接調査する最初の研究である。また、既存の手法よりも手軽に逆問題に対処することができる。

## 技術や手法のキモはどこ? or 提案手法の詳細

## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. [tripdancer, Deep Image Prior - tripdancer’s blog, 2018. (アクセス:2019/07/24)](http://tripdancer0916.hatenablog.com/entry/2018/01/13/Deep_Image_Prior)
2. [Dylan Raithel and h_yoshida, トレーニング不要なニューラルネットワークによるDeep Image Prior, 2018. (アクセス:2019/07/24)](https://www.infoq.com/jp/news/2018/02/deep-image-priors/)

## 会議
CVPR 2018

## 著者
Dmitry Ulyanov, Andrea Vedaldi, Victor Lempitsky.

## 投稿日付(yyyy/MM/dd)
2017/11/29

## コメント
解説なら[1]を見るほうがいいと思う。あと、主張が面白い。関連研究も見たほうがより面白くなりそう。

## key-words
RGB_Image, Super-Resolution, Completion, Denoising

## status
導入

## read
A, I

## Citation
