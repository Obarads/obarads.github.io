# 3D Gaussian Splatting for Real-Time Radiance Field Rendering

Update: 2023/09/12

## ℹ️ Info
- Paper: [arxiv.org](https://arxiv.org/abs/2308.04079)
  - Submission date: 2023/08/08
  - Authors: Bernhard Kerbl, Georgios Kopanas, Thomas Leimkühler, George Drettakis
  - Conf.: ACM Transactions on Graphics
- Implementation: [graphdeco-inria/gaussian-splatting](https://github.com/graphdeco-inria/gaussian-splatting)
  - framework: Pytorch
  - Official code: Yes
  - License: Other
- Keywords: CV, RGB Image, Multi-View

## 🖥 Setup commands to run the implementation
Tested on:
- GPU: RTX4090

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
git clone https://github.com/graphdeco-inria/gaussian-splatting --recursive
# Move to the repository
cd gaussian-splatting
# Switch to 2023/09/05 ver.
git switch -d ea68bdf29c3b11d1a7ec2e5a11b1af2c266bd7f2
# Copy a folder for building env.
cp -r "${OGI_DIR_PATH}/environments/3GSfRRFR/" ./dev_env

# Create docker image and container
docker build . -t gaussian-splatting -f ./dev_env/Dockerfile --build-arg UID=$(id -u) --build-arg GID=$(id -g) --build-arg BASE_IMAGE=$BASE_IMAGE
docker run -dit --name gaussian-splatting --gpus all -v $PWD:/workspace gaussian-splatting
```

### 2. Setup in the docker container
In a docker container:
```bash
cd /workspace

# setup python and packages
conda create -y -n gaussian-splatting python=3.9
conda activate gaussian-splatting
cd dev_env
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

## 📝 Clipping and note
### どんな論文か？

### 新規性

### 結果

### Other experiments

## 📚 論文関連リンク
- [] 

