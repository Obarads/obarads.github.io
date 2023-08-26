## Info
- Paper: [arxiv.org](@{arxiv_url})
  - Submission date: @{arxiv_submission_date}
  - Authors: @{arxiv_authors}
  - Conf.: ??
- Implementation: []()
  - framework: Pytorch
  - Official code: Yes
  - License: MIT license
- Keywords: 

## Setup commands to run the implementation
Tested on:
- GPU: ??

### 1. Create a docker container
```bash
# Set this repository absolute path (ex: /home/user/obarads.github.io)
git clone https://github.com/Obarads/obarads.github.io.git
cd obarads.github.io
OGI_DIR_PATH=$PWD

# Get a base image
BASE_IMAGE=@{base_nvidia_image}
docker pull $BASE_IMAGE

# Clone the repository
git clone @{github_url}
# Move to text2room
cd @{github_dir}
# Switch to @{github_commit_hash_date} ver.
git switch -d @{github_commit_hash_date}
# Copy a folder for building env.
cp -r $OGI_DIR_PATH/environments/@{myrepo_article_abb}/ ./dev_env

# Create docker image and container
docker build . -t @{github_dir} -f ./dev_env/Dockerfile --build-arg UID=$(id -u) --build-arg GID=$(id -g) --build-arg BASE_IMAGE=$BASE_IMAGE
docker run -dit --name @{github_dir} --gpus all -v $PWD:/workspace @{github_dir}
```

### 2. Setup in the docker container
In a docker container:
```bash
cd /workspace

# setup python and packages
conda create -n @{github_dir} python=3.9
conda activate @{github_dir}
cd dev_env
# pip install -r requirements.txt
```

### 3. Setup the models
In a docker container:
```bash
cd /workspace
```

### 4. Run the model
In a docker container:
```bash
cd /workspace
```

## Clipping and note
### どんな論文か？

### 新規性

### 結果

### Other experiments

## 論文関連リンク
- [] 

