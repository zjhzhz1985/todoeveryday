/**
 * Created by admin on 15/10/19.
 */
function getRandom(min,max){
    //x上限，y下限
    var x = max;
    var y = min;
    if(x<y){
        x=min;
        y=max;
    }
    var rand = parseInt(Math.random() * (x - y + 1) + y);
    return rand;
}
