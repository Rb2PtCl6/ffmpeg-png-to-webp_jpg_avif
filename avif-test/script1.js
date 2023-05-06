const fs=require('fs');
const path = require('path');

function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}

var img_q={}
var raw=getFiles("originals")
var img_name=[raw[0],raw[1],raw[2],raw[3]]
var quality=[0,63]
for (var q=quality[0];q<quality[1]+1;q++){
    img_q[`${q}q`]={}
}
//console.log(img_q)

var keys=new Array;
var keys_counter=0;
for (var name of img_name){
    keys[keys_counter]=path.basename(name, path.extname(name))
    keys_counter++
}
//console.log(keys)
for (var key of keys){
    var files=getFiles(`rezult-${key}`)
    for (var file of files){
        for (var q=quality[0];q<quality[1]+1;q++){
            if (file.indexOf(`-${q}q.avif`)>0){
                img_q[`${q}q`][key]=(fs.statSync(file)).size
                console.log(file)
            }
        }
    }
}
//console.log(img_q)
img_q['quality']={}
for (var key of keys){
    img_q['quality'][key]=key
}
console.log(img_q)
var img_q_keys=Object.keys(img_q)
console.log(img_q_keys)

fs.appendFileSync("img_q.json",JSON.stringify(img_q))
fs.appendFileSync("img_q_keys.json",JSON.stringify(img_q_keys))
