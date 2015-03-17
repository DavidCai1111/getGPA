var casper = require("casper").create({
    verbose: true,
    logLevel:"info",
    onAlert:function(self,msg){
        fs.touch("alertedMessage.txt");
        fs.write("alertedMessage.txt",msg);
    }
});
var utils = require("utils");
var fs = require("fs");
var system = require("system");

var user = {
    username:system.args[4],
    password:system.args[5]
};

casper.start("http://jwc1.usst.edu.cn",function(res){
    this.capture("layout.jpg");
});

casper.then(function(){
    this.captureSelector('checkCode.jpg','dd img[src="CheckCode.aspx"]',{
        quality:100
    });
});

casper.waitFor(function check() {
    return fs.exists('checkCodeText.txt');
}, function then() {
    var checkCode = fs.read('checkCodeText.txt').trim();
    console.log("checkCode: ");
    console.log(checkCode);

    this.fill('form#form1',{
        'TextBox1':user.username,
        'TextBox2':user.password,
        'TextBox3':checkCode
    },false);

    this.capture("before.jpg");

});

casper.then(function(){
    this.click('#Button1');
});

casper.then(function(){
    fs.touch("result.txt");
    if(this.exists('#Label3')){
        fs.write('result.txt','success');
    }else{
        fs.write('result.txt','fail');
        this.bypass(2);
    }
});

casper.then(function(){
    this.clickLabel('绩点表(二专课程不计入任选课程)','a');
});

casper.withFrame('zhuti', function() {
    var GPA = this.getHTML("#Td2");

    fs.touch("GPA.txt");
    fs.write("GPA.txt",GPA);
});

casper.run(function(){
    this.exit();
});
