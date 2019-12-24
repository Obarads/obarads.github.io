# Joint Embedding of 3D Scan and CAD Objects

元の論文の公開ページ : [arxiv.org](https://arxiv.org/abs/1908.06989)  
提案モデルの実装 : [xheon/JointEmbedding](https://github.com/xheon/JointEmbedding)  
Github Issues : []()  

## どんなもの?
##### スキャンとCADのジオメトリ間の共同埋め込み空間を学習するためのアプローチを提案する。
- CADとスキャンデータには、環境理解[(意味理解)]のための保管的な情報が含まれていることが多く、この2つの([意味的な])ドメイン間のマッピングを確立することでこれらの情報をより有用に扱える。
- しかし、スキャンとCADのジオメトリには低レベルな違いがあり、ドメイン間で利用することが難しい。[要は、CADのジオメトリは理想的な値であるのに対し、実物をスキャンして得られるジオメトリはCADの理想値とは違うという差があるため、ドメイン間の辻褄を合わせるのが難しい。]
- そのため、チャレンジングであるものの、著者らはこの2つのドメインの共同埋め込み空間を学習する方法を提案した。
    - この空間では、両方のドメインからで意味的に類似したオブジェクトが近い状態にある。

##### この学習では、新しい3DCNNベースのアプローチを導入する。

## 先行研究と比べてどこがすごいの? or 関連事項

## 技術や手法のキモはどこ? or 提案手法の詳細

## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. [なし]()[1]

## 会議, 論文誌, etc.
ICCV 2019

## 著者
Dahnert, Manuel and Dai, Angela and Guibas, Leonidas and Niener, Matthias

## 投稿日付(yyyy/MM/dd)
2019/08/19

## コメント
なし

## key-words
CV, Paper, Dataset, 修正

## status
修正

## read

## Citation
@inproceedings{dahnert2019embedding,
    title={Joint Embedding of 3D Scan and CAD Objects},
    author={Dahnert, Manuel and Dai, Angela and Guibas, Leonidas and Nie{\ss}ner, Matthias},
    booktitle={The IEEE International Conference on Computer Vision (ICCV)},
    year={2019}
}