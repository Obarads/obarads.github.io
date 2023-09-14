# CoDeF: Content Deformation Fields for Temporally Consistent Video Processing

Update: 2023/08/19

## ℹ️ Info
- Paper: [arxiv.org](https://arxiv.org/abs/2308.07926)
  - Submission date: 2023/03/21
  - Authors: Hao Ouyang, Qiuyu Wang, Yuxi Xiao, Qingyan Bai, Juntao Zhang, Kecheng Zheng, Xiaowei Zhou, Qifeng Chen, Yujun Shen
  - Conf.: ?
- Implementation: [qiuyu96/CoDeF](https://github.com/qiuyu96/CoDeF)
  - framework: Pytorch
  - Official code: Yes
  - License: MIT license
- Keywords: CV, Video, Scene Generation, Object Generation

## 🖥️ Setup commands to run the implementation
Tested on:
- GPU: RTX4090

### 1. Create a docker container
```bash
# Set this repository absolute path (ex: /home/user/obarads.github.io)
git clone https://github.com/Obarads/obarads.github.io.git
cd obarads.github.io
OGI_DIR_PATH=$PWD

# Get a base image
BASE_IMAGE=nvidia/cuda:11.7.1-cudnn8-devel-ubuntu20.04
docker pull $BASE_IMAGE

# Create and move to a container dir
mkdir containers
cd containers
# Clone the repository
git clone https://github.com/qiuyu96/CoDeF.git
# Move to the repository
cd CoDeF
# Switch to 2023/8/1 ver.
git switch -d 743aec5e1849220b0efa3b657774b4321101ccb7
# Copy a folder for building env.
cp -r $OGI_DIR_PATH/environments/CCDFfTCVP/ ./dev_env

# Create docker image and container
docker build . -t codef -f ./dev_env/Dockerfile --build-arg UID=$(id -u) --build-arg GID=$(id -g) --build-arg BASE_IMAGE=$BASE_IMAGE
docker run -dit --name codef --gpus all --shm-size=48g -v $PWD:/workspace codef
```

### 2. Setup packages
In a docker container:
```bash
cd /workspace

# setup python and packages
conda create -n codef -y python=3.10
conda activate codef
pip install torch==2.0.0+cu117 torchvision==0.15.1+cu117 --index-url https://download.pytorch.org/whl/cu117
pip install gdown
pip install -r requirements.txt

# setup tiny-cuda-nn python package
git clone --recursive https://github.com/nvlabs/tiny-cuda-nn
git switch -d 6f018a9cd1b369bcb247e1d539968db8e48b2b3f
cd tiny-cuda-nn 
cmake . -B build
cmake --build build --config RelWithDebInfo -j
cd bindings/torch
python setup.py install
```

### 3. Setup the dataset and pretrained model
In a docker container:
```bash
cd /workspace

# download dataset
gdown https://drive.google.com/uc?id=1cKZF6ILeokCjsSAGBmummcQh0uRGaC_F
unzip all_sequences.zip

# download pretrained model
mkdir -p ckpts/all_sequences/scene_0/base/
cd ckpts/all_sequences/scene_0/base/
gdown https://drive.google.com/uc?id=1abOdREarfw1DGscahOJd2gZf1Xn_zN-F
```

### 4. Run the model
In a docker container:
```bash
cd /workspace
./scripts/test_multi.sh
./scripts/test_canonical.sh
```
