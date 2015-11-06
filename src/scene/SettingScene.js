/**
 * Created by admin on 15/10/18.
 */
var CustomTableViewCell = cc.TableViewCell.extend({
    draw:function (ctx) {
        this._super(ctx);
    }
});

var SettingLayer = cc.Layer.extend({

    ctor: function () {
        //////////////////////////////
        // 1. super init first
        this._super();
        var size = cc.winSize;
        var layerbg = new cc.LayerColor(cc.color(255,255,255,255), size.width, size.height);
        this.addChild(layerbg);
        //标题
        var titleLabel = new cc.LabelTTF("Setting", "Arial",50);
        titleLabel.attr({
            x:layerbg.width / 2,
            y:layerbg.height - 45,
            anchorX: 0.5,
            anchorY: 0.5,
            color: cc.color(0,0,0),
            scale: 1
        });
        layerbg.addChild(titleLabel,1);

        var back_menulabel = new cc.MenuItemFont("<back", this.onBack,this);
        back_menulabel.attr({
            color: cc.color(0,0,0),
            fontSize : 35,
            anchorX: 0,
            anchorY: 0.5,
            x: 20,
            y: layerbg.height - 45
        });

        var submit_menulabel = new cc.MenuItemFont("submit>", this.onBack,this);
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
        this.addChild(menu);


        var tableView = new cc.TableView(this, cc.size(size.width, size.height - titleLabel.getBoundingBox().height - 50));
        tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        tableView.x = 0;
        tableView.y = 0;
        tableView.setDelegate(this);
        tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        layerbg.addChild(tableView);
        tableView.reloadData();

    },
    onBack:function() {
        cc.director.runScene(new MainScene());
    },
    scrollViewDidScroll:function (view) {
    },
    scrollViewDidZoom:function (view) {
    },
    tableCellTouched:function (table, cell) {
        var checkbox = cell.getChildByTag(123).getChildByTag(124);

        task = cell.getChildByTag(123).task;
        if(checkbox.isSelected())
        {
            checkbox.setSelected(false);
            task.state = 0;

            if(task.isTodayCompleted)
            {
                task.endTime = GetDateStr(1);
            }else
            {
                task.endTime = getTodayDate();
            }

        }else
        {
            checkbox.setSelected(true);
            task.state = 1;
            if(task.endTime == 0)
            {
                task.startTime = getTodayDate();
            }else
            {
                var daynum = daysBetween(task.startTime,task.endTime);
                task.startTime = GetDateStr(-daynum);
                task.endTime = 0;
            }
        }

        task.saveTask();

    },
//	tableCellTouched2:function () {
//		cc.log("cell touched at index: ");
//	},
    tableCellSizeForIndex:function (table, idx) {
        var size = cc.winSize;
        return cc.size(size.width, 86.5);
    },
    tableCellAtIndex:function (table, idx) {
        var size = cc.winSize;
        var addtask;

        if(idx < GV.ACTIVATED_TASKS_Completed.length)
        {
            addtask = GV.ACTIVATED_TASKS_Completed[idx];
        }else if(idx < GV.ACTIVATED_TASKS_NO_Completed.length + GV.ACTIVATED_TASKS_Completed.length)
        {
            addtask = GV.ACTIVATED_TASKS_NO_Completed[idx - GV.ACTIVATED_TASKS_Completed.length];
        }else
        {
            addtask = GV.NO_ACTIVATED_TASKS[idx - GV.ACTIVATED_TASKS_Completed.length - GV.ACTIVATED_TASKS_NO_Completed.length];
        }

        var sprite;


        var cell = table.dequeueCell();
        if (!cell)
        {
            cell = new CustomTableViewCell();
            sprite = new TaskSprite(addtask, 86.5, cc.color(getRandom(50,200),getRandom(50,200),getRandom(50,200),255), cc.color(222, 222, 222, 255));
            sprite.tag = 123;
            cell.addChild(sprite);

            var checkBox = new ccui.CheckBox();
            checkBox.setTouchEnabled(false);
            checkBox.loadTextures("res/cocosui/check_box_normal.png",
                "res/cocosui/check_box_normal_press.png",
                "res/cocosui/check_box_active.png",
                "res/cocosui/check_box_normal_disable.png",
                "res/cocosui/check_box_active_disable.png");
            checkBox.anchorX = 1;
            checkBox.x = size.width - 20;
            checkBox.y = 30;
            checkBox.addEventListener(this.selectedStateEvent, this);
            checkBox.tag = 124;
            sprite.addChild(checkBox);

            if(addtask.state == 0)
            {
                checkBox.setSelected(false);
            }else
            {
                checkBox.setSelected(true);
            }

        }else
        {
            sprite = cell.getChildByTag(123);
        }

        return cell;
    },

    numberOfCellsInTableView:function (table) {

        return GV.ACTIVATED_TASKS_Completed.length + GV.ACTIVATED_TASKS_NO_Completed.length + GV.NO_ACTIVATED_TASKS.length;
    },
    selectedStateEvent: function (sender, type) {
        switch (type) {
            case  ccui.CheckBox.EVENT_UNSELECTED:
                //this._topDisplayLabel.setString("Unselected");
                break;
            case ccui.CheckBox.EVENT_SELECTED:
                //this._topDisplayLabel.setString("Selected");
                break;

            default:
                break;
        }
    }

});
var SettingScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new SettingLayer();
        this.addChild(layer);
    }
});