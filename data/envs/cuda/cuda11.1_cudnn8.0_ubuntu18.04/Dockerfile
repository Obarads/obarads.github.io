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
RUN wget https://developer.download.nvidia.com/compute/cuda/11.1.1/local_installers/cuda_11.1.1_455.32.00_linux.run --no-check-certificate -nv && \
    sh cuda_11.1.1_455.32.00_linux.run --silent --toolkit && \
    wget https://developer.download.nvidia.com/compute/machine-learning/repos/ubuntu1804/x86_64/libcudnn8_8.0.4.30-1+cuda11.1_amd64.deb --no-check-certificate -nv && \
    dpkg -i libcudnn8_8.0.4.30-1+cuda11.1_amd64.deb && \
    wget https://developer.download.nvidia.com/compute/machine-learning/repos/ubuntu1804/x86_64/libcudnn8-dev_8.0.4.30-1+cuda11.1_amd64.deb --no-check-certificate -nv && \
    dpkg -i libcudnn8-dev_8.0.4.30-1+cuda11.1_amd64.deb

# CUDA setting
ENV LD_LIBRARY_PATH /usr/local/nvidia/lib:/usr/local/nvidia/lib64:/usr/local/cuda/lib64/
ENV PATH /usr/local/nvidia/bin:/usr/local/cuda/bin:${PATH}
