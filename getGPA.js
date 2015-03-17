var execSync  = require('child_process').execSync;
var exec = require('child_process').exec;
var fs = require('fs');

//若参数数量不是两个，则提示并退出
if((process.argv.length - 2) !== 2  ){
    console.log("输入的参数数量不对，退出");
    process.exit(1);
}

console.log("输入的用户名为：" +  process.argv[2]);
console.log("输入的密码为：" +  process.argv[3]);

//保存用户名密码
var userToLogin = {
    username:process.argv[2],
    password:process.argv[3]
};

console.log("开始登录!");

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
    exec(('casperjs LoginAndGetGPA.js '+ userToLogin.username + " " + userToLogin.password ),function(){
        if(fs.readFileSync('result.txt').toString() === "success"){
            //尝试成功
            console.log("登录成功!");
        }else if(fs.existsSync("alertedMessage.txt") && fs.readFileSync("alertedMessage.txt").toString() === "密码错误！"){
            //密码错误
            console.log("输入的密码错误!");
            process.exit(1);
        }else{
            //尝试失败，重新尝试
            console.log("登录中...");
            getGPA();
        }
    });

    //等待获取到验证码图片
    while(!fs.existsSync("checkCode.jpg")){

    }

    //预处理，分析获取验证码文本
    execSync('java MyImgFilter');
    execSync('tesseract checkCodeFiltered.jpg checkCodeText -l eng  -psm 7');
}

getGPA();


