const { spawn }=require("child_process");

var name="originals/zacat-city-more.png";
var name_rez="rezult-zacat-city-more"
for (var i=0;i<101;i++){
    const action=spawn("ffmpeg", ["-i",name,"-quality",i,"-preset","picture",name_rez+"/zacat-city-more-"+i+"q.webp"])
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