# Spatially-sparse convolutional neural networks

元の論文の公開ページ : [arxiv](https://arxiv.org/abs/1409.6070)
Github Issues : [#64](https://github.com/Obarads/obarads.github.io/issues/64)

## どんなもの?
手書きの文字(注目するべき場所は引いた線だけ、他の空白は何も無いため疎な行列として捉えることができる)のように、空間的スパースな入力に対して効率的な計算が行えるようなCNNを提案した。

## 先行研究と比べてどこがすごいの?
省略

## 技術や手法のキモはどこ? or 提案手法の詳細
### Introduce
各手書き文字はストローク(線?)の列として扱える。各ストロークはxとyの座標値として保存される(?)。文字は$N\times N$の二値画像として扱え、背景は0、ペンで線を引いた部分を1とする。疎なデータに対して疎な処理を行うと計算処理が軽くなるという利点がある。  
もう一つの利点は畳み込みネットワークのパディングに関係している。畳み込みは通常、valid mode(パディングがない[1])で畳み込みを適用するが、これは端の情報を検出することが困難になる(端の部分をフィルタが通る回数が少なくなるためその分の情報が喪失、そもそも全ピクセルに均一にフィルタが適応されない)。これに対応する方法は以下の通り

- 0の値を持つパディングを追加する。
- 各層にパディング追加。
- 畳み込みネットワークを画像のいくつかのoverlapping subsetsに適応する[2]。

スパース性はこれらの優れた特徴を組み合わせられるという可能性を持つ。

### Deep convolutional networks and spatial sparsity
図1の上(DeepCNet)のように、少量の$3\times 3$や$4\times 4$のプーリング層ではなく多量の$2\times 2$のプーリング層を適応する。著者らはプーリングをゆっくり適応する(何層も使うからか?)ことが手書き認識に対して重要であるとしている。一般的な入力では隠れ層の空間サイズの減少が遅いため、プーリングをゆっくり適応する方法は計算コストが比較的高くなる。疎な入力の場合、初期の隠れ層でスパース性が維持されるという事実によって相殺される(図2参照)。

![fig1](img/SCNN/fig1.png)

![fig2](img/SCNN/fig2.png)

#### DeepCNet($\ell,k$)
著者らは畳み込み層とmaxpooling層をもつシンプルなCNNファミリーを考える。$\ell+1$個の畳み込み層と$\ell$個の$2\times 2$のmaxpooling層を使う。畳み込みフィルターの数は$nk$である。フィルタの空間サイズは最初の層に$3\times 3$、それ以降は$2\tiems 2$となる。論文中の計算コストは最初の数層のみで判断している(図1の通り、指数関数的に層のサイズが小さくなる)。構造の詳細(ドロップアウトの話など)は省略。

#### DeepCNiN($\ell,k$)
[3]に触発されて、著者らはDeepCNetsをnetwork-in-networkを追加することで修正する。NiN層は$1\times 1$のフィルターを持つ。各maxpooling層と最終畳み込み層のあとにNiN層が設置される。このモデルをDeepCNiN($\ell,k$)と呼ぶ。

#### Spatial sparsity for convolutional networks
CNNの入力層にall zero配列を入れることを想像してみて。ネットワークを順方向に評価すると、入力の並進不変性が各隠れ層に順に伝播される。したがって、それぞれの隠れ変数は意味を持つ入力を受け取らないことに対応する基底状態を持つと考えられる。バイアス項のため、基底状態は一般的にゼロ以外になる。入力配列がスパースである場合、これらの基底状態とは異なる隠れ変数の値を計算する必要がある。図2は層を介してアクティブな位置がどのように変化するか示している。  

## どうやって有効だと検証した?
省略

## 議論はある?
省略

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. [ni4muraano. 【Python】 KerasのConv2Dの引数paddingについて - 旅行好きなソフトエンジニアの備忘録. (アクセス:2019/04/18)](http://ni4muraano.hatenablog.com/entry/2017/02/02/195505)
2. [Alex Krizhevsky, Ilya Sutskever, and Geo rey E. Hinton. Imagenet classification with deep convolutional neural networks. In Peter L. Bartlett, Fernando C. N. Pereira, Christopher J. C. Burges, L eon Bottou, and Kil-ian Q. Weinberger, editors, NIPS, pages 1106{1114, 2012.](https://papers.nips.cc/paper/4824-imagenet-classification-with-deep-convolutional-neural-networks.pdf)
3. [Min Lin, Qiang Chen, and Shuicheng Yan. Network in network. CoRR, abs/1312.4400, 2013.](https://arxiv.org/abs/1312.4400)

## 会議
不明

## 著者
Benjamin Graham

## 投稿日付(yyyy/MM/dd)
2014/09/22

## コメント
Sparse 3D convolutional neural networksという3Dバージョンも有り。

## key-words
RGB_Image, Sparsity

## status
省略

## status
未完