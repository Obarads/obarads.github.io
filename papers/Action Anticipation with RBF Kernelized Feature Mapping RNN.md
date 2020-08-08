# Action Anticipation with RBF Kernelized Feature Mapping RNN

元の論文の公開ページ : [arxiv.org](https://arxiv.org/abs/1911.07806)  
提案モデルの実装 : [2019/12/15 なし]()  
Github Issues : []()  

## どんなもの?
##### 行動予測(action anticipation)と未来のビデオの特徴生成を行うためのRNNベースのアルゴリズムを導入した。
- [未来のビデオの特徴は直訳、おそらく未来のビデオフレームに関する特徴のほうが正しい。アブスとしか見ていないからこの訳が正確であるかはわからないが。あとの方でfuture featuresと呼んでいるが、これは、丁寧に書くと字数が長くなるため、このような省略した書き方になっているのだと思われる。]
- このRNNを特徴マッピングRNN(feature mapping RNN)と呼ぶ。
- 提案するRNNはパラメータ共有、Radical Basic Function kernelsと敵対性学習に基づいた作りとなっている。
- 従来のRNNで必要とされるパラメータの一部と一部の直近のビデオフレームのみを使用して、この特徴マッピングRNNは未来の特徴を生成することができる。
- これらの未来の特徴をRBFカーネルレイヤーを用いたネットワークに入れることで、ビデオ内のアクションを予測することができる。 

##### 本提案は、JHMDB-21で18%、UCF101-24で6%、UT-Interactionで13%改善した。

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
##### ECCV 2018

## 著者
##### Yuge Shi, Basura Fernando, Richard Hartley

## 投稿日付(yyyy/MM/dd)
##### 2019/11/19

## コメント
##### なし

## key-words
##### CV, Paper, Video, Action_Anticipation, RNN, 導入

## status
##### 導入

## read
##### A

## Citation
##### arxiv.orgより引用
[リンク](https://arxiv.org/abs/1911.07806)  
@misc{shi2019action,
    title={Action Anticipation with RBF Kernelized Feature Mapping RNN},
    author={Yuge Shi and Basura Fernando and Richard Hartley},
    year={2019},
    eprint={1911.07806},
    archivePrefix={arXiv},
    primaryClass={cs.CV}
}


