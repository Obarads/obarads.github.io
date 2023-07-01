# PointNeXt: Revisiting PointNet++ with Improved Training and Scaling Strategies

Update: 2023/07/01

## Info
- Paper: [arxiv.org](https://arxiv.org/abs/2206.04670)
  - Submission date: 2022/07/09
  - Authors: Guocheng Qian, Yuchen Li, Houwen Peng, Jinjie Mai, Hasan Abed Al Kader Hammoud, Mohamed Elhoseiny, Bernard Ghanem
  - Conf.: NeurlPS 2022
- Implementation: [guochengqian/PointNeXt](https://github.com/guochengqian/PointNeXt)
  - framework: Pytorch
  - Official code: Yes
  - License: MIT license
- Keywords: CV, Point Cloud, Semantic Segmentation, Part Segmentation, Classification

## How to build with docker and run the model in a docker container
The docker environment is as follows, and () is estimated minimum specifications to run the model:
- CPU: Intel® Core™ i9-9900K CPU @ 3.60GHz × 16 
- GPU: NVIDIA GeForce RTX 2080 Ti
- Memory: 64 GiB (16 GiB)
- Capacity: 1 TB (64 GiB)

### 1. Create a docker container
```bash
# Set this repository absolute path (ex: /home/user/obarads.github.io)
OGI_DIR_PATH=/path/to/obarads.github.io

# Clone the repository
git clone https://github.com/guochengqian/PointNeXt.git
# Move to PointNeXt
cd PointNeXt
# Switch to 2022/12/22 ver.
git switch -d de9e7f19b8b60645b2d94d210b307cca8d06e926
# Clone openpoints into repository
# Note: this command is provided to avoid the labor with git submodule and ssh.
rm -rf openpoints
git clone https://github.com/guochengqian/openpoints.git
cd openpoints
git switch -d ee100c81b1d9603c0fc76a3ee4e37d10b2af60ba

# Copy a folder for building env.
cd ../
cp -r $OGI_DIR_PATH/public/data/envs/PRPwITaSS/ ./dev_env
git diff 

# Create docker image and container
docker build . -t pointnext -f ./dev_env/Dockerfile --build-arg UID=$(id -u) --build-arg GID=$(id -g)
docker run -dit --name pointnext --gpus all -v $PWD:/workspace pointnext
```

### 2. Setup in the docker container
In a docker container:
```bash
cd /workspace

# apply diff
cd dev_env
git apply code.diff

# setup packages
cd ../
source install.sh

# setup a dataset for semantic segmentation
mkdir -p data/S3DIS/
cd data/S3DIS
gdown https://drive.google.com/uc?id=1MX3ZCnwqyRztG1vFRiHkKTz68ZJeHS4Y
tar -xvf s3disfull.tar
```

### 3. Run a model
In a docker container:
```bash
cd /workspace
CUDA_VISIBLE_DEVICES=0 python examples/segmentation/main.py --cfg cfgs/s3dis/pointnext-s.yaml --batch_size 16
```
