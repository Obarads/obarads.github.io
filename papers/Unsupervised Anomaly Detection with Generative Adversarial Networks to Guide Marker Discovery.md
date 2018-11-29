# Unsupervised Anomaly Detection with Generative Adversarial Networks to Guide Marker Discovery

## どんなもの?
医療画像に写っている疾患を発見するために発案された。画像とそれに関わる語彙をわざわざ結びつけるのは画像情報の使用を制限するため教師なし学習を使う。また、疾患を発見するのに利用される医療画像は限られている上、それらを学習させたとしても学習データの量によっては異常検知力に限りがある(未知のデータに対応できない)。そこで、GANの画像生成を用いて、GANに入力した画像とジェネレータから出力した画像の差異から異常検出を行うモデル、AnoGANを提案した。

## 先行研究と比べてどこがすごいの?
GANを使って異常検出を可能にした。確率分布pに従う様にG(z)を訓練させたGANがあるとき、入力がxであるとしてpに従うxをGANに入力すればG(z)≈xとなるが、pに従わないxを入力したとき、G(z)≈xとなるようなzが存在しないため異常と判断できる。pに従うxならG(z)はxとそっくりであるが、pに従わないxとG(z)には差があるため、そこを論文中の図1の様にマーキングすることもできる。  
しかし、GANは潜在空間Z内に存在するある地点zを生成器G(z)を介して出力(写像)xする(G(z)=z↦x)ことは可能であるが、xに対応するzを探すために、逆写像関数μ(x)を介してxからzへ逆写像する(μ(x)=x↦z)ことは出来ない。
そこである初期値z0を用意し、勾配法とxとG(zγ){γ=0,1,2,...,Γ}の誤差を用いて、xに対応するzΓを求める。

## 技術や手法のキモはどこ?
最適なzγを勾配法によって探すため、以下の様な損失関数を定義する。  
L(zγ)=(1-λ)・LR(zγ)+λ・LD(zγ)  
- LRはResidual Lossであり、視覚的相違を表す。G(zγ)がxと全く同じなら、L(zγ)=0となる。定義式は以下の通り  
LR(zγ)=Σ|x-G(zγ)|
- LDはDiscrimination Lossであり、GANのDis

## どうやって有効だと検証した?
性能評価について以下の3点を計測している。  
- **モデルがリアルな画像を提案できるかどうか**  
リアルな画像が生成できるのであるなら、

## 議論はある?

## 次に読むべき論文は?
Improved techniques for training GANs. In: Advances in Neural Information Pro-cessing Systems (GANについてよく知らないし、特徴マッチングが気になった)  

### 論文関連リンク

### 参考リンク
参考1:https://aotamasaki.hatenablog.com/entry/2018/04/14/212948#%E3%83%A1%E3%82%A4%E3%83%B3%E3%82%A2%E3%82%A4%E3%83%87%E3%82%A2  
参考2:https://qiita.com/NakaokaRei/items/231ec4efe42dfe79d1ff  
参考3:http://habakan6.hatenablog.com/entry/2018/04/29/013200  

### 会議
IPMI2017

### 著者/所属機関
Thomas Schlegl, Philipp Seebock, Sebastian M. Waldstein, Ursula Schmidt-Erfurth, and Georg Langs.

### 投稿日付(yyyy/MM/dd)
2018/11/27

## コメント
