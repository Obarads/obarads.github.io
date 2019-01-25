# self-supervised
## About
self-supervisedとは、アノテーションなしで有用な特徴量を抽出できるネットワークを構築すること。

## Evaluation
評価方法については2つある。referenceの1を参考にしよう。今後ここにまとめよう。

## Technical terms
- **target task**  
ネットワークで行いたい目的のタスク。分類問題とかのこと。

- **pretext task**  
target taskをこなす前に行う仮のタスク。このタスクを行うことで、target taskを解くカギになる画像が持っている形状情報等の抽出が可能なネットワークを作ることがこのタスクの目的である。例えば、ネットワークにジグゾーパズルを解かせたり、画像の向きを当てさせたりする。

- **low-level statistics(informationsも?)**  
pretextタスクをこなすためだけの情報。edge continuity、the pixel intensity/color distributionやchromatic aberration等が含まれるが、これらの情報はtargetタスクにおいて有用ではない。

- **high-level primitives(informationsも?)**  
targetタスクで必要なオブジェクトの形状などの情報。オブジェクトの形状を認識できるネットワークは、たとえ色が変わったりしても正しい認識が可能となるため有用である。

- **shortcuts**  
参考文献2より。pretextタスクをこなす為だけの手法を指す。この手法を取り入れたネットワークはtargetタスクでいまいちな結果を残す。

## Reference
1. https://www.slideshare.net/cvpaperchallenge/un-self-supervised-representation-learning-cvpr-2018
2. Mehdi Noroozi nad Paolo Favaro. Unsupervised Learning of Visual Represejtation by Solving Jigsaw Puzzles. 2016.