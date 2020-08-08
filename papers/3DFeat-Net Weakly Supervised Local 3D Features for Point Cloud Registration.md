# 3DFeat-Net: Weakly Supervised Local 3D Features for Point Cloud Registration

元の論文の公開ページ : [arxiv.org](https://arxiv.org/abs/1807.09413)  
提案モデルの実装 : [yewzijian/3DFeatNet](https://github.com/yewzijian/3DFeatNet)  
Github Issues : []()  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。

## どんなもの?
##### 弱教師を使って点群マッチングを行うための3D特徴記述子と検出器を学習できる手法、3DFeat-Netを提案した。
- 本提案はmatching point cluster[(点群間で対応する点たちのこと)]の手動アノテーションを必要としない。
  - その代わりに、GPS/INSタグ付きの3D点群を使用して特徴の学習を行う。
    - [without explicitly specifying them.とは?]
  - また、Feature Alignment[([1]とか?)]とAttentionメカニズムを利用する。
    - このAttentionメカニズムは、入力3D点の特徴尤度(sailency likelihood)を学習するためにattention layer[2]を使っている。

##### また、ベンチマーク兼訓練データセットをOxford RobotCarデータセットから作成した。
- これは屋外の重力に沿ったデータセットである。

##### 実験結果ではいくつかの屋外の重力に沿ったデータセットで既存のhandcrafted特徴もしくは特徴学習モデルに比べて有利なことがわかった。
- FPFH、LORAX、3DMatchなどが比較対象。

## 先行研究と比べてどこがすごいの? or 関連事項
##### 省略

## 技術や手法のキモはどこ? or 提案手法の詳細
##### 省略

## どうやって有効だと検証した?
##### 省略

## 議論はある?
##### ノイズが多い点群でうまく訓練できない。
##### PointNetによる最大点群数の制限を受ける。
##### 完全な回転普遍記述子を抽出できない。

## 次に読むべき論文は?
##### なし

## 論文関連リンク
##### あり
1. ["Feature-based alignment - Image Alignment Toolbox". (アクセス:2020/1/3)](https://sites.google.com/site/imagealignment/tutorials/feature-based-alignment)
2. [Noh, H., Araujo, A., Sim, J., Weyand, T., Han, B.: Large-scale image retrieval with attentive deep local features. In: IEEE International Conference on Computer Vision (ICCV). pp. 3476–3485 (2017).](https://doi.org/10.1109/ICCV.2017.374)[20]

## 会議, 論文誌, etc.
##### ECCV 2018

## 著者
##### Zi Jian Yew, Gim Hee Lee

## 投稿日付(yyyy/MM/dd)
##### 2018/07/25

## コメント
##### なし

## key-words
##### 導入, CV, Paper, Point_Cloud, Weakly_Supervised_Learning, Registration, Implemented

## status
##### 導入

## read
##### A, C

## Citation
##### github.comより引用
[リンク](https://github.com/yewzijian/3DFeatNet)  
@inproceedings{yew2018-3dfeatnet, 
    title={3DFeat-Net: Weakly Supervised Local 3D Features for Point Cloud Registration}, 
    author={Yew, Zi Jian and Lee, Gim Hee}, 
    booktitle={ECCV},
    year={2018} 
}
