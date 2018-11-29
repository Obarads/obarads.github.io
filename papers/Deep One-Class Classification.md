# Deep One-Class Classification

## どんなもの?

## 先行研究と比べてどこがすごいの?
深層学習は革新的でありAnomaly Deteciotn(以下AD)でも深いADとして有望な結果を出しているが、ADベースの目的関数を最適化することによって学習されておらず、基本的に再構築誤差(AutoEncoderとか?)に依存している。この論文では、カーネルベースの一クラス分類と最小ボリューム推定からインスピレーションを受け、新しい深いADを提案する。その手法はDeep Support Vector Data Descriptionと名付けられた。これはデータのネットワーク表現を包みこむ超球のボリュームを最小化するニューラルネットワークを学習する(図1)。  
超球面の体積を最小限にすると、ネットワークはデータ点を球の中心に密接にマッピングする必要があるため、ネットワークに変動の共通因子を抽出させる必要があります。

## 技術や手法のキモはどこ?

## どうやって有効だと検証した?

## 議論はある?

## 次に読むべき論文は?

### 論文関連リンク

### 参考リンク

### 会議
ICML2018

### 著者/所属機関
Lukas Ruff, Robert A. Vandermeulen, Nico G ̈ornitz, Lucas Deecke, Shoaib A. Siddiqui, Alexander Binder, Emmanuel M ̈uller, Marius Kloft

### 投稿日付(yyyy/MM/dd)
2018/11/29

## コメント
