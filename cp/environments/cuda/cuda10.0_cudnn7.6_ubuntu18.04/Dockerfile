FROM ubuntu:18.04

ENV DEBIAN_FRONTEND=noninteractive

ENV LC_ALL=C

# install ubuntu package and clean
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
    wget \
    gcc \
    apt-file \
    libxml2 \
    module-init-tools && \
    rm -rf /var/lib/apt/lists/*

# install cuda and cudnn
RUN wget https://developer.nvidia.com/compute/cuda/10.0/Prod/local_installers/cuda_10.0.130_410.48_linux --no-check-certificate -nv && \
    sh cuda_10.0.130_410.48_linux --silent --toolkit && \
    wget https://developer.download.nvidia.com/compute/machine-learning/repos/ubuntu1804/x86_64/libcudnn7_7.6.5.32-1+cuda10.0_amd64.deb --no-check-certificate -nv && \
    dpkg -i libcudnn7_7.6.5.32-1+cuda10.0_amd64.deb && \
    wget https://developer.download.nvidia.com/compute/machine-learning/repos/ubuntu1804/x86_64/libcudnn7-dev_7.6.5.32-1+cuda10.0_amd64.deb --no-check-certificate -nv && \
    dpkg -i libcudnn7-dev_7.6.5.32-1+cuda10.0_amd64.deb

# CUDA setting
ENV LD_LIBRARY_PATH /usr/local/nvidia/lib:/usr/local/nvidia/lib64:/usr/local/cuda/lib64/
ENV PATH /usr/local/nvidia/bin:/usr/local/cuda/bin:${PATH}