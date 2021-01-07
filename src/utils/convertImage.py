import sys
from PIL import Image

fileName = sys.argv[1]
convFileName = sys.argv[2]
img = Image.open(fileName)

sr, sc = img.size
px = img.load()
for cr in range(sr):
    for cc in range(sc):
        r, g, b = px[cr,cc]
        if r > 140 and g > 140:
            px[cr,cc] = (0, 0, 0)
        else:
            px[cr,cc] = (255, 255, 255)

img.save(convFileName)
exit(0)