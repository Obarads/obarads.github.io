ARG BASE_IMAGE=nvidia/cuda:11.7.1-cudnn8-devel-ubuntu20.04
FROM ${BASE_IMAGE}

ENV DEBIAN_FRONTEND=noninteractive

ENV TORCH_CUDA_ARCH_LIST="6.0 6.1 7.0 7.5 8.0 8.6+PTX" \
    TORCH_NVCC_FLAGS="-Xfatbin -compress-all" \
    CMAKE_PREFIX_PATH="$(dirname $(which conda))/../" \
    FORCE_CUDA="1"

# install ubuntu package and clean
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
    sudo \
    git \
    curl \
    ffmpeg \
    libsm6 \
    libxext6 \
    ninja-build \
    libglib2.0-0 \
    libxrender-dev \
    libgl1-mesa-glx \
    wget && \
    rm -rf /var/lib/apt/lists/*

# Workdirectory setting
WORKDIR /workspace
RUN chmod 777 -R /workspace
ENV SHELL /bin/bash
ENV LC_ALL=C

# [Optional] User setting
ARG UID
ARG GID
RUN groupadd -g ${GID} host-group && \
    useradd -u ${UID} --create-home -G sudo,root,${GID} -m user && \
    echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers
USER ${UID}

# Python setting
ENV MINICONDA3_SH_FILE=Miniconda3-py310_23.5.2-0-Linux-x86_64.sh
RUN wget https://repo.anaconda.com/miniconda/${MINICONDA3_SH_FILE} --no-check-certificate -nv && \
    sh ${MINICONDA3_SH_FILE} -b && \
    rm ${MINICONDA3_SH_FILE} && \
    ~/miniconda3/bin/conda init bash
