# JSENet: Joint Semantic Segmentation and Edge Detection Network for 3D Point Clouds 

元の論文の公開ページ : [arxiv.org](https://arxiv.org/abs/2007.06888)  
提案モデルの実装 : [github.com](https://github.com/hzykent/JSENet)  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。  
Note: 引用中の[*]は論文内の文献番号である。該当する論文は、論文関連リンクの各リストの末尾に基づいて調べられる。

## どんなもの?
##### 省略

## 先行研究と比べてどこがすごいの? or 関連事項
##### 省略

## 技術や手法のキモはどこ? or 提案手法の詳細
### 手法の概要
- 概要図は図2の通り。
- 提案手法は２つのstream(ネットワークの枝)を持ち、このstreamは別々のタスクをこなす。
- streamは以下の通り。
  - SS streamはsemantic segmentationをこなすためのstreamであり、KPConvを使用したEncoder-decoder FCNとなっている。
  - SED streamはsemantic edge detection(セマンティックラベルを利用したエッジ検出)をこなすためのstreamであり、これもSS streamと基本的に同じような構造を持つ。
- 提案では、これらのstreamから得られる出力を融合させてセマンティックセグメンテーションラベルとセマンティックエッジラベルを出力する。
- ![fig2](img/JJSSaEDNf3PC/fig2.png)

##### 1. 点群から特徴を得る。
- 図2でいうと(a)のこと。

##### 2. 得られた特徴を各Streamに入力する。
- SS(Semantic Segmentation) streamでは、SSP(Seamtic Segmentaion Points)を出力する。
- SED(Semantic Edge Detection) streamでは、SEP(Semantic Edge Points)を出力する。
- 各streamについては工夫を参照。
- stream内と出力で損失を取得し、学習を行う。

### 工夫
- どちらかといえば、SED stream重視。

#### Semantic Segmentation (SS) Stream
##### 各クラスの領域を予測する。
- 入力に点群$\mathcal{P} \in \mathbb{R}^{N \times 6}(x, y, z, r, g, b)$を入力し、SSPを出力する。
- 損失として、クロスエントロピー損失$L_{seg}$を取る。
- SS streamでは、畳み込み構造として、SSCNsやInterpCNNsなどを採用可能である。
- 本提案では、KPConvを適応する。
  - 選んだ理由は、効率的な畳込みと複合したネットワークを利用するのに最適であったため。
  - KPConvには2種類あるが、ここでは収束性能を高めるためにridge versionを利用する。
- また、提案手法である共同学習(Edge&Segmentation)の効果を示すために、KPConv提案時のネットワークと同じ構造のものを利用する。

#### Semantic Edge Detection (SED) Stream
##### 各クラスの境界線マスクを予測する。
- 出力はK個のSEP mapsを出力する。
  - Kはセマンティックラベルの種類の数(semantic category)。
  - ここでは、単なるバイナリマップ(エッジマップ)を出力せず、セマンティックラベルの種類も考慮する。
- このstreamの出力を$e_{k}(p \mid \mathcal{P}, \phi)$とする。
  - これは、ある点$p$における$k$番目のsemantic categoryのエッジである可能性(edge probaility)を指す。
  - この時、点$p$は複数のsemantic categoryを持つこともある。
- CASENet[1]より、spatial informationは低階層にあたりによく含まれているので、Shared Encoderから各層の特徴量を得る。
  - [spatial informationには、エッジ情報などの細やかな特徴が含まれている。]
- また、spatial informationができるだけ失われないように、Hierarchical Supervisionを設ける。
- Hierarchical Supervisionで使われる損失は後述する。

#### Joint Refinement Module
##### SS streamとSED streamの出力を互いに融合する。
- このモジュールでは、各streamで得られる出力を別のstreamに与えて互いの情報を補間しあい、より良い予測ができるようにする。
- 補間しつつ、出力の改善(Refine)を行う。
- このモジュールの概要図は図3の通り。
  - 上のbranchはセグメンテーションの改善、下のbranchはエッジの改善を行う。
  - 入力としてSSPマスク$s$とSEPマップ$\{e_1,\ldots,e_K\}$を受け取る。
- ![fig3](img/JJSSaEDNf3PC/fig3.png)

##### 2つのタスク間のdualityを利用するため、Edge map generation sub-moduleはSSPマスクをedge activation point mapsに変換する。
- [dualityについて2.3節より: To be more specific, for salient object detection, researchers have exploited the duality between the binary segmentation and class-agnostic edge detection tasks [15, 20].]
- このEdge map generation sub-moduleの出力は後述するFeature fusion sub-moduleで使われる。
  - そこで、SSPマスクを基として生成されたedge activation point mapsとSEPマップを融合させる。
  - [融合する際に別のブランチから得た特徴(今回はSEPマップ)は融合先の特徴に連結する前に、簡単なネットワークに入力されその出力を融合先に渡すということをする場合がある(なじませるためか)。今回はこのようにせずに、activation mapを渡しているが、この理由はこちらのほうが結果が良かったからとのこと。(自分の認識では、以下の英文はこのようなことを言っていると思っている。)]
    - [Feature fusion sub-moduleより:"As for edge refinement, we find that adjusting the activation values of the SEP maps is more effective than asking the neural network to output refined SEP maps naively."]
- また、損失を得るためにも利用される。
- このモジュールはcategorical distribution $s\in\mathbb{R}^{N\times K}$ [(セマンティックセグメンテーションマスクかな?)]を受け取り、edge activation point maps $\{a_{1}, \ldots, a_{K}\}(a_{i} \in \mathbb{R}^{N})$を出力する。
  - $a_i(p)$は任意の点$p$が$i$番目のクラスのセマンティック境界線に属している可能性の度合いを示している。
- この$a_i$の値は式(1)のように示される。
- $$a_{i}=col_{i}(|M * Softmax(s)-Softmax(s)|) \tag{1}$$
  - [先に図4を見たほうがいいかも。]
  - $col_i$は$i$番目のcolumnを示す。$i$番目のcolumnは、クラス$i$のan activation point maskを指す。
    - 値が大きいほど、クラスに属する可能性が高くなる。
  - $M$はMean filterを示す。[?]
  - 小さな半径内の隣接する点を取る。[??]
- この式に関する図については図4を参照。
- ![fig4](img/JJSSaEDNf3PC/fig4.png)
- このマスクでは、
  - クラス$i$の境界線に近い点である場合は異なるactivation値を持つ近傍点を持ち、
  - 遠い点である場合は同じactivation値を持つ近傍点を持つ。
- したがって、予測された境界線に近い点ほど大きなactivation値を持つ[?]。
  - "Thus, after the mean  ltering and subtraction, points nearer to the predicted boundaries will have larger activation values. The converted edge activation point maps are fed to the edge refinement branch and utilized for loss calculation as well."

##### Feature fusion sub-moduleは与えられたSEPとSSPを融合させるためのネットワークである。
- Edge Map generation sub-module経由で得たSEPマップ(元SSP)とsigmoid関数から出力されたSEPマップを連結させたものを入力として受け取る。
- 中身はU-Netと同じような構造であり、すべて32サイズのチャンネル出力を持つレイヤである。
- このネットワークでは、他のブランチから得られた表現と自分のブランチの表現をネットワークを介して融合する。

##### このモジュールでは、3種類の損失を得る。
- このモジュール=sub-moduleではないことに注意。
- SSPマスクに対しては、クロスエントロピー損失$L_{seg}$を適応する。
- SEP mapsにはweighted multi-label loss $L_{edge}$を適応する。この損失は後述。
- SSPマスクをSEP mapへ利用する際に、dual semantic edge loss $L_{dual}$を取得する。この損失は後述。

#### Joint Multi-task Learning
##### 4種類の損失から学習がなされる。
- 学習のための損失は式(2)の通り。
- $$
  L_{\text {total}}=\lambda_{0} L_{s e g}+\lambda_{1} L_{e d g e}+\lambda_{2} L_{b c e}+\lambda_{3} L_{d u a l} \tag{2}
  $$
  - "$\lambda_0$ is set to the number of semantic classes to balance the in uences of the two tasks."
  - "The other weights are set to 1"
- $L_{seg}$はマルチクラスに対するクロスエントロピー損失。SSPマスクに対して使用。
- その他の損失は以下の通り。

##### $L_{edge}$はCASENetのアイデアに従って定義されるSEDに対する損失である。
- 入力点群$\mathcal{P}$に対し、
  - ネットワークから出力された$K$個のSEPマップ$\{e_{1}, \ldots, e_{K}\}(e_{i} \in \mathbb{R}^{N})$と
  - $K$個のlabel point maps $\{\hat{e}_{1}, \ldots, \hat{e}_{K}\}(\hat{e}_{i} \in \mathbb{R}^{N})$があるとする。
    - $\hat{e}_k$は$k$番目のclass semantic edgesのGT値を含むbinary point mapである。
- このとき、点ごとのweighted multi-label loss $L_edge$は式(4)の通り。
- $$\begin{aligned} L_{e d g e}\left(\left\{\hat{e}_{1}, \ldots, \hat{e}_{K}\right\},\left\{e_{1}, \ldots, e_{K}\right\}\right)=\sum_{k} & \sum_{p}\left\{-\beta_{k} \hat{e}_{k}(p) \log \left(e_{k}(p)\right)-\right.\\ &\left.\left(1-\beta_{k}\right)\left(1-\hat{e}_{k}(p)\right) \log \left(1-e_{k}(p)\right)\right\} \end{aligned} \tag{4}$$
  - "$\beta_k$ is the percentage of non-edge points in the point cloud of the k-th class to account for the skewness of sample numbers."

##### $L_{bce}$は予測したbinary edge point mapに対して求めることができる損失である。
- SED streamの$binary edge point maps$などに対して使用される損失である。
- 予測されたbinary edge point mapが$b$、SEP mapsのGTから生成されたbinary edge point mapのGTを$\hat{b}$とするとき、$L_{bce}$は式(5)のように示される。
- $$L_{b c e}(\hat{b}, b)=\sum_{p}\{-\beta \hat{b}(p) \log (b(p))-(1-\beta)(1-\hat{b}(p)) \log (1-b(p))\} \tag{5}$$
- "$\beta$ is the percentage of non-edge points among all classes."

##### $L_{dual}$はdualityを考慮するための損失である。
- 予測されたSSPマスク$s\in\mathbf{R}^{N\times K}$からsub-moduleを介して生成されたedge activation point maps $\{a_{1}, \ldots, a_{K}\}(a_{i} \in \mathbf{R}\N$は式(1)の通り。
- 式(1)と同じく、edge activation point mapsのGT値を生成する場合、以下のようになる。
- $$\hat{a}_{i}=col_{i}(\mid M * One_hot(\hat{s})-{ One_hot }(\hat{s}) \mid) \tag{6}$$
  - softmaxからone_hotに変更されていることに注意。
- そして、この予測値とGT値より、$L_{dual}$は以下の通り。
- $$L_{d u a l}\left(\left\{\hat{a}_{1}, \ldots, \hat{a}_{K}\right\},\left\{a_{1}, \ldots, a_{K}\right\}\right)=\sum_{k} \sum_{p} \beta\left(\left|\hat{a}_{k}(p)-a_{k}(p)\right|\right) \tag{7}$$
  - "$\beta$ is the same weight as above."
- **"Intuitively, the network will get penalized when there are mismatches on edge points."**
- **" It is worth noting that the loss function will not be dominated by the non-edge points since the calculated loss values on these points are zeros or very small numbers."**
- "The above dual loss is naturally di erentiable and exploits the duality between SS and SED."

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
##### ECCV 2020

## 著者
##### Zeyu Hu, Mingmin Zhen, Xuyang Bai, Hongbo Fu, Chiew-lan Tai

## 投稿日付(yyyy/MM/dd)
##### 2020/07/14

## コメント
##### なし

## key-words
##### CV, Paper, Point_Cloud, Semantic_Segmentation, 省略

## status
##### 省略

## read
##### A, I, M

## Citation
##### 未記入
