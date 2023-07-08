FROM ubuntu:20.04

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
    rm -rf /var/lib/apt/lists/*

# install cuda and cudnn
RUN wget https://developer.download.nvidia.com/compute/cuda/11.3.1/local_installers/cuda_11.3.1_465.19.01_linux.run --no-check-certificate -nv && \
    sh cuda_11.3.1_465.19.01_linux.run --silent --toolkit

# CUDA setting
ENV LD_LIBRARY_PATH /usr/local/nvidia/lib:/usr/local/nvidia/lib64:/usr/local/cuda/lib64/
ENV PATH /usr/local/nvidia/bin:/usr/local/cuda/bin:${PATH}
