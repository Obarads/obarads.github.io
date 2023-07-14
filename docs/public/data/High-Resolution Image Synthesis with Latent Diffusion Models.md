# High-Resolution Image Synthesis with Latent Diffusion Models

Update: 2023/07/14

## Info
- Paper: [arxiv.org](https://arxiv.org/abs/2112.10752)
  - Submission date: 2021/12/24
  - Authors: Robin Rombach, Andreas Blattmann, Dominik Lorenz, Patrick Esser, Björn Ommer
  - Conf.: CVPR 2022
- Implementation: [dvlab-research/3DSSD](https://github.com/dvlab-research/3DSSD)
  - framework: pytorch
  - Official code: Yes
  - License: CreativeML Open RAIL-M
- Keywords: CV, RGB Image, Object Generation, Scene Generation

## How to build with docker and run the model in a docker container
The docker environment is as follows:
- CPU: Intel® Core™ i9-9900K CPU @ 3.60GHz × 16 
- GPU: NVIDIA GeForce RTX 2080 Ti
- Memory: 64 GiB
- Capacity: 1 TB

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
git clone https://github.com/CompVis/stable-diffusion.git
# Move to stable-diffusion
cd stable-diffusion
# Switch to 2022/11/17 ver.
git switch -d 21f890f9da3cfbeaba8e2ac3c425ee9e998d5229
# Copy a folder for building env.
cp -r $OGI_DIR_PATH/environments/HISwLDM/ ./dev_env

# Create docker image and container
docker build . -t sd -f ./dev_env/Dockerfile --build-arg UID=$(id -u) --build-arg GID=$(id -g) --build-arg BASE_IMAGE=$BASE_IMAGE
docker run -dit --name sd --gpus all -v $PWD:/workspace sd
```

### 2. Setup in the docker container
In a docker container:
```bash
cd /workspace
git apply dev_env/code.diff

conda env create -f environment.yaml
conda activate ldm
```

### 3. Run the model
Please refer to [the section of README.md](https://github.com/CompVis/stable-diffusion#stable-diffusion-v1) to set the [sd-v1-4.ckpt weight](https://huggingface.co/CompVis/stable-diffusion-v-1-4-original) into the `/workspace/models/ldm/stable-diffusion-v1/model.ckpt` of container, and then run the following commands:

```bash
python scripts/txt2img.py --prompt "a photograph of an astronaut riding a horse" --plms 
```
