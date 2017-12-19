//////////////////////////////////
// debug options /////////////////
var debug = 1;
var removeXMLTreeFromDocument = 1;
//////////////////////////////////



function padNumber (number){
    return number < 10 ? '0' + number.toString() : number.toString();
}

function timeStampWithSeconds (){
    var myDate = new Date();
    return padNumber(myDate.getDate()) + '.' +
        padNumber(myDate.getMonth())   + '.' +
        (myDate.getYear() - 100)       + ' ' +
        padNumber(myDate.getHours())   + ':' +
        padNumber(myDate.getMinutes()) + ':' +
        padNumber(myDate.getSeconds());
}

function timeStamp (){
    var myDate = new Date();
    return padNumber(myDate.getDate()) + '.' +
        padNumber(myDate.getMonth())   + '.' +
        (myDate.getYear() - 100)       + ' ' +
        padNumber(myDate.getHours())   + ':' +
        padNumber(myDate.getMinutes());
}

function FStimeStamp (){
    var myDate = new Date();
    return padNumber(myDate.getDate()) + '-' +
        padNumber(myDate.getMonth())   + '-' +
        (myDate.getYear() - 100)       + '_' +
        padNumber(myDate.getHours())   + '-' +
        padNumber(myDate.getMinutes());

}




function debugInfo (){
    var debugFile;

    if(debug) {

        debugFile = new File("~/Desktop/debug_" + FStimeStamp() + ".txt");
        debugFile.encoding = "UTF-8";
        debugFile.lineFeed = "Windows";
    }
    else {
        debugFile = new File();
    }
    debugFile.open("a");
    debugFile.writeln("=================START===================");
    debugFile.writeln("============="+timeStampWithSeconds() +"===============");
    debugFile.close();

var asd = {};

    asd.write = function (debugInfoString) {
        debugFile.open("a");
        debugFile.writeln(debugInfoString);
        debugFile.close();
    };

    asd.writeWithTimestamp = function (debugInfoString) {
        debugFile.open("a");
        debugFile.writeln("[" + timeStampWithSeconds() + "]" + debugInfoString);
        debugFile.close();
    };

    asd.end = function (){
        debugFile.open("a");
        debugFile.writeln("=================END===================");
        debugFile.writeln("============="+timeStampWithSeconds()+"===============");
        debugFile.close();
    };
    return asd;
}





function stats (){

    var statisticsFile = new File("~/Desktop/statistics_" + FStimeStamp() + ".txt");

    statisticsFile.encoding = "UTF-8";
    statisticsFile.lineFeed = "Windows";

    statisticsFile.open("a");
    statisticsFile.writeln("=================START===================");
    statisticsFile.writeln("============="+timeStampWithSeconds()+"===============");
    statisticsFile.close();

    var asd = {};
    asd.write = function (debugInfoString) {
        statisticsFile.open("a");
        statisticsFile.writeln(debugInfoString);
        statisticsFile.close();
    };
    asd.writeWithTimestamp = function (debugInfoString) {
        statisticsFile.open("a");
        statisticsFile.writeln("[" + timeStampWithSeconds() + "]" + debugInfoString);
        statisticsFile.close();
    };

    asd.end = function (){
        statisticsFile.open("a");
        statisticsFile.writeln("=================END===================");
        statisticsFile.writeln("============="+timeStampWithSeconds()+"===============");
        statisticsFile.close();
    };
    return asd;
}

var _debugInfo = debugInfo();

