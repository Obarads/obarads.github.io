ARG BASE_IMAGE=nvidia/cuda:11.8.0-cudnn8-devel-ubuntu22.04
FROM ${BASE_IMAGE}

ENV DEBIAN_FRONTEND=noninteractive

# install ubuntu package and clean
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
    sudo \
    git \
    curl \
    libgl1-mesa-dev \
    libglib2.0-0 \
    wget \
    unzip && \
    # cmake build-essential pkg-config libgoogle-perftools-dev && \ 
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
