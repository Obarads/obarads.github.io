# Two Stream 3D Semantic Scene Completion

元の論文の公開ページ : [openaccess.thecvf.com](https://openaccess.thecvf.com/content_CVPRW_2019/papers/MULA/Garbade_Two_Stream_3D_Semantic_Scene_Completion_CVPRW_2019_paper.pdf)  
提案モデルの実装 : [なし:2020/08/30]()  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。  
Note: 引用中の[*]は論文内の文献番号である。該当する論文は、論文関連リンクの各リストの末尾に基づいて調べられる。

## どんなもの?
##### Semantic Scene Completion (SSC)タスクにRGB画像と深度画像を利用する手法を提案した。
- 名前の通り、2つの入力を用いてSSCタスクをこなす。
- [36]では深度画像のみが使われているが、RGB画像から得られるテクスチャや色情報はセグメンテーションの役に立つのでこれを利用する。

##### Note
- 図2にある3-channel embeddingは、クラス数が多いとone-hot表現ではメモリの使用量が多くなるので、これを低次元表現に変えたとのこと。

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
1. [Shuran Song, Fisher Yu, Andy Zeng, Angel X Chang, Mano-lis Savva, and Thomas Funkhouser. Semantic Scene Com-pletion from a Single Depth Image. InIEEE Conference on Computer Vision and Pattern Recognition, 2017.](https://arxiv.org/abs/1611.08974)[36]

## 会議, 論文誌, etc.
##### CVPR 2019 WS

## 著者
##### Martin Garbade, Yueh-Tung Chen, Johann Sawatzky, and Juergen Gall

## 投稿日付(yyyy/MM/dd)
##### 2018/04/10

## コメント
##### なし

## key-words
##### CV, Paper, Voxel, 導入, Depth_Image, RGB_Image, Reconstruction

## status
##### 導入

## read
##### A, I

## Citation
##### 未記入

