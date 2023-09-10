# 3D-LLM: Injecting the 3D World into Large Language Models

Update: 2023/09/09

## Info
- Paper: [arxiv.org](https://arxiv.org/abs/2307.12981)
  - Submission date: 2023/07/24
  - Authors: Yining Hong, Haoyu Zhen, Peihao Chen, Shuhong Zheng, Yilun Du, Zhenfang Chen, Chuang Gan
  - Conf.: ??
- Implementation: [UMass-Foundation-Model/3D-LLM](https://github.com/UMass-Foundation-Model/3D-LLM)
  - framework: Pytorch
  - Official code: Yes
  - License: MIT License
- Keywords: CV, NLP, Point_Cloud, LLM, Multi-Modality

## Setup commands to run the implementation
Tested on:
- GPU: RTX2080ti

### 1. Create a docker container
```bash
# Set this repository absolute path (ex: /home/user/obarads.github.io)
git clone https://github.com/Obarads/obarads.github.io.git
cd obarads.github.io
OGI_DIR_PATH=$PWD

# Get a base image
BASE_IMAGE=nvidia/cuda:11.8.0-cudnn8-devel-ubuntu22.04
docker pull $BASE_IMAGE

# Clone the repository
git clone https://github.com/UMass-Foundation-Model/3D-LLM
# Move to text2room
cd 3D-LLM
# Switch to 2023/08/29 ver.
git switch -d 770b2a19330883be3baf207ed68b359658a0d5d6
# Copy a folder for building env.
cp -r $OGI_DIR_PATH/environments/3It3WiLLM/ ./dev_env

# Create docker image and container
docker build . -t 3D-LLM -f ./dev_env/Dockerfile --build-arg UID=$(id -u) --build-arg GID=$(id -g) --build-arg BASE_IMAGE=$BASE_IMAGE
docker run -dit --name 3D-LLM --gpus all -v $PWD:/workspace 3D-LLM
```

### 2. Setup in the docker container
In a docker container:
```bash
cd /workspace

# setup python and packages
conda create -y -n 3D-LLM python=3.9
conda activate 3D-LLM
cd dev_env
# pip install -r requirements.txt
```

### 3. Setup the models
In a docker container:
```bash
cd /workspace
wget https://mirrors.aliyun.com/blender/release/Blender3.6/blender-3.6.2-linux-x64.tar.xz
xz -dc xxx.tar.xz | tar xfv -

```

### 4. Run the model
In a docker container:
```bash
cd /workspace
```

## Clipping and note
### どんな論文か？


### 新規性

### 結果

### Other experiments

## 論文関連リンク
- [] 

