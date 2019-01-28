# Learning Representations and Generative Models for 3D Point Clouds

## どんなもの?
生の点群で動作するGAN、潜在表現を学習したAutoEncoderを用いたGAN、Gaussian Mixture Models(GMMs)を中心に研究した点群の生成モデルに関する論文。また、点群のAutoEncoderで重要な類似度測定手法、GANの評価基準にも注目している。

## 先行研究と比べてどこがすごいの?
生の点群のための深い生成モデルを紹介する初めての論文だと位置付けている。

## 技術や手法のキモはどこ?
この論文は紹介の意味合いが強いのでキモというか論文内容の紹介として以下に記す。

### **類似度測定手法の種類**  
- **Earth Mover's Distance(EMD)**  
    ある集合から別の集合へそれらを移動させる問題を解決する手法である。下の式のФは全単射である。

    ![emd](img/LRaGMf3PC/emd.png)

- **Chamfer distance(CD)**  
    ある集合の点に最も近い別の集合の点の平方距離を使う手法である。EMDよりも効率的な計算が可能である。

    ![cd](img/LRaGMf3PC/cd.png)
    
    点群の類似度測定手法によく使われるChamfer distanceは特定の異常なケース(identify certain pathological case)で識別できないことを発見している。

### **生成モデルの種類**
- **AutoEnocder(AE)**  
    深層学習ではおなじみの生成モデル。入力xをエンコーダーE(またはボトルネック層)によって低次元表現z(またはcode)に変換する。そしてzはデコーダーを介して出力x^へと再構築される。

    ![cd](img/LRaGMf3PC/ae.png)

- **Generative Adversarial Network(GAN)**  
    GANは最新の生成モデルである。生成器Gと弁別器Dによる敵対的なゲームによって構成されている。Gは実際のデータx~p_dataと見分けがつかないようなz~p_zを使ったサンプルyを生成することを目標とする。弁別器はyとxの正しい判別を行うことを目標とする。

    ![cd](img/LRaGMf3PC/gan.png)

- **Gaussian Mixture Model(GMM)**  
    GMMは複数の部分母集合を含み、各部分母集合がGaussian分布に従うような分布がmultimodal Gaussianであると仮定される母集団を表現するための確率モデルである。部分母集合の数がわかっているとすると、GMMのパラメーター(Gaussiansの分散と平均)はExpectation-Maximization(EM)アルゴリズムを使いランダムサンプルから学習できる。フィットさせれば、GMMは新規の合成サンプルを得ることができる。

### **生成モデルの評価基準の種類**
- **Jensen-Shannon Divergence(JSD)**  
    軸方向に整列された点群とボクセルグリッドが並んでいることを仮定した場合に、AのデータとBのデータが同様の位置を占める傾向の度合いを計測できる。それを目的としているため、Aの全ての点に渡って並んでいる各ボクセルにある各点の個数と対応するBの点の数を数え、得られた経験分布間(P_A,P_B)のJSDを記録する。下の式ではM=(1/2)(P_A+P_B)でD(・||・)は2つの分布のKLダイバージェンスを示す。

    ![jsd](img/LRaGMf3PC/jsd.png)

- **Coverage**  
    Aの各点群に近いBの近傍を見つける。CoverageはAの点群に一致するBの点群の割合として測定する。割合の測定方法は類似度測定手法の種類の節で紹介したEMDもしくはCDであるため、COV-EMDとCOV-CDの2つの手法が得られる。Coverageのscoreが高い場合、Bの大部分はA内で表されているということである。

- **Minimum Matching Distance(MMD)**  
    Coverageはどれ程良くカバーされた例(点群)が集合Aで表されているかを正確に表すものではない。つまり、マッチされる例に近い必要がないということである。よって、Bに関してAの忠実性を測る方法が必要となる。その目的のために、Bの全ての点群をAの点群と最小距離(MMD)でマッチングさせ、そのマッチングの平均距離を記録する。点間の距離をMMD-CDとMMD-EMDで得ることができる。MMDはマッチングの距離に直接依存するため、AのBに対する忠実度を確認できる。

### **紹介する点群用生成モデルの紹介**
- **3D点群の表現学習**





## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
-

### 論文関連リンク
1. [Panos Achlioptas, Olga Diamanti, Ioannis Mitliagkas, and Leonidas Guibas. Learning Representations and Generative Models for 3D Point Clouds. 2017.](https://arxiv.org/abs/1707.02392)

### 会議
ICML 2018

### 著者
Panos Achlioptas, Olga Diamanti, Ioannis Mitliagkas, and Leonidas Guibas.

### 投稿日付(yyyy/MM/dd)
2017/07/08

## コメント
JSDは別の資料を見たほうがいいと思う。