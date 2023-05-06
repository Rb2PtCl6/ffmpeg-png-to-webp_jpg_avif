const { spawn }=require("child_process");

const action=spawn("ffmpeg", ["-i","originals/k6kND7f.png", "-pix_fmt", "yuv420p","result/k6kND7f-1.avif"])
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