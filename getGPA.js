var execSync  = require('child_process').execSync;
var exec = require('child_process').exec;
var fs = require('fs');

console.log("start!");

//删除残留文件
if(fs.existsSync("result.txt")){
    fs.unlinkSync("result.txt");
}
if(fs.existsSync("layout.jpg")){
    fs.unlinkSync("layout.jpg");
}
if(fs.existsSync("checkCode.jpg")){
    fs.unlinkSync("checkCode.jpg");
}
if(fs.existsSync("checkCodeFiltered.jpg")){
    fs.unlinkSync("checkCodeFiltered.jpg");
}

exec('casperjs LoginAndGetGPA.js',function(){
    console.log("end!");
});

//等待获取到验证码
while(!fs.existsSync("checkCode.jpg")){

}

//获取验证码文本
execSync('java MyImgFilter');
execSync('tesseract checkCodeFiltered.jpg result -l eng  -psm 7');


