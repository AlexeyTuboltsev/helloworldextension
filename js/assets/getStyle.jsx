

function chooseDefaultStyle(myDoc,documentStyleType, contentType) {
    var defStyle;

    if (documentStyleType == "objectStyles" && contentType == "image") {
        defStyle = myDoc[documentStyleType][1];
    }
    else if (documentStyleType == "objectStyles" && contentType == "text") {
        defStyle = myDoc[documentStyleType][2];
    }
    else if (documentStyleType == "paragraphStyles" || documentStyleType == "table") {
        defStyle = myDoc[documentStyleType][1];
    }
    else if (documentStyleType == "objectStyles") {
        defStyle = myDoc[documentStyleType][0];
    }
    else {
        defStyle = myDoc[documentStyleType][0];
    }
    if (defStyle.constructor.name != 'ParagraphStyle' && defStyle.constructor.name != 'CharacterStyle' && defStyle.constructor.name != 'ObjectStyle' &&
        defStyle.constructor.name != 'TableStyle' && defStyle.constructor.name != 'CellStyle') {
        _debugInfo.write("TYPE MISMATCH [getStyle] returned " + defStyle.constructor.name);
    }
    return defStyle
}


function getStyle(styleType, styleName, contentType) {
    var myDoc = app.activeDocument;
    var documentStyleType = styleType + 'Styles';
    var myStyle;

    if (myDoc[documentStyleType].item(styleName).isValid) {
        myStyle = myDoc[documentStyleType].item(styleName)
    } else {
        myStyle = myDoc[documentStyleType].add({
            name: styleName,
            basedOn: chooseDefaultStyle(myDoc,documentStyleType, contentType)
        });
    }

    if (myStyle.constructor.name != 'ParagraphStyle' && myStyle.constructor.name != 'CharacterStyle' && myStyle.constructor.name != 'ObjectStyle' &&
        myStyle.constructor.name != 'TableStyle' && myStyle.constructor.name != 'CellStyle') {
        _debugInfo.write("TYPE MISMATCH [getStyle] returned " + myStyle.constructor.name);
    }

    return myStyle;
}