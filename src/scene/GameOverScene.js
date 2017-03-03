
var GameOverLayer = cc.Layer.extend({
    background:null,
    ctor:function (args) {
        this._super();
        var size = cc.winSize;
        //add label
        var helloLabel = new cc.LabelTTF("游戏结束\n\n得分："+args, "Arial", 38);
        helloLabel.color = cc.color(0,0,0,0.96);
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        this.addChild(helloLabel, 5);
        //add background
        this.background = new cc.LayerColor(cc.color(60,60,60),size.width,size.height);

        this.addChild(this.background, 0);
        //add menu
        var menuFont1 = new cc.MenuItemFont("重新开始",this.restart,this);
        menuFont1.fontSize = 22;
        menuFont1.fontName = 'Arial';
        menuFont1.color = cc.color(0,0,0,0.86);
        menuFont1.setPosition(cc.p(0,0));
        var menuFont2 = new cc.MenuItemFont("排行版",this.rank,this);
        menuFont2.fontSize = 22;
        menuFont2.fontName = 'Arial';
        menuFont2.color = cc.color(0,0,0,0.86);
        menuFont2.setPosition(cc.p(0,-50));
        var menuFont3 = new cc.MenuItemFont("返回主页",this.returnMain,this);
        menuFont3.fontSize = 22;
        menuFont3.fontName = 'Arial';
        menuFont3.color = cc.color(0,0,0,0.86);
        menuFont3.setPosition(cc.p(0,-100));
        var menu = new cc.Menu(menuFont1,menuFont2,menuFont3);
        this.addChild(menu);
        //var action = cc.scaleTo(2,2,2);
        // helloLabel.runAction(action);

        return true;
    },
    restart : function(){
        var gameScene = new GameScene();
        cc.director.runScene(new cc.TransitionFade(0.5,gameScene));
    },
    returnMain : function () {
        var scene = new GameWelcomeScene();
        cc.director.runScene(new cc.TransitionFade(1,scene));
    },
    rank : function () {
        alert('rank');
    }
});

var GameOverScene = cc.Scene.extend({
    _score : null,
    ctor : function (args) {
        this._super();
        this._score = args;
    },
    onEnter:function () {
        this._super();
        var layer = new GameOverLayer(this._score);
        this.addChild(layer);
    }
});

