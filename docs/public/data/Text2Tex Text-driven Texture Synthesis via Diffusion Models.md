# Text2Tex: Text-driven Texture Synthesis via Diffusion Models

Update: 2023/08/13

## Info
- Paper: [arxiv.org](https://arxiv.org/abs/2303.11396)
  - Submission date: 2023/03/20
  - Authors: Dave Zhenyu Chen, Yawar Siddiqui, Hsin-Ying Lee, Sergey Tulyakov, Matthias Nießner
  - Conf.: ?
- Implementation: [daveredrum/Text2Tex](https://github.com/daveredrum/Text2Tex)
  - framework: Pytorch
  - Official code: Yes
  - License: licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License
- Keywords: CV, Mesh, Texture Generation

## How to build with docker and run the model in a docker container
### 1. Create a docker container
```bash
# Set this repository absolute path (ex: /home/user/obarads.github.io)
git clone https://github.com/Obarads/obarads.github.io.git
cd obarads.github.io
OGI_DIR_PATH=$PWD

# Get a base image
BASE_IMAGE=nvidia/cuda:11.3.1-cudnn8-devel-ubuntu20.04
docker pull $BASE_IMAGE

# Clone the repository
git clone https://github.com/daveredrum/Text2Tex.git
# Move to the repository
cd Text2Tex
# Switch to 2023/08/11 ver.
git switch -d 50780ae7444d41a4c561cc66404ccdb02a5c2eb3
# Copy a folder for building env.
cp -r $OGI_DIR_PATH/environments/TTTSvDM/ ./dev_env

# Create docker image and container
docker build . -t text2tex -f ./dev_env/Dockerfile --build-arg UID=$(id -u) --build-arg GID=$(id -g) --build-arg BASE_IMAGE=$BASE_IMAGE
docker run -dit --name text2tex --gpus all -v $PWD:/workspace text2tex
```

### 2. Setup in the docker container
In a docker container:
```bash
cd /workspace

# setup python and packages
conda create -n text2tex -y python=3.9
conda activate text2tex
cd dev_env
pip install -r requirements.txt

# setup pytorch3D
pip install iopath==0.1.10 fvcore==0.1.5.post20221221
curl -LO https://github.com/NVIDIA/cub/archive/1.10.0.tar.gz
tar xzf 1.10.0.tar.gz
export CUB_HOME=$PWD/cub-1.10.0
pip install --no-index --no-cache-dir pytorch3d==0.7.2 -f https://dl.fbaipublicfiles.com/pytorch3d/packaging/wheels/py39_cu113_pyt1121/download.html

# setup xformers
pip install xformers==0.0.12

# setup pretrained model
pip install huggingface_hub==0.16.4
cd ../models/ControlNet/
python -c "from huggingface_hub import hf_hub_download; hf_hub_download(repo_id='lllyasviel/ControlNet', filename='models/control_sd15_depth.pth', local_dir='./')"
```

### 3. Run the model
In a docker container:
```bash
./bash/run.sh
```

## どんなもの? 

## どうやって有効だと検証した?

### Other experiments

## 論文関連リンク
- [] temp


 