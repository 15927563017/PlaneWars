
var GameHelpLayer = cc.Layer.extend({
    background:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;
        //add label
        var helloLabel = new cc.LabelTTF("游戏帮助", "Arial", 38);
        helloLabel.color = cc.color(0,0,0,0.96);
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + size.height / 3;
        this.addChild(helloLabel, 5);
        //add game introduction
        var intro = new cc.LabelTTF("这是一款飞机大战类型的游戏\n玩家通过操控鼠标或者点击屏幕控制飞机的前进方向\n要求玩家在有限的生命值内打中尽可能多的敌机，以得到更高的分数\n被敌机子弹打中一次,血量会减少十分之一;与敌机相撞会直接结束游戏", "Arial", 38);
        intro.color = cc.color(0,0,0,0.96);
        intro.fontSize = 18;
        intro.x = size.width / 2;
        intro.y = size.height / 2 + size.height / 10;
        intro.textAlign = cc.TEXT_ALIGNMENT_CENTER;
        this.addChild(intro, 5);
        //add background
        this.background = new cc.LayerColor(cc.color(60,60,60),size.width,size.height);
        this.addChild(this.background, 0);

        var menuFont1 = new cc.MenuItemFont("返回主页",this.returnMain,this);
        menuFont1.fontSize = 22;
        menuFont1.fontName = 'Arial';
        menuFont1.color = cc.color(0,0,0,0.86);
        menuFont1.setPosition(cc.p(0,- size.height / 4));
        var menu = new cc.Menu(menuFont1);
        this.addChild(menu);
        //var action = cc.scaleTo(2,2,2);
        // helloLabel.runAction(action);

        return true;
    },

    returnMain : function () {
        var scene = new GameWelcomeScene();
        cc.director.runScene(new cc.TransitionFade(1,scene));
    }
});

var GameHelpScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameHelpLayer();
        this.addChild(layer);
    }
});

