var execSync  = require('child_process').execSync;
var exec = require('child_process').exec;
var fs = require('fs');

//若参数数量不是两个，则提示并退出
if((process.argv.length - 2) !== 2  ){
    console.log("[getGPA] 输入的参数数量不对，退出");
    process.exit(1);
}

console.log("[getGPA] 输入的学号为：" +  process.argv[2]);
console.log("[getGPA] 输入的密码为：" +  process.argv[3]);

//保存用户名密码
var userToLogin = {
    username:process.argv[2],
    password:process.argv[3]
};

console.log("[getGPA] 开始登录!");

//进入lib目录
process.chdir('lib');

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
    if(fs.existsSync("before.jpg")){
        fs.unlinkSync("before.jpg");
    }
    if(fs.existsSync("checkCode.jpg")){
        fs.unlinkSync("checkCode.jpg");
    }
    if(fs.existsSync("checkCodeFiltered.jpg")){
        fs.unlinkSync("checkCodeFiltered.jpg");
    }
    if(fs.existsSync("GPA.txt")){
        fs.unlinkSync("GPA.txt");
    }
    if(fs.existsSync("alertedMessage.txt")){
        fs.unlinkSync("alertedMessage.txt");
    }


    //执行登录
    exec(('casperjs LoginAndGetGPA.js '+ userToLogin.username + " " + userToLogin.password ),function(){
        if(fs.readFileSync('result.txt').toString() === "success"){
            //尝试成功
            console.log("[getGPA] 登录成功,开始获取平均学分绩点...");
            while(!fs.existsSync("GPA.txt")){

            }
            var GPA = fs.readFileSync('GPA.txt').toString();
            console.log("[getGPA] 结果：" + GPA);

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
            if(fs.existsSync("before.jpg")){
                fs.unlinkSync("before.jpg");
            }
            if(fs.existsSync("checkCode.jpg")){
                fs.unlinkSync("checkCode.jpg");
            }
            if(fs.existsSync("checkCodeFiltered.jpg")){
                fs.unlinkSync("checkCodeFiltered.jpg");
            }
            if(fs.existsSync("GPA.txt")){
                fs.unlinkSync("GPA.txt");
            }
            if(fs.existsSync("alertedMessage.txt")){
                fs.unlinkSync("alertedMessage.txt");
            }
        }else if(fs.existsSync("alertedMessage.txt") && fs.readFileSync("alertedMessage.txt").toString() === "密码错误！"){
            //密码错误
            console.log("[getGPA] 输入的密码错误!");
            process.exit(1);
        }else{
            //尝试失败，重新尝试
            console.log("[getGPA] 登录中...");
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


