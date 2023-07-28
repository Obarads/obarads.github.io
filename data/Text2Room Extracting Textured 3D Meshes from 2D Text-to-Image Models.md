# Text2Room: Extracting Textured 3D Meshes from 2D Text-to-Image Models

Update: 2023/07/26

## Info
- Paper: [arxiv.org](https://arxiv.org/abs/2303.11989)
  - Submission date: 2023/03/21
  - Authors: Lukas Höllein, Ang Cao, Andrew Owens, Justin Johnson, Matthias Nießner
  - Conf.: ICCV 2023
- Implementation: [lukasHoel/text2room](https://github.com/lukasHoel/text2room)
  - framework: Pytorch
  - Official code: Yes
  - License: MIT license
- Keywords: CV, Point Cloud, Scene Generation

## How to build with docker and run the model in a docker container
The docker environment is as follows:
- CPU: 13th Gen Intel(R) Core(TM) i9-13900KF
- GPU: NVIDIA GeForce RTX 4090
- Memory: 128 GiB
- Capacity: 1 TB

### 1. Create a docker container
```bash
# Set this repository absolute path (ex: /home/user/obarads.github.io)
git clone https://github.com/Obarads/obarads.github.io.git
cd obarads.github.io
OGI_DIR_PATH=$PWD

# Get a base image
BASE_IMAGE=nvidia/cuda:11.7.1-cudnn8-devel-ubuntu20.04
docker pull $BASE_IMAGE

# Clone the repository
git clone https://github.com/lukasHoel/text2room.git
# Move to text2room
cd text2room
# Switch to 2023/07/16 ver.
git switch -d c38d97e4d418cb5a93cfdc7b89ea0e6e7bbcf20b
# Copy a folder for building env.
cp -r $OGI_DIR_PATH/environments/TET3Mf2TM/ ./dev_env

# Create docker image and container
docker build . -t text2room -f ./dev_env/Dockerfile --build-arg UID=$(id -u) --build-arg GID=$(id -g) --build-arg BASE_IMAGE=$BASE_IMAGE
docker run -dit --name text2room --gpus all -v $PWD:/workspace text2room
```

### 2. Setup in the docker container
In a docker container:
```bash
cd /workspace

# setup python and packages
conda create -n text2room python=3.9
conda activate text2room
cd dev_env
pip install -r requirements.txt
pip install "git+https://github.com/facebookresearch/pytorch3d.git@v0.7.2"
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
