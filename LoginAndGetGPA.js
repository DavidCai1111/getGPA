var casper = require("casper").create({
    verbose: true,
    logLevel:"info"
});
var utils = require("utils");

console.log(" ");

casper.start("http://jwc1.usst.edu.cn",function(res){
    utils.dump(res);
});

casper.then(function(){
    this.capture("layout.jpg");
    this.captureSelector('yzm.jpg','dd img[src="CheckCode.aspx"]',{
        quality:100
    });
});

casper.then(function(){
    console.log(this.getCurrentUrl());
});

casper.run(function(){
    this.exit();
});
