# Unsupervised Feature Learning for RGB-D Image Classification

元の論文の公開ページ : [staff.ustc.edu.cn](http://staff.ustc.edu.cn/~lszhuang/Doc/2014-ACCV-RGBD_Feature_Learning.pdf)  
Github Issues : 

## どんなもの?
RGB-D画像のための深層学習アーキテクチャを提案する。具体的には、deep Regularized Reconstruction Independent Component Analysis network $(R^2ICA)$とそれをブロックとして含む多層ニューラルネットワークを提案する。$R^2ICA$はグレースケール画像と深度画像との関係を符号化し、画像表現におけるシーン&オブジェクト構造の特徴付を容易にする役割を持っている。

貢献は以下の通り。

- **新しい試み** : 著者らの知る限り、RGB-D画像分類において深層学習を用いてグレースケール画像と深度画像間の関係を利用する試みは初めてである。
- **深度とグレースケール情報関係の符号化** : 深度とグレースケール情報の関係を符号化する$R^2ICA$アルゴリズムを利用して新しい深層学習アーキテクチャを提案する。
- **SOTA** : 実験において効率的かつ良好な精度を出した。

## 先行研究と比べてどこがすごいの?
機械学習などの分野において、RGB-D画像はRGB画像よりも多くの情報を提供するため、より優れた成果を出すことが可能である。しかし、機械学習におけるRGB-D画像の処理にはhand-crafted特徴が使われており、またこれらのデータを実際に機械学習に適応するにはドメイン固有の知識が必要となる。RGB-D画像からの特徴抽出にも時間がかかる。この論文では、深層学習をRGB-D画像向けに適応した機構を提案する。

## 技術や手法のキモはどこ? or 提案手法の詳細

## どうやって有効だと検証した?

## 議論はある?
なし

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. なし

## 会議
ACCV 2014

## 著者
I-Hong Jhuo, Shenghua Gao, Liansheng Zhuang, D. T. Lee, and Yi Ma

## 投稿日付(yyyy/MM/dd)
2014/??/??

## コメント
なし

## key-words
RGB_Image, Depth_Image, Classification

## status
導入

## read
A, I, R, C

## Citation
