# MMPose

Update: 2023/07/31

## ℹ️ Info
- Document: [readthedocs.io](https://mmpose.readthedocs.io/en/latest/overview.html)
  - Release: 2020
- Implementation: [open-mmlab/mmpose](https://github.com/open-mmlab/mmpose)
  - framework: Pytorch
  - License: Apache License 2.0
- Keywords: CV, RGB Image, Pose Estimation, Library

## 🖥️ Setup commands to run the implementation
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
git clone https://github.com/open-mmlab/mmpose.git
# Move to MMPose
cd mmpose
# Switch to 2023/07/04 ver.
git switch -d 537bd8e543ab463fb55120d5caaa1ae22d6aaf06
# Copy a folder for building env.
cp -r $OGI_DIR_PATH/environments/mmpose/ ./dev_env

# Create docker image and container
docker build . -t mmpose -f ./dev_env/Dockerfile --build-arg UID=$(id -u) --build-arg GID=$(id -g) --build-arg BASE_IMAGE=$BASE_IMAGE
docker run -dit --name mmpose --gpus all -v $PWD:/workspace mmpose
```

### 2. Setup packages
In a docker container:
```bash
cd /workspace

# setup python and packages
conda create -y -n mmpose python=3.10
conda activate mmpose
cd dev_env
pip install -r requirements.txt
mim install "mmengine==0.8.2"
mim install "mmcv==2.0.1"
mim install "mmdet==3.1.0"
pip install -r post_requirements.txt
```

### 3. Run the model
Please open `/workspace/demo/MMPose_Tutorial.ipynb`, in the container and run cells below 9th cell (# Check Pytorch installation ~) in `MMPose_Tutorial.ipynb`.
