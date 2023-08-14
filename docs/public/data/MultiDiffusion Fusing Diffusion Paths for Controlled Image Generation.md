# MultiDiffusion: Fusing Diffusion Paths for Controlled Image Generation

Update: 2023/08/12

## Info
- Paper: [arxiv.org](https://arxiv.org/abs/2302.08113)
  - Submission date: 2023/02/16
  - Authors: Omer Bar-Tal, Lior Yariv, Yaron Lipman, Tali Dekel
  - Conf.: ICML 2023
- Implementation: [omerbt/MultiDiffusion](https://github.com/omerbt/MultiDiffusion)
  - framework: Pytorch
  - Official code: Yes
  - License: ?
- Keywords: CV, RGB Image, Scene Generation, Object Generation

## How to build with docker and run the model in a docker container
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
git clone https://github.com/omerbt/MultiDiffusion.git
# Move to MultiDiffusion/
cd MultiDiffusion/
# Switch to 2023/04/25 ver.
git switch -d f91b1c25fd14826d46f0f21c6f099b57fc446737
# Copy a folder for building env.
cp -r $OGI_DIR_PATH/environments/MFDPfCIG/ ./dev_env

# Create docker image and container
docker build . -t multi_diffusion -f ./dev_env/Dockerfile --build-arg UID=$(id -u) --build-arg GID=$(id -g) --build-arg BASE_IMAGE=$BASE_IMAGE
docker run -dit --name multi_diffusion --gpus all -v $PWD:/workspace multi_diffusion
```

### 2. Setup in the docker container
In a docker container:
```bash
cd /workspace

# setup python and packages
conda create -n multi_diffusion -y python=3.9
conda activate multi_diffusion
cd dev_env
pip install -r requirements.txt
```

### 3. Setup the models
Please open `/workspace/MultiDiffusion_Panorama.ipynb`, in the container and run the cells in `MultiDiffusion_Panorama.ipynb`.  
Note: cell 2 takes a long time.

## どんなもの? 

## どうやって有効だと検証した?

### Other experiments

## 論文関連リンク
- [] temp


 