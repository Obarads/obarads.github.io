# A review of algorithms for filtering the 3D point cloud

元の論文の公開ページ : [sciencedirect.com](https://www.sciencedirect.com/science/article/abs/pii/S0923596517300930)  
提案モデルの実装 : [unkown]()  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。  
Note: 引用中の[*]は論文内の文献番号である。該当する論文は、論文関連リンクの各リストの末尾に基づいて調べられる。

## どんなもの?
##### 点群に対する最新(2017年)のフィルタリングに対するサーベイを行った。
- 点群に対するフィルタリングは主に7つのカテゴリに分類される。
  - Statistical-based, Neighborhood-based, Projection-based filtering-based, Signal processing-based, PDEs-based, Other methods.
- 本サーベイでは、これらのカテゴリに沿って説明する。
- 貢献は以下の通り。
  - "To the best of our knowledge, this is the first review paper in the literature that focuses on algorithms for filtering 3D point cloud at present."
  - "This paper provides readers with a comprehensive review of the state-of-the-art methods covered in early work."
  - "A comparative summary of traits of these methods is demonstrated in table form."
  - "This paper carries out an experiment concerning on performance comparison of several widely used methods."

## 先行研究と比べてどこがすごいの? or 関連事項
##### 省略

## 技術や手法のキモはどこ? or 提案手法の詳細
### Survey overview
- "Section 2 presents an overview of filtering approaches for 3D point cloud."
- "experimental results and discussion are illustrated in Section 3."
- "Conclusions are drawn in Section 4."

### Section 2 ("Methods for filtering point cloud")
#### "2.1. Statistical-based filtering techniques"
- "In the context of filtering point cloud, many techniques utilize the adaptation of the statistical conceptions, which are suitable for the nature of the point cloud."

##### Statistical-based filtering techniques achieve denoising.
- These techinques is as follows.
- "Schall et al. [18] filtered point cloud using a kernel based clustering approach."
- "Narváez et al. [15] proposed a new weighted variant of the principal component analysis method for denoising point cloud".

[blank]

## どうやって有効だと検証した?
##### 省略

## 議論はある?
#### フィルタリングは依然としてチャレンジングなタスクである。
- そのフィルタリングに関する研究の今後の方向性については以下の通り。
- "(1) Combination of color and geometric information: For point clouds, especially these containing color information, a pure color or pure geometric attributes based method cannot work well. Hence, it is expected to combine the color and geometric information in the filtering process to further increase the performance of a filtering scheme."
- "(2) Time complexity reduction: Because point clouds contain a large number of points, some of which can be up to hundreds of thousands or even millions of points, computation on these point clouds is time consuming. It is necessaryto develop filtering technologies to filter point cloud effectively to reduce time complexity."
- "(3) Filtering on point cloud sequence: Since object recognition from a point cloud sequence will become the future research direction. And filtering the point cloud sequence will help to improve the performance and accuracy of object recognition."

## 次に読むべき論文は?
##### なし

## 論文関連リンク
##### あり
1. [O. Schall, A. Belyaev, H.P. Seidel, Robust filtering of noisy scattered point data, in: Proceedings Eurographics/IEEE VGTC Symposium Point-Based Graphics, Stony Brook, NY, USA, June, 2005, pp. 71–144.](https://ieeexplore.ieee.org/document/1500321/authors#authors)[18]
2. [E.A.L. Narváez, N.E.L. Narváez, Point cloud denoising using robust principal com-ponent analysis, in: Proceedings of the First International Conference on Computer Graphics Theory and Applications, Setúbal, Portugal, February, 2006, pp. 51–58.](https://www.researchgate.net/publication/220869008_Point_cloud_denoising_using_robust_principal_component_analysis)[15]

## 会議, 論文誌, etc.
##### Signal Processing: Image Communication Volume 57, September 2017, Pages 103-112

## 著者
##### Xian-Feng Han and Jesse S. Jin and Ming-Jie Wang and Wei Jiang and Lei Gao and Liping Xiao

## 投稿日付(yyyy/MM/dd)
##### 2017/09/??

## コメント
##### あり
- Rは2.1~2.3まで、あまり理解できていない。知識不足。

## key-words
##### Survey, CV, Point_Cloud, 導入

## status
##### 省略

## read
##### A, I, R, C

## Citation
##### あり
[https://www.sciencedirect.com/science/article/abs/pii/S0923596517300930](https://www.sciencedirect.com/science/article/abs/pii/S0923596517300930)より引用

@article{HAN2017103,
title = "A review of algorithms for filtering the 3D point cloud",
journal = "Signal Processing: Image Communication",
volume = "57",
pages = "103 - 112",
year = "2017",
issn = "0923-5965",
doi = "https://doi.org/10.1016/j.image.2017.05.009",
url = "http://www.sciencedirect.com/science/article/pii/S0923596517300930",
author = "Xian-Feng Han and Jesse S. Jin and Ming-Jie Wang and Wei Jiang and Lei Gao and Liping Xiao",
keywords = "3D point cloud, Filtering methods, Feature-preserving, Noise reduction",
abstract = "In recent years, 3D point cloud has gained increasing attention as a new representation for objects. However, the raw point cloud is often noisy and contains outliers. Therefore, it is crucial to remove the noise and outliers from the point cloud while preserving the features, in particular, its fine details. This paper makes an attempt to present a comprehensive analysis of the state-of-the-art methods for filtering point cloud. The existing methods are categorized into seven classes, which concentrate on their common and obvious traits. An experimental evaluation is also performed to demonstrate robustness, effectiveness and computational efficiency of several methods used widely in practice."
}
