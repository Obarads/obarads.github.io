# MMPose

Update: 2023/07/31

## Info
- Document: [readthedocs.io](https://mmpose.readthedocs.io/en/latest/overview.html)
  - Release: 2020
- Implementation: [open-mmlab/mmpose](https://github.com/open-mmlab/mmpose)
  - framework: Pytorch
  - License: Apache License 2.0
- Keywords: CV, RGB Image, Pose Estimation, Library

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
git clone https://github.com/open-mmlab/mmpose.git
# Move to text2room
cd mmpose
# Switch to 2023/07/04 ver.
git switch -d 537bd8e543ab463fb55120d5caaa1ae22d6aaf06
# Copy a folder for building env.
cp -r $OGI_DIR_PATH/environments/mmpose/ ./dev_env

# Create docker image and container
docker build . -t mmpose -f ./dev_env/Dockerfile --build-arg UID=$(id -u) --build-arg GID=$(id -g) --build-arg BASE_IMAGE=$BASE_IMAGE
docker run -dit --name mmpose --gpus all -v $PWD:/workspace mmpose
```

### 2. Setup in the docker container
In a docker container:
```bash
cd /workspace

# setup python and packages
conda create -n mmpose python=3.10
conda activate mmpose
cd dev_env
pip install -r requirements.txt
```

### 3. Run the model
Please open `/workspace/demo/MMPose_Tutorial.ipynb`, in the container and run the cells in `MMPose_Tutorial.ipynb`.
