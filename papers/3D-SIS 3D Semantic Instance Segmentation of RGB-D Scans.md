# 3D-SIS: 3D Semantic Instance Segmentation of RGB-D Scans

元の論文の公開ページ : [arxiv.org](https://arxiv.org/pdf/1812.07003.pdf)  
提案モデルの実装 : [Sekunde/3D-SIS](https://github.com/Sekunde/3D-SIS)  
Github Issues : []()  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。

## どんなもの?
##### SLAMやVisual odometryから得られる連続したRGB-Dフレームデータを用いて3Dインスタンスセグメンテーションを行うモデル、3D-SISを提案した。
- [より開発に向けたテーマの設定にしてある。]連続するRGB-DデータのRGBと深度情報をうまく融合させてインスタンスセグメンテーションを行う提案をした。
  - 背景としては、近年、RGBと深度情報を取得できるセンサーやそれらをストリームとして保存する様な形式が普及しており、単体RGB画像のみを扱ったりするようなシナリオで研究するのは殆ど無いというもの。
- 各画像について、2D畳み込みで各ピクセルの2D特徴量を抽出する。次に、その特徴量を3Dボクセルに逆投影し、そこから処理を行う。
  - [具体的な内容はまだ見ていない3章以降にある。逆投影は多分[1]のようなことをしている。]

## 先行研究と比べてどこがすごいの? or 関連事項
##### RGB画像だけではなく、深度画像や連続した情報も融合して処理する様なシナリオに沿ってタスクを行う。
- カメラからのデータでセグメンテーションもしくは検出を行う研究では、単体画像のみが使われることが多いが、現実のシナリオでは単体画像のみを使うという状況が殆ど無い。
  - [however, in many real-world computer vision scenar-ios, we rarely find ourselves in such a single-image settingより。訳が間違っているかも]
  - [ここで言いたいのは、よくある現実のシナリオに沿ったセンサーや取得できるデータを利用してセグメンテーションを行うべきだということ。]
- 著者らは連続したカメラの情報を使う上に、3Dデータも扱う。
- **従来のセンサーフュージョンと似ているが、複数の入力からの深層学習を目的としている。**
- 本論文の具体的なタスクについては下を参照。

##### ストリームの情報全体で一貫したインスタンスセグメンテーションを行う。
- 単体画像からその画像内に対してインスタンスセグメンテーションを行うのではなく、ストリームで得た画像全てに対して一貫したインスタンスセグメンテーションを行う。
  - [違いは以下の通り。]
    - [単体画像に対するインスタンスセグメンテーション: 1枚ごとにインスタンスを検出する。画像間でインスタンスが同じものか判断することはできない。]
    - [ストリームに対するインスタンスセグメンテーション: 本論文のタスク。画像間のインスタンスが共通しているかわかる。]

## 技術や手法のキモはどこ? or 提案手法の詳細
##### 省略

## どうやって有効だと検証した?
##### 省略

## 議論はある?
##### 省略

## 次に読むべき論文は?
##### なし

## 論文関連リンク
##### あり
1. [CT適塾, かんたんな画像再構成：（２）「逆投影」. (アクセス:2019/12/25)](https://www.ct-tekijyuku.net/basic/reconstruct/reconstruct003.html)

## 会議, 論文誌, etc.
##### CVPR 2019

## 著者
##### Ji Hou, Angela Dai, Matthias Nießner

## 投稿日付(yyyy/MM/dd)
##### 2018/12/17

## コメント
##### なし

## key-words
Paper, CV, Instance_Segmentation, RGB_Image, Depth_Image, Multi-View, 修正

## status
##### 修正

## read
##### A, I, R

## Citation
##### あり
@inproceedings{hou2019sis,
  title={3D-SIS: 3D Semantic Instance Segmentation of RGB-D Scans},
  author={Ji, Hou and Dai, Angela and Nie{\ss}ner, Matthias},
  booktitle = {Proc. Computer Vision and Pattern Recognition (CVPR), IEEE},
  year={2019}
}