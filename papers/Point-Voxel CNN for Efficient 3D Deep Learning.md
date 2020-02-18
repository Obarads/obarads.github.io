# Point-Voxel CNN for Efficient 3D Deep Learning

元の論文の公開ページ : [arxiv.org](https://arxiv.org/abs/1907.03739)  
提案モデルの実装 : [mit-han-lab/pvcnn](https://github.com/mit-han-lab/pvcnn)  
Github Issues : []()  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。
Note: [peluigiさんの記事[1]](http://peluigi.hatenablog.com/entry/2019/11/08/144957)が非常に参考になるため、こちらを参照するほうがいいと思います。

## どんなもの?
##### エッジデバイスなどでも動作するような効率的な点群畳み込み, Point-Voxel CNN(PVCNN)を提案した。
- 深層点群処理モデルのvoxel-baseとpoint-baseの利点を合わせた手法である。
- **voxel-baseのベースラインの1/10のGPUメモリとPointNetより短い処理時間で既存の手法以上の高い精度を達成した。**

## 先行研究と比べてどこがすごいの? or 関連事項
##### Point-baseとvoxel-baseモデルの点群処理に関する問題に対処した。
- point-baseモデルには、処理に関して以下の問題がある。
  - 点群が3D空間上に不規則に散らばっているため、畳み込み時にランダムメモリアクセスが発生する。
  - また、近傍点を探すために点群の計算とメモリが必要となる。
- voxel-baseモデルには、処理に関して以下の問題がある。
  - 低解像度のvoxel-base処理では、ボクセル化によって点群中にある情報損失が起こる。
  - 高解像度のvoxel-base処理では、高い計算コストとメモリ容量を要求される。
- この論文ではpoint-baseとvoxelベースの利点を使用した手法を提案する。

## 技術や手法のキモはどこ? or 提案手法の詳細
##### 省略

## どうやって有効だと検証した?
##### 省略

## 議論はある?
##### 省略

## 次に読むべき論文は?
##### なし

## 論文関連リンク
##### なし
1. [peluigi, Hatena blog. Point-Voxel CNN for Efficient 3D Deep Learningを読んだのでメモ. 2019. (アクセス:2020/2/4)](http://peluigi.hatenablog.com/entry/2019/11/08/144957) 
2. [なし]()[1]

## 会議, 論文誌, etc.
##### NeurlPS 2019

## 著者
##### Zhijian Liu, Haotian Tang, Yujun Lin, Song Han

## 投稿日付(yyyy/MM/dd)
##### 2019/07/08

## コメント
##### なし

## key-words
##### CV, Paper, Point_Cloud, Implemented, 導入, 参照

## status
##### 導入

## read
##### A, I

## Citation
##### 未記入
