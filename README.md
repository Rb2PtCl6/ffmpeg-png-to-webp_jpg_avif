# ffmpeg-png-to-webp_jpg_avif

webp -  ``` 0 - 100 ``` quality <br>
jpg - ``` 2 - 31 ``` quality <br>
avif - ``` 0 - 63 ``` quality <br>
# Commands for convertation
webp - $ ``` ffmpeg -i input.(jpg/png/webp/avif) -quality int(0-100) -preset string(none,default,picture,photo,drawing,icon,text) output.webp ``` <br>
jpg - $ ``` ffmpeg -i input.(jpg/png/webp/avif) -q int(2-31) output.jpg ``` <br>
avif - $ ``` ffmpeg -i input.(jpg/png/webp/avif) -crf int(0-63) -pix_fmt yuv420p output.avif ``` <br>
