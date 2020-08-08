# BachGAN: High-Resolution Image Synthesis from Salient Object Layout

元の論文の公開ページ : [arxiv,org](https://arxiv.org/abs/2003.11690)  
提案モデルの実装 : [Cold-Winter/BachGAN](https://github.com/Cold-Winter/BachGAN)  
Github Issues : []()  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。  
Note: 引用中の\[*\]は論文内の文献番号である。該当する論文は、論文関連リンクの各リストの末尾に基づいて調べられる。

## どんなもの?
##### オブジェクトレイアウトから画像を生成するモデル、Background Hallucination Generative Adversarial Network (BachGAN)を提案した。
- オブジェクトレイアウトとはバウンディングボックスとカテゴリを指し、この手法ではそれらの情報を提供するだけで高品質な画像を提供する。
  - なお、$512\times 256$の画像生成が可能となっている。
  - 生成の一例は下の図3の通り。
- この新しいタスクでは、主に以下の2つの問題に取り組む。
  - セグメンテーションマスクを利用せずに、細かく正確でリアルなテクスチャを生成する。
  - 背景を作成し、そこに自然な形で前景オブジェクトを設置する。
- contributionsは以下の通り。
  - "We propose a new task - image synthesis from salient object layout, which allows users to draw an image by providing just a few object bounding boxes."
  - "We present BachGAN, the key components of which are a retrieval module and a fusion module, which can hallucinate a visually consistent background on-the-fly for any foreground object layout."
  - "Experiments on Cityscapes [4] and ADE20K [41] datasets demonstrate our models ability to generate high-quality images, outperforming baselines mea-sured on both visual quality and consistency metrics."

![fig3](img/BHISfSOL/fig3.png)

##### 車上と室内画像データセットを利用して実験した。
- 使用したデータセットは以下の通り。
  - Cityscapes
  - ADE20K
    - このデータセットにはインスタンスレベルのアノテーションがないため、[1]の方法を利用して輪郭を抽出し、バウンディングボックスを生成した。

## 先行研究と比べてどこがすごいの? or 関連事項
##### 省略

## 技術や手法のキモはどこ? or 提案手法の詳細
##### 手法の概要
- 提案モデルの全体像は図2の通り。

![fig2](img/BHISfSOL/fig2.png)

## どうやって有効だと検証した?
##### 省略

## 議論はある?
##### 省略

## 次に読むべき論文は?
##### なし

## 論文関連リンク
##### あり
1. [Satoshi Suzuki et al. Topological structural analysis of digitized binary images by border following. Com-puter vision, graphics, and image processing, 1985.](https://www.sciencedirect.com/science/article/abs/pii/0734189X85900167?via%3Dihub)[30]

## 会議, 論文誌, etc.
##### CVPR 2020

## 著者
##### Yandong Li, Yu Cheng, Zhe Gan, Licheng Yu, Liqiang Wang, Jingjing Liu

## 投稿日付(yyyy/MM/dd)
##### 2020/03/26

## コメント
##### なし

## key-words
##### CV, Paper, RGB_Image, GAN, Implemented, Synthetic, 導入

## status
##### 導入

## read
##### A, I

## Citation
##### 未記入
