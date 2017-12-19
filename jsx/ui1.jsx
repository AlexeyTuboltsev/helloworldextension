#include "../debrouwere-Extendables-732bfa8/extendables.jsx"
#include "../labelsToNames.jsx"


function init() {
    var that = this;

    labelsToNames();



    var facingPages = app.activeDocument.documentPreferences.facingPages;
    //var savedLeft = [10,10, 20, 20];
    var x0_left = 10;
    var y0_left = 10;
    var x1_left = 20;
    var y1_left = 20;
    //var savedRight = [10, 10, 20, 20];
    var x0_right = 10;
    var y0_right = 10;
    var x1_right = 20;
    var y1_right = 20;

    var masters = [];
    for (var i = 0; i < app.activeDocument.masterSpreads.length; i ++){
        masters.push(app.activeDocument.masterSpreads[i].name);
    }

    var defaultIndexLength = 2;
    var result;

    var ui = require("ui");

    var mixins = {
        'centered': {
            'justify': 'center'
        },
        'left': {
            'justify': 'left'
        }
    };



    var dialog = new ui.Dialog('settings').with(mixins);

    ///////// left /////////////

    dialog.row('indexFrameRow')
        .row('indexFrameTitleRow')
        .text('indexFrameTitleText', 'please set dimensions of index frames (only for new frames)');

    dialog.row('indexFrameDimensionsRow');

    dialog.indexFrameDimensionsRow
        .column('indexFrameDimensionsLeftColumn');

    dialog.indexFrameDimensionsRow
        .column('indexFrameDimensionsRightColumn');

    dialog.indexFrameDimensionsRow.indexFrameDimensionsLeftColumn
        .row('indexFrameDimensionsLeftFrames');

    dialog.indexFrameDimensionsRow.indexFrameDimensionsLeftColumn
        .row('indexFrameDimensionsLeftButton');

    dialog.indexFrameDimensionsRow.indexFrameDimensionsLeftColumn.indexFrameDimensionsLeftFrames
        .row('indexFrameDimensionsLeftFramesRow');

    dialog.indexFrameDimensionsRow.indexFrameDimensionsLeftColumn.indexFrameDimensionsLeftFrames.indexFrameDimensionsLeftFramesRow
        .column('indexFrameDimensionsLeftFramesColumnLabel')
        .text('indexFrameDimensionsTextLeft','left frame')
        .column('indexFrameDimensionsTextLabels0Left');

    dialog.indexFrameDimensionsRow.indexFrameDimensionsLeftColumn.indexFrameDimensionsLeftFrames.indexFrameDimensionsLeftFramesRow
        .column('indexFrameDimensionsTextLabels0Left');


    dialog.indexFrameDimensionsRow.indexFrameDimensionsLeftColumn.indexFrameDimensionsLeftFrames.indexFrameDimensionsLeftFramesRow.indexFrameDimensionsTextLabels0Left
        .text('indexFrameDimensionsTextLabelsLeftY0','y 0');
    dialog.indexFrameDimensionsRow.indexFrameDimensionsLeftColumn.indexFrameDimensionsLeftFrames.indexFrameDimensionsLeftFramesRow.indexFrameDimensionsTextLabels0Left
        .text('indexFrameDimensionsTextLabelsLeftX0','x 0');

    dialog.indexFrameDimensionsRow.indexFrameDimensionsLeftColumn.indexFrameDimensionsLeftFrames.indexFrameDimensionsLeftFramesRow
        .column('indexFrameDimensionsTextInput0Left');



    dialog.indexFrameDimensionsRow.indexFrameDimensionsLeftColumn.indexFrameDimensionsLeftFrames.indexFrameDimensionsLeftFramesRow
        .column('indexFrameDimensionsTextLabels1Left');

    dialog.indexFrameDimensionsRow.indexFrameDimensionsLeftColumn.indexFrameDimensionsLeftFrames.indexFrameDimensionsLeftFramesRow.indexFrameDimensionsTextLabels1Left
        .text('indexFrameDimensionsTextLabelsLeftY1','y 1');
    dialog.indexFrameDimensionsRow.indexFrameDimensionsLeftColumn.indexFrameDimensionsLeftFrames.indexFrameDimensionsLeftFramesRow.indexFrameDimensionsTextLabels1Left
        .text('indexFrameDimensionsTextLabelsLeftX1','x 1');

    dialog.indexFrameDimensionsRow.indexFrameDimensionsLeftColumn.indexFrameDimensionsLeftFrames.indexFrameDimensionsLeftFramesRow
        .column('indexFrameDimensionsTextInput1Left');

    dialog.indexFrameDimensionsRow.indexFrameDimensionsLeftColumn.indexFrameDimensionsLeftButton
        .dropdown('leftFrameDropdown',masters);

    dialog.indexFrameDimensionsRow.indexFrameDimensionsLeftColumn.indexFrameDimensionsLeftButton
        .button('leftFrameButton','getFromMaster');



//////////
    /////right
    if(facingPages) {

        dialog.indexFrameDimensionsRow.indexFrameDimensionsRightColumn
            .row('indexFrameDimensionsRightFrames');

        dialog.indexFrameDimensionsRow.indexFrameDimensionsRightColumn
            .row('indexFrameDimensionsRightButton');

        dialog.indexFrameDimensionsRow.indexFrameDimensionsRightColumn.indexFrameDimensionsRightFrames
            .row('indexFrameDimensionsRightFramesRow');

        dialog.indexFrameDimensionsRow.indexFrameDimensionsRightColumn.indexFrameDimensionsRightFrames.indexFrameDimensionsRightFramesRow
            .column('indexFrameDimensionsRightFramesColumnLabel')
            .text('indexFrameDimensionsTextRight', 'right frame');

        dialog.indexFrameDimensionsRow.indexFrameDimensionsRightColumn.indexFrameDimensionsRightFrames.indexFrameDimensionsRightFramesRow
            .column('indexFrameDimensionsTextLabels0Right');

        dialog.indexFrameDimensionsRow.indexFrameDimensionsRightColumn.indexFrameDimensionsRightFrames.indexFrameDimensionsRightFramesRow.indexFrameDimensionsTextLabels0Right
            .text('indexFrameDimensionsTextLabelsRightY0', 'y 0');
        dialog.indexFrameDimensionsRow.indexFrameDimensionsRightColumn.indexFrameDimensionsRightFrames.indexFrameDimensionsRightFramesRow.indexFrameDimensionsTextLabels0Right
            .text('indexFrameDimensionsTextLabelsRightX0', 'x 0');

        dialog.indexFrameDimensionsRow.indexFrameDimensionsRightColumn.indexFrameDimensionsRightFrames.indexFrameDimensionsRightFramesRow
            .column('indexFrameDimensionsTextInput0Right');

        dialog.indexFrameDimensionsRow.indexFrameDimensionsRightColumn.indexFrameDimensionsRightFrames.indexFrameDimensionsRightFramesRow
            .column('indexFrameDimensionsTextLabels1Right');

        dialog.indexFrameDimensionsRow.indexFrameDimensionsRightColumn.indexFrameDimensionsRightFrames.indexFrameDimensionsRightFramesRow.indexFrameDimensionsTextLabels1Right
            .text('indexFrameDimensionsTextLabelsRightY1', 'y 1');
        dialog.indexFrameDimensionsRow.indexFrameDimensionsRightColumn.indexFrameDimensionsRightFrames.indexFrameDimensionsRightFramesRow.indexFrameDimensionsTextLabels1Right
            .text('indexFrameDimensionsTextLabelsRightX1', 'x 1');

        dialog.indexFrameDimensionsRow.indexFrameDimensionsRightColumn.indexFrameDimensionsRightFrames.indexFrameDimensionsRightFramesRow
            .column('indexFrameDimensionsTextInput1Right');

        dialog.indexFrameDimensionsRow.indexFrameDimensionsRightColumn.indexFrameDimensionsRightButton
            .dropdown('rightFrameDropdown', masters);

        dialog.indexFrameDimensionsRow.indexFrameDimensionsRightColumn.indexFrameDimensionsRightButton
            .button('rightFrameButton', 'getFromMaster');
    }

    //////// index length//////////

    dialog.row('indexLengthRow')
        .checkbox('myCheckbox', '')
        .text('indexLengthText1', 'make index').using('left')
        .input('indexLengthInput', defaultIndexLength).using('left')
        .text('indexLengthText2', 'letters long').using('left');

    dialog.indexLengthRow.indexLengthInput.characters = 2;

    dialog.row('confirm_row')
        .button('confirm', 'aha').using('centered');

    dialog.confirm_row.confirm.active = true;

    dialog.indexLengthRow.myCheckbox.value = true;
    dialog.indexLengthRow.indexLengthText1.enabled = true;
    dialog.indexLengthRow.indexLengthInput.enabled = true;
    dialog.indexLengthRow.indexLengthText2.enabled = true;

    dialog.indexLengthRow.myCheckbox.on('click').do(function () {
        dialog.indexLengthRow.indexLengthText1.enabled = !dialog.indexLengthRow.indexLengthText1.enabled;
        dialog.indexLengthRow.indexLengthInput.enabled = !dialog.indexLengthRow.indexLengthInput.enabled;
        dialog.indexLengthRow.indexLengthText2.enabled = !dialog.indexLengthRow.indexLengthText2.enabled;
    });



    dialog.indexFrameDimensionsRow.indexFrameDimensionsLeftColumn.indexFrameDimensionsLeftFrames.indexFrameDimensionsLeftFramesRow.indexFrameDimensionsTextInput0Left
        .input('y0_left',y0_left);
    dialog.indexFrameDimensionsRow.indexFrameDimensionsLeftColumn.indexFrameDimensionsLeftFrames.indexFrameDimensionsLeftFramesRow.indexFrameDimensionsTextInput0Left
        .input('x0_left',x0_left);
    dialog.indexFrameDimensionsRow.indexFrameDimensionsLeftColumn.indexFrameDimensionsLeftFrames.indexFrameDimensionsLeftFramesRow.indexFrameDimensionsTextInput1Left
        .input('y1_left',y1_left);
    dialog.indexFrameDimensionsRow.indexFrameDimensionsLeftColumn.indexFrameDimensionsLeftFrames.indexFrameDimensionsLeftFramesRow.indexFrameDimensionsTextInput1Left
        .input('x1_left',x1_left);


    dialog.indexFrameDimensionsRow.indexFrameDimensionsLeftColumn.indexFrameDimensionsLeftFrames.indexFrameDimensionsLeftFramesRow.indexFrameDimensionsTextInput0Left.y0_left.characters = 5;
    dialog.indexFrameDimensionsRow.indexFrameDimensionsLeftColumn.indexFrameDimensionsLeftFrames.indexFrameDimensionsLeftFramesRow.indexFrameDimensionsTextInput0Left.x0_left.characters = 5;
    dialog.indexFrameDimensionsRow.indexFrameDimensionsLeftColumn.indexFrameDimensionsLeftFrames.indexFrameDimensionsLeftFramesRow.indexFrameDimensionsTextInput1Left.y1_left.characters = 5;
    dialog.indexFrameDimensionsRow.indexFrameDimensionsLeftColumn.indexFrameDimensionsLeftFrames.indexFrameDimensionsLeftFramesRow.indexFrameDimensionsTextInput1Left.x1_left.characters = 5;

    var leftInput = [
        dialog.indexFrameDimensionsRow.indexFrameDimensionsLeftColumn.indexFrameDimensionsLeftFrames.indexFrameDimensionsLeftFramesRow.indexFrameDimensionsTextInput0Left.y0_left,
        dialog.indexFrameDimensionsRow.indexFrameDimensionsLeftColumn.indexFrameDimensionsLeftFrames.indexFrameDimensionsLeftFramesRow.indexFrameDimensionsTextInput0Left.x0_left,
        dialog.indexFrameDimensionsRow.indexFrameDimensionsLeftColumn.indexFrameDimensionsLeftFrames.indexFrameDimensionsLeftFramesRow.indexFrameDimensionsTextInput1Left.y1_left,
        dialog.indexFrameDimensionsRow.indexFrameDimensionsLeftColumn.indexFrameDimensionsLeftFrames.indexFrameDimensionsLeftFramesRow.indexFrameDimensionsTextInput1Left.x1_left
    ];


    var leftDropdown = dialog.indexFrameDimensionsRow.indexFrameDimensionsLeftColumn.indexFrameDimensionsLeftButton.leftFrameDropdown;

    dialog.indexFrameDimensionsRow.indexFrameDimensionsLeftColumn.indexFrameDimensionsLeftButton.leftFrameButton.on('click').do(function (){

        var side = 0;

        if(leftDropdown.selection && app.activeDocument.masterSpreads.item(leftDropdown.selection.toString()).isValid) {
            if (app.activeDocument.masterSpreads.item(leftDropdown.selection.toString()).pageItems.itemByName('index').isValid) {
                for (var i = 0; i < leftInput.length; i++) {
                    leftInput[i].text = app.activeDocument.masterSpreads.item(leftDropdown.selection.toString()).pages[side].pageItems.item('index').geometricBounds[i].toString();
                }
            }
            else {
                alert("there is no index frame on this master page");
            }
        }
    });



    if (facingPages) {
        dialog.indexFrameDimensionsRow.indexFrameDimensionsRightColumn.indexFrameDimensionsRightFrames.indexFrameDimensionsRightFramesRow.indexFrameDimensionsTextInput0Right
            .input('y0_right', y0_right);
        dialog.indexFrameDimensionsRow.indexFrameDimensionsRightColumn.indexFrameDimensionsRightFrames.indexFrameDimensionsRightFramesRow.indexFrameDimensionsTextInput0Right
            .input('x0_right', x0_right);
        dialog.indexFrameDimensionsRow.indexFrameDimensionsRightColumn.indexFrameDimensionsRightFrames.indexFrameDimensionsRightFramesRow.indexFrameDimensionsTextInput1Right
            .input('y1_right', y1_right);
        dialog.indexFrameDimensionsRow.indexFrameDimensionsRightColumn.indexFrameDimensionsRightFrames.indexFrameDimensionsRightFramesRow.indexFrameDimensionsTextInput1Right
            .input('x1_right', x1_right);

        dialog.indexFrameDimensionsRow.indexFrameDimensionsRightColumn.indexFrameDimensionsRightFrames.indexFrameDimensionsRightFramesRow.indexFrameDimensionsTextInput0Right.y0_right.characters = 5;
        dialog.indexFrameDimensionsRow.indexFrameDimensionsRightColumn.indexFrameDimensionsRightFrames.indexFrameDimensionsRightFramesRow.indexFrameDimensionsTextInput0Right.x0_right.characters = 5;
        dialog.indexFrameDimensionsRow.indexFrameDimensionsRightColumn.indexFrameDimensionsRightFrames.indexFrameDimensionsRightFramesRow.indexFrameDimensionsTextInput1Right.y1_right.characters = 5;
        dialog.indexFrameDimensionsRow.indexFrameDimensionsRightColumn.indexFrameDimensionsRightFrames.indexFrameDimensionsRightFramesRow.indexFrameDimensionsTextInput1Right.x1_right.characters = 5;


        var rightInput = [
            dialog.indexFrameDimensionsRow.indexFrameDimensionsRightColumn.indexFrameDimensionsRightFrames.indexFrameDimensionsRightFramesRow.indexFrameDimensionsTextInput0Right.y0_right,
            dialog.indexFrameDimensionsRow.indexFrameDimensionsRightColumn.indexFrameDimensionsRightFrames.indexFrameDimensionsRightFramesRow.indexFrameDimensionsTextInput0Right.x0_right,
            dialog.indexFrameDimensionsRow.indexFrameDimensionsRightColumn.indexFrameDimensionsRightFrames.indexFrameDimensionsRightFramesRow.indexFrameDimensionsTextInput1Right.y1_right,
            dialog.indexFrameDimensionsRow.indexFrameDimensionsRightColumn.indexFrameDimensionsRightFrames.indexFrameDimensionsRightFramesRow.indexFrameDimensionsTextInput1Right.x1_right
        ];

        var rightDropdown = dialog.indexFrameDimensionsRow.indexFrameDimensionsRightColumn.indexFrameDimensionsRightButton.rightFrameDropdown;

        dialog.indexFrameDimensionsRow.indexFrameDimensionsRightColumn.indexFrameDimensionsRightButton.rightFrameButton.on('click').do(function () {

            if(rightDropdown.selection && app.activeDocument.masterSpreads.item(rightDropdown.selection.toString()).isValid) {
                var side = app.activeDocument.masterSpreads.item(rightDropdown.selection.toString()).pages.length >= 2 ? 1 : 0;

                if (app.activeDocument.masterSpreads.item(rightDropdown.selection.toString()).pages[side].pageItems.item('index').isValid) {
                    for (var i = 0; i < rightInput.length; i++) {
                        rightInput[i].text = app.activeDocument.masterSpreads.item(rightDropdown.selection.toString()).pages[side].pageItems.item('index').geometricBounds[i].toString();
                    }
                }
                else {
                    alert("there is no index frame on this master page");
                }
            }
        });
    }


    dialog.confirm_row.confirm.on('click').do(function () {

        result = dialog.indexLengthRow.myCheckbox.value ? dialog.indexLengthRow.indexLengthInput.text : 0;

        that.indexLength = parseInt(result);

        for (var j = 0; j < 4; j ++){

            that.framePosition[0].push(leftInput[j].text);
            if(rightInput) {

                that.framePosition[1].push(rightInput[j].text);
            }
            //alert(leftInput[j] +","+ rightInput[j])

        }

        this.window.close();
    });

    dialog.window.show();


}


