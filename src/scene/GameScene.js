var GameScenelayer = cc.Layer.extend({
    sprite1 : null,
    _bg_speed : 1,
    player : null,
    player_bullets : null,
    enemys : null,
    ctor : function () {
        this._super();
        //add background
        var size = cc.winSize;
        this.sprite1 = new cc.Sprite(res.Background_png,new cc.rect(0,0,size.width,size.height));
        this.sprite1.attr({
            x: size.width / 2,
            y: size.height / 2
        });
        this.addChild(this.sprite1, 0);
        //add playerLayer
        this.player = new PlayerLayer();
        this.addChild(this.player,1);
        //add player's bullet
        this.player_bullets = new BulletLayer(false,this.player);
        this.addChild(this.player_bullets,1);
        //add enemys
        this.enemys = new EnemysPlayer();
        this.addChild(this.enemys,1);
        //add keyboard event
        if( 'keyboard' in cc.sys.capabilities ){
            cc.eventManager.addListener({
                event : cc.EventListener.KEYBOARD,
                onKeyReleased : function (keyCode, event) {

                },
                onKeyPressed : function (keyCode, event) {
                    console.log(keyCode);
                }
            },this);
        }else{
            cc.log("keyboard not supported");
        }
        //add touch event
        if( 'touches' in cc.sys.capabilities ){
            cc.eventManager.addListener({
                event : cc.EventListener.TOUCH_ONE_BY_ONE,
                onTouchBegan : this.onTouchBegan,
                onTouchMoved : this.onTouchMoved,
                onTouchEnded : this.onTouchEnded,
                onTouchCancelled : this.onTouchCancelled
            },this);
        }else{
            cc.log('touches not supported');
        }
        //add mouse event
        if( 'mouse' in cc.sys.capabilities ){
            cc.eventManager.addListener({
                event : cc.EventListener.MOUSE,
                onMouseDown : function (event) {
                    var pos = event.getLocation();
                    //alert(pos.x+ " "+ pos.y);
                    var target = event.getCurrentTarget();
                    if(event.getButton() === cc.EventMouse.BUTTON_LEFT){

                        target.player.moveToP(pos);
                    }

                },
                onMouseMove : function (event) {

                },
                onMouseUp : function (event) {

                }
            },this);
        }else{
            cc.log('mouse not supported');
        }


        //
        this.scheduleUpdate();
    },
    onTouchBegan : function (touch, event) {
        alert(touch.getLocation().x);
        return false;
    },
    onTouchMoved : function (touch, event) {
        return false;
    },
    onTouchEnded : function (touch, event) {
        return false;
    },
    onTouchCancelled : function (touch, event) {
        return false;
    },
    update : function(){

    }

});


var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameScenelayer();

        this.addChild(layer,0);
    }
});

