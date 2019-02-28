# obarads.github.io(Paper-Reminder)
## About
このレポジトリは論文を要約するためのものです。基本的には点群と生成モデル、2D&3D、申し訳程度の一クラス分類についてまとめます。下のサイトで一部の数式を成形して表示しています。検索はIssuesからできます。

[サイト(改修予定)](https://obarads.github.io/)

サイトの方には[Markdown_and_MathJax](https://github.com/Obarads/Markdown_and_MathJax)を使っています。

## Directory
- **papers**  
各論文のmdファイルが入っている。基本的に[arXivTimesのIssue](https://github.com/arXivTimes/arXivTimes)と[落合フォーマット](https://www.slideshare.net/Ochyai/1-ftma15?ref=http://lafrenze.hatenablog.com/entry/2015/08/04/120205)に従う形式となっている。  
技術や手法のキモはどこ?の項目は項目の目的を無視したものが多いです....
    - **img**  
    画像が論文ごとにフォルダにまとめている。論文名が長い場合があるので、フォルダ名には各単語の先頭文字を使っている。ただし、PointNet等、一単語に複数の大文字がある場合でも先頭文字だけを取る。この場合、Pのみになる。

- **complementary**  
各論文で出てくる単語やジャンルへの補足説明を行う。
    - **img**  
    画像がmdファイルごとにフォルダにまとめている。フォルダ名はmdファイル名と同じ。

## Issue page in Github
Issueの方に各論文のmdファイルの内容を載せています。もし間違いだと思う部分がある場合は、とりあえずissueの方にcommentしてください。

## 個人メモ
- 修正リスト
    - Tangent Convolutions for Dense Prediction in 3D(効率の部分のIとMがわからない、アーキテクチャの理解が不透明)
    - Unsupervised Visual Representation Learning by Context Prediction(検証実験が適当に記されている)
    - Mining Point Cloud Local Structures by Kernel Correlation and Graph Pooling(一応まとめてあるが、Learning on Loacal Geometric Structureの項が曖昧)

- いずれは自分で書いてねリスト
    - Deep Clustring for Unsupervised Learning of Visual Features(事前知識として、Unsupervised Learning of Visual Representations by Solving Jigsaw Puzzlesが必要だと思う)
    - 暇なときにDetection関連の論文読み直せ
