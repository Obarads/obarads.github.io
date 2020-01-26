# PointNetGPD: Detecting Grasp Configurations from Point Sets

元の論文の公開ページ : [arxiv.org](https://arxiv.org/abs/1809.06267)  
提案モデルの実装 : [lianghongzhuo/PointNetGPD](https://github.com/lianghongzhuo/PointNetGPD)  
Github Issues : []()  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。

## どんなもの?
##### 点群から直接的にロボットのグラスピング配置を見つけ出すend-to-endなグラスピング評価モデル, PointNetGPDを提案した。
- 提案モデルは生の点群を入力として受け取り、点群がまばらであったとしても、グリッパーとオブジェクトの間の接触領域の幾何学構造を取得できる。

##### 提案モデルを更に改善するために、350kの実際の点群を利用した大規模なgraspデータセットを生成し、訓練用にYCBオブジェクトセットを使用する。
- 特になし。

##### 提案されたモデルのパフォーマンスをシミュレーションとロボットのハードウェアの両方で定量的に測定した。
- 提案されたモデルのほうがよく一般化され、最先端の方法よりも優れていることがわかった。

## 先行研究と比べてどこがすごいの? or 関連事項
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
##### なし
1. [なし]()[1]

## 会議, 論文誌, etc.
##### ICRA 2019

## 著者
##### Hongzhuo Liang, Xiaojian Ma, Shuang Li, Michael Görner, Song Tang, Bin Fang, Fuchun Sun, Jianwei Zhang

## 投稿日付(yyyy/MM/dd)
##### 2018/09/17

## コメント
##### なし

## key-words
##### Paper, CV, Implemented, Grasping, Robot, Point_Cloud, 導入

## status
##### 導入

## read
##### A

## Citation
##### github.comより引用
[リンク](https://github.com/lianghongzhuo/PointNetGPD)  
@inproceedings{liang2019pointnetgpd,
  title={{PointNetGPD}: Detecting Grasp Configurations from Point Sets},
  author={Liang, Hongzhuo and Ma, Xiaojian and Li, Shuang and G{\"o}rner, Michael and Tang, Song and Fang, Bin and Sun, Fuchun and Zhang, Jianwei},
  booktitle={IEEE International Conference on Robotics and Automation (ICRA)},
  year={2019}
}