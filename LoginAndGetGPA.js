var casper = require("casper").create({
    verbose: true,
    logLevel:"info"
});
var utils = require("utils");
var fs = require("fs");

console.log(" ");

casper.start("http://jwc1.usst.edu.cn",function(res){
    utils.dump(res);
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
        'TextBox1':'?',
        'TextBox2':'?',
        'TextBox3':checkCode
    },false);

    this.capture("before.jpg");

});

casper.then(function(){
    this.click('#Button1');
});

casper.then(function(){
    this.capture("afterAll.jpg");
    fs.touch("result.txt");
    if(this.exists('#Label3')){
        fs.write('result.txt','success');
    }else{
        fs.write('result.txt','fail');
    }
});

casper.then(function(){
    console.log(this.getCurrentUrl());
});

casper.run(function(){
    this.exit();
});
