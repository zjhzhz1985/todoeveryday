//var TEXT_INPUT_FONT_SIZE = 36;
//var TEXT_INPUT_FONT_NAME = "Thonburi";
//
//var textInputGetRect = function (node) {
//	var rc = cc.rect(node.x, node.y, node.width, node.height);
//	rc.x -= rc.width / 2;
//	rc.y -= rc.height / 2;
//	return rc;
//};
var AddLayer = cc.Layer.extend({
	//_inputBar:null,
	//isTouchAble:null,
	_layerbg:null,
	_editbox:null,
	ctor:function () {
		this._super();
		var size = cc.winSize;

		//this.isTouchAble = true;
		//半透明遮罩背景
		//var bgLayer = new cc.LayerColor(cc.color(0,0,0,200), size.width, size.height);
		var bgLayer = new cc.LayerColor(cc.color(255, 255, 255, 255), size.width, size.height);
		this.addChild(bgLayer);

		var inputbgSize = cc.size(614, 420);

		var inputbg = new cc.LayerColor(cc.color(232,22,123,255), inputbgSize.width, inputbgSize.height);
		inputbg.ignoreAnchorPointForPosition(false);
		inputbg.setAnchorPoint(0.5, 0.5);
		inputbg.setPosition(size.width / 2, size.height / 2);
		this.addChild(inputbg);


		var inputbgSprite = new cc.Scale9Sprite("res/lineSquare_black.png");
		inputbgSprite.setPosition(size.width / 2, size.height / 2);
		inputbgSprite.setContentSize(cc.size(614,420));

        //
		//var squareLineSprite = new SquareLineSprite(100, 100, cc.color(28,32,11,255), cc.color(232,22,123,255));
		//squareLineSprite.setPosition(200, 150);
		//this.addChild(squareLineSprite);


		//var inputbgSprite = new cc.Sprite("res/cocosui/input_bg.png");
		//inputbgSprite.attr({
		//	anchorX: 0.5,
		//	anchorY: 0.5,
		//	x: size.width / 2,
		//	y: size.height / 2
		//});
		this.addChild(inputbgSprite);


		var titleLabel = new cc.LabelTTF("Enter The Title", "Arial",50);
		titleLabel.attr({
			x: inputbgSprite.width / 2,
			y: inputbgSprite.height - 45,
			anchorX: 0.5,
			anchorY: 0.5,
			color: cc.color(0,0,0)
		});
		inputbgSprite.addChild(titleLabel);

		var explainLabel = new cc.LabelTTF("up to 25 characters in length:", "Arial",25);
		explainLabel.attr({
			x: 48,
			y: inputbgSprite.height - 45 - titleLabel.getBoundingBox().height - 25,
			anchorX: 0,
			anchorY: 0.5,
			color: cc.color(0,0,0)
		});
		inputbgSprite.addChild(explainLabel);





		////设置背景色
		//this._layerbg = new cc.LayerColor(cc.color(188,203,222,255),size.width * 2/3,size.height / 2);
		//this._layerbg.attr({
		//	x: size.width / 6,
		//	y: size.height / 4
		//});
		//this.addChild(this._layerbg, 0);

		//this._inputBar = new InputBar(36,"黑体",cc.color(224,89,21),cc.color(67,28,93));
		//this._inputBar.x = this._layerbg.x + this._layerbg.width/2;
		//this._inputBar.y = this._layerbg.y + this._layerbg.height * 3/4 + this._layerbg.height / 8;
		//this.addChild(this._inputBar);



		this._editbox = new cc.EditBox(cc.size(inputbgSprite.width - 100, 70), new cc.Scale9Sprite("res/cocosui/my_edit.png"));
		this._editbox.setFontSize(30);
		this._editbox.setPlaceholderFontColor(cc.color(50, 50, 50, 100));
		this._editbox.setPlaceHolder("<click here for input>");
		this._editbox.setPlaceholderFontSize(40);
		this._editbox.x = inputbgSprite.width / 2;
		this._editbox.y = inputbgSprite.height / 2;
		//this._editbox.setDelegate(this);
		this._editbox.setFontColor(cc.color(5, 4, 10));
		this._editbox.setMaxLength(25);
		inputbgSprite.addChild(this._editbox);



		var item1 = new cc.MenuItemImage(
			"res/cocosui/submit.png",
			"res/cocosui/submit_on.png",
			this.onSubmit,this
		);
		var item2 = new cc.MenuItemImage(
			"res/cocosui/cancel.png",
			"res/cocosui/cancel_on.png",
			this.closeLayer,this
		);
		var menu = new cc.Menu(item1,item2);
		menu.alignItemsHorizontallyWithPadding(5);
		menu.x = inputbgSprite.width / 2;
		menu.y = inputbgSprite.height / 4;
		inputbgSprite.addChild(menu,100);





		//this._menulabels = [];
		//this._menulabels[0] = new cc.MenuItemFont("1", this.onChooseMode0,this);
		//this._menulabels[1] = new cc.MenuItemFont("7", this.onChooseMode1,this);
		//this._menulabels[2] = new cc.MenuItemFont("30", this.onChooseMode2,this);
        //
		//this._menulabels[0].attr({
		//	color: cc.color(0,0,0),
		//	fontSize : 50,
		//	x: this._layerbg.x + this._layerbg.width / 6,
		//	y: this._layerbg.y + this._layerbg.height * 2/4 + this._layerbg.height / 8
		//});
        //
		//this._menulabels[1].attr({
		//	color: cc.color(0,0,0),
		//	fontSize : 50,
		//	x: this._layerbg.x + this._layerbg.width / 2,
		//	y: this._layerbg.y + this._layerbg.height * 2/4 + this._layerbg.height / 8
		//});
        //
		//this._menulabels[2].attr({
		//	color: cc.color(0,0,0),
		//	fontSize : 50,
		//	x: this._layerbg.x + this._layerbg.width * 5/6,
		//	y: this._layerbg.y + this._layerbg.height * 2/4 + this._layerbg.height / 8
		//});
        //
		//this._menulabelbg = new cc.LayerColor (cc.color(205,212,34,255), this._layerbg.width / 3, 100);
		//this._menulabelbg.ignoreAnchorPointForPosition(false);
		//this._menulabelbg.setAnchorPoint(0.5,0.5);
		//this._menulabelbg.setPosition(this._menulabels[0].getPosition());
		//this.addChild(this._menulabelbg,0);

		//this._menulabels[3] = new cc.MenuItemFont("OK", this.onSubmit,this);


		//var ok_menulabel= new cc.MenuItemFont("SUBMIT", this.onSubmit,this);
		//ok_menulabel.attr({
		//	color: cc.color(255,255,255),
		//	fontSize : 40,
		//	x: this._layerbg.x + this._layerbg.width / 2,
		//	y: this._layerbg.y + this._layerbg.height / 5
		//});
        //
		//var menu = new cc.Menu(ok_menulabel);
		//menu.x = 0;
		//menu.y = 0;
		//this.addChild(menu,100);



		//var layer = new cc.Node();
		//layer.x = this._layerbg.x + this._layerbg.width / 2;
		//layer.y = this._layerbg.y + this._layerbg.height * 1/4 + this._layerbg.height / 8;
		//this.addChild(layer, 1);
		//var layer_width = 0;
        //
		//// Add the black background for the text
		//var background = new cc.Scale9Sprite("res/buttonBackground.png");
		//background.width = 100;
		//background.height = 50;
		//background.x = layer_width + background.width / 2.0;
		//background.y = 0;
		//layer.addChild(background);
        //
		//this._displayValueLabel = new cc.LabelTTF("1", "HelveticaNeue-Bold", 30);
		//this._displayValueLabel.setColor(cc.color(0,0,0,255));
		//this._displayValueLabel.x = background.x;
		//this._displayValueLabel.y = background.y;
		//layer.addChild(this._displayValueLabel);
        //
		//layer_width += background.width;
        //
		//var minusSprite = new cc.Sprite("res/stepperMinus.png");
		//var plusSprite = new cc.Sprite("res/stepperPlus.png");
        //
		//this._stepper = new cc.ControlStepper(minusSprite, plusSprite);
		//this._stepper.setValue(1);
		//this._stepper.setPositionMode("vertical");
		//this._stepper.x = layer_width + 10 + this._stepper.width / 2;
		//this._stepper.y = 0;
		//this._stepper.addTargetWithActionForControlEvents(this, this.valueChanged, cc.CONTROL_EVENT_VALUECHANGED);
		//layer.addChild(this._stepper);
        //
		//layer_width += this._stepper.width;
        //
		//// Set the layer size
		//layer.width = layer_width;
		//layer.height = 0;
		//layer.anchorX = 0.5;
		//layer.anchorY = 0.5;

		// Update the value label
		//this.valueChanged(stepper, cc.CONTROL_EVENT_VALUECHANGED);

		//if( 'touches' in cc.sys.capabilities ){
		//	cc.eventManager.addListener({
		//		event: cc.EventListener.TOUCH_ALL_AT_ONCE,
		//		onTouchesEnded: this.onTouchesEnded.bind(this)
		//	}, this);
		//} else if ('mouse' in cc.sys.capabilities )
		//	cc.eventManager.addListener({
		//		event: cc.EventListener.MOUSE,
		//		onMouseUp: this.onMouseUp.bind(this)
		//	}, this);

		////标题
		//var titleLabel = new cc.LabelTTF("Select Level", "Arial",28);
		//titleLabel.attr({
		//	x:layerbg.width / 2,
		//	y:layerbg.height - 45,
		//	anchorX: 0.5,
		//	anchorY: 0.5,
		//	color: cc.color(0,0,0),
		//	scale: 1
		//});
		//layerbg.addChild(titleLabel,1);
		//
		////说明
		//var instructionLabel = new cc.LabelTTF("  You can choose any level you have passed,to challenge,to get better results.", "Arial",25,cc.size(size.width * 2/3 - 40 , 120));
		//instructionLabel.attr({
		//	x:layerbg.width / 2,
		//	y:titleLabel.y - 15 - 15,
		//	anchorX: 0.5,
		//	anchorY: 1,
		//	color: cc.color(10,10,10),
		//	scale: 1
		//});
		//layerbg.addChild(instructionLabel,1);
		//
		//var tableView = new cc.TableView(this, cc.size(size.width * 2/3, instructionLabel.y - 120));
		//tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
		//tableView.x = 0;
		//tableView.y = 0;
		//tableView.setDelegate(this);
		//tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
		//layerbg.addChild(tableView);
		//tableView.reloadData();
        //
		// 添加点击监听
		//cc.eventManager.addListener({
		//	event: cc.EventListener.TOUCH_ONE_BY_ONE,
		//	swallowTouches : true,
		//	onTouchBegan: this.onTouchEnded.bind(this),
		//	onTouchEnded: this.onTouchEnded.bind(this)
		//}, this);
		
	},
	//onTouchBegan:function(touch, event){
	//	return true;
	//},
	//onTouchEnded:function(touch, event){
	//	if(!this.isTouchAble)
	//	return false;
    //
	//	this.isTouchAble = false;
	//	var location = touch.getLocation();
	//	var size = cc.winSize;
    //
	//	this.onSubmit();
	//	return false;
	//},
	//onChooseMode0:function(){
	//	cc.log("sdsds"+0);
    //
	//	this._task.mode = 1;
    //
	//	this._displayValueLabel.setString(this._task.mode);
	//	this._stepper.setValue(this._task.mode);
    //
	//	if(!this._menulabelbg.isVisible())
	//	this._menulabelbg.setVisible(true);
	//	//if(this._menulabelbg.getNumberOfRunningActions())
	//	//this._menulabelbg.stopAllActions();
    //
	//	var action0 = cc.moveTo(0.3,this._menulabels[0].getPosition());
	//	this._menulabelbg.runAction(action0);
    //
    //
	//},
	//onChooseMode1:function(){
	//	cc.log("sdsds"+1);
    //
	//	this._task.mode = 7;
    //
	//	this._displayValueLabel.setString(this._task.mode);
	//	this._stepper.setValue(this._task.mode);
    //
	//	if(!this._menulabelbg.isVisible())
	//		this._menulabelbg.setVisible(true);
	//	//if(this._menulabelbg.getNumberOfRunningActions())
	//	//this._menulabelbg.stopAllActions();
	//	var action0 = cc.moveTo(0.3,this._menulabels[1].getPosition());
	//	this._menulabelbg.runAction(action0);
	//	//var action0 = cc.moveBy(1.0,this._menulabels[0].getPosition());
	//	//this._menulabelbg.runAction(action0);
	//},
	//onChooseMode2:function(){
	//	cc.log("sdsds"+2);
    //
	//	this._task.mode = 30;
    //
	//	this._displayValueLabel.setString(this._task.mode);
	//	this._stepper.setValue(this._task.mode);
    //
	//	if(!this._menulabelbg.isVisible())
	//		this._menulabelbg.setVisible(true);
	//	//if(this._menulabelbg.getNumberOfRunningActions())
	//	//this._menulabelbg.stopAllActions();
	//	var action0 = cc.moveTo(0.3,this._menulabels[2].getPosition());
	//	this._menulabelbg.runAction(action0);
	//	//var action0 = cc.moveBy(1.0,this._menulabels[0].getPosition());
	//	//this._menulabelbg.runAction(action0);
	//},
	onSubmit:function(){

		//var astring = this._inputBar.getTitle();
		var astring = this._editbox.string;

		var task = new Task();
		if(astring == null || astring == "")
		{
			this.closeLayer();
			return;
		}

		task.title = astring;
		task.saveTask();

		GV.ACTIVATED_TASKS_NO_Completed.push(task);
		GV.reflash_TASK_SPRITE_HEIGHT();

		this.getParent().addTaskSprite(task);
		this.closeLayer();

	},
	initTitleInputString:function(){
		//this._inputBar.initTitle();
		this._editbox.string = "";
	},
	//valueChanged:function (sender, controlEvent) {
	//	// Change value of label.
	//	var dayNum = sender.getValue().toString();
	//	this._displayValueLabel.setString(dayNum);
    //
	//	this._task.mode = dayNum;
    //
	//	if(this._menulabelbg.isVisible()) {
	//		this._menulabelbg.setVisible(false);
	//		//this._displayValueLabel.setColor(cc.color(0,0,0,255));
	//	}
    //
	//},
//	onEnter:function () {
//		this._super();
//
//		this._charLimit = 20;
//		this._textFieldAction = cc.sequence(
//			cc.fadeOut(0.25),
//			cc.fadeIn(0.25)
//		).repeatForever();
//		this._action = false;
//
//		// add CCTextFieldTTF
//		//var winSize = cc.director.getWinSize();
//
//		this._textField = new cc.TextFieldTTF("<click here for input>",
//			TEXT_INPUT_FONT_NAME,
//			TEXT_INPUT_FONT_SIZE);
//		this.addChild(this._textField);
//		this._textField.setDelegate(this);
//
//
//		this._textField.x = this._layerbg.width / 2;
//		this._textField.y = this._layerbg.height / 2;
//		this._trackNode = this._textField;
//	},
//	onTouchesEnded:function (touches, event) {
//		//var target = event.getCurrentTarget();
//		if(!this._trackNode)
//			return;
//
//		// grab first touch
//		if(touches.length == 0)
//			return;
//
//		var touch = touches[0];
//		var point = touch.getLocation();
//
//		// decide the trackNode is clicked.
//		cc.log("KeyboardNotificationLayer:clickedAt(" + point.x + "," + point.y + ")");
//
//		var rect = textInputGetRect(this._trackNode);
//		cc.log("KeyboardNotificationLayer:TrackNode at(origin:" + rect.x + "," + rect.y
//			+ ", size:" + rect.width + "," + rect.height + ")");
//
//		this.onClickTrackNode(cc.rectContainsPoint(rect, point));
//		cc.log("----------------------------------");
//	},
//	onMouseUp:function (event) {
//		var target = event.getCurrentTarget();
//		if (!target._trackNode)
//			return;
//
//		var point = event.getLocation();
//
//		// decide the trackNode is clicked.
//		cc.log("KeyboardNotificationLayer:clickedAt(" + point.x + "," + point.y + ")");
//
//		var rect = textInputGetRect(target._trackNode);
//		cc.log("KeyboardNotificationLayer:TrackNode at(origin:" + rect.x + "," + rect.y
//			+ ", size:" + rect.width + "," + rect.height + ")");
//
//		target.onClickTrackNode(cc.rectContainsPoint(rect, point));
//		cc.log("----------------------------------");
//	},
//	onClickTrackNode:function (clicked) {
//		var textField = this._trackNode;
//		if (clicked) {
//			// TextFieldTTFTest be clicked
//			cc.log("TextFieldTTFActionTest:CCTextFieldTTF attachWithIME");
//			textField.attachWithIME();
//		} else {
//			// TextFieldTTFTest not be clicked
//			cc.log("TextFieldTTFActionTest:CCTextFieldTTF detachWithIME");
//			textField.detachWithIME();
//		}
//	},
////CCTextFieldDelegate
//	onTextFieldAttachWithIME:function (sender) {
//		if (!this._action) {
//			this._textField.runAction(this._textFieldAction);
//			this._action = true;
//		}
//		return false;
//	},
//	onTextFieldDetachWithIME:function (sender) {
//		if (this._action) {
//			this._textField.stopAction(this._textFieldAction);
//			this._textField.opacity = 255;
//			this._action = false;
//		}
//		return false;
//	},
//	onTextFieldInsertText:function (sender, text, len) {
//		// if insert enter, treat as default to detach with ime
//		if ('\n' == text) {
//			return false;
//		}
//
//		// if the textfield's char count more than m_nCharLimit, doesn't insert text anymore.
//		if (sender.getCharCount() >= this._charLimit) {
//			return true;
//		}
//
//		// create a insert text sprite and do some action
//		var label = new cc.LabelTTF(text, TEXT_INPUT_FONT_NAME, TEXT_INPUT_FONT_SIZE);
//		this.addChild(label);
//		var color = cc.color(226, 121, 7);
//		label.color = color;
//
//		// move the sprite from top to position
//		var endX = sender.x, endY = sender.y;
//		if (sender.getCharCount()) {
//			endX += sender.width / 2;
//		}
//
//		var duration = 0.5;
//		label.x = endX;
//		label.y = cc.director.getWinSize().height - label.height * 2;
//		label.scale = 8;
//
//		var seq = cc.sequence(
//			cc.spawn(
//				cc.moveTo(duration, cc.p(endX, endY)),
//				cc.scaleTo(duration, 1),
//				cc.fadeOut(duration)),
//			cc.callFunc(this.callbackRemoveNodeWhenDidAction, this));
//		label.runAction(seq);
//		return false;
//	},
//
//	onTextFieldDeleteBackward:function (sender, delText, len) {
//		// create a delete text sprite and do some action
//		var label = new cc.LabelTTF(delText, TEXT_INPUT_FONT_NAME, TEXT_INPUT_FONT_SIZE);
//		this.addChild(label);
//
//		// move the sprite to fly out
//		var beginX = sender.x, beginY = sender.y;
//		beginX += (sender.width - label.width) / 2.0;
//
//		var winSize = cc.director.getWinSize();
//		var endPos = cc.p(-winSize.width / 4.0, winSize.height * (0.5 + Math.random() / 2.0));
//
//		var duration = 1;
//		var rotateDuration = 0.2;
//		var repeatTime = 5;
//		label.x = beginX;
//		label.y = beginY;
//
//		var seq = cc.sequence(
//			cc.spawn(
//				cc.moveTo(duration, endPos),
//				cc.rotateBy(rotateDuration, (Math.random() % 2) ? 360 : -360).repeat(repeatTime),
//				cc.fadeOut(duration)),
//			cc.callFunc(this.callbackRemoveNodeWhenDidAction, this));
//		label.runAction(seq);
//		return false;
//	},
//	onDraw:function (sender) {
//		return false;
//	},





//	onTouchBegan:function(touch, event){
//
//		var location = touch.getLocation();
//		var size = cc.winSize;
//
//		if(location.x < size.width / 6||location.x > size.width * 5/6)
//			this.closeLayer();
//		if(location.y < size.height / 6||location.y > size.height * 5/6)
//			this.closeLayer();
//
//		return false;
//	},
//	scrollViewDidScroll:function (view) {
//	},
//	scrollViewDidZoom:function (view) {
//	},
//	tableCellTouched:function (table, cell) {
//		if(GV.getLevelRecord(cell.getIdx() +1) == 0&&cell.getIdx() != GV.MAX_LEVEL)
//		return;
//		//cc.log("cell touched at index: " + cell.getIdx());
//		GV.setCurrentLevel(cell.getIdx() +1);
//		var scene = new cc.Scene();
//		scene.addChild(new GameScene(GV.CURRENT_LEVEL));
//		cc.director.runScene(new cc.TransitionFade(1.2,scene));
//	},
////	tableCellTouched2:function () {
////		cc.log("cell touched at index: ");
////	},
//	tableCellSizeForIndex:function (table, idx) {
//		var size = cc.winSize;
//		return cc.size(size.width / 2, 60);
//	},
//	tableCellAtIndex:function (table, idx) {
//		var size = cc.winSize;
//		var strValue = (idx+1).toFixed(0);
//		var cell = table.dequeueCell();
//		var label;
//		var levelRecord = GV.getLevelRecord(strValue);
//
//		if (!cell) {
//			cell = new CustomTableViewCell();
//
////			var sprite = new cc.Sprite("res/icon.png");
////			sprite.anchorX = 0;
////			sprite.anchorY = 0;
////			sprite.x = 0;
////			sprite.y = 0;
////			cell.addChild(sprite);
//			label = new cc.LabelTTF("Level " + strValue, "Arial", 30.0);
//			label.attr({
//				x:100,
//				y:0,
//				anchorX: 0,
//				anchorY: 0,
//				//color: cc.color(0,0,0),
//				scale: 1
//			});
//			label.tag = 123;
//			cell.addChild(label);
//
//		} else {
//			label = cell.getChildByTag(123);
//			label.setString("Level " + strValue);
//		}
//		var xing0;
//		var xing1;
//		var xing2;
//		if(levelRecord > 0){
//			label.setFontFillColor(cc.color(0,0,0,255));
//			xing0 = new cc.Sprite("#xiaoxingxing2.png");
//		}else{
//			if(strValue == GV.MAX_LEVEL + 1)
//				label.setFontFillColor(cc.color(0,0,0,255));
//			else
//				label.setFontFillColor(cc.color(167,167,167,255));
//
//			xing0 = new cc.Sprite("#xiaoxingxing.png");
//		}
//
//		if(levelRecord > 1){
//			xing1 = new cc.Sprite("#xiaoxingxing2.png");
//		}else{
//			xing1 = new cc.Sprite("#xiaoxingxing.png");
//		}
//
//		if(levelRecord > 2){
//			xing2 = new cc.Sprite("#xiaoxingxing2.png");
//		}else{
//			xing2 = new cc.Sprite("#xiaoxingxing.png");
//		}
//
//		xing0.attr({
//			x: label.x + 90 + size.width / 16,
//			y: 0,
//			anchorX: 0,
//			anchorY: 0,
//			scale: 1
//		});
//		cell.addChild(xing0,1);
//		xing1.attr({
//					x: label.x + 90 + size.width / 16 + 35,
//					y: 0,
//					anchorX: 0,
//					anchorY: 0,
//					scale: 1
//				});
//		cell.addChild(xing1,1);
//		xing2.attr({
//			x: label.x + 90 + size.width / 16 + 35 + 35,
//			y: 0,
//			anchorX: 0,
//			anchorY: 0,
//			scale: 1
//		});
//		cell.addChild(xing2,1);
//
////
////		if(levelRecord > 0){
////			label.setFontFillColor(cc.color(0,0,0,255));
////
////			var xing0 = new cc.Sprite("res/xiaoxingxing.png");
////			xing0.attr({
////				x: label.x + 90 + size.width / 16,
////				y: 0,
////				anchorX: 0,
////				anchorY: 0,
////				scale: 1
////			});
////			cell.addChild(xing0,1);
////
////			if(levelRecord > 1){
////				var xing1 = new cc.Sprite("res/xiaoxingxing.png");
////				xing1.attr({
////					x: label.x + 90 + size.width / 16 + 35,
////					y: 0,
////					anchorX: 0,
////					anchorY: 0,
////					scale: 1
////				});
////				cell.addChild(xing1,1);
////			}
////			if(levelRecord > 2){
////				var xing2 = new cc.Sprite("res/xiaoxingxing.png");
////				xing2.attr({
////					x: label.x + 90 + size.width / 16 + 35 + 35,
////					y: 0,
////					anchorX: 0,
////					anchorY: 0,
////					scale: 1
////				});
////				cell.addChild(xing2,1);
////			}
//
////			var recordLabel = new cc.LabelTTF(levelRecord, "黑体", 30.0);
////			recordLabel.x = 60;
////			recordLabel.y = 0;
////			recordLabel.anchorX = 0;
////			recordLabel.anchorY = 0;
////			recordLabel.tag = 124;
////			cell.addChild(recordLabel);
//			//添加成绩显示
//
////
////
////
////		}else{
////			label.setFontFillColor(cc.color(167,167,167,255));
////		}
//		return cell;
//	},
//
//	numberOfCellsInTableView:function (table) {
//		return 15;
//	},
	closeLayer:function () {
		//Sound.getInstance().playBtn();
		//this.setVisible(false);
		this.y = -10000;
		cc.eventManager.resumeTarget(this.getParent(),true);
		//this.removeFromParent(true);

	}
});
