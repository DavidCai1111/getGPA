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
    return fs.exists('result.txt');
}, function then() {
    var checkCode = fs.read('result.txt').trim();
    console.log("checkCode: ");
    console.log(checkCode);

    this.fill('form#form1',{
        'TextBox1':'1213490138',
        'TextBox2':'c65655650',
        'TextBox3':checkCode
    },false);

    this.capture("before.jpg");

});

casper.then(function(){
    this.click('#Button1');
});

casper.then(function(){
    this.capture("afterAll.jpg");
});

casper.then(function(){
    console.log(this.getCurrentUrl());
});

casper.run(function(){
    this.exit();
});
