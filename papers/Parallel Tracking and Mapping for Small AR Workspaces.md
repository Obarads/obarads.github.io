# Parallel Tracking and Mapping for Small AR Workspaces

元の論文の公開ページ : http://www.robots.ox.ac.uk/~gk/publications/KleinMurray2007ISMAR.pdf

## どんなもの?
[2]を見よう。

## 先行研究と比べてどこがすごいの?
提案されるモデルは手持ちの単眼カメラからSLAMを行うため、通常のSLAMの様にオドメトリ等の他のセンサーの値を利用できない。

## 技術や手法のキモはどこ? or 提案手法の詳細
### 手法の概要
全体的なアルゴリズムは以下の図の通り、[1]を参考に作成した。トラッキングとマップの更新の処理を(CPUのスレッド単位で)別々に行う様にすることで、トラッキングの性能を向上させる。また、冗長な情報を省くためにキーフレームを採用している。そのため、リアルタイムな処理が必要な本タスクでもバンドル調整と呼ばれる重い処理を導入できるようになっている。ステレオの初期化を採用し、時々ローカルバンドルを更新しながら、継続的かつ長期的にマッピングする。

![overall](img/PTaMfSAW/overall_2.png)

大まかな流れは[1]から引用した下図の通り。(いらないか)各特徴点にはソースキーフレーム(その特徴点を最初に確認したキーフレーム)とキーフレーム内の単体のソースピラミッドレベル、このレベル内のピクセル位置が含まれる。

#### 1. マップ初期化
システムの起動時に、[4]のfive-point stereo algorithmを使ってマップを初期化する。

#### TRACKING
この章はマップがすでに作成されていることを前提としている。このトラッキングシステムはカメラから受け取った画像からリアルタイムで構築された地図に対するカメラ姿勢の推定を行う。フレームごとにシステムは次の2段階のトラッキングを行う。

##### Image acquisition
トラッキングのために8bppグレイスケールの4層ピラミッド画像を使う。さらに各層でFAST-10コーナー検出器[3]を使う。また、減衰速度モデルを使う。これはα-βフィルタ([1]を参考)に似ているが、新しい測定値がないと推定されたカメラ(の位置)は遅く動くようになり、やがて止まる。

##### Camera pose and projection
マップの点を画像平面に投影するために、地図の点をワールド座標系からカメラ座標系へ変換する。

##### Patch Search
現在のフレームの中にある一つのマップの点$p$を探すため、点の予測画像位置を中心とした固定範囲の画像探索を行う。

## どうやって有効だと検証した?



1. 新しいフレームをカメラから受け取り、事前ポーズ推定がモーションモデルから生成される。
2. マップの点はフレームの事前ポーズ推定に従って画像に投影される。
3. 画像内で少数(50)の最も粗いスケールのフィーチャーが探索される。
4. カメラのポーズはこれらの粗いマッチングから更新される。
5. より多くの数(1000)の点が画像内で再投影され探索される。
6. フレームの最終的な姿勢推定値は、見つかったすべてのマッチングから計算される。


## 議論はある?

## 次に読むべき論文は?
- なし

### 論文関連リンク
1. [Masaya Kaneko. SLAM勉強会(PTAM). (大いに参考になる、アクセス:2019/04/09)](https://www.slideshare.net/MasayaKaneko/slamptam)
2. [ActiveVision Oxford. Parallel Tracking and Mapping for Small AR Workspaces (PTAM). (最初に見るべき、アクセス:2019/04/10)](https://www.youtube.com/watch?v=F3s3M0mokNc)
3. [E. Rosten and T. Drummond. Machine learning for high-speed cor-ner detection. InProc. 9th European Conference on Computer Vision (ECCV’06), Graz, May 2006.](https://www.springer.com/gp/book/9783540338321)
4. [H. Stew ́ enius, C. Engels, and D. Nist ́ er. Recent developments on direct relative orientation. ISPRS Journal of Photogrammetry and Remote Sensing, 60:284–294, June 2006.](https://www.journals.elsevier.com/isprs-journal-of-photogrammetry-and-remote-sensing)

### 会議
ISMAR 2007

### 著者
Georg Klein, David Murray.

### 投稿日付(yyyy/MM/dd)
2007/??/??

## コメント
動画がすごくおもしろかった....。あと、[1]のおかげで読む気力を高く維持したままで行けた。[1]様様。

## key-words
SLAM, 2D_Image