var GameScenelayer = cc.Layer.extend({
    background : null,
    _bg_speed : 1,
    player : null,
    player_bullets : null,
    enemys : null,
    ctor : function () {
        this._super();
        //add background
        var size = cc.winSize;
        /*
        this.background = new cc.Sprite(res.Background_png,new cc.rect(0,0,size.width,size.height));
        this.background.attr({
            x: size.width / 2,
            y: size.height / 2
        });*/
        this.background = new cc.LayerColor(cc.color(0,0,0),size.width,size.height);
        this.addChild(this.background, 0);
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
        var pos = touch.getLocation();
        //alert(pos.x+ " "+ pos.y);
        var target = event.getCurrentTarget();
        target.player.moveToP(pos);
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
    update : function() {
        //我方子弹与敌方飞机碰撞检测
        var i, j;
        for(i = 0; i < this.enemys.enemys.length; i++) {
            for (j = 0; j < this.player_bullets.bullets.length; j++){
              //  console.log(this.enemys.enemys.length + " " + this.player_bullets.bullets.length);
                if(this.enemys.enemys[i] === undefined || this.player_bullets.bullets[j] === undefined){
                    continue;
                }
                if(cc.rectIntersectsRect(this.enemys.enemys[i].getBoundingBox(), this.player_bullets.bullets[j].getBoundingBox())){
                    /*
                    var particleSystem = new cc.ParticleExplosion();
                    particleSystem.texture = cc.textureCache.addImage(res.Particle_png);
                    particleSystem.x = this.enemys.enemys[i].getPosition().x;
                    particleSystem.y = this.enemys.enemys[i].getPosition().y;
                    particleSystem.endRadius = 20;
                    particleSystem.endRadiusVar = 10;
                    this.addChild(particleSystem);*/
                    //用粒子系统实现爆炸效果
                    var particleSystem = new cc.ParticleSystem(res.Particle);
                    this.addChild(particleSystem);
                    particleSystem.setScale(this.enemys._enemy_scale_number);
                    particleSystem.duration = 0.5;
                    particleSystem.x = this.enemys.enemys[i].getPosition().x;
                    particleSystem.y = this.enemys.enemys[i].getPosition().y - 50;
                    //碰撞处理
                    this.enemys.container.removeChild(this.enemys.enemys[i]);
                    this.player_bullets.container.removeChild(this.player_bullets.bullets[j]);
                    this.enemys.enemys[i]._bullet.stopAddBullet();
                    this.enemys.enemys.splice(i,1);
                    this.player_bullets.bullets.splice(j,1);
                    i--;
                    j=0;
                }
            }
        }
        //敌方子弹与我发飞机碰撞检测
        for(i = 0; i < this.enemys.enemyBullets.length; i++){
            var bul = this.enemys.enemyBullets[i];
            //子弹层中没有子弹存在了，清除子弹层节点
            if(bul.bullets.length === 0 && !bul.began){
                this.enemys.removeChild(bul);
                this.enemys.enemyBullets.splice(i,1);
                i--;
                //alert('dg');
            }
            for(j = 0; j < bul.bullets.length; j++){
                //发生碰撞
                if(cc.rectIntersectsRect(this.player.player.getBoundingBox(), bul.bullets[j].getBoundingBox())){
                    bul.container.removeChild(bul.bullets[j]);
                    //alert('f');
                    bul.bullets.splice(j,1);
                    j--;
                }
            }
        }

    }

});


var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameScenelayer();

        this.addChild(layer,0);
    }
});

