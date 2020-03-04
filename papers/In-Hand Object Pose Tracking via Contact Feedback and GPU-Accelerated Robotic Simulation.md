# In-Hand Object Pose Tracking via Contact Feedback and GPU-Accelerated Robotic Simulation

元の論文の公開ページ : [arxiv.org](https://arxiv.org/abs/2002.12160)   
提案モデルの実装 : []()  
Github Issues : []()  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。

## どんなもの?
##### robot manipulation中のin-hand object tracking問題に取り組むために、GPUによる高速化されたシミュレーターと、接触によるフィードバックを用いたsample-basedの最適化フレームワークを組み合わせることを提案する。
- [robot manipulation=ロボットによる操作、in-hand object tracking=手持ちのオブジェクトの捕捉(トラッキング)、sample-based=??。]
- シミュレーターには[1]のものが使われる。

## 先行研究と比べてどこがすごいの? or 関連事項
##### 省略

## 技術や手法のキモはどこ? or 提案手法の詳細
### 手法の概要
- 手法の流れは図1の通り。

![fig1](img/IOPTvCFaGRS/fig1.png)

##### 1. ロボットとシミュレーターの初期化を行う。
- 実ロボットの初期状態と実物体の初期ポーズを使用して、シミュレーションの初期化を行う。
  - [シミュレーター上のロボットは模倣ロボット、オブジェクトは模倣オブジェクト。]
  - 初期ポーズは、オクルージョンが無いと想定して、視覚からpose registrationアルゴリズムで取得できる。
  - また、模倣されたオブジェクトの初期ポーズ(複数形)に僅かな摂動を与え、アルゴリズムの不確実性を反映させておく。

##### 2. 単一のGPUを使い、リアルタイムで多数の同時シミュレーションを行う。
- このシミュレーターはGPUによってより高速化される。
- 与えられたポリシーにより、実ロボットは手にしているオブジェクトの操作、保持、接近[?]を行うため、模倣ロボットにも同じ制御コマンドを与えて動かす。
- その際、実ロボットと模倣ロボットの接触センサーの値などの観測値を収集する。

##### 3. sampleベースの最適化アルゴリズムによって定期的にシミュレーションの更新を行う。
- 各シミュレーションの観測値が実世界の観測値とどれほど一致しているか測るコスト関数に従ってシミュレーションのパラメータとステータスを更新する。
  - このとき、アルゴリズムは質量や摩擦などのシミュレーションパラメータも更新する。
  - 任意のタイミングで、オブジェクトポーズの推定値として、最低コストのシミュレーションのポーズが選択される。

## どうやって有効だと検証した?
##### 省略

## 議論はある?
##### 省略

## 次に読むべき論文は?
##### なし

## 論文関連リンク
##### あり
1. [M. Macklin, K. Erleben, M. M ̈ uller, N. Chentanez, S. Jeschke, and V. Makoviychuk,“Non-smooth newton methods for deformable multi-body dynamics,” arXiv preprint arXiv:1907.04587, 2019.](https://arxiv.org/pdf/1907.04587.pdf)[7]

## 会議, 論文誌, etc.
##### ICRA 2020

## 著者
##### Jacky Liang, Ankur Handa, Karl Van Wyk, Viktor Makoviychuk, Oliver Kroemer, Dieter Fox

## 投稿日付(yyyy/MM/dd)
##### 2020/02/27

## コメント
##### なし

## key-words
##### Paper, Robot, Simulation, 省略

## status
##### 省略

## read
##### A, I

## Citation
##### 未記入
