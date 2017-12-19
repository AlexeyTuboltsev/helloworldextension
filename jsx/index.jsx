//#include "assets/log.jsx"
//@include "assets/getStyle.jsx"
//@include "assets/ui/ui1.jsx"

var _globals = (function userSettings (){

    var settings = {
        init : init,
        framePosition : [[],[]],
        indexLength : null,
        myStory : function (){
            if (app.activeDocument.selection[0] != null){
                return app.activeDocument.selection[0].parentStory;
            } else {
                alert("Please select a text to index");
                exit();
            }
        }()
    };

    settings.init();

    return {
        framePosition: settings.framePosition,
        myStory : settings.myStory,
        indexLength: settings.indexLength,
        indexLabel : "indexSource",
        pageIndexLabel : "index"
    }
}());



var firstIndexFrame = (function (){
    var value = null;
    var setValue = function (val){
        this.value = val;
    };
    return {
        value : value,
        setValue : setValue
    };
}());


var lastIndexFrame = (function (){
    var value = null;
    var setValue = function (val){
        this.value = val;
    };
    return {
        value : value,
        setValue : setValue
    };
}());




function main(){


    for (var i = 0; i < _globals.myStory.textContainers.length; i ++){
        var myTextFrame = _globals.myStory.textContainers[i];
        for (var j = 0; j < myTextFrame.paragraphs.length; j ++){
            var myParagraph = myTextFrame.paragraphs[j];
            if(myParagraph.textFrames.item(_globals.indexLabel).isValid){

                if (firstIndexFrame.value == null || (j == 0 && myParagraph.parentTextFrames.length == 1)){
                    firstIndexFrame.setValue(myParagraph.textFrames.item(_globals.indexLabel));
                }
                lastIndexFrame.setValue(myParagraph.textFrames.item(_globals.indexLabel));

            }
        }
        layOutFrames(myTextFrame.parentPage);
        firstIndexFrame.setValue(lastIndexFrame.value);
    }
}




function layOutFrames(page){
    var myIndexFrame = getIndexFrame(page);
    first = firstIndexFrame.value == null ? '' : cutIndexToLength(firstIndexFrame.value.parentStory.contents) + '\u2013';
    last = lastIndexFrame.value == null ? '' : cutIndexToLength(lastIndexFrame.value.parentStory.contents);

    myIndexFrame.parentStory.contents = first + last;
    myIndexFrame.parentStory.appliedParagraphStyle = getStyle('paragraph','index');
}

function getIndexFrame(page){
    var myFrame;
    if(page.pageItems.itemByName(_globals.pageIndexLabel).isValid) {
        myFrame = page.pageItems.itemByName(_globals.pageIndexLabel);
    }
    else{
        myFrame = page.textFrames.add({
            geometricBounds: _globals.framePosition[page.name%2], name: _globals.pageIndexLabel, label: _globals.pageIndexLabel, appliedObjectStyle : getStyle('object','index','text')
        });
    }

    return myFrame;
}

function cutIndexToLength(txt){

    return _globals.indexLength != 0 ? txt.substr(0, _globals.indexLength) : txt;
}

main();
