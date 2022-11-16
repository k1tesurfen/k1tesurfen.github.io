from PIL import Image
import os

try:
    with open('./dimensions.txt', 'w') as f:
        #go through all directories and files in the current dir
        for subdir, dirs, files in os.walk('./'):
            #focus on the files only
            for file in files:
                filepath=subdir + os.sep + file
                #if the files in the directory is a jpg or png open it with Pillow
                if filepath.lower().endswith(".jpg") or filepath.lower().endswith(".png") or filepath.lower().endswith(".jpeg"):
                    im = Image.open(filepath)
                    #next 3 lines only for confirmation
                    f.write(''+file+'\n')
                    f.write(''+str(im.width)+'\n')
                    f.write(''+str(im.height)+'\n')
                    #write the desired flex dimension into surrounding html code
                    f.write('<span class="row-items" style="flex: '+str(round(im.width/im.height, 4))+';"><img class="modalimage" src="images/woodworking/'+file+'" alt="'+file+'" /></span>\n')
                    f.write('\n')
except FileNotFoundError:
    print("problems have arisen")


