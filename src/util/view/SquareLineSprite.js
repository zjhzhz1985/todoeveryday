/**
 * Created by zhhz on 15/11/8.
 */
var SquareLineSprite = cc.LayerColor.extend({

    ctor: function (width, height, color1, color2) {
        this._super(color1, width, height);
        //var size = cc.winSize;
        //this.setContentSize(width, height);
        this.ignoreAnchorPointForPosition(false);
        this.setAnchorPoint(0.5, 0.5);
        //this.setColor(color1);

        var draw = new cc.DrawNode();
        this.addChild(draw);

       // draw.drawSegment(cc.p(0, 0), cc.p(this.width, this.height), 1, color2);
       // draw.drawRect(cc.p(0, 0), cc.p(width, height), null, 5, color2);


        draw.drawSegment(cc.p(2, 2), cc.p(this.width - 4, 0), 4, color2);



    }
});
