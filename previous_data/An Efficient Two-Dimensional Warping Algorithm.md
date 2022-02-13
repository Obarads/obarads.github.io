# An Efficient Two-Dimensional Warping Algorithm

元の論文の公開ページ : [human.ait.kyushu-u](http://human.ait.kyushu-u.ac.jp/~uchida/Papers/e82-d_3_693.pdf)  
提案モデルの実装 : []()  
Github Issues : [#71](https://github.com/Obarads/obarads.github.io/issues/71)

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。

## どんなもの?
##### 単調および連続二次元ワーピング(2DW)のための新しい動的計画法(DP)ベースのアルゴリズムを提示した。

## 先行研究と比べてどこがすごいの?
##### より少ない計算でワーピング結果を実現する手法を提案する。
- DPに基づく2DW手法はいくつか提案されており、その中でも[1]の手法はもっとも将来有望な手法の一つであると著者は考えている。
- しかしながら[1]を含むこれらのアルゴリズムは最小残差誤差を持つ最適な単調pixel-to-pixelマッピングを探すアルゴリズムであるため、過剰な変形と高い計算複雑性の２つの問題を持っている。
- [9]は単調と連続な2DW手法を開発した。これにより、単調のみの手法の場合よりも過剰変形が抑制され、連続性の制約によって計算的な複雑さがかなり減少した。
- しかしながら、依然、計算的な複雑さは画像サイズと指数関数的な関係にある。
- **著者らは[9]のより少ない計算でワーピング結果を実現する手法を提案する。**

## 技術や手法のキモはどこ? or 提案手法の詳細
##### 省略

## どうやって有効だと検証した?
##### 省略

## 議論はある?
##### 省略

## 次に読むべき論文は?
#####  なし

## 論文関連リンク
##### なし

## 会議
##### IEICE TRANS.

## 著者
##### Seiichi UCHIDA, Hiroaki SAKOE.

## 投稿日付(yyyy/MM/dd)
##### 1999/03/01

## コメント
##### なし

## key-words
##### RGB_Image, CV, Paper, 導入

## status
##### 導入

## read
##### A, I

## Citation
##### kyushu-u.pure.elsevier.comより引用
[リンク](https://kyushu-u.pure.elsevier.com/ja/publications/an-efficient-two-dimensional-warping-algorithm)  
@article{5971613a623848089b1b8933ce0ca036,
title = "An efficient two-dimensional warping algorithm",
abstract = "SUMMARY A new dynamic programming (DP) based algorithm for monotonie and continuous two-dimensional warping (2DW) is presented. This algorithm searches for the optimal pixel-to-pixel mapping between a pair of images subject to monotonicity and continuity constraints with by far less time complexity than the algorithm previously reported by the authors. This complexity reduction results from a refinement of the multi-stage decision process representing the 2DW problem. As an implementation technique, a polynomial order approximation algorithm incorporated with beam search is also presented. Theoretical and experimental comparisons show that the present approximation algorithm yields better performance than the previous approximation algorithm.",
author = "Seiichi Uchida and Hiroaki Sakoe",
year = "1999",
month = "1",
day = "1",
language = "English",
volume = "E82-D",
pages = "693--700",
journal = "IEICE Transactions on Information and Systems",
issn = "0916-8532",
publisher = "一般社団法人電子情報通信学会",
number = "3",
}