var execSync  = require('child_process').execSync;
var exec = require('child_process').exec;
var fs = require('fs');

console.log("start!");

execSync('casperjs LoginAndGetGPA.js');

execSync('java MyImgFilter');

execSync('tesseract checkCodeFiltered.jpg result');

console.log("end!");

