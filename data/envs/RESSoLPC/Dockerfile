ARG BASE_IMAGE=ogi_cuda:cuda9.0_cudnn7.6_ubuntu16.04
FROM ${BASE_IMAGE}

ENV DEBIAN_FRONTEND=noninteractive

# install ubuntu package and clean
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
    sudo \
    git \
    p7zip-full \
    libboost-all-dev \
    wget \
    libgl1-mesa-dev \
    g++ && \
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
RUN wget https://repo.anaconda.com/archive/Anaconda3-2023.03-1-Linux-x86_64.sh --no-check-certificate -nv && \
    sh Anaconda3-2023.03-1-Linux-x86_64.sh -b && \
    rm Anaconda3-2023.03-1-Linux-x86_64.sh && \
    ~/anaconda3/bin/conda init bash
