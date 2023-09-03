# Build env.

```bash
# Get a base image
BASE_IMAGE=nvidia/cuda:11.8.0-cudnn8-devel-ubuntu20.04
docker pull $BASE_IMAGE

# Create docker image and container
docker build . -t ogi -f ./.devcontainer/Dockerfile.gpu --build-arg UID=$(id -u) --build-arg GID=$(id -g) --build-arg BASE_IMAGE=$BASE_IMAGE
docker run -dit --name ogi --gpus all -v $PWD:/workspace ogi
```

In the container:
```bash
cd /workspace
pip install -r .devcontainer/requirements.txt
pip install flash-attn --no-build-isolation
pip install git+https://github.com/HazyResearch/flash-attention.git#subdirectory=csrc/rotary
```
