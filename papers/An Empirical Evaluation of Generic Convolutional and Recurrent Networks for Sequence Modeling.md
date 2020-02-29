# An Empirical Evaluation of Generic Convolutional and Recurrent Networks for Sequence Modeling

元の論文の公開ページ : [arxiv.org](https://arxiv.org/abs/1803.01271)  
提案モデルの実装 : [locuslab/TCN](https://github.com/locuslab/TCN)  
Github Issues : []()  

Note: 記事の見方や注意点については、[こちら](/)をご覧ください。

## どんなもの?
- この、どんなもの?の内容は[1]と同じ。

##### シーケンス処理における畳込み(convolutional)と再帰(recurrent)アーキテクチャの系統的評価を行った。
- 再帰アーキテクチャはシーケンスモデルの代表格であるが、近年では、機械翻訳や音声合成などで畳み込みアーキテクチャが再帰アーキテクチャよりも優れた結果を残している。
- 本論文では、これらのシーケンス処理が必要とされるタスクやデータセットにおいて、どのアーキテクチャがふさわしいのか?という疑問に対して実験を行う。

##### 結果としては、畳込みアーキテクチャが再帰アーキテクチャよりも優れていた。
- 単純な畳込みアーキテクチャがより効果的にメモリを使いながら、様々なタスクやデータセットにおいてLSTMのような標準的な再帰アーキテクチャよりも良い結果を示した。
- これらの結果より、シーケンスモデリングと再帰アーキテクチャ間の関係性を再度考慮するべきであり、また、シーケンス処理タスクにおける畳込みアーキテクチャは起こるべくして起こったアーキテクチャの出発点であるとみなすべきであると結論づけた。

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
##### あり
1. [icoxfog417. Github - arXivTimes/arXivTimes. "An Empirical Evaluation of Generic Convolutional and Recurrent Networks for Sequence Modeling #668". 2018. (アクセス:2020/2/28)](https://github.com/arXivTimes/arXivTimes/issues/668)[1]

## 会議, 論文誌, etc.
##### なし

## 著者
##### Shaojie Bai, J. Zico Kolter, Vladlen Koltun

## 投稿日付(yyyy/MM/dd)
##### 2018/03/03

## コメント
##### なし

## key-words
##### CV, Paper, 導入, 参照, Implemented, RNN, NLP, Sound

## status
##### 導入

## read
##### A

## Citation
##### 未記入
