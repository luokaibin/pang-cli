import tinify
import os
import glob
from PIL import Image

img_folder_path = './temp/img'
img_tiny_folder_path = './temp/img-tiny'
if not os.path.exists(img_folder_path):
    os.makedirs(img_folder_path)
if not os.path.exists(img_tiny_folder_path):
    os.makedirs(img_tiny_folder_path)

files = glob.glob(img_tiny_folder_path+'/*')
for f in files:
    print (f)
    os.remove(f)


tinify.key = "WlpQGVscbzfqtCv3s58PbXw1ltw7Th6S"
total = 0
for root, dirs, files in os.walk(img_folder_path, topdown=False):
    for name in files :
        if (name.endswith('webp') or name.endswith('png') or name.endswith('jpg')):
            source_file=os.path.join(root, name)
            source_file_size=os.path.getsize(source_file)
            to_file=os.path.join(img_tiny_folder_path, name)
            print ("new File", name)
            print (source_file)
            print (source_file_size)
            print (to_file)
            img = Image.open(source_file)
            # get width and height
            width = img.width
            height = img.height

            print(width, height)


            tiny_source = tinify.from_file(source_file)
            if width > 700 :

                resized = tiny_source.resize(
                    method="scale",
                    width=max(700, width*0.85)
                )
                resized.to_file(to_file)

                tinify.from_file(to_file).to_file(to_file)

            else :
                tiny_source.to_file(to_file)
            to_file_size=os.path.getsize(to_file)
            size_change = to_file_size - source_file_size
            total = total + size_change
            print (to_file_size)
            print ('file size change', size_change)
            print ('total size change', total)
            compressions_this_month = tinify.compression_count
            print ('compressions_this_month count', compressions_this_month)

            os.remove(source_file)
            if size_change > 0 :
                os.remove(to_file)