var EnemysPlayer = cc.Layer.extend({
    enemys : null,
    enemyBullets : null,
    container : null,
    _enemy_speed : 4,
    _enemy_scale_number : null,
    _player : null,
    ctor : function (args) {
        this._super();
        this._player = args;
        var size = cc.winSize;
        var minlength = size.width > size.height ? size.height : size.width;
        this._enemy_scale_number = minlength / 850;
        this.enemys = new Array();
        this.enemyBullets = new Array();
        this.container = new cc.Sprite();
        //
        this.addChild(this.container);
        this.schedule(this.addNewEnemy,3);
        this.schedule(this.moveEnemys,0.15);
    },
    moveEnemys : function () {
        // alert(point.x + ","+point.y);
        var size = cc.winSize;
        for(var i = 0;i < this.enemys.length; i++){
            if(this.enemys[i].getPositionX() + this.enemys[i].getContentSize().width / 2 < 0 ||
                this.enemys[i].getPositionX() - this.enemys[i].getContentSize().width / 2 > size.width ||
                this.enemys[i].getPositionY() + this.enemys[i].getContentSize().height / 2 < 0 ||
                this.enemys[i].getPositionY() - this.enemys[i].getContentSize().height / 2 > size.height  )
            {

               this.container.removeChild(this.enemys[i]);
                this.enemys.splice(i,1);
                if(this.enemys.length == 0)
                    continue;
            }
            var enemy = this.enemys[i];
            if(enemy === undefined) {
                continue;
            }
            //console.log(bullet.directionDegree + "," + Math.sin((bullet.directionDegree + 5) / 180 )*this._bullet_speed+","+ Math.cos((bullet.directionDegree + 5) / 180 )*this._bullet_speed);
            enemy.setPositionX(enemy.getPositionX() + Math.sin((enemy.directionDegree ) * 3.141592 / 180 ) * this._enemy_speed);
            enemy.setPositionY(enemy.getPositionY() + Math.cos((enemy.directionDegree ) * 3.141592 / 180 ) * this._enemy_speed);
        }
        //console.log(this.enemys.length);
    },
    addNewEnemy : function () {
        var enemy = new cc.Sprite(res.Enemy1_png,new cc.rect(0,0,49,58));
        var size = cc.winSize;
        enemy.setScale(this._enemy_scale_number);
        enemy.attr({
            x: Math.random()*(size.width - enemy.getContentSize().width) + enemy.getContentSize().width / 2,
            y: Math.random()*(size.height - enemy.getContentSize().height) + enemy.getContentSize().height / 2,
            directionDegree :Math.random()*360 - 180
        });
        //禁止敌方飞机出现的地方与玩家飞机重合
        if(cc.rectIntersectsRect(enemy.getBoundingBox(), this._player.player.getBoundingBox())){
            return;
        }
        var bullet = new BulletLayer(true, enemy);
        enemy._bullet = bullet;
        this.enemyBullets.push(bullet);
        this.container.addChild(bullet, 5);
        this.enemys.push(enemy);
        this.container.addChild(enemy,5);
        //alert('f');
    },



});