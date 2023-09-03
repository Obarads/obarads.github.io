# TorchSparse++: Efficient Point Cloud Engine

Update: @{update_date}

## Info
- Paper: [openaccess.thecvf.com](https://openaccess.thecvf.com/content/CVPR2023W/WAD/html/Tang_TorchSparse_Efficient_Point_Cloud_Engine_CVPRW_2023_paper.html)
  - Submission date: 2023/06/18
  - Authors: Haotian Tang, Shang Yang, Zhijian Liu, Ke Hong, Zhongming Yu, Xiuyu Li, Guohao Dai, Yu Wang, Song Han
  - Conf.: CVPR 2023
- Implementation: [mit-han-lab/torchsparse](https://github.com/mit-han-lab/torchsparse)
  - framework: Pytorch
  - Official code: Yes
  - License: MIT license
- Keywords: 

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
BASE_IMAGE=nvidia/cuda:11.8.0-cudnn8-devel-ubuntu20.04
docker pull $BASE_IMAGE

# Clone the repository
git clone https://github.com/mit-han-lab/torchsparse.git
# Move to text2room
cd torchsparse
# Switch to 2023/07/28 ver.
git switch -d b55506aa2524c8d69e3b6081a4fd404ffd072b4b
# Copy a folder for building env.
cp -r $OGI_DIR_PATH/environments/TEPCE/ ./dev_env

# Create docker image and container
docker build . -t torchsparse -f ./dev_env/Dockerfile --build-arg UID=$(id -u) --build-arg GID=$(id -g) --build-arg BASE_IMAGE=$BASE_IMAGE
docker run -dit --name torchsparse --gpus all -v $PWD:/workspace torchsparse
```

### 2. Setup in the docker container
In a docker container:
```bash
cd /workspace

# setup python and packages
conda create -y -n torchsparse python=3.10
conda activate torchsparse

python -c "$(curl -fsSL https://raw.githubusercontent.com/mit-han-lab/torchsparse/master/install.py)"
# pip install -r requirements.txt
```

### 3. Setup the models
In a docker container:
```bash
cd /workspace
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

