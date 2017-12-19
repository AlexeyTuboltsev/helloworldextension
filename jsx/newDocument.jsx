function userSettings() {
  return {
    xslFile : "", //leave blank for default or for prompt
    defaultFont : "Myriad Pro",
    frameDimensions : {
      indexSource : [8, 4],
      standnummer : [20, 10],
      logo : [50, 10],
      QRCode : [19, 19],
      productImage : [60, 35],
      subfair : [11,11]
    },

    bleed : 3,
    indexLength : 2,

    styleNames : {
      standnummer : "standnummer",
      indexSource : "indexSource",
      mainFrame : "mainFrame",
      logo : "logo",
      productImage : "productImage",
      QRCode : "QRCode"
    },
  }
}

function docSetup(myDoc,_userVariables,getStyle){
  _debugInfo.writeWithTimestamp("[docSetup] first");


  myDoc.zeroPoint = [0, 0];

  let foo = myDoc.viewPreferences;
  foo.horizontalMeasurementUnits = MeasurementUnits.MILLIMETERS;
  foo.verticalMeasurementUnits = MeasurementUnits.MILLIMETERS;
  foo.printDialogMeasurementUnits = MeasurementUnits.MILLIMETERS;
  foo.cursorKeyIncrement = 0.01;
  foo.rulerOrigin = RulerOrigin.PAGE_ORIGIN;


  //PAGE DIMENSIONS
  foo = myDoc.documentPreferences;
  foo.pageHeight = 210;
  foo.pageWidth = 120;
  foo.facingPages = true;
  //createPrimaryTextFrame = true;
  foo.pageBinding = PageBindingOptions.LEFT_TO_RIGHT;
  foo.documentBleedTopOffset = _userVariables.bleed;
  foo.documentBleedUniformSize = true;

  //TEXT DEFAULTS //doesn't seem to work, use default paragraph style below
  foo = myDoc.textDefaults;
  foo.characterDirection = CharacterDirectionOptions.LEFT_TO_RIGHT_DIRECTION;
  foo.hyphenation = false;
  foo.justification = Justification.LEFT_ALIGN;
  foo.noBreak = false;
  foo.paragraphDirection = ParagraphDirectionOptions.LEFT_TO_RIGHT_DIRECTION;
  foo.alignToBaseline = false;
  foo.fillColor = myDoc.swatches.item("Black");


  foo = myDoc.textPreferences;
  foo.smartTextReflow = false;

  foo = myDoc.preflightOptions;
  foo.preflightOff = true;


  ///////////////////////////
  // SOME DEFAULT STYLES ////
  //////////////////////////

  // default paragraph style

  foo = myDoc.paragraphStyles[1];

  foo.appliedFont = _userVariables.defaultFont;
  foo.pointSize = 10;
  foo.leading = 12;
  foo.characterDirection = CharacterDirectionOptions.LEFT_TO_RIGHT_DIRECTION;
  foo.paragraphDirection = ParagraphDirectionOptions.LEFT_TO_RIGHT_DIRECTION;
  foo.justification = Justification.LEFT_ALIGN;
  foo.firstLineIndent = 0;
  foo.rightIndent = 0;
  foo.leftIndent = 0;
  foo.spaceBefore = 0;
  foo.spaceAfter = 0;
  foo.balanceRaggedLines = false;
  foo.alignToBaseline = false;
  //foo.appliedLanguage = '';
  foo.hyphenation = false;
  foo.keepLinesTogether = false;
  foo.keepWithPrevious = false;
  foo.ruleAbove = false;
  foo.ruleBelow = false;
  foo.underline = false;

  // default image frame style
  foo = myDoc.objectStyles[1];
  foo.enableFill = true;
  foo.fillColor = myDoc.swatches[0];
  foo.enableStroke = true;
  foo.strokeColor = myDoc.swatches[0];


  // default text frame style
  foo = myDoc.objectStyles[2];
  foo.enableTextFrameAutoSizingOptions = false;
  foo.enableTextFrameBaselineOptions = true;
  foo.textFramePreferences.firstBaselineOffset = FirstBaseline.CAP_HEIGHT;
  foo.enableFill = true;
  foo.fillColor = myDoc.swatches[0];
  foo.enableStroke = true;
  foo.strokeColor = myDoc.swatches[0];
  foo.enableParagraphStyle = true;
  foo.appliedParagraphStyle = myDoc.paragraphStyles[1];
  foo.enableStoryOptions = true;
  foo.storyPreferences.opticalMarginAlignment = true;
  foo.storyPreferences.opticalMarginSize = myDoc.paragraphStyles[1].pointSize;
  foo.storyPreferences.storyDirection = StoryDirectionOptions.LEFT_TO_RIGHT_DIRECTION;


  //character styles
  foo = myDoc.characterStyles;
  foo.add({
    name : 'nb',
    noBreak : true
  });

  foo.add
  ({
    name : 'invisible',
    fillColor : myDoc.swatches[0]
  });

  foo.add
  ({
    name : 'index'
  });

  ////////////////////////
  //paragraph styles
  foo = myDoc.paragraphStyles;
  foo.add({
    name : "table_index",
    leading : 0,
    keepWithPrevious : true
  });



  ////////////////////////
  //object styles
  foo = myDoc.objectStyles;

  //mainFrame
  foo.add({
    name: _userVariables.styleNames.mainFrame,
    basedOn : myDoc.objectStyles[2],
    enableTextFrameAutoSizingOptions: false,
    enableTextFrameBaselineOptions: true,
    textFramePreferences: {
      firstBaselineOffset: FirstBaseline.CAP_HEIGHT
    },
    enableFill: true,
    fillColor: myDoc.swatches[0],
    enableStroke: true,
    strokeColor: myDoc.swatches[0]
  });

  //standnummer
  foo.add({
    name: _userVariables.styleNames.standnummer,
    basedOn : myDoc.objectStyles[2],
    enableParagraphStyle: true,
    appliedParagraphStyle: getStyle('paragraph',_userVariables.styleNames.standnummer),
    enableAnchoredObjectOptions: true,
    anchoredObjectSettings: {
      anchoredPosition: AnchorPosition.ANCHORED,
      anchorPoint: AnchorPoint.TOP_RIGHT_ANCHOR,
      horizontalAlignment: HorizontalAlignment.RIGHT_ALIGN,
      horizontalReferencePoint: AnchoredRelativeTo.PAGE_MARGINS,
      verticalReferencePoint: VerticallyRelativeTo.CAPHEIGHT,
      anchorXoffset: 0,
      anchorYoffset: 0
    },
    enableTextFrameAutoSizingOptions: true,
    textFramePreferences: {
      autoSizingReferencePoint: AutoSizingReferenceEnum.TOP_RIGHT_POINT,
      autoSizingType: AutoSizingTypeEnum.HEIGHT_ONLY,
      useNoLineBreaksForAutoSizing: true
    },
    enableFill: true,
    fillColor: myDoc.swatches[0],
    enableStroke: true,
    strokeColor: myDoc.swatches[0]
  });

  //index
  foo.add
  ({
    name : _userVariables.styleNames.indexSource,
    basedOn : myDoc.objectStyles[2],
    enableParagraphStyle: true,
    appliedParagraphStyle: getStyle('paragraph',_userVariables.styleNames.indexSource),
    enableAnchoredObjectOptions: true,
    anchoredObjectSettings: {
      anchoredPosition: AnchorPosition.ANCHORED,
      anchorPoint: AnchorPoint.BOTTOM_RIGHT_ANCHOR,
      horizontalAlignment: HorizontalAlignment.LEFT_ALIGN,
      horizontalReferencePoint: AnchoredRelativeTo.TEXT_FRAME,
      verticalReferencePoint: VerticallyRelativeTo.CAPHEIGHT,
      anchorXoffset: 0,
      anchorYoffset: 0
    },
    enableTextFrameAutoSizingOptions: true,
    textFramePreferences: {
      autoSizingReferencePoint: AutoSizingReferenceEnum.TOP_RIGHT_POINT,
      autoSizingType: AutoSizingTypeEnum.HEIGHT_ONLY,
      useNoLineBreaksForAutoSizing: true
    },
    enableFill: true,
    fillColor: myDoc.swatches[0],
    enableStroke: true,
    strokeColor: myDoc.swatches[0]
  });

  //logo
  foo.add
  ({
    name : _userVariables.styleNames.logo,
    basedOn : myDoc.objectStyles[1],
    enableParagraphStyle: false,
    enableAnchoredObjectOptions: true,
    anchoredObjectSettings: {
      anchoredPosition: AnchorPosition.ANCHORED,
      anchorPoint: AnchorPoint.TOP_LEFT_ANCHOR,
      horizontalAlignment: HorizontalAlignment.LEFT_ALIGN,
      horizontalReferencePoint: AnchoredRelativeTo.TEXT_FRAME,
      verticalReferencePoint: VerticallyRelativeTo.CAPHEIGHT,
      anchorXoffset: 0,
      anchorYoffset: 0
    },
    enableTextFrameAutoSizingOptions: false,
    enableFill: true,
    fillColor: myDoc.swatches[0],
    enableStroke: true,
    strokeColor: myDoc.swatches[0],
    enableTextWrapAndOthers : true,
    textWrapPreferences : {
      textWrapMode : TextWrapModes.JUMP_OBJECT_TEXT_WRAP,
      textWrapOffset : [0,0,0,0]
    }
  });

  //productImage
  foo.add
  ({
    name : _userVariables.styleNames.productImage,
    basedOn : myDoc.objectStyles[1],
    enableParagraphStyle: false,
    enableAnchoredObjectOptions: true,
    anchoredObjectSettings: {
      anchoredPosition: AnchorPosition.ANCHORED,
      anchorPoint: AnchorPoint.TOP_LEFT_ANCHOR,
      horizontalAlignment: HorizontalAlignment.LEFT_ALIGN,
      horizontalReferencePoint: AnchoredRelativeTo.TEXT_FRAME,
      verticalReferencePoint: VerticallyRelativeTo.CAPHEIGHT,
      anchorXoffset: 0,
      anchorYoffset: 0
    },
    enableTextFrameAutoSizingOptions: false,
    enableFill: true,
    fillColor: myDoc.swatches[0],
    enableStroke: true,
    strokeColor: myDoc.swatches[0],
    enableTextWrapAndOthers : true,
    textWrapPreferences : {
      textWrapMode : TextWrapModes.JUMP_OBJECT_TEXT_WRAP,
      textWrapOffset : [0,0,0,0]
    }
  });

  //QRCode
  foo.add
  ({
    name : _userVariables.styleNames.QRCode,
    basedOn : myDoc.objectStyles[1],
    enableParagraphStyle: false,
    enableAnchoredObjectOptions: true,
    anchoredObjectSettings: {
      anchoredPosition: AnchorPosition.ANCHORED,
      anchorPoint: AnchorPoint.TOP_RIGHT_ANCHOR,
      horizontalAlignment: HorizontalAlignment.RIGHT_ALIGN,
      horizontalReferencePoint: AnchoredRelativeTo.TEXT_FRAME,
      verticalReferencePoint: VerticallyRelativeTo.CAPHEIGHT,
      anchorXoffset: 0,
      anchorYoffset: 0
    },
    enableTextFrameAutoSizingOptions: false,
    enableFill: true,
    fillColor: myDoc.swatches[0],
    enableStroke: true,
    strokeColor: myDoc.swatches[0],
    enableTextWrapAndOthers : true,
    textWrapPreferences : {
      textWrapMode : TextWrapModes.BOUNDING_BOX_TEXT_WRAP,
      textWrapOffset : [0,0,0,0]
    }
  });

  //////////////////////////////////////////////////////////
  ////// MASTERS, MARGINS AND TEXTFRAMES ///////////////////
  foo = myDoc.masterSpreads.add(2);

  foo.pages[0].marginPreferences.top = 26.5;
  foo.pages[0].marginPreferences.left = 12;
  foo.pages[0].marginPreferences.bottom = 17;
  foo.pages[0].marginPreferences.right = 12;
  foo.pages[1].marginPreferences.top = 26.5;
  foo.pages[1].marginPreferences.left = 12;
  foo.pages[1].marginPreferences.bottom = 17;
  foo.pages[1].marginPreferences.right = 12;

  foo.pages[0].textFrames.add({geometricBounds : [foo.pages[0].marginPreferences.top, foo.pages[0].marginPreferences.left, 193, 88.6],
    name : "mainFrame", label : "mainFrame",
    appliedObjectStyle : getStyle('object','mainFrame','text')});
  foo.pages[1].textFrames.add({geometricBounds : [foo.pages[1].marginPreferences.top, foo.pages[1].marginPreferences.left, 193, 88.6],
    name : "mainFrame", label : "mainFrame",
    appliedObjectStyle : getStyle('object','mainFrame','text')});

  myDoc.pages.add({appliedMaster : foo});
  myDoc.pages[0].remove();
  myDoc.masterSpreads[0].remove();

  _debugInfo.writeWithTimestamp("[docSetup] finish");
}
