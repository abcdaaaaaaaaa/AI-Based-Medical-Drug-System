# AI-Medical-Drug-Cabinet

## Google Colab Code
!nvidia-smi

from google.colab import drive
drive.mount('/content/drive')

!unzip -q /content/drive/MyDrive/yolov7/data.zip
!git clone https://github.com/WongKinYiu/yolov7
%cd yolov7
!# Download YOLOv7 code

!wget https://github.com/WongKinYiu/yolov7/releases/download/v0.1/yolov7-e6e.pt

!pip install torch==1.12.1+cu113 torchvision==0.13.1+cu113 torchaudio==0.12.1 --extra-index-url https://download.pytorch.org/whl/cu113

#Change coco.yaml file

!python train.py  --device 0 --batch-size 4 --data coco.yaml --img 1280 1280  --weights yolov7-e6e.pt --name yolov7-e6e  --hyp data/hyp.scratch.p5.yaml --epochs 100

!cp -rn "runs/train/yolov7-e6e2/weights/best.pt" "/content/drive/MyDrive/yolov7/"

## coco.yaml

train: ../data/train/images/  

val: ../data/val/images/

nc: 2

names: [ 'icecream', 'spoon' ]


### data.zip
https://drive.google.com/file/d/17UT9fDMw_NgdldVjouHFgDvJ65iASW_D/view?usp=sharing
