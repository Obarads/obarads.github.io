# Gemsketch: Interactive Image-Guided Geometry Extraction from Point Clouds

元の論文の公開ページ : [karthikdesingh.com](http://karthikdesingh.com/pdfs/mehran_et_al_ICRA_2018.pdf)  
Github Issues : []()  

## どんなもの?
多視点もしくは一視点から直方体と円柱状の形状を抽出するための対話型システム、GemSketchを提案した。
- ユーザーはオブジェクトのシルエットをトレースすることのみ必要とされる。
- シルエットの情報を利用し、たとえオクルージョン、クラッター、インコンプリートである点群でも正確な形状を予測することができる。
- RGB-Dデータセットを使用して著書らは提案の検証を行った。

## 先行研究と比べてどこがすごいの? or 関連事項
[論文より一部だけ]
- [1]では後処理が必要となる場合がある。
- [2]と違って対話型インターフェイスを設けることで、人からの知識を利用できる。
- [3]や[4]は全自動であるが尤もらしい結果を出す。[当然、間違っている可能性も高い。]こちらは人の介入によってより精密なモデルを得られる。
- 深層学習手法は訓練データを用意するのが用意ではない。

[等...(以下省略)]

## 技術や手法のキモはどこ? or 提案手法の詳細

## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?
- なし

## 論文関連リンク
1. [R. Schnabel, R. Wahl, and R. Klein, “Efficient ransac for point-cloud shape detection,” in Computer graphics forum, vol. 26, no. 2. Wiley Online Library, 2007, pp. 214–226. ](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.481.1514&rep=rep1&type=pdf)[12]
2. [Y. M. Kim, J. Cho, and S. C. Ahn, “3d modeling from photos given topological information,” IEEE Transactions on Visualization and Computer Graphics, vol. 22, no. 9, pp. 2070–2081, Sept 2016. ](https://ieeexplore.ieee.org/document/7346503)
3. [D. Li, T. Shao, H. Wu, and K. Zhou, “Shape completion from a single rgbd image,” IEEE Transactions on Visualization and Computer Graphics, vol. PP, no. 99, pp. 1–1, 2016.](http://www.kunzhou.net/2016/shapecompletion-tvcg16.pdf)
4. [M. Firman, O. Mac Aodha, S. Julier, and G. J. Brostow, “Structured prediction of unobserved voxels from a single depth image,” in The IEEE Conference on Computer Vision and Pattern Recognition (CVPR), June 2016. ](https://discovery.ucl.ac.uk/id/eprint/1533148/1/Firman_structured-prediction-unobserved.pdf)

## 会議, 論文誌, etc.
ICRA 2018

## 著者
Mehran Maghoumi, Joseph J. LaViola, Karthik Desingh, Odest Chadwicke Jenkins.

## 投稿日付(yyyy/MM/dd)

## コメント
なし

## key-words
CV, Paper, Point_Cloud, Multi-View, RGB_Image, Depth_Image, Completion

## status
導入

## read
A, I

## Citation
@INPROCEEDINGS{8460532,
author={M. {Maghoumi} and J. J. {LaVioia} and K. {Desingh} and O. {Chadwicke Jenkins}},
booktitle={2018 IEEE International Conference on Robotics and Automation (ICRA)},
title={Gemsketch: Interactive Image-Guided Geometry Extraction from Point Clouds},
year={2018},
volume={},
number={},
pages={2184-2191},
keywords={feature extraction;interactive systems;solid modelling;multiple-view point clouds;cuboids;interactive system;interactive image-guided geometry extraction;gemsketch;Three-dimensional displays;Shape;Geometry;Solid modeling;Tools;Cameras;Data mining},
doi={10.1109/ICRA.2018.8460532},
ISSN={2577-087X},
month={May},}
