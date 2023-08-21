# Note board (obarads.github.io)
This site (repository) provides **the paper clippings** and **docker commands to run the method of paper**.
If you want to know this contents, Please check [my github.io](https://obarads.github.io/) or Example (docker command) section.

## Example (docker command)
The docker command example [text2room](https://obarads.github.io/papers/Text2Room%20Extracting%20Textured%203D%20Meshes%20from%202D%20Text-to-Image%20Models.md) is following:
- Create a docker container
    ```bash
    # Set this repository absolute path (ex: /home/user/obarads.github.io)
    git clone https://github.com/Obarads/obarads.github.io.git
    cd obarads.github.io
    OGI_DIR_PATH=$PWD

    # Get a base image
    BASE_IMAGE=nvidia/cuda:11.7.1-cudnn8-devel-ubuntu20.04
    docker pull $BASE_IMAGE

    # Clone the repository
    git clone https://github.com/lukasHoel/text2room.git
    # Move to text2room
    cd text2room
    # Switch to 2023/07/16 ver.
    git switch -d c38d97e4d418cb5a93cfdc7b89ea0e6e7bbcf20b
    # Copy a folder for building env.
    cp -r $OGI_DIR_PATH/environments/TET3Mf2TM/ ./dev_env

    # Create docker image and container
    docker build . -t text2room -f ./dev_env/Dockerfile --build-arg UID=$(id -u) --build-arg GID=$(id -g) --build-arg BASE_IMAGE=$BASE_IMAGE
    docker run -dit --name text2room --gpus all -v $PWD:/workspace text2room
    ```
- Setup in the docker container
    ```bash
    cd /workspace

    # setup python and packages
    conda create -n text2room python=3.9
    conda activate text2room
    cd dev_env
    pip install -r requirements.txt
    pip install "git+https://github.com/facebookresearch/pytorch3d.git@v0.7.2"
    ```
- Setup the models
    ```bash
    cd /workspace

    mkdir checkpoints
    gdown https://drive.google.com/uc?id=1mMvj0fBKPfXRjLypaDPrCidT67jutWdr -O checkpoints/
    gdown https://drive.google.com/uc?id=16cNJPZgxHI2wsa5dlG1HgMD_Vl5BPTSq -O checkpoints/
    ```
- Run the model
    ```bash
    cd /workspace
    conda activate text2room
    CUDA_VISIBLE_DEVICES=0 python generate_scene.py
    ```

## Note
[previous data](https://github.com/Obarads/obarads.github.io/tree/b328c1c56d76cd4ea41cb4f1996da56de496c768/public/previous_data)
