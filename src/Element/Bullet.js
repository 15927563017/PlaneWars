var BulletLayer = cc.Layer.extend({
    bullets : null,
    is_enemy : null,
    _enemy_bullet_speed : 2,
    _player_bullet_speed : 4,
    _enemy_bullet_add : 1.6,
    _player_bullet_add : 0.8,
    plane : null,
    container : null,
    ctor : function (isEnemy, mPlane ) {
        this._super();
        this.is_enemy = isEnemy;
        this.plane = mPlane;
        var size = cc.winSize;
        this.bullets = new Array();
        this.container = new cc.Sprite();
        this.addChild(this.container,1);
        //
        var bulletTime = this.is_enemy ? this._enemy_bullet_add : this._player_bullet_add;
        this.schedule(this.addNewBullet,bulletTime);
        this.schedule(this.moveBullets,0.025);
    },
    moveBullets : function () {
        // alert(point.x + ","+point.y);
        var size = cc.winSize;
        for(var i = 0;i < this.bullets.length; i++){
            if(this.bullets[i].getPositionX() + this.bullets[i].getContentSize().width / 2 < 0 ||
              this.bullets[i].getPositionX() - this.bullets[i].getContentSize().width / 2 > size.width ||
              this.bullets[i].getPositionY() + this.bullets[i].getContentSize().height / 2 < 0 ||
              this.bullets[i].getPositionY() - this.bullets[i].getContentSize().height / 2 > size.height  )
            {

                this.container.removeChild(this.bullets[i]);
                this.bullets.splice(i,1);
                if(this.bullets.length == 0)
                    continue;
            }
            var bullet = this.bullets[i];
            if(bullet === undefined) {
                continue;
            }
            var bulletSpeed = this.is_enemy ? this._enemy_bullet_speed : this._player_bullet_speed;
            bullet.setPositionX(bullet.getPositionX() + Math.sin((bullet.directionDegree ) * 3.141592 / 180 ) * bulletSpeed);
            bullet.setPositionY(bullet.getPositionY() + Math.cos((bullet.directionDegree ) * 3.141592 / 180 ) * bulletSpeed);
        }
        //console.log(this.bullets.length);
    },
    addNewBullet : function () {
        var bullet = new cc.Sprite();
        var pngRes = this.is_enemy ? res.Enemy_Bullet_png : res.Player1_Bullet_png;
        var bFrame1 = new cc.SpriteFrame(pngRes,new cc.rect(0,0,16,16));
        var bFrame2 = new cc.SpriteFrame(pngRes,new cc.rect(16,0,16,16));
        var animation = new cc.Animation();
        animation.addSpriteFrame(bFrame1);
        animation.addSpriteFrame(bFrame2);
        animation.setDelayPerUnit(1/19);
        var action = cc.animate(animation);
        action.repeatForever();
        bullet.runAction(action);
        if(this.is_enemy){
            bullet.attr({
                x: this.plane.getPositionX(),
                y: this.plane.getPositionY(),
                directionDegree : Math.random()*360 - 180
            });
        }else{
            bullet.attr({
                x: this.plane.player.getPositionX(),
                y: this.plane.player.getPositionY(),
                directionDegree : this.plane.player.directionDegree
            });
        }

       // console.log(bullet.directionDegree);
        this.bullets.push(bullet);
        this.container.addChild(bullet,5);
        //alert('f');
    }


});