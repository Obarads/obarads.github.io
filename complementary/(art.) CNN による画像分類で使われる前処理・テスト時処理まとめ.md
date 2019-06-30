# (art.) CNN による画像分類で使われる前処理・テスト時処理まとめ

元の記事のページ : [iwi(iwiwi), CNN による画像分類で使われる前処理・テスト時処理まとめ](http://iwiwi.hatenadiary.jp/entry/2016/12/31/162059)

### 前処理・Data Augmentation  
1. Mean Subtraction  
    入力画像から平均を引く。[103.939, 116.779, 123.68] を各ピクセルから引く。VGG はこれ。

1. Per-pixel Mean Subtraction  
    入力画像から平均を引く。ピクセル・チャンネルごとに計算された平均を引く。即ち、224x224x3 個の値について個別に平均を計算し用いる。AlexNet 論文から使われており、ResNet もこれ。

1. Random Crop  
    256x256 ピクセルに画像をリサイズし、そこから 224x224 のパッチをランダムに取り出す。AlexNet 論文で使われていた。ちなみに Chainer の ImageNet サンプルはこれと Horizontal Flip をやっている（これしかやっていないので相応の精度しか出ない）。

1. Horizontal Flip  
    画像をランダムにフリップする。ImageNet では縦方向はなく水平方向の flip のみが使われるようであり、AlexNet 論文以降必ず使われているようだ。

1. Scale Augmentation  
    まず画像をリサイズする。[256, 480] からランダムに短辺の長さを選ぶ。次に、224x224 のパッチをそこからランダムサンプルする。  
    VGG 論文から使われており、ResNet 本家論文でも使われる。

1. Aspect Ratio Augmentation  
    上の Scale Augmentation に加え画像のアスペクト比を [¾, 4/3] で変換する・・・ぽい？（論文の記述が短くわかりにくい）  
    GoogLeNet の論文で使われている。FAIR の ResNet 再現記事でも使われており、本家から 1.2% の精度向上に寄与したらしい。

1. Color Augmentation  
    AlexNet 論文で行われた方法は以下である。各ピクセルの RGB を 3 次元のベクトルの集合だと考え PCA をかける。ガウス分布でノイズを生成し、固有ベクトル方向にノイズを加える。乱数は各ピクセルではなくパッチ全体に対して共通。論文によると AlexNet の精度への寄与は 1% 程度。ResNet 本家論文でも使われている。PCA した結果はここにあったり。  
    “Some Improvements on Deep Convolutional Neural Network Based Image Classification” 論文で行われた方法は以下である。contrast, brightness, color を、[0.5, 1.5] の間でランダムに変更する。変更の順番もランダムに選択する。（ご丁寧に、Python image library (PIL) を使ったと書いてある。）その後で、AlexNet 論文と同様の操作を行う。FAIR の ResNet 再現記事ではこれを利用したと書いてあったが、精度への寄与はとても小さかったらしい。

### テスト時
1. Ensemble  
    複数のモデルを独立に学習し、それらの予測を平均する。  
    GoogLeNet 論文では、ネットワークは同じだが入力の処理法を変えた 7 つのモデルをアンサンブルしているらしい。GoogLeNet の論文は全体的に詳細が濁されているのでよくわからない。single crop だと top-5 error が 2% 弱程度向上。  
    ResNet 本家論文では、34B, 34C, 50, 101, 152×2 の 6 モデルをアンサンブルしている。fully-convolutional-form で top-5 error に 1% 弱程度向上。

1. 10-crop Testing  
    テスト画像 1 つから data augmentation と類似した手順で 10 個のパッチを切り出し、それぞれに対する予測を平均して答える。  
    AlexNet 論文では、（4 スミ＋中央）×（反転の有無）で 10 個のパッチを切り出している。GoogLeNet は 144 パッチも試してる。  
    GoogLeNet 論文では、crop 数の精度への影響が載っている。top-5 error で、10 crops で約 1% 弱向上、144 crops で 2% 強向上（下表は GoogLeNet 論文より引用）。

1. Fully-convolutional-form Testing  
    まず、全結合層たちを畳み込み層とみなす。例えば、直前の画像サイズが s×s であれば、最初の全結合層は s×s → 1×1 の畳み込み層であるとみなす。すると、ネットワークは fully convolutional （全レイヤーが畳み込み）となる。fully convolutional なネットワークの利点は、入力の画像サイズが変化しても適用することができることである（ただし、出力サイズも変化する）。  
    テスト画像をリサイズする。この時の画像サイズは、学習で使っている画像サイズと一致しているとは限らないし、正方形とも限らない。例えば、短辺を 480 にする。ネットワークをこの画像に適用する。出力を average pooling してそれを予測とする。  
    さらに、テスト画像のサイズを複数試し、その結果の平均を用いる。例えば、ResNet 本家論文では短辺を 224, 256, 384, 480, 640 になるようにリサイズしている。また、horizontal flip も試して平均を取る。  
    VGG から使われている。ResNet 本家論文を見るところ、10-crop Testing と比べて、大体 2% 程度精度に寄与している。

## 投稿日付(yyyy/MM/dd)
2016/12/31

## key-words
Preprocessing, RGB_Image

## 参考文献