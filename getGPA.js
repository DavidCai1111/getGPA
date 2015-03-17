var execSync  = require('child_process').execSync;
var exec = require('child_process').exec;
var fs = require('fs');

console.log("start!");

console.log("一共传入了" + (process.argv.length -2 ) + "个参数" );
for(var i = 2 ; i < process.argv.length ; i++){
    console.log("第" + (i-1) + "个参数是" + process.argv[i]);
}

//若参数数量不是两个，则提示并退出
if(process.argv.length !==4 ){
    console.log("输入的参数数量不对，退出");
    process.exit(1);
}

var userToLogin = {
    name:process.argv[2],
    password:process.argv[3]
};

function getGPA(){
    //删除残留通信文件
    if(fs.existsSync("result.txt")){
        fs.unlinkSync("result.txt");
    }
    if(fs.existsSync("checkCodeText.txt")){
        fs.unlinkSync("checkCodeText.txt");
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

    //执行登录
    exec('casperjs LoginAndGetGPA.js',function(){
        if(fs.readFileSync('result.txt').toString() === "success"){
            //尝试成功
            console.log("end!");
        }else{
            //尝试失败，重新尝试
            console.log("try again!");
            getGPA();
        }
    });

    //等待获取到验证码
    while(!fs.existsSync("checkCode.jpg")){

    }

    //获取验证码文本
    execSync('java MyImgFilter');
    execSync('tesseract checkCodeFiltered.jpg checkCodeText -l eng  -psm 7');
}

getGPA();


