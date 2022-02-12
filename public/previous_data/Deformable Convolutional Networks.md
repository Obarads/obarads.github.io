# Deformable Convolutional Networks

元の論文の公開ページ : [arxiv.org](https://arxiv.org/abs/1703.06211)  
提案モデルの実装 : [msracver/Deformable-ConvNets](https://github.com/msracver/Deformable-ConvNets)  
Github Issues : []()  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。
Note: この論文をまとめた記事[1-4]を参考にしました。

## どんなもの?
##### サンプリング領域を変化させることができる2つのモジュール、deformable convolutionとdeformable RoI poolingを提案した。
- deforable convolutionはサンプリンググリッド[(受容野)]を自由な形状に変形できる。
  - 標準的な畳み込みのサンプリンググリッドの配置に2Dオフセット[(補正値)]を追加することで、サンプリンググリッドの変形が可能になる。
  - このオフセットは、追加の畳み込み層を介して、特徴マップから学習する。
- deformable RoI poolingはFast R-CNNなどで使われるRoI poolingのビン[5]の各位置にオフセットを導入する。
  - 基本的なアイデアはdeforable convolutionと同じ。

## 先行研究と比べてどこがすごいの? or 関連事項
##### [Rは未読]
##### 省略

## 技術や手法のキモはどこ? or 提案手法の詳細
##### 省略

## どうやって有効だと検証した?
##### 省略

## 議論はある?
##### 省略

## 次に読むべき論文は?
##### なし

## 論文関連リンク
##### あり
1. [Felix Lau, "Notes on “Deformable Convolutional Networks”", 2017. (アクセス:2020/1/13)](https://medium.com/@phelixlau/notes-on-deformable-convolutional-networks-baaabbc11cf3#.wc9rilxc4)
2. [keisuke-nakata, "【論文】Deformable Convolutional Networks (2017)", 2017. (アクセス:2020/1/13)](https://qiita.com/keisuke-nakata/items/90f7020f04476b01d07d)
3. [Yosuke Shinya, "Active Convolution, Deformable Convolution ―形状・スケールを学習可能なConvolution", 2017. (アクセス:2020/1/13)](https://www.slideshare.net/YosukeShinya/active-convolution-deformable-convolution-convolution)
4. ["Deformable Convolutional Networks", 2017. (アクセス:2020/1/13)](https://mil-tokyo.github.io/paper-summary/papers/20170325-deformable-convolutional-networks)
5. [yu4u, Qiita, "最新の物体検出手法Mask R-CNNのRoI AlignとFast(er) R-CNNのRoI Poolingの違いを正しく理解する", 2017. (アクセス:2020/1/16)](https://qiita.com/yu4u/items/5cbe9db166a5d72f9eb8)

## 会議, 論文誌, etc.
##### ICCV 2017 Oral

## 著者
##### Jifeng Dai, Haozhi Qi, Yuwen Xiong, Yi Li, Guodong Zhang, Han Hu, Yichen Wei.

## 投稿日付(yyyy/MM/dd)
##### 2017/03/17

## コメント
##### なし

## key-words
##### Paper, CV, RGB_Image, 参照, 導入, Detection, Semantic_Segmentation

## status
##### 導入

## read
##### A, I

## Citation
##### 未記入
