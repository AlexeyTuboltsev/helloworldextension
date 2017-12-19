function userSettings () {
  return {
    xslFile:         '', //leave blank for default or for prompt
    defaultFont:     'Myriad Pro',
    frameDimensions: {
      indexSource:  [8, 4],
      standnummer:  [20, 10],
      logo:         [50, 10],
      QRCode:       [19, 19],
      productImage: [60, 35],
      subfair:      [11, 11]
    },

    bleed:       3,
    indexLength: 2,

    styleNames: {
      standnummer:  'standnummer',
      indexSource:  'indexSource',
      mainFrame:    'mainFrame',
      logo:         'logo',
      productImage: 'productImage',
      QRCode:       'QRCode'
    }
  }
}

function docSetup (myDoc, _userVariables, getStyle) {
  _debugInfo.writeWithTimestamp('[docSetup] first')

  myDoc.zeroPoint = [0, 0]

  var foo = myDoc.viewPreferences
  foo.horizontalMeasurementUnits = MeasurementUnits.MILLIMETERS
  foo.verticalMeasurementUnits = MeasurementUnits.MILLIMETERS
  foo.printDialogMeasurementUnits = MeasurementUnits.MILLIMETERS
  foo.cursorKeyIncrement = 0.01
  foo.rulerOrigin = RulerOrigin.PAGE_ORIGIN

  //PAGE DIMENSIONS
  foo = myDoc.documentPreferences
  foo.pageHeight = 210
  foo.pageWidth = 120
  foo.facingPages = true
  //createPrimaryTextFrame = true;
  foo.pageBinding = PageBindingOptions.LEFT_TO_RIGHT
  foo.documentBleedTopOffset = _userVariables.bleed
  foo.documentBleedUniformSize = true

  //TEXT DEFAULTS //doesn't seem to work, use default paragraph style below
  foo = myDoc.textDefaults
  foo.characterDirection = CharacterDirectionOptions.LEFT_TO_RIGHT_DIRECTION
  foo.hyphenation = false
  foo.justification = Justification.LEFT_ALIGN
  foo.noBreak = false
  foo.paragraphDirection = ParagraphDirectionOptions.LEFT_TO_RIGHT_DIRECTION
  foo.alignToBaseline = false
  foo.fillColor = myDoc.swatches.item('Black')

  foo = myDoc.textPreferences
  foo.smartTextReflow = false

  foo = myDoc.preflightOptions
  foo.preflightOff = true

  ///////////////////////////
  // SOME DEFAULT STYLES ////
  //////////////////////////

  // default paragraph style

  foo = myDoc.paragraphStyles[1]

  foo.appliedFont = _userVariables.defaultFont
  foo.pointSize = 10
  foo.leading = 12
  foo.characterDirection = CharacterDirectionOptions.LEFT_TO_RIGHT_DIRECTION
  foo.paragraphDirection = ParagraphDirectionOptions.LEFT_TO_RIGHT_DIRECTION
  foo.justification = Justification.LEFT_ALIGN
  foo.firstLineIndent = 0
  foo.rightIndent = 0
  foo.leftIndent = 0
  foo.spaceBefore = 0
  foo.spaceAfter = 0
  foo.balanceRaggedLines = false
  foo.alignToBaseline = false
  //foo.appliedLanguage = '';
  foo.hyphenation = false
  foo.keepLinesTogether = false
  foo.keepWithPrevious = false
  foo.ruleAbove = false
  foo.ruleBelow = false
  foo.underline = false

  // default image frame style
  foo = myDoc.objectStyles[1]
  foo.enableFill = true
  foo.fillColor = myDoc.swatches[0]
  foo.enableStroke = true
  foo.strokeColor = myDoc.swatches[0]

  // default text frame style
  foo = myDoc.objectStyles[2]
  foo.enableTextFrameAutoSizingOptions = false
  foo.enableTextFrameBaselineOptions = true
  foo.textFramePreferences.firstBaselineOffset = FirstBaseline.CAP_HEIGHT
  foo.enableFill = true
  foo.fillColor = myDoc.swatches[0]
  foo.enableStroke = true
  foo.strokeColor = myDoc.swatches[0]
  foo.enableParagraphStyle = true
  foo.appliedParagraphStyle = myDoc.paragraphStyles[1]
  foo.enableStoryOptions = true
  foo.storyPreferences.opticalMarginAlignment = true
  foo.storyPreferences.opticalMarginSize = myDoc.paragraphStyles[1].pointSize
  foo.storyPreferences.storyDirection = StoryDirectionOptions.LEFT_TO_RIGHT_DIRECTION

  //character styles
  foo = myDoc.characterStyles
  foo.add({
    name:    'nb',
    noBreak: true
  })

  foo.add
  ({
    name:      'invisible',
    fillColor: myDoc.swatches[0]
  })

  foo.add
  ({
    name: 'index'
  })

  ////////////////////////
  //paragraph styles
  foo = myDoc.paragraphStyles
  foo.add({
    name:             'table_index',
    leading:          0,
    keepWithPrevious: true
  })

  ////////////////////////
  //object styles
  foo = myDoc.objectStyles

  //mainFrame
  foo.add({
    name:                             _userVariables.styleNames.mainFrame,
    basedOn:                          myDoc.objectStyles[2],
    enableTextFrameAutoSizingOptions: false,
    enableTextFrameBaselineOptions:   true,
    textFramePreferences:             {
      firstBaselineOffset: FirstBaseline.CAP_HEIGHT
    },
    enableFill:                       true,
    fillColor:                        myDoc.swatches[0],
    enableStroke:                     true,
    strokeColor:                      myDoc.swatches[0]
  })

  //standnummer
  foo.add({
    name:                             _userVariables.styleNames.standnummer,
    basedOn:                          myDoc.objectStyles[2],
    enableParagraphStyle:             true,
    appliedParagraphStyle:            getStyle('paragraph', _userVariables.styleNames.standnummer),
    enableAnchoredObjectOptions:      true,
    anchoredObjectSettings:           {
      anchoredPosition:         AnchorPosition.ANCHORED,
      anchorPoint:              AnchorPoint.TOP_RIGHT_ANCHOR,
      horizontalAlignment:      HorizontalAlignment.RIGHT_ALIGN,
      horizontalReferencePoint: AnchoredRelativeTo.PAGE_MARGINS,
      verticalReferencePoint:   VerticallyRelativeTo.CAPHEIGHT,
      anchorXoffset:            0,
      anchorYoffset:            0
    },
    enableTextFrameAutoSizingOptions: true,
    textFramePreferences:             {
      autoSizingReferencePoint:     AutoSizingReferenceEnum.TOP_RIGHT_POINT,
      autoSizingType:               AutoSizingTypeEnum.HEIGHT_ONLY,
      useNoLineBreaksForAutoSizing: true
    },
    enableFill:                       true,
    fillColor:                        myDoc.swatches[0],
    enableStroke:                     true,
    strokeColor:                      myDoc.swatches[0]
  })

  //index
  foo.add
  ({
    name:                             _userVariables.styleNames.indexSource,
    basedOn:                          myDoc.objectStyles[2],
    enableParagraphStyle:             true,
    appliedParagraphStyle:            getStyle('paragraph', _userVariables.styleNames.indexSource),
    enableAnchoredObjectOptions:      true,
    anchoredObjectSettings:           {
      anchoredPosition:         AnchorPosition.ANCHORED,
      anchorPoint:              AnchorPoint.BOTTOM_RIGHT_ANCHOR,
      horizontalAlignment:      HorizontalAlignment.LEFT_ALIGN,
      horizontalReferencePoint: AnchoredRelativeTo.TEXT_FRAME,
      verticalReferencePoint:   VerticallyRelativeTo.CAPHEIGHT,
      anchorXoffset:            0,
      anchorYoffset:            0
    },
    enableTextFrameAutoSizingOptions: true,
    textFramePreferences:             {
      autoSizingReferencePoint:     AutoSizingReferenceEnum.TOP_RIGHT_POINT,
      autoSizingType:               AutoSizingTypeEnum.HEIGHT_ONLY,
      useNoLineBreaksForAutoSizing: true
    },
    enableFill:                       true,
    fillColor:                        myDoc.swatches[0],
    enableStroke:                     true,
    strokeColor:                      myDoc.swatches[0]
  })

  //logo
  foo.add
  ({
    name:                             _userVariables.styleNames.logo,
    basedOn:                          myDoc.objectStyles[1],
    enableParagraphStyle:             false,
    enableAnchoredObjectOptions:      true,
    anchoredObjectSettings:           {
      anchoredPosition:         AnchorPosition.ANCHORED,
      anchorPoint:              AnchorPoint.TOP_LEFT_ANCHOR,
      horizontalAlignment:      HorizontalAlignment.LEFT_ALIGN,
      horizontalReferencePoint: AnchoredRelativeTo.TEXT_FRAME,
      verticalReferencePoint:   VerticallyRelativeTo.CAPHEIGHT,
      anchorXoffset:            0,
      anchorYoffset:            0
    },
    enableTextFrameAutoSizingOptions: false,
    enableFill:                       true,
    fillColor:                        myDoc.swatches[0],
    enableStroke:                     true,
    strokeColor:                      myDoc.swatches[0],
    enableTextWrapAndOthers:          true,
    textWrapPreferences:              {
      textWrapMode:   TextWrapModes.JUMP_OBJECT_TEXT_WRAP,
      textWrapOffset: [0, 0, 0, 0]
    }
  })

  //productImage
  foo.add
  ({
    name:                             _userVariables.styleNames.productImage,
    basedOn:                          myDoc.objectStyles[1],
    enableParagraphStyle:             false,
    enableAnchoredObjectOptions:      true,
    anchoredObjectSettings:           {
      anchoredPosition:         AnchorPosition.ANCHORED,
      anchorPoint:              AnchorPoint.TOP_LEFT_ANCHOR,
      horizontalAlignment:      HorizontalAlignment.LEFT_ALIGN,
      horizontalReferencePoint: AnchoredRelativeTo.TEXT_FRAME,
      verticalReferencePoint:   VerticallyRelativeTo.CAPHEIGHT,
      anchorXoffset:            0,
      anchorYoffset:            0
    },
    enableTextFrameAutoSizingOptions: false,
    enableFill:                       true,
    fillColor:                        myDoc.swatches[0],
    enableStroke:                     true,
    strokeColor:                      myDoc.swatches[0],
    enableTextWrapAndOthers:          true,
    textWrapPreferences:              {
      textWrapMode:   TextWrapModes.JUMP_OBJECT_TEXT_WRAP,
      textWrapOffset: [0, 0, 0, 0]
    }
  })

  //QRCode
  foo.add
  ({
    name:                             _userVariables.styleNames.QRCode,
    basedOn:                          myDoc.objectStyles[1],
    enableParagraphStyle:             false,
    enableAnchoredObjectOptions:      true,
    anchoredObjectSettings:           {
      anchoredPosition:         AnchorPosition.ANCHORED,
      anchorPoint:              AnchorPoint.TOP_RIGHT_ANCHOR,
      horizontalAlignment:      HorizontalAlignment.RIGHT_ALIGN,
      horizontalReferencePoint: AnchoredRelativeTo.TEXT_FRAME,
      verticalReferencePoint:   VerticallyRelativeTo.CAPHEIGHT,
      anchorXoffset:            0,
      anchorYoffset:            0
    },
    enableTextFrameAutoSizingOptions: false,
    enableFill:                       true,
    fillColor:                        myDoc.swatches[0],
    enableStroke:                     true,
    strokeColor:                      myDoc.swatches[0],
    enableTextWrapAndOthers:          true,
    textWrapPreferences:              {
      textWrapMode:   TextWrapModes.BOUNDING_BOX_TEXT_WRAP,
      textWrapOffset: [0, 0, 0, 0]
    }
  })

  //////////////////////////////////////////////////////////
  ////// MASTERS, MARGINS AND TEXTFRAMES ///////////////////
  foo = myDoc.masterSpreads.add(2)

  foo.pages[0].marginPreferences.top = 26.5
  foo.pages[0].marginPreferences.left = 12
  foo.pages[0].marginPreferences.bottom = 17
  foo.pages[0].marginPreferences.right = 12
  foo.pages[1].marginPreferences.top = 26.5
  foo.pages[1].marginPreferences.left = 12
  foo.pages[1].marginPreferences.bottom = 17
  foo.pages[1].marginPreferences.right = 12

  foo.pages[0].textFrames.add({
    geometricBounds:    [foo.pages[0].marginPreferences.top, foo.pages[0].marginPreferences.left, 193, 88.6],
    name:               'mainFrame', label: 'mainFrame',
    appliedObjectStyle: getStyle('object', 'mainFrame', 'text')
  })
  foo.pages[1].textFrames.add({
    geometricBounds:    [foo.pages[1].marginPreferences.top, foo.pages[1].marginPreferences.left, 193, 88.6],
    name:               'mainFrame', label: 'mainFrame',
    appliedObjectStyle: getStyle('object', 'mainFrame', 'text')
  })

  myDoc.pages.add({ appliedMaster: foo })
  myDoc.pages[0].remove()
  myDoc.masterSpreads[0].remove()

  _debugInfo.writeWithTimestamp('[docSetup] finish')
}

function chooseDefaultStyle (myDoc, documentStyleType, contentType) {
  var defStyle

  if (documentStyleType == 'objectStyles' && contentType == 'image') {
    defStyle = myDoc[documentStyleType][1]
  }
  else if (documentStyleType == 'objectStyles' && contentType == 'text') {
    defStyle = myDoc[documentStyleType][2]
  }
  else if (documentStyleType == 'paragraphStyles' || documentStyleType == 'table') {
    defStyle = myDoc[documentStyleType][1]
  }
  else if (documentStyleType == 'objectStyles') {
    defStyle = myDoc[documentStyleType][0]
  }
  else {
    defStyle = myDoc[documentStyleType][0]
  }
  if (defStyle.constructor.name != 'ParagraphStyle' && defStyle.constructor.name != 'CharacterStyle' &&
    defStyle.constructor.name != 'ObjectStyle' &&
    defStyle.constructor.name != 'TableStyle' && defStyle.constructor.name != 'CellStyle') {
    _debugInfo.write('TYPE MISMATCH [getStyle] returned ' + defStyle.constructor.name)
  }
  return defStyle
}

function getStyle (styleType, styleName, contentType) {
  var myDoc = app.activeDocument
  var documentStyleType = styleType + 'Styles'
  var myStyle

  if (myDoc[documentStyleType].item(styleName).isValid) {
    myStyle = myDoc[documentStyleType].item(styleName)
  } else {
    myStyle = myDoc[documentStyleType].add({
      name:    styleName,
      basedOn: chooseDefaultStyle(myDoc, documentStyleType, contentType)
    })
  }

  if (myStyle.constructor.name != 'ParagraphStyle' && myStyle.constructor.name != 'CharacterStyle' &&
    myStyle.constructor.name != 'ObjectStyle' &&
    myStyle.constructor.name != 'TableStyle' && myStyle.constructor.name != 'CellStyle') {
    _debugInfo.write('TYPE MISMATCH [getStyle] returned ' + myStyle.constructor.name)
  }

  return myStyle
}

//////////////////////////////////
// debug options /////////////////
var debug = 1
var removeXMLTreeFromDocument = 1

//////////////////////////////////

function padNumber (number) {
  return number < 10 ? '0' + number.toString() : number.toString()
}

function timeStampWithSeconds () {
  var myDate = new Date()
  return padNumber(myDate.getDate()) + '.' +
    padNumber(myDate.getMonth()) + '.' +
    (myDate.getYear() - 100) + ' ' +
    padNumber(myDate.getHours()) + ':' +
    padNumber(myDate.getMinutes()) + ':' +
    padNumber(myDate.getSeconds())
}

function timeStamp () {
  var myDate = new Date()
  return padNumber(myDate.getDate()) + '.' +
    padNumber(myDate.getMonth()) + '.' +
    (myDate.getYear() - 100) + ' ' +
    padNumber(myDate.getHours()) + ':' +
    padNumber(myDate.getMinutes())
}

function FStimeStamp () {
  var myDate = new Date()
  return padNumber(myDate.getDate()) + '-' +
    padNumber(myDate.getMonth()) + '-' +
    (myDate.getYear() - 100) + '_' +
    padNumber(myDate.getHours()) + '-' +
    padNumber(myDate.getMinutes())

}

function debugInfo () {
  var debugFile

  if (debug) {

    debugFile = new File('~/Desktop/debug_' + FStimeStamp() + '.txt')
    debugFile.encoding = 'UTF-8'
    debugFile.lineFeed = 'Windows'
  }
  else {
    debugFile = new File()
  }
  debugFile.open('a')
  debugFile.writeln('=================START===================')
  debugFile.writeln('=============' + timeStampWithSeconds() + '===============')
  debugFile.close()

  var asd = {}

  asd.write = function (debugInfoString) {
    debugFile.open('a')
    debugFile.writeln(debugInfoString)
    debugFile.close()
  }

  asd.writeWithTimestamp = function (debugInfoString) {
    debugFile.open('a')
    debugFile.writeln('[' + timeStampWithSeconds() + ']' + debugInfoString)
    debugFile.close()
  }

  asd.end = function () {
    debugFile.open('a')
    debugFile.writeln('=================END===================')
    debugFile.writeln('=============' + timeStampWithSeconds() + '===============')
    debugFile.close()
  }
  return asd
}

function stats () {

  var statisticsFile = new File('~/Desktop/statistics_' + FStimeStamp() + '.txt')

  statisticsFile.encoding = 'UTF-8'
  statisticsFile.lineFeed = 'Windows'

  statisticsFile.open('a')
  statisticsFile.writeln('=================START===================')
  statisticsFile.writeln('=============' + timeStampWithSeconds() + '===============')
  statisticsFile.close()

  var asd = {}
  asd.write = function (debugInfoString) {
    statisticsFile.open('a')
    statisticsFile.writeln(debugInfoString)
    statisticsFile.close()
  }
  asd.writeWithTimestamp = function (debugInfoString) {
    statisticsFile.open('a')
    statisticsFile.writeln('[' + timeStampWithSeconds() + ']' + debugInfoString)
    statisticsFile.close()
  }

  asd.end = function () {
    statisticsFile.open('a')
    statisticsFile.writeln('=================END===================')
    statisticsFile.writeln('=============' + timeStampWithSeconds() + '===============')
    statisticsFile.close()
  }
  return asd
}

var _debugInfo = debugInfo()

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
function main (xmlFilePath) {
  var _statistics = stats()
  var myDoc = app.documents.add()
  var _userVariables = userSettings()
  var _myApp = myApp(myDoc, _userVariables, _statistics)
  var myXml = _myApp.importNewXML(xmlFilePath)
  var imagePaths = _myApp.setImagePaths(myXml)

  _myApp.setUpMyDoc()
  var xmlRecords = myXml.xmlElements[0]
  var myStory = _myApp.makeStory()
  _myApp.layOutContents(xmlRecords, myStory)
  _myApp.addPagesIfOverset(myStory)
  _myApp.removeMissingImages()
  _myApp.writeDownStatistics()

  if (removeXMLTreeFromDocument) {
    xmlRecords.untag()
  }

  _statistics.end()
  _debugInfo.end()
}

/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

function myApp (myDoc, _userVariables, _statistics) {
  const statistics = {
    missingImages:      {},
    records:            0,
    highlightedRecords: 0,
    logo:               0,
    QRCode:             0,
    productImage:       0
  }

  var settings = {}

  function makeStory () {
    var myFrame = makeMainFrame(myDoc.pages[0])
    return myFrame.parentStory
  }

  function makeMainFrame (page) {
    return page.appliedMaster.pages[page.name % 2].pageItems.item(_userVariables.styleNames.mainFrame).override(page)
  }

  function importNewXML (xmlFilePath) {
    _statistics.write('FILE NAME: ' + xmlFilePath)
    myDoc.xmlImportPreferences.repeatTextElements = true

    myDoc.importXML(xmlFilePath)
    _statistics.write('========= FOUND IN XML:==========')
    _statistics.write('records: ' +
      myDoc.xmlElements[0].xmlElements[0].evaluateXPathExpression('descendant::record[@recordType = \'Standard\']').length)
    _statistics.write('records highlighted: ' +
      myDoc.xmlElements[0].xmlElements[0].evaluateXPathExpression('descendant::record[@recordType = \'Highlight\']').length)

    return myDoc.xmlElements[0]
  }

  function setImagePaths (myXml) {
    var settingsElement = myXml.evaluateXPathExpression('descendant::settings')[0]
    var imagePathPrefix = settingsElement.evaluateXPathExpression('descendant::imagePathPrefix')[0]
    var logoFolder = settingsElement.evaluateXPathExpression('descendant::logoFolder')[0]
    var QRCodeFolder = settingsElement.evaluateXPathExpression('descendant::QRCodeFolder')[0]
    var productImageFolder = settingsElement.evaluateXPathExpression('descendant::productImageFolder')[0]
    var tableDimensions = settingsElement.evaluateXPathExpression('descendant::tableDimentsions')[0]
    var cell0 = tableDimensions.evaluateXPathExpression('descendant::cell0')[0]
    var cell1 = tableDimensions.evaluateXPathExpression('descendant::cell1')[0]
    var height = tableDimensions.evaluateXPathExpression('descendant::height')[0]

    settings.imagePathPrefix = imagePathPrefix ? imagePathPrefix.contents.toString() : null
    settings.logoFolder = logoFolder ? logoFolder.contents.toString() : null
    settings.QRCodeFolder = QRCodeFolder ? QRCodeFolder.contents.toString() : null
    settings.productImageFolder = productImageFolder ? productImageFolder.contents.toString() : null
    settings.tableDimensions = {
      cell0:  cell0 ? parseFloat(cell0.contents) : 16,
      cell1:  cell1 ? parseFloat(cell1.contents) : 60,
      height: height ? parseFloat(height.contents) : 1.6
    }
  }

  function checkImagePaths () {
    if (settings.logoFolder && !File(settings.imagePathPrefix + settings.logoFolder).exists) {
      alert('Cannot find Logo Folder, exit')
      exit()
    }
    if (settings.QRCodeFolder && !File(settings.imagePathPrefix + settings.QRCodeFolder).exists) {
      alert('Cannot find QR Folder, exit')
      exit()
    }
    if (settings.productImageFolder && !File(settings.imagePathPrefix + settings.productImageFolder).exists) {
      alert('Cannot find Product Image Folder, exit')
      exit()
    }
  }

  function getInlineFrameDimensions (userSettingsKey) {
    var dimensions = _userVariables.frameDimensions[userSettingsKey] ? _userVariables.frameDimensions[userSettingsKey]
      : [5, 5]

    if (dimensions.constructor.name !== 'Array') {
      _debugInfo.write('TYPE MISMATCH [getInlineFrameDimensions] returned ' + dimensions.constructor.name)
    }

    return dimensions
  }

  function makeInlineFrame (userSettingsKey, myXMLElement, styleName, contentType, nonPrinting) {
    var frameDimensions = getInlineFrameDimensions(userSettingsKey)
    var myFrame = myXMLElement.placeIntoInlineFrame(frameDimensions)
    myFrame.appliedObjectStyle = getStyle('object', styleName, contentType)
    myFrame.contentType = contentType === 'image' ? ContentType.GRAPHIC_TYPE : ContentType.TEXT_TYPE
    myFrame.nonprinting = nonPrinting

    myFrame.name = myFrame.label = styleName

    if (myFrame.constructor.name !== 'TextFrame') {
      _debugInfo.write('TYPE MISMATCH [getInlineFrameDimensions] returned ' + myFrame.constructor.name)
    }

    return myFrame
  }

  function layOutInlineTexts (record) {
    _debugInfo.writeWithTimestamp('[layOutInlineTexts] first')

    for (var j = 0; j < record.evaluateXPathExpression("descendant::inlineText").length; j++) {
      _debugInfo.writeWithTimestamp('[layOutInlineTexts] j first [' + j + ']')

      var myXMLElement = record.evaluateXPathExpression('descendant::inlineText')[j]

      var styleName = myXMLElement.xmlAttributes.item('appliedStyle').value
      var nonPrinting = (myXMLElement.xmlAttributes.item('nonPrinting').isValid &&
        myXMLElement.xmlAttributes.item('nonPrinting').value === 'true')
      var userSettingsKey = myXMLElement.xmlAttributes.item('userSettingsKey').value
      var myFrame = makeInlineFrame(userSettingsKey, myXMLElement, styleName, 'text', nonPrinting)
      myFrame.contentType = ContentType.TEXT_TYPE
      _debugInfo.writeWithTimestamp('[layOutInlineTexts] j finish [' + j + ']')

    }

    _debugInfo.writeWithTimestamp('[layOutInlineTexts] finish')
  }

  function fitContent (imageFrame) {
    imageFrame.fit(FitOptions.PROPORTIONALLY)
    imageFrame.fit(FitOptions.FRAME_TO_CONTENT)

  }

  function copyNoImageTif (imagePath) {
    var myNoImagePath = (new File($.fileName)).parent.fullName + "/noImage.tif"
    var myNoImage = new File((new File($.fileName)).parent.fullName + "/noImage.tif")
    var copySuccessful = myNoImage.copy(imagePath)
    myNoImage.close()

    return copySuccessful
  }

  function exists (imagePath) {
    var myImg = new File(imagePath)
    return myImg.exists
  }

  function insertImage (imageName, imageType, imageFrame) {
    alert(settings[imageType + 'Folder'])
    var imagePath = settings.imagePathPrefix + settings[imageType + 'Folder'] + imageName
    // alert(imagePath)
    var myImageExists = exists(imagePath)
    // alert(myImageExists)
    // var myImage = new File(imagePath)
    // alert(myImage)

    if (!myImageExists) {
      _debugInfo.write('[insertImage] Image missing: ' + imageName)
      if (!statistics.missingImages[imageType]) {
        statistics.missingImages[imageType] = []
      }

      statistics.missingImages[imageType].push(imageName)
      copyNoImageTif(imagePath)
      // var myImageClosedAfterCopy = myImage.close()
    }
    // if (File(imagePath).exists) {
    alert('beforePlace')
      var myInsertedImage = imageFrame.place(new File(imagePath), false)
    // }
    alert('afterPlace')
    // var myImageClosedAfterPlace = myImage.close()

    return myInsertedImage[0]
  }

  function layOutInlineImages (record) {
    _debugInfo.writeWithTimestamp('[layOutInlineImages] first')

    for (var j = 0; j < record.evaluateXPathExpression("descendant::inlineImage").length; j++) {
      var myXMLElement = record.evaluateXPathExpression('descendant::inlineImage')[j]
      var styleName = myXMLElement.xmlAttributes.item('appliedStyle').value
      var nonPrinting = (myXMLElement.xmlAttributes.item('nonPrinting').isValid &&
        myXMLElement.xmlAttributes.item('nonPrinting').value === 'true')
      var userSettingsKey = myXMLElement.xmlAttributes.item('userSettingsKey').value
      statistics[userSettingsKey]++

      var imageFrame = makeInlineFrame(userSettingsKey, myXMLElement, styleName, 'image', nonPrinting)
      var imageFileName = myXMLElement.xmlAttributes.item('source').value.toString().replace(/file:\/\/\//g, '')

      var myImage = insertImage(imageFileName, userSettingsKey, imageFrame)
      fitContent(imageFrame)

      if (myImage.constructor.name !== 'Image' && myImage.constructor.name !== 'EPS') {
        _debugInfo.write('TYPE MISMATCH [layOutInlineImages] returned ' + myImage.constructor.name)
      }
    }
    _debugInfo.writeWithTimestamp('[layOutInlineImages] first')
  }

  function getTableStyles (myXMLElement) {
    var styles = []
    for (var i = 0; i < myXMLElement.evaluateXPathExpression("child::row").length; i++) {

      var myRow = myXMLElement.evaluateXPathExpression('child::row')[i]
      styles.push([])
      for (var j = myRow.evaluateXPathExpression('child::cell').length - 1; j >= 0; j--) { //backwards because of a bug in indesign
        var myCell = myRow.evaluateXPathExpression('child::cell')[j]

        var myCellStyle = myCell.xmlAttributes.item('appliedStyle').value
        styles[i].push(myCellStyle)

      }
    }
    return styles
  }

  function layOutTables (record) {
    _debugInfo.writeWithTimestamp('[layoutTables] first')
    for (var j = 0; j < record.evaluateXPathExpression("descendant::table").length; j++) {
      var myXMLElement = record.evaluateXPathExpression('descendant::table')[j]
      var styleName = myXMLElement.xmlAttributes.item('appliedStyle').value
      var tableStyles = getTableStyles(myXMLElement)

      var myTable = myXMLElement.convertElementToTable('row', 'cell')

      for (var k = 0; k < myTable.rows.length; k++) {

        for (var l = 0; l < myTable.rows[k].cells.length; l++) {

          myTable.rows[k].cells[l].appliedCellStyle = getStyle('cell', tableStyles[k][l])
        }
      }
      myTable.appliedTableStyle = getStyle('table', styleName)

      myTable.cells[0].width = settings.tableDimensions.cell0//19.2;

      myTable.cells[1].width = settings.tableDimensions.cell1// 54.976;

      if (myTable.cells[1].paragraphs[0].lines.length === 1) {
        myTable.height = settings.tableDimensions.height * 3
      } else if (myTable.cells[1].paragraphs[0].lines.length === 2) {
        myTable.height = settings.tableDimensions.height * 4
      } else if (myTable.cells[1].paragraphs[0].lines.length === 3) {
        myTable.height = settings.tableDimensions.height * 5
      }
    }
    _debugInfo.writeWithTimestamp('[layoutTables] finish')

  }

  function isHighlighted (myXMLRecord) {
    return myXMLRecord.xmlAttributes[0].value === 'Highlight' ? '_highlight' : ''
  }

  function applyStyles (record) {
    _debugInfo.writeWithTimestamp('[applyStyles] first')

    var highlight = isHighlighted(record)

    for (var j = 0; j < record.evaluateXPathExpression("descendant::*").length; j++) {
      _debugInfo.writeWithTimestamp('[applyStyles] j first [' + j + ']')

      var xmlElement = record.evaluateXPathExpression('descendant::*')[j]

      if (xmlElement.xmlContent.reflect.find('appliedParagraphStyle')) {

        var styleName = xmlElement.xmlAttributes.item('appliedStyle').value

        xmlElement.xmlContent.paragraphs.everyItem().applyParagraphStyle(getStyle('paragraph', styleName + highlight))
      }
      _debugInfo.writeWithTimestamp('[applyStyles] j finish [' + j + ']')

    }
    _debugInfo.writeWithTimestamp('[applyStyles] finish')

  }

  function layOutContents (xmlRecords, myStory) {
    _debugInfo.writeWithTimestamp('[layOutContents] first')

    myStory.placeXML(xmlRecords)
    _debugInfo.writeWithTimestamp('[layOutContents] xmlRecords.xmlElements.length [' + xmlRecords.xmlElements.length +
      '] <++++++++++++++++++++++++++++++++++++++++++')

    // var pbar = new ProgressBar('Laying out XML', 'Laying out XML',
    //     'To cancel press the Esc key');

    for (var i = 0; i < xmlRecords.xmlElements.length; i++) {

      _debugInfo.writeWithTimestamp('[layOutContents] xmlRecords.xmlElements[' + i + '] first <===')
      _debugInfo.writeWithTimestamp('[layOutContents] xmlRecords.xmlElements[' + i + '].contents [' +
        xmlRecords.xmlElements[i].contents + ']')

      var xmlRecord = xmlRecords.xmlElements[i]

      layOutTables(xmlRecord)
      layOutInlineTexts(xmlRecord)
      layOutInlineImages(xmlRecord)
      applyStyles(xmlRecord)

      _debugInfo.writeWithTimestamp('[layOutContents] xmlRecord:' + xmlRecord)
      _debugInfo.writeWithTimestamp('[layOutContents] xmlRecord.xmlAttributes:' + xmlRecord.xmlAttributes)
      _debugInfo.writeWithTimestamp('[layOutContents] xmlRecord.xmlAttributes.item("recordType"):' +
        xmlRecord.xmlAttributes.item('recordType'))
      _debugInfo.writeWithTimestamp('[layOutContents] xmlRecord.xmlAttributes.item("recordType").value:' +
        xmlRecord.xmlAttributes.item('recordType').value)

      if (xmlRecord.xmlAttributes.item('recordType').value === 'Standard') {
        statistics.records++
      }
      if (xmlRecord.xmlAttributes.item('recordType').value === 'Highlight') {
        statistics.highlightedRecords++
      }

      // pbar.sectionStepFractionCompleted((i+1)/xmlRecords.xmlElements.length);

      _debugInfo.writeWithTimestamp('[layOutContents] xmlRecords.xmlElements[' + i + '] finish')

    }
    // pbar.close();

    _debugInfo.writeWithTimestamp('[layOutContents] finish')

  }

  function addPage (myStory) {
    var myNewPage = myDoc.pages.add({ appliedMaster: myDoc.masterSpreads[0] })
    var myNewTextFrame = makeMainFrame(myNewPage)
    myStory.textContainers[myStory.textContainers.length - 1].nextTextFrame = myNewTextFrame
    return myNewTextFrame
  }

  function addPagesIfOverset (myStory) {
    while (myStory.textContainers[myStory.textContainers.length - 1].overflows === true) {
      if (myDoc.pages.length >= 1000 && !confirm('there are already ' + myDoc.pages.length + 'pages', true)) {
        alert('there is still some text oveset.\ncannot continue, exit')
        exit()
      }
      addPage(myStory)
    }
  }

  function removeMissingImages () {
    _statistics.write('===================================\n========== MISSING IMAGES  ========')

    for (var imageType in statistics.missingImages) {

      if (statistics.missingImages.hasOwnProperty(imageType)) {

        _statistics.write('==IN:==\n' + settings.imagePathPrefix + settings[imageType + 'Folder'])
        _statistics.write(statistics.missingImages[imageType].join('\n'))

        for (var j = 0; j < statistics.missingImages[imageType].length; j++) {
          var missingImage = new File(settings.imagePathPrefix + settings[imageType + 'Folder'] +
            statistics.missingImages[imageType][j])
          missingImage.remove()
          missingImage.close()
        }
      }
    }
  }

  function setupMyDoc () {
    docSetup(myDoc, _userVariables, getStyle)
  }

  function writeDownStatistics () {
    _statistics.write('===================================\n=========== STATISTICS  ===========')
    _statistics.write('RECORDS: ' + statistics.records)
    _statistics.write('RECORDS HIGHLIGHTED: ' + statistics.highlightedRecords)
    _statistics.write('LOGOS: ' + statistics.logo.toString())
    _statistics.write('QR CODES: ' + statistics.QRCode)
    _statistics.write('PRODUCT IMAGES: ' + statistics.productImage)

  }

  return {
    getStyle:            getStyle,
    setImagePaths:       setImagePaths,
    checkImagePaths:     checkImagePaths,
    makeStory:           makeStory,
    importNewXML:        importNewXML,
    setUpMyDoc:          setupMyDoc,
    layOutContents:      layOutContents,
    addPagesIfOverset:   addPagesIfOverset,
    removeMissingImages: removeMissingImages,
    writeDownStatistics: writeDownStatistics

  }

}

// main(xmlFile);
