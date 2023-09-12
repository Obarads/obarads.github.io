# Retentive Network: A Successor to Transformer for Large Language Models

Update: 2023/08/03

## ℹ️ Info
- Paper: [arxiv.org](https://arxiv.org/abs/2307.08621)
  - Submission date: 2023/07/17
  - Authors: Yutao Sun, Li Dong, Shaohan Huang, Shuming Ma, Yuqing Xia, Jilong Xue, Jianyong Wang, Furu Wei
  - Conf.: ?
- Implementation: [microsoft/unilm](https://github.com/microsoft/unilm/tree/master/retnet)
  - framework: Pytorch
  - Official code: Yes
  - License: MIT license
- Keywords: NLP, LLM

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

# Clone the repository
git clone https://github.com/microsoft/torchscale.git
# Move to the repository
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
pip install git+https://github.com/shumingma/infinibatch.git
```

### 3. Setup the dataset
In a docker container:
```bash
cd /workspace/

# # Install fairseq command.
git clone https://github.com/shumingma/fairseq.git
cd fairseq
git branch moe 

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
NUM_GPU=1
# python -m torch.distributed.launch --nproc_per_node=${NUM_GPU} --nnodes=1 train.py \
#     ${PATH_TO_DATA} \
#     --num-workers 2 \
#     --activation-fn gelu \
#     --share-decoder-input-output-embed \
#     --validate-interval-updates 1000 \
#     --save-interval-updates 1000 \
#     --no-epoch-checkpoints \
#     --memory-efficient-fp16 \
#     --fp16-init-scale 4 \
#     --arch retnet_base \
#     --task language_modeling \
#     --sample-break-mode none \
#     --tokens-per-sample 128 \
#     --optimizer adam --adam-betas "(0.9, 0.98)" \
#     --adam-eps 1e-08 \
#     --clip-norm 0.0 \
#     --lr 5e-4 \
#     --lr-scheduler polynomial_decay \
#     --warmup-updates 750 \
#     --dropout 0.1 \
#     --weight-decay 0.01 \
#     --batch-size 4 \
#     --update-freq 1 \
#     --required-batch-size-multiple 1 \
#     --total-num-update 50000 \
#     --max-update 50000 \
#     --seed 1 \
#     --ddp-backend=c10d
```




