FROM ubuntu:16.04

ENV DEBIAN_FRONTEND=noninteractive

ENV LC_ALL=C

# install ubuntu package and clean
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
    wget \
    gcc \
    apt-file \
    module-init-tools && \
    rm -rf /var/lib/apt/lists/*

# install cuda and cudnn
RUN apt-file update && apt-file search '*Tie/File.pm' && \
    wget https://developer.nvidia.com/compute/cuda/8.0/Prod2/local_installers/cuda_8.0.61_375.26_linux-run --no-check-certificate -nv && \
    sh cuda_8.0.61_375.26_linux-run --silent --toolkit && \
    wget https://developer.download.nvidia.com/compute/machine-learning/repos/ubuntu1604/x86_64/libcudnn6_6.0.21-1+cuda8.0_amd64.deb --no-check-certificate -nv && \
    dpkg -i libcudnn6_6.0.21-1+cuda8.0_amd64.deb && \
    wget https://developer.download.nvidia.com/compute/machine-learning/repos/ubuntu1604/x86_64/libcudnn6-dev_6.0.21-1+cuda8.0_amd64.deb --no-check-certificate -nv && \
    dpkg -i libcudnn6-dev_6.0.21-1+cuda8.0_amd64.deb

# CUDA setting
ENV LD_LIBRARY_PATH /usr/local/nvidia/lib:/usr/local/nvidia/lib64:/usr/local/cuda/lib64/
ENV PATH /usr/local/nvidia/bin:/usr/local/cuda/bin:${PATH}
