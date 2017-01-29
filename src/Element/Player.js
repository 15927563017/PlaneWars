var PlayerLayer = cc.Layer.extend({
    player : null,
    _play_speed : 70,//higher faster
    _scaleInfo : 0.7,
    ctor : function () {
        this._super();

        var size = cc.winSize;
        //add player's plane
        this.player = new cc.Sprite(res.Player1_png,new cc.rect(117 ,0,80,87));
        this.player.setScale(this._scaleInfo);
        this.player.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.player.directionDegree = 0;
        this.addChild(this.player,2);

        //add tails to player
        var tail1 = new cc.SpriteFrame(res.Player1_Tail_png,new cc.rect(0,0,21,50));
        var tail2 = new cc.SpriteFrame(res.Player1_Tail_png,new cc.rect(21,0,21,50));
        var man = new cc.Sprite();
        var animation = new cc.Animation();
        animation.addSpriteFrame(tail1);
        animation.addSpriteFrame(tail2);
        animation.setDelayPerUnit(1/14);
        var action = cc.animate(animation);
        action.repeatForever();
        man.runAction(action);
        this.player.addChild(man);
        man.x = 15;
        man.y = -10;
        var man1 = new cc.Sprite();
        var animation1 = new cc.Animation();
        animation1.addSpriteFrame(tail1);
        animation1.addSpriteFrame(tail2);
        animation1.setDelayPerUnit(1/14);
        var action1 = cc.animate(animation);
        action1.repeatForever();
        man1.runAction(action1);
        this.player.addChild(man1);
        man1.x = 60;
        man1.y = -10;


        //this.schedule(this.moveTo,1);
    },
    moveToP : function (point) {
       // alert(point.x + ","+point.y);
        if(this.last_acton != undefined){
            this.player.stopAction(this.last_acton);
        }
        var dist = this._getDist(this.player.getPosition(),point);
        //console.log(dist);
        var action = cc.moveTo(dist/this._play_speed,point);
        //this.player.setRotation()
        var mdirec = Math.atan2((point.x-this.player.getPositionX()),(point.y-this.player.getPositionY()))*180/3.1415926;
        this.player.directionDegree = mdirec;
        this.player.setRotation(mdirec);
        this.last_acton = action;
        this.player.runAction(action);
    },
    //get the distance between point1 and point2
    _getDist : function (point1, point2) {
        return Math.pow(( Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2) ),0.5);
    }


});