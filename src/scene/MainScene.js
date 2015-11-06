
var MainLayer = cc.Layer.extend({
    _addLayer:null,
    _tasks:null,
    _taskSprites:null,
    _spriteshowheight:null,
    istouchable:null,
    _today:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        return true;
    },

    onEnter:function(){
        this._super();
        cc.log('onEnter');
        this._today = getTodayDate();

        this.istouchable = true;
        var size = cc.winSize;
        var layerbg = new cc.LayerColor(cc.color(255,255,255,255), size.width, size.height);
        this.addChild(layerbg);
        //标题
        var titleLabel = new cc.LabelTTF("todo", "Arial",50);
        titleLabel.attr({
            x:layerbg.width / 2,
            y:layerbg.height - 45,
            anchorX: 0.5,
            anchorY: 0.5,
            color: cc.color(0,0,0),
            scale: 1
        });
        this.addChild(titleLabel,1);

        var back_menulabel = new cc.MenuItemFont("<set", this.onSetting,this);
        back_menulabel.attr({
            color: cc.color(0,0,0),
            fontSize : 35,
            anchorX: 0,
            anchorY: 0.5,
            x: 20,
            y: layerbg.height - 45
        });

        var submit_menulabel = new cc.MenuItemFont("add>", this.onAdd,this);
        submit_menulabel.attr({
            color: cc.color(0,0,0),
            fontSize : 35,
            anchorX: 1,
            anchorY: 0.5,
            x: layerbg.width - 20,
            y: layerbg.height - 45
        });

        var menu = new cc.Menu(back_menulabel,submit_menulabel);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu,1);

        this._spriteshowheight = size.height - 100;

        // 初始化数据
        GV.setDataInit();

        this._taskSprites = [];

        this.initTaskSprites();

       // if( 'touches' in cc.sys.capabilities ){
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ALL_AT_ONCE,
                onTouchesEnded: this.onTouchesEnded.bind(this)
            }, this);
       // }
        //else if ('mouse' in cc.sys.capabilities )
        //    cc.eventManager.addListener({
        //        event: cc.EventListener.MOUSE,
        //        onMouseUp: this.onMouseUp.bind(this)
        //    }, this);

        this.schedule(this.updateToReflashNewDay, 1);

       // return true;
    },
    //onEnter:function(){
    //    if(daysBetween(LocalStorage.getInstance().getItem("today"),getTodayDate()) > 0)
    //    {
    //        cc.director.runScene(new MainScene());
    //    }
    //    return true;
    //},
    onTouchesEnded:function (touches, event) {
        if(!this.istouchable)
        {
            return;
        }
        //cc.log(LocalStorage.getInstance().getItem("today"));
        //cc.log(getTodayDate());
        //cc.log(daysBetween(LocalStorage.getInstance().getItem("today"),getTodayDate()));
        //cc.log(daysBetween(LocalStorage.getInstance().getItem("today"),getTodayDate()) > 0);
        //if(daysBetween(LocalStorage.getInstance().getItem("today"),getTodayDate()) > 0)
        //{
        //    cc.director.runScene(new MainScene());
        //   // cc.director.runScene(new cc.TransitionJumpZoom(1.2,new MainScene()));
        //    return;
        //}

        if(daysBetween(this._today,getTodayDate()) >0)
        {
            this.istouchable = false;
            this.unschedule(this.updateToReflashNewDay);
            this._today = getTodayDate();
            cc.director.runScene(new MainScene());
        }

        var size = cc.winSize;
        var touch = touches[0];
        var point = touch.getLocation();
        for(var i = 0;i < this._taskSprites.length;i++)
        {
            if(cc.rectContainsPoint(this._taskSprites[i].getBoundingBox(), point))
            {
                this.istouchable = false;
                GV.ACTIVATED_TASKS_Completed.push(this._taskSprites[i].task);

                GV.ACTIVATED_TASKS_NO_Completed.splice(i, 1);

                //var action1 = cc.fadeOutTRTiles(1.0, cc.size(12,16));
                var action1 = cc.scaleTo(0.5, 0,1);
                var action3 = cc.removeSelf(true);
                var action2 = cc.callFunc(function(){
                    this._taskSprites[i].task.isTodayCompleted = true;
                    this._taskSprites[i].task.record++;
                    this._taskSprites[i].task.saveTask();
                    this._taskSprites.splice(i, 1);
                    GV.reflash_TASK_SPRITE_HEIGHT();
                    this.addTaskSprite();
                    this.istouchable = true;
                },this);
                this._taskSprites[i].runAction(cc.sequence(action1, action2, action3));
                return;

            }
        }
            },
    onAdd:function() {
        if(this._addLayer)
        {
            if(!this._addLayer.Visible)
            {
                this._addLayer.y = 0;
                //this._addLayer.setVisible(true);
                this._addLayer.initTitleInputString();

                //this._addLayer.isTouchAble = true;

                //暂停页面按钮功能
                cc.eventManager.pauseTarget(this, true);
                //开启设置层按钮功能
                cc.eventManager.resumeTarget(this._addLayer,true);
            }
        }
        else
        {
            //暂停页面已存按钮功能
            cc.eventManager.pauseTarget(this, true);
            this._addLayer = new AddLayer();
            this.addChild(this._addLayer,100);

        }
    },
    onSetting:function() {
        //cc.director.runScene(new SettingScene());
        cc.director.runScene(new cc.TransitionSlideInL(0.8,new SettingScene()));
    },
    initTaskSprites:function(){
        if(GV.TASK_SPRITE_HEIGHT == 0)
        {

            //无任务

            return;
        }

        var tasks = GV.ACTIVATED_TASKS_NO_Completed;
        for(var i = 0;i < tasks.length;i++)
        {
            //if(tasks[i].state == 0)
            //continue;

            this.initTaskSprite(tasks[i]);
        }
    },
    initTaskSprite:function(task){
        var size = cc.winSize;

        var sprite = new TaskSprite(task,GV.TASK_SPRITE_HEIGHT,cc.color(getRandom(50,200),getRandom(50,200),getRandom(50,200),255),cc.color(222,222,222,255));
        this.addChild(sprite);
        this._taskSprites.push(sprite);
        sprite.y = this._spriteshowheight - this._taskSprites.length * GV.TASK_SPRITE_HEIGHT;
        var xm = 0;
        if(this._taskSprites.length % 2 == 1)
        {
            xm = -size.width;
        }else
        {
            xm = size.width;
        }
        sprite.x = xm;
        var action1 = cc.moveBy(0.5, -xm, 0);
        sprite.runAction(action1);
    },
    addTaskSprite:function(addtask) {
        var size = cc.winSize;

        for (var i = 0; i < this._taskSprites.length; i++) {
            this._taskSprites[i].changeHeight(GV.TASK_SPRITE_HEIGHT);
        }

        if (addtask != undefined)
        {
            var sprite = new TaskSprite(addtask, GV.TASK_SPRITE_HEIGHT, cc.color(getRandom(50,200),getRandom(50,200),getRandom(50,200), 255), cc.color(222, 222, 222, 255));
            this.addChild(sprite);
            this._taskSprites.push(sprite);
            sprite.y = -GV.TASK_SPRITE_HEIGHT;
         }

        for(var j = 0;j < this._taskSprites.length;j++)
        {
            var action0 = cc.moveTo(0.5,0,this._spriteshowheight - (j + 1) * GV.TASK_SPRITE_HEIGHT);
            this._taskSprites[j].runAction(action0);
        }
    },
    updateToReflashNewDay:function(){
        if(daysBetween(this._today,getTodayDate()) > 0)
        {
            this.istouchable = false;
            this.unschedule(this.updateToReflashNewDay);
            this._today = getTodayDate();

            cc.director.runScene(new MainScene());
            //cc.log("var1");
        }
       // cc.log('var2');
    }
});

var MainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainLayer();
        this.addChild(layer);
    }
});

