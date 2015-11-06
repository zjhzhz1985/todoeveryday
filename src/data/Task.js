/**
 * Created by admin on 15/10/12.
 */
var Task = cc.Class.extend({
    title:null,
    id:null,
    state:null,
    //mode:null,
    startTime:null,
    endTime:null,
    record:null,
    isTodayCompleted:null,
    //lastCycle:null,
    //thisCycle:null,
    ctor:function(id,state,title,startTime,endTime,record,isTodayCompleted){
        if(isTodayCompleted != undefined)
            this.isTodayCompleted = isTodayCompleted;
        else
            this.isTodayCompleted = false;

        if(record != undefined)
            this.record = record;
        else
            this.record = 0;

        if(endTime != undefined)
            this.endTime = endTime;
        else
            this.endTime = "0";

        if(startTime != undefined)
            this.startTime = startTime;
        else
            this.startTime = getTodayDate();

        if(title != undefined)
            this.title = title;
        else
            this.title = "任务" + GV.id_length;

        if(state != undefined)
            this.state = state;
        else
            this.state = 1;
        if(id != undefined)
            this.id = id;
        else
            this.id = GV.id_length;


        //this.id = id;
        //this.state = state;
        //this.title = title;
        //this.startTime = startTime;
        //this.endTime = endTime;
        //this.record = record;
        //this.isTodayCompleted = isTodayCompleted;


        //if(this.today != getTodayDate())
        //{
        //
        //    this.isTodayCompleted = false;
        //}

        //this.mode = 1;
        //this.lastCycle = false;
        //this.thisCycle = false;
        //this.id = (LocalStorage.getInstance().getItem("max_id") != null) ? parseInt(LocalStorage.getInstance().getItem("max_id")) + 1 : 0;
        //this.endTime = 0;
    },

    //setTitle:function(title){
    //    this.title = title;
    //},
    //getTitle:function(){
    //    return this.title;
    //},
    ////setID:function(id){
    ////    this.id = id;
    ////},
    //getID:function(){
    //    return this.id;
    //},
    ////setMode:function(mode){
    ////    this.mode = mode;
    ////},
    ////getMode:function(){
    ////    return this.mode;
    ////},
    setStartTime:function(time){
        this.startTime = time;
    },
    //getStartTime:function(){
    //    return this.startTime;
    //},
    //setEndTime:function(time){
    //    this.endTime = time;
    //},
    //getEndTime:function(){
    //    return this.endTime;
    //},

    setEndTime:function(time){
        this.endTime = time;
    },


    saveTask:function() {
        /*
         *state : 启用状态 0未启用 1启用
         *title : 标题
         *time : 启动时间
         *record : 记录
         */
        var submitText = '{"id" : ' + this.id + ',"state" : ' + this.state + ',"title" : "' + this.title + '","startTime" : "' + this.startTime + '","endTime" : "' + this.endTime + '","isTodayCompleted" : ' + this.isTodayCompleted + ',"record" : ' + this.record + '}';
        //var submitText = this.title + "," + this.mode + "," + this.time + "," + "0";
        LocalStorage.getInstance().setItem("task_" + this.id, submitText);
        var id_length = (LocalStorage.getInstance().getItem("id_length") != null) ? parseInt(LocalStorage.getInstance().getItem("id_length")) : 0;
        if (this.id >= id_length)
        {
            LocalStorage.getInstance().setItem("id_length", this.id + 1);
            GV.id_length = this.id + 1;
        }
    }
});





