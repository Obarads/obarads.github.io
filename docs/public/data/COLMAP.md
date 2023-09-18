# COLMAP

Update: 2023/09/13

## ℹ️ Info
- Document: [github.io](https://colmap.github.io/index.html)
  - Release: 2016
- Implementation: [open-mmlab/mmpose](https://github.com/open-mmlab/mmpose)
  - framework: None
  - License: Other
- Keywords: CV, RGB Image, Multi-View, Library

## 🖥️ Setup commands to run the implementation
### 1. Create a docker container
```bash
# Set this repository absolute path (ex: /home/user/obarads.github.io)
git clone https://github.com/Obarads/obarads.github.io.git
cd obarads.github.io
OGI_DIR_PATH=$PWD

# Get a base image
BASE_IMAGE=nvidia/cuda:11.8.0-cudnn8-devel-ubuntu22.04
docker pull $BASE_IMAGE

# Create and move to a container dir
mkdir containers
cd containers

# Create and move to a container dir
mkdir containers
cd containers
# Clone the repository
git clone https://github.com/colmap/colmap.git
# Move to the repository
cd colmap
# Switch to 2023/02/01 ver.
git switch -d 43de802cfb3ed2bd155150e7e5e3e8c8dd5aaa3e
# Copy a folder for building env.
cp -r $OGI_DIR_PATH/environments/colmap/ ./dev_env

# Create docker image and container
docker build . -t colmap -f ./dev_env/Dockerfile --build-arg UID=$(id -u) --build-arg GID=$(id -g) --build-arg BASE_IMAGE=$BASE_IMAGE
docker run -dit --name colmap --gpus all -v $PWD:/workspace colmap
```

### 2. 

### 2. Run colmap command
In the container:
```bash
DATASET_PATH=data/
# If you run 3d gaussian-splatinig, please add `--camera_model SIMPLE_PINHOLE`
colmap automatic_reconstructor \
    --workspace_path $DATASET_PATH \
    --image_path $DATASET_PATH/images
    # --camera_model SIMPLE_PINHOLE
```