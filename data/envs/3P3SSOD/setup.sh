~/anaconda3/bin/conda init
source ~/.bashrc
conda create -n 3dssd python=3.6
conda activate 3dssd

TENSORFLOW_PATH=~/anaconda3/envs/3dssd/lib/python3.6/site-packages/tensorflow
CUDA_PATH=/usr/local/cuda

cd dev_env
pip install -r requirements.txt 
git apply code.diff

cd ../
bash compile_all.sh $TENSORFLOW_PATH $CUDA_PATH
mkdir -p dataset/KITTI/object
cd dataset/KITTI/object
wget https://github.com/dvlab-research/3DSSD/files/4491173/train.txt
wget https://github.com/dvlab-research/3DSSD/files/4491174/val.txt
wget https://github.com/dvlab-research/3DSSD/files/4491574/test.txt
