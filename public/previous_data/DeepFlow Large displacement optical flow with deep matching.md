# DeepFlow: Large displacement optical flow with deep matching

元の論文の公開ページ : [cvl.its.u-tokyo](http://www.cvl.iis.u-tokyo.ac.jp/class2016/2016w/papers/3.inpainting/Weinzaepfel_DeepFlow_Large_Displacement_2013_ICCV_paper.pdf)  
Github Issues : [#73](https://github.com/Obarads/obarads.github.io/issues/73)

## どんなもの?
##### マッチングアルゴリズムと変分アプローチを用いて大変位するオプティカルフローに対処する手法、DeepFlowを提案した。
- オプティカルフローに合わせた記述子マッチングアルゴリズムを提案し、これは素早い動き(fast motions)に対するパフォーマンスを向上させる。
    - この記述子マッチングアルゴリズムは、深層畳み込みネットワークと同じような6層の構造を持つマルチステージアーキテクチャで構成されている。
- 密なサンプリングを使用して、効率的に外見上の対応(Correspondence)[8]を(高密度に)得る。そして、マッチングに対するbuilt-in smoothing effect[(?)]を得る。
- 貢献は以下の３つ。
    - **密な対応関係マッチング** : 著者らは密なサンプリングを行うことで変形可能なパッチを持つ単体特徴一致から密な対応関係を復元する記述子マッチングアルゴリズムを導入する。
    - **Self-smoothed matching** : マッチングアルゴリズムは制限された一組の実現可能な非剛体ワーピング(歪み)を用いて実行される。一組の実現可能な非剛体ワーピングは非剛体記述子の計算上効率的な比較を可能にした後、円滑で密な対応関係を生成する。
    - **大変位オプティカルフロー** : 著者らの変位オプティカルフローであるDeepFlowは大変位に対するロバスト性において、BroxとMalik'sのアプローチ[1]を超える結果を出す。実験はMiddleburyデータセットとMPI-Sintelデータセットで行われた。

## 先行研究と比べてどこがすごいの?
##### 既存のものよりも計算効率の良い手法を提案する。
- 変分手法を用いたオプティカルフロー推定はSOTAな結果を残してきた。
- その中で[1]の手法は、大変位を処理するために記述子マッチングを変分アプローチに組み込んだ。
- しかし、**この手法は局所記述子が顕著な箇所でのみ信頼性を持ちなおかつ局所的な柔軟性に欠けるという問題がある。**
    - マッチングコンポーネントを追加しようにも、その場合は**変位が小さい箇所で性能の低下が起こる可能性がある**ため、エネルギーの定式化は難しい。
    - 他の手法では、計算コストを増大させてパフォーマンスを向上させている。  
- 著者らは、大変位オプティカルフローに対するdeep convolutional matchingを使用した計算効率の良い手法を提案する。

##### Non-rigid(非剛体)フレームとdense matching(密なマッチング)を利用して更なるパフォーマンスを得る。
- 記述子マッチングは最初に記述子から画像の特徴量を抽出し、それらの特徴量に対して最近傍を行うことで対応する箇所を見つけることができる。
- しかし、これらの記述子は柔軟性のない(正方形の)局所フレームが使われる。また、最近傍法を用いた手法は弱から中程度のテクスチャ(顕著さのこと?)の正しい対応関係を見つけることができない。  
- 著者らは、非剛体フレーム内の記述子抽出および全画像領域で密なマッチングを行うことで性能が上がることを示す。  
    - 非剛体ワーピングに関しては他の論文からアイデアを発している[2,3,4]。

[5]は著者らのパイプラインと類似しているが、矛盾する動きを持つオブジェクトに属する対応関係(異なる焦点面等)を併合する方法を欠いている。[6]に対して、著者らの提案手法はnon-prametricかつmodel-freeである。[7]の手法に関しては、トップダウン形式で動くもののdeep matching自体はボトムアップで動く(?)。また、これらの方法はloopy belief伝播を用いた不正確な推論を必要とする(??)。

## 技術や手法のキモはどこ? or 提案手法の詳細
### Deep Matching
#### このアプローチの本質
##### ターゲット(画像の)記述子とソース(画像の)記述子を一致させるために、ターゲット記述子のSIFTパッチを4つに分割し、分割したもの(quadrants)の位置を最適化する。[(※)]
- [※[9]の3.1を参考にした。]
- 著者らはソース記述子とターゲット記述子を一致させることを目指す。
- ここのSIFT記述子は$4\times 4$の空間的なセルを持つ勾配方向のヒストグラムであり、128次元の実数ベクトル$H\in\mathbb{R}^{128}$を生成する。ここで、図2(b')に示すようにSIFTパッチを4つのquadrants(分割領域)と呼ばれるものに分割する。
    - これは次の様に示すことができる : $H=[H^1 \ H^2 \ H^3 \ H^4], \ H^S\in\mathbb{R}^{32}$.
- **この両演算子は固定された$4\times 4$のグリッドを維持するというわけではなく、ターゲット記述子$H'$の4つの4分割領域の位置を最適化することを提案する。**
    - 最適化の式: sim$(H,Q(p))=\sum^4_ {s=1}\max_ {p_ s}H_ S^TQ(p_ S)$
    - ここで$Q(p)\in\mathbb{R}^{32}$は位置$p$上で抽出された単体分割領域の記述子である。  
- **4つの分割領域がそれぞれ独立して動くと仮定した場合、適切な場所で類似性が効率的に推定され、粗い非剛体マッチングが得られる。**
    - 「粗い」とあるが、これを再帰的に行えばより細かな非剛体マッチングを行うことができる。

![fig2](img/DLdofwdm/fig2.png)

#### 3.2以降はまだである。

## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- [S. Uchida and H. Sakoe. A monotonic and continuous two-dimensional warping based on dynamic programming. In ICPR, 1998.](https://pdfs.semanticscholar.org/36dd/e6fa87576b393fd6769b3ba1c173dc610908.pdf)

## 論文関連リンク
1. [T. Brox and J. Malik. Large displacement optical flow: de-scriptor matching in variational motion estimation.IEEE Trans. PAMI, 2011.](http://www.ee.oulu.fi/research/imag/courses/Kokkinos/brox-malik-pami-2010.pdf)
2. [Y. LeCun, L. Bottou, Y. Bengio, and P. Haffner. Gradient-based learning applied to document recognition.Proceed-ings of the IEEE, 1998.](http://vision.stanford.edu/cs598_spring07/papers/Lecun98.pdf)
3. [S. Uchida and H. Sakoe. A monotonic and continuous two-dimensional warping based on dynamic programming. In ICPR, 1998.](https://pdfs.semanticscholar.org/36dd/e6fa87576b393fd6769b3ba1c173dc610908.pdf)
4. [D. Keysers, T. Deselaers, C. Gollan, and H. Ney. Deformation models for image recognition.IEEE Trans. PAMI, 2007.](http://www.keysers.net/daniel/files/Keysers--Deformation-Models--TPAMI2007.pdf)
5. [A. Ecker and S. Ullman. A hierarchical non-parametric method for capturing non-rigid deformations.Image and Vi-sion Computing, 2009.](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.330.7285&rep=rep1&type=pdf)
6. [M. Werlberger, W. Trobin, T. Pock, A. Wedel, D. Cremers, and H. Bischof. Anisotropic Huber-L1 optical flow. In BMVC, 2009.](http://www.bmva.org/bmvc/2009/Papers/Paper260/Paper260.pdf)
7. [J. Kim, C. Liu, F. Sha, and K. Grauman. Deformable spatial pyramid matching for fast dense correspondences. InCVPR, 2013.](https://people.csail.mit.edu/celiu/pdfs/CVPR13-DSPM.pdf)
8. [Robert Collins, Lecture 7:Correspondence Matching.](http://www.cse.psu.edu/~rtc12/CSE486/lecture07.pdf)
9. [Jerome Revaud, Philippe Weinzaepfel, Zaid Harchaoui, Cordelia Schmid. Deep Convolutional Matching.](https://lear.inrialpes.fr/src/deepmatching/deepmatching_submitted_ijcv.pdf)

## 会議
ICCV 2013

## 著者
Philippe Weinzaepfel, Jerome Revaud, Zaid Harchaoui, Cordelia Schmid.

## 投稿日付(yyyy/MM/dd)
2014/03/03

## コメント
なし

## key-words
RGB_Image, Flow_Estimation, CV, Paper, 導入, 旧版

## status
導入

## read
A, I, R

## Citation
