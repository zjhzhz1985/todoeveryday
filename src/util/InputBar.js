///**
// * Created by 黄振 on 15/10/8.
// * 参数说明
// * fontSize
// * fontName
// * color1 跳出时文字颜色
// * color2 显示时文字颜色
// * inputPlaceholder 默认显示文字
// */
//var TEXT_INPUT_FONT_SIZE = 36;
//var TEXT_INPUT_FONT_NAME = "Thonburi";
//
////var DEFAULT_TITLE = "<click here for input>";
//
//var textInputGetRect = function (node) {
//    var rc = cc.rect(node.x, node.y, node.width, node.height);
//    rc.x -= rc.width / 2;
//    rc.y -= rc.height / 2;
//    return rc;
//};
//
//var InputBar = cc.Node.extend({
//    _trackNode:null,
//    _textField:null,
//    _textFieldAction:null,
//    _action:false,
//    _charLimit:0, // the textfield max char limit
//    _fontSize:36,
//    _fontName:"Thonburi",
//    _color1:cc.color(226, 121, 7),
//    _color2:cc.color(0, 0, 0),
//    _inputPlaceholder:"<click here for input>",
//    ctor:function (fontSize,fontName,color1,color2,inputPlaceholder) {
//        this._super()
//        //设定文字显示尺寸
//        if (!isNaN(fontSize))
//            this._fontSize = fontSize;
//        if (fontName !== undefined)
//            this._fontName = fontName;
//        if (color1 !== undefined)
//            this._color1 = color1;
//        if (color2 !== undefined)
//            this._color2 = color2;
//        if (inputPlaceholder !== undefined)
//            this._inputPlaceholder = inputPlaceholder;
//
//
//
//        if( 'touches' in cc.sys.capabilities ){
//            cc.eventManager.addListener({
//                event: cc.EventListener.TOUCH_ALL_AT_ONCE,
//                onTouchesEnded: this.onTouchesEnded.bind(this)
//            }, this);
//        } else if ('mouse' in cc.sys.capabilities )
//            cc.eventManager.addListener({
//                event: cc.EventListener.MOUSE,
//                onMouseUp: this.onMouseUp.bind(this)
//            }, this);
//    },
//    onEnter:function () {
//        this._super();
//
//        this._charLimit = 20;
//        this._textFieldAction = cc.sequence(
//            cc.fadeOut(0.25),
//            cc.fadeIn(0.25)
//        ).repeatForever();
//        this._action = false;
//
//        // add CCTextFieldTTF
//        //var winSize = cc.director.getWinSize();
//
//        this._textField = new cc.TextFieldTTF(this._inputPlaceholder,
//            TEXT_INPUT_FONT_NAME,
//            this._fontSize);
//        this._textField.setTextColor(this._color2);
//        this.addChild(this._textField);
//        //this._textField.setDelegate(this);
//
//
//        this._textField.x = 0;
//        this._textField.y = 0;
//        this._trackNode = this._textField;
//    },
//    onTouchesEnded:function (touches, event) {
//        //var target = event.getCurrentTarget();
//        if(!this._trackNode)
//            return;
//
//        // grab first touch
//        if(touches.length == 0)
//            return;
//
//        var touch = touches[0];
//        var point = touch.getLocation();
//
//        // decide the trackNode is clicked.
//        cc.log("KeyboardNotificationLayer:clickedAt(" + point.x + "," + point.y + ")");
//
//        var newpoint = this.convertToNodeSpace(point);
//
//        var rect = textInputGetRect(this._trackNode);
//        cc.log("KeyboardNotificationLayer:TrackNode at(origin:" + rect.x + "," + rect.y
//            + ", size:" + rect.width + "," + rect.height + ")");
//
//        this.onClickTrackNode(cc.rectContainsPoint(rect, newpoint));
//        cc.log("----------------------------------");
//    },
//    onMouseUp:function (event) {
//        var target = event.getCurrentTarget();
//        if (!target._trackNode)
//            return;
//
//        var point = event.getLocation();
//
//        // decide the trackNode is clicked.
//        cc.log("KeyboardNotificationLayer:clickedAt(" + point.x + "," + point.y + ")");
//
//        var newpoint = this.convertToNodeSpace(point);
//
//        var rect = textInputGetRect(target._trackNode);
//        cc.log("KeyboardNotificationLayer:TrackNode at(origin:" + rect.x + "," + rect.y
//            + ", size:" + rect.width + "," + rect.height + ")");
//
//        target.onClickTrackNode(cc.rectContainsPoint(rect, newpoint));
//        cc.log("----------------------------------");
//    },
//    onClickTrackNode:function (clicked) {
//        var textField = this._trackNode;
//        if (clicked) {
//            // TextFieldTTFTest be clicked
//            cc.log("TextFieldTTFActionTest:CCTextFieldTTF attachWithIME");
//            textField.attachWithIME();
//        } else {
//            // TextFieldTTFTest not be clicked
//            cc.log("TextFieldTTFActionTest:CCTextFieldTTF detachWithIME");
//            //textField.attachWithIME();
//            textField.detachWithIME();
//        }
//    },
////CCTextFieldDelegate
//    onTextFieldAttachWithIME:function (sender) {
//        if (!this._action) {
//            this._textField.runAction(this._textFieldAction);
//            this._action = true;
//        }
//        return false;
//    },
//    onTextFieldDetachWithIME:function (sender) {
//        if (this._action) {
//            this._textField.stopAction(this._textFieldAction);
//            this._textField.opacity = 255;
//            this._action = false;
//        }
//        return false;
//    },
//    onTextFieldInsertText:function (sender, text, len) {
//        // if insert enter, treat as default to detach with ime
//        if ('\n' == text) {
//            return false;
//        }
//
//        // if the textfield's char count more than m_nCharLimit, doesn't insert text anymore.
//        if (sender.getCharCount() >= this._charLimit) {
//            return true;
//        }
//
//        // create a insert text sprite and do some action
//        var label = new cc.LabelTTF(text, TEXT_INPUT_FONT_NAME, TEXT_INPUT_FONT_SIZE);
//        this.addChild(label);
//        var color = this._color1;
//        label.color = color;
//
//        // move the sprite from top to position
//        var endX = sender.x, endY = sender.y;
//        if (sender.getCharCount()) {
//            endX += sender.width / 2;
//        }
//
//        var duration = 0.5;
//        label.x = endX;
//        label.y = cc.director.getWinSize().height - label.height * 2;
//        label.scale = 8;
//
//        var seq = cc.sequence(
//            cc.spawn(
//                cc.moveTo(duration, cc.p(endX, endY)),
//                cc.scaleTo(duration, 1),
//                cc.fadeOut(duration)),
//            cc.callFunc(this.callbackRemoveNodeWhenDidAction, this));
//        label.runAction(seq);
//        return false;
//    },
//
//    onTextFieldDeleteBackward:function (sender, delText, len) {
//        // create a delete text sprite and do some action
//        var label = new cc.LabelTTF(delText, this._fontName, this._fontSize);
//        label.setFontFillColor(this._color2);
//        this.addChild(label);
//
//        // move the sprite to fly out
//        var beginX = sender.x, beginY = sender.y;
//        beginX += (sender.width - label.width) / 2.0;
//
//        var winSize = cc.director.getWinSize();
//        var endPos = cc.p(-winSize.width / 4.0, winSize.height * (0.5 + Math.random() / 2.0));
//
//        var duration = 1;
//        var rotateDuration = 0.2;
//        var repeatTime = 5;
//        label.x = beginX;
//        label.y = beginY;
//
//        var seq = cc.sequence(
//            cc.spawn(
//                cc.moveTo(duration, endPos),
//                cc.rotateBy(rotateDuration, (Math.random() % 2) ? 360 : -360).repeat(repeatTime),
//                cc.fadeOut(duration)),
//            cc.callFunc(this.callbackRemoveNodeWhenDidAction, this));
//        label.runAction(seq);
//        return false;
//    },
//    onDraw:function (sender) {
//        return false;
//    },
//    initTitle:function(){
//        this._textField.setString("");
//    },
//    getTitle:function(){
//     return (this._textField.getString() == this._inputPlaceholder) ? null : this._textField.getString();
//    }
//
//
//
//
//
//
//
//});