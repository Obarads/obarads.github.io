# Retentive Network: A Successor to Transformer for Large Language Models

Update: 2023/08/03

## Info
- Paper: [arxiv.org](https://arxiv.org/abs/2307.08621)
  - Submission date: 2023/07/17
  - Authors: Yutao Sun, Li Dong, Shaohan Huang, Shuming Ma, Yuqing Xia, Jilong Xue, Jianyong Wang, Furu Wei
  - Conf.: ?
- Implementation: [microsoft/unilm](https://github.com/microsoft/unilm/tree/master/retnet)
  - framework: Pytorch
  - Official code: Yes
  - License: MIT license
- Keywords: 

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
BASE_IMAGE=nvidia/cuda:11.7.1-cudnn8-devel-ubuntu20.04
docker pull $BASE_IMAGE

# Clone the repository
git clone https://github.com/microsoft/torchscale.git
# Move to text2room
cd torchscale
# Switch to 2023/07/24 ver.
git switch -d bf65397b26469ac9c24d83a9b779b285c1ec640b
# Copy a folder for building env.
cp -r $OGI_DIR_PATH/environments/RNAStTfLLM/ ./dev_env

# Create docker image and container
docker build . -t retnet -f ./dev_env/Dockerfile --build-arg UID=$(id -u) --build-arg GID=$(id -g) --build-arg BASE_IMAGE=$BASE_IMAGE
docker run -dit --name retnet --gpus all -v $PWD:/workspace retnet
```

### 2. Setup in the docker container
In a docker container:
```bash
cd /workspace

# setup python and packages
conda create -y -n retnet python=3.10
conda activate retnet
pip install -r dev_env/requirements.txt
pip install -e .
pip install git+https://github.com/shumingma/fairseq.git@moe


# setup sentencepiece to get data
# git clone https://github.com/google/sentencepiece.git 
# cd sentencepiece
# mkdir build
# cd build
# cmake ..
# make -j $(nproc)
# sudo make install
# sudo ldconfig -v
```

### 3. Setup the dataset
In a docker container:
```bash
cd /workspace/

# # Install fairseq command.
git clone https://github.com/shumingma/fairseq.git
cd fairseq
git branch moe 

# git clone https://github.com/facebookresearch/fairseq.git
# cd fairseq
# git checkout tags/v0.12.2
# pip install --editable .

# Download the dataset.
cd examples/language_model/
bash prepare-wikitext-103.sh
cd ../..

# Preprocess the dataset.
TEXT=examples/language_model/wikitext-103
fairseq-preprocess \
    --only-source \
    --trainpref $TEXT/wiki.train.tokens \
    --validpref $TEXT/wiki.valid.tokens \
    --testpref $TEXT/wiki.test.tokens \
    --destdir data-bin/wikitext-103 \
    --workers 20
```

### 4. Run the model
In a docker container:
```bash
cd /workspace/examples/fairseq/
PATH_TO_DATA=/workspace/fairseq/data-bin/wikitext-103
python -m torch.distributed.launch --nproc_per_node=2 --nnodes=1 train.py \
    ${PATH_TO_DATA} \
    --num-workers 2 \
    --arch retnet_base\
    --task language_modeling \
    --seed 1
```




