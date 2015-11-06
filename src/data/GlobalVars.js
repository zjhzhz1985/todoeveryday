var GV = GV || {};

GV.id_length = 0;
//在初始化时是否需要重置今日完成状态重置标签
GV.IS_NEED_RESET_isTodayCompleted = false;
//启用的任务（今日已完成）
GV.ACTIVATED_TASKS_Completed = [];
//启用的任务（今日未完成）
GV.ACTIVATED_TASKS_NO_Completed = [];
//未启用的任务
GV.NO_ACTIVATED_TASKS = [];
//首页任务精灵单个高度
GV.TASK_SPRITE_HEIGHT = 0;

GV.reflash_TASK_SPRITE_HEIGHT = function() {
    var size = cc.winSize;
    if(GV.ACTIVATED_TASKS_NO_Completed.length != 0)
        GV.TASK_SPRITE_HEIGHT = (size.height - 100) / GV.ACTIVATED_TASKS_NO_Completed.length;
}


GV.setDataInit = function() {

    GV.id_length = (LocalStorage.getInstance().getItem("id_length") != null) ? parseInt(LocalStorage.getInstance().getItem("id_length")) : 0;

    if (LocalStorage.getInstance().getItem("today") == null)
    {
        LocalStorage.getInstance().setItem("today", getTodayDate());

    }else
    {
        //if(LocalStorage.getInstance().getItem("today") != getTodayDate())
       if(daysBetween(LocalStorage.getInstance().getItem("today"),getTodayDate()) > 0)
        {
            //重置任务完成状态为 未完成
            GV.IS_NEED_RESET_isTodayCompleted = true;

        }
    }

    GV.getData(GV.id_length);

}
GV.getData = function(id_length){
    GV.ACTIVATED_TASKS_Completed = [];
    GV.ACTIVATED_TASKS_NO_Completed = [];
    GV.NO_ACTIVATED_TASKS = [];
    for(var i = 0;i < id_length;i++)
    {

        var dataString = LocalStorage.getInstance().getItem("task_" + i);
        //cc.log(dataString);
        var dataTask = JSON.parse(dataString);

        var task = new Task(dataTask.id,dataTask.state,dataTask.title,dataTask.startTime,dataTask.endTime,dataTask.record,dataTask.isTodayCompleted);

        if(GV.IS_NEED_RESET_isTodayCompleted && task.isTodayCompleted)
        {
            task.isTodayCompleted = false;

            task.saveTask();
        }

        if(task.state == 0)
        {
            GV.NO_ACTIVATED_TASKS.push(task);
        }else
        {
            if(task.isTodayCompleted)
            {
                GV.ACTIVATED_TASKS_Completed.push(task);
            }else
            {
                GV.ACTIVATED_TASKS_NO_Completed.push(task);
            }
        }

    }
    if(GV.IS_NEED_RESET_isTodayCompleted)
    {
        GV.IS_NEED_RESET_isTodayCompleted = false;
        LocalStorage.getInstance().setItem("today", getTodayDate());
    }

    GV.reflash_TASK_SPRITE_HEIGHT();

}

GV.MAX_FONTSIZE = 50;

//var onEnterForeground = function () {
//if(daysBetween(LocalStorage.getInstance().getItem("today"),getTodayDate()) > 0)
//    {
//        cc.director.runScene(new MainScene());
//        cc.log("var1");
//    }
//    cc.log('var1');
//    return "var2";
//}