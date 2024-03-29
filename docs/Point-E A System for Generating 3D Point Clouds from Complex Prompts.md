# Point·E: A System for Generating 3D Point Clouds from Complex Prompts

Update: 2023/07/09

## ℹ️ Info
- Paper: [arxiv.org](https://arxiv.org/abs/2206.04670)
  - Submission date: 2022/12/16
  - Authors: Alex Nichol, Heewoo Jun, Prafulla Dhariwal, Pamela Mishkin, Mark Chen
  - Conf.: None?
- Implementation: [openai/point-e](https://github.com/openai/point-e)
  - framework: Pytorch
  - Official code: Yes
  - License: MIT license
- Keywords: CV, Point Cloud, Object Generation

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
git clone https://github.com/openai/point-e.git
# Move to point-e
cd point-e
# Switch to 2022/12/21 ver.
git switch -d fc8a607c08a3ea804cc82bf1ef8628f88a3a5d2f
# Copy a folder for building env.
cp -r $OGI_DIR_PATH/environments/PASfG3PCfC/ ./dev_env

# Create docker image and container
docker build . -t pointe -f ./dev_env/Dockerfile --build-arg UID=$(id -u) --build-arg GID=$(id -g) --build-arg BASE_IMAGE=$BASE_IMAGE
docker run -dit --name pointe --gpus all -v $PWD:/workspace pointe
```

### 2. Setup packages
In a docker container:
```bash
cd /workspace

conda create -n pointe python=3.9
conda activate pointe

pip install -r dev_env/requirements.txt
pip install -e .
```

### 3. Run the model
Please open `/workspace/point_e/examples/image2pointcloud.ipynb`, in the container and run the cells in `image2pointcloud.ipynb`.
