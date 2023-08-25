# Panoptic Lifting for 3D Scene Understanding

Update: 2023/08/22

## Info
- Paper: [arxiv.org](https://arxiv.org/abs/2212.09802)
  - Submission date: 2022/12/19
  - Authors: Yawar Siddiqui, Lorenzo Porzi, Samuel Rota Buló, Norman Müller, Matthias Nießner, Angela Dai, Peter Kontschieder
  - Conf.: CVPR 2023
- Implementation: [nihalsid/panoptic-lifting](https://github.com/nihalsid/panoptic-lifting)
  - framework: Pytorch
  - Official code: Yes
  - License: Attribution-NonCommercial-ShareAlike 4.0 International
- Keywords: CV, RGB Image, Intensity Image, Panoptic Segmentation, Depth Estimation, Novel View Synthesis

## Setup commands to run the implementation
### 1. Create a docker container
```bash
# Set this repository absolute path (ex: /home/user/obarads.github.io)
git clone https://github.com/Obarads/obarads.github.io.git
cd obarads.github.io
OGI_DIR_PATH=$PWD

# Get a base image
BASE_IMAGE=nvidia/cuda:11.3.1-cudnn8-devel-ubuntu20.04
docker pull $BASE_IMAGE

# Clone the repository
git clone https://github.com/nihalsid/panoptic-lifting.git
# Move to the repository
cd panoptic-lifting
# Switch to 2023/06/13 ver.
git switch -d f72fbfa1418638fef15a1c6e2b2ec8a0293871f0
# Copy a folder for building env.
cp -r $OGI_DIR_PATH/environments/PLf3SU/ ./dev_env

# Create docker image and container
docker build . -t panoptic-lifting -f ./dev_env/Dockerfile --build-arg UID=$(id -u) --build-arg GID=$(id -g) --build-arg BASE_IMAGE=$BASE_IMAGE
docker run -dit --name panoptic-lifting --gpus all -v $PWD:/workspace panoptic-lifting
```

### 2. Setup in the docker container
In a docker container:
```bash
cd /workspace

# setup python and packages
conda create -n panoptic-lifting -y python=3.9
conda activate panoptic-lifting
cd dev_env
pip install -r requirements.txt
```

### 3. Setup the models
In a docker container:
```bash
cd /workspace

mkdir checkpoints
gdown https://drive.google.com/uc?id=1mMvj0fBKPfXRjLypaDPrCidT67jutWdr -O checkpoints/
gdown https://drive.google.com/uc?id=16cNJPZgxHI2wsa5dlG1HgMD_Vl5BPTSq -O checkpoints/
```

### 4. Run the model
In a docker container:
```bash
cd /workspace
conda activate text2room
CUDA_VISIBLE_DEVICES=0 python generate_scene.py
```

## Clipping and note
### どんな論文か？
- > We propose Panoptic Lifting, a novel approach for learning panoptic 3D volumetric representations from images of in-the-wild scenes.
  - > Once  trained,  our  model  can  render color images together with 3D-consistent panoptic segmentation from novel viewpoints.

### 新規性

### 結果

### Other experiments

## 論文関連リンク
- [8] Manuel  Dahnert,  Ji  Hou,  Matthias  Nießner,  and  Angela ``Dai.  Panoptic 3d scene reconstruction from a single rgb im- age. Advances in Neural Information Processing Systems, 34:8282–8293, 2021