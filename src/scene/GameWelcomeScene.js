
var GameWelcomeLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        this._super();
        var size = cc.winSize;
        var helloLabel = new cc.LabelTTF("飞机大战", "Arial", 38);
        helloLabel.x = size.width / 2;
        helloLabel.y = size.height / 2 + 200;
        this.addChild(helloLabel, 5);

        this.sprite = new cc.Sprite(res.Background_png,new cc.rect(0,0,size.width,size.height));
        var param = {}
        param.minFilter = gl.LINEAR;
        param.magFilter = gl.LINEAR;
        param.wrapS = gl.REPEAT;
        param.wrapT = gl.REPEAT;
        this.sprite.getTexture().setTexParameters(param);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite, 0); 

        var menuFont1 = new cc.MenuItemFont("开始游戏",this.startGame,this);
        menuFont1.fontSize = 22;
        menuFont1.fontName = 'Arial';
        menuFont1.color = cc.color(0,0,0,0.86);
        menuFont1.setPosition(cc.p(0,0));
        var menuFont2 = new cc.MenuItemFont("排行版",this.help,this);
        menuFont2.fontSize = 22;
        menuFont2.fontName = 'Arial';
        menuFont2.color = cc.color(0,0,0,0.86);
        menuFont2.setPosition(cc.p(0,-50));
        var menuFont3 = new cc.MenuItemFont("帮助",this.rank,this);
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
    startGame : function(){
        var gameScene = new GameScene();
        cc.director.runScene(new cc.TransitionFade(2,gameScene));
    },
    help : function () {
        alert('help');
    },
    rank : function () {
        alert('rank');
    }
});

var GameWelcomeScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameWelcomeLayer();
        this.addChild(layer);
    }
});

