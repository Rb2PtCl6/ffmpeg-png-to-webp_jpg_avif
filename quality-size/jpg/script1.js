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
var img_name=getFiles("originals")
for (var q=2;q<32;q++){
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
        for (var q=2;q<32;q++){
            if (file.indexOf(`-${q}q.jpg`)>0){
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


var condition=true
var order_storage;
var order_storage_lenght;
var order_storage_counter;
var rez_string=""
var symbol;
/*for (var img_q_key of img_q_keys){
    if (condition){
        order_storage=Object.keys(img_q[img_q_key])
        order_storage_lenght=order_storage.length
        condition=false
    }
    for (var element of img_q[img_q_key]){
        for (var value of order_storage){
            if (order_storage_counter==(order_storage_lenght-1)){
                symbol='\n'
                order_storage_counter=0
            } else {
                symbol=' '
                order_storage_counter++
            }
            rez_string=rez_string+`${element[value]}${symbol}`
        }
        console.log(element)
    }
    //console.log(rez_string)
}
fs.appendFileSync("output-webp.csv",rez_string)*/
