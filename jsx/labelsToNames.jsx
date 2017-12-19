function labelsToNames(){
    var pages = app.activeDocument.pages;
    for (var i = 0; i < pages.length; i++) {
        for (var j = 0; j < app.activeDocument.pages[i].pageItems.length; j ++){
            app.activeDocument.pages[i].pageItems[j].name = app.activeDocument.pages[i].pageItems[j].label;

    }

    }

    var masterPages = app.activeDocument.masterSpreads;
    for(var k = 0 ; k < masterPages.length; k ++){
        for(var l = 0; l < masterPages[k].pages.length; l++){
            for(var m = 0; m < masterPages[k].pages[l].pageItems.length; m++){
                masterPages[k].pages[l].pageItems[m].name = masterPages[k].pages[l].pageItems[m].label;
            }
        }
    }
}
