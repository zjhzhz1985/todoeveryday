/**
 * Created by admin on 15/10/14.
 */
var TaskSprite = cc.Node.extend({
    task:null,
    _layerbg:null,
    _label:null,
    _fontSize:null,
    _label2:null,
    ctor: function (task,height,color1,color2) {
        var size = cc.winSize;
        this._super();

        this.setContentSize(size.width,height);
        this.anchorX = 0;
        this.anchorY = 0;

        //this.setGridRect(cc.rect(0,0,size.width,height));

        this._layerbg = new cc.LayerColor(color1,size.width,86.5);
        this.addChild(this._layerbg);
        this._layerbg.anchorX = 0;
        this._layerbg.anchorY = 0;

        this.task = task;

        this._fontSize = 50;

        //this._fontSize = (height >= 86.5) ? 50 : height * 4/7;

        this._label = new cc.LabelTTF(task.title, "Arial", this._fontSize);
        this.addChild(this._label);
        //label.color = color2;
        this._label.setFontFillColor(color2);
        this._label.x = this._layerbg.width / 2;
        this._label.y = this._layerbg.height / 2 + this._fontSize / 10;

        var string = "(" + task.record + "/" + daysBetween(task.startTime,getTodayDate()) + ")";
        this._label2 = new cc.LabelTTF(string, "Arial", this._fontSize / 2);
        this.addChild(this._label2);
        //label.color = color2;
        this._label2.setFontFillColor(color2);
        this._label2.x = this._layerbg.width / 2;
        this._label2.y = this._layerbg.height / 2 + this._fontSize / 20 - this._fontSize / 2 - this._fontSize / 4;

        this.changeHeight(height);


    },
    changeHeight:function(height){
        var size = cc.winSize;
        var action1 = cc.scaleTo(0.5,1,height / 86.5);
        this._layerbg.runAction(action1);

        var pheight = height;
        if(pheight > 86.5)
            pheight = 86.5;

        var targetFontSize = 50 * pheight / 86.5;

        var action2 = cc.scaleTo(0.5,targetFontSize/50);
        var action3 = cc.moveTo(0.5,size.width / 2,height / 2 + targetFontSize / 10);

        var action4 = action2.clone();
        var action5 = cc.moveTo(0.5,size.width / 2,height / 2 + targetFontSize / 20 - targetFontSize / 2 - targetFontSize / 4);
        this._label.runAction(cc.spawn(action2,action3));
        this._label2.runAction(cc.spawn(action4,action5));

        this.setContentSize(size.width,height);



        //var targetFontSize = this._fontSize * height / this._layerbg.height;
        //
        //if(targetFontSize > 50)
        //    targetFontSize = 50;
        //
        //
        //    var action2 = cc.scaleTo(0.5,targetFontSize/this._fontSize);
        //    var action3 = cc.moveTo(0.5,size.width / 2,this._layerbg.height / 2 + targetFontSize / 10);
        //
        //    var action4 = action2.clone();
        //    var action5 = cc.moveTo(0.5,size.width / 2,this._layerbg.height / 2 + targetFontSize / 20 - targetFontSize / 2 - targetFontSize / 4);
        //    this._label.runAction(cc.spawn(action2,action3));
        //    this._label2.runAction(cc.spawn(action4,action5));
        //
        //this._fontSize = targetFontSize;


        //if(this._fontSize < 50)
        //{
        //    var targetFontSize = this._fontSize * height / this._layerbg.height;
        //    if(targetFontSize > 50)
        //        targetFontSize = 50;
        //    var action2 = cc.scaleTo(0.5,targetFontSize/this._fontSize);
        //    var action3 = cc.moveTo(0.5,size.width / 2,height / 2 + height / 10);
        //
        //    var action4 = cc.scaleTo(0.5,targetFontSize/this._fontSize);
        //    var action5 = cc.moveTo(0.5,size.width / 2,height / 2 - targetFontSize / 2 - targetFontSize / 4);
        //    this._label.runAction(cc.spawn(action2,action3));
        //    this._label2.runAction(cc.spawn(action4,action5));
        //
        //}else
        //{
        //    var action4 = cc.moveTo(0.5,size.width / 2,height / 2 + height / 10);
        //    this._label.runAction(action4);
        //    var action5 = cc.moveTo(0.5,size.width / 2,height / 2 - 50 / 2 - 50 / 4);
        //    this._label2.runAction(action5);
        //}


       // this.setGridRect(cc.rect(0,0,size.width,height));
    },
    //deleteSprite:function() {
    //    var a = cc.flipY3D(0.5);
    //    //var a2 = cc.removeSelf(true);
    //   // this.runAction(cc.sequence(a, a2));
    //    this.runAction(a);
    //},
    moveSprite:function(movey) {
        var action1 = cc.moveTo(0.5,0,movey);
        this.runAction(action1);
    }

});
