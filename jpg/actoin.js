const fs=require('fs');
const path = require('path');
const { spawn }=require("child_process");

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

function process_img(img, q_current, result_name, q_string, img_without_ext ){
    const action=spawn("ffmpeg", ["-i",img,"-q",q_current,result_name])
    //console.log(result_name)
        action.stdout.on("data", data => {
            console.log(`stdout: ${data}`);
        });
        action.stderr.on("data", data => {
            console.log(`stderr: ${data}`);
        });
        action.on('error', (error) => {
            console.log(`error: ${error.message}`);
        });
        action.on("close", code => {
            console.log(`child process exited with code ${code}`);
        });
}

var img_list=getFiles("originals");
var q_range=[2,31]
var storage={}

for (var img of img_list){
    //console.log(img)
    var img_without_ext=path.basename(img,path.extname(img))
    var rez_dir_name=`rezult-${img_without_ext}`
    if (!fs.existsSync(rez_dir_name)){
        fs.mkdirSync(rez_dir_name);
    }
    //console.log(img_without_ext)
    for (var q_current=q_range[0];q_current<q_range[1]+1;q_current++){
        var q_string=q_current+"q"
        if (storage[q_string]==null){
            storage[q_string]={}
        }
        var result_name=`${rez_dir_name}/${img_without_ext}-${q_current}q.jpg`
        //console.log(`${img} ${q_current} ${result_name}`)
        process_img(img, q_current, result_name, q_string, img_without_ext)
    }
}
//console.log(storage)
