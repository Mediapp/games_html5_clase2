Q.animations("mario_anim", {
	caminar : {
		frames : [4, 5, 8],
		rate : 1 / 6,
		loop : false
	},
	quieto : {
		frames : [1],
		rate : 1 / 2,
		loop : false
	},
	saltar : {
		frames : [2],
		rate : 1 / 2,
		loop : false
	},
	morir : {
		frames : [12],
		rate : 1,
		loop : false,
		trigger : "muerto"
	}
});

Q.Sprite.extend("Mario", {
	init : function(p) {

		this._super(p, {
			sheet : "mario_enano",
			sprite : "mario_anim",
			frame : 1,
			x : 100,
			y : 50,
			jumpSpeed : -500,
			muerto : false
		});

		this.add("2d, platformerControls, animation, tween");

		this.on("muerto", function() {
			
			this.del("2d");
						
			this.animate({
				y: this.p.y - 50,
				//x: this.p.x + 100
			},0.5, {
				callback: function(){
					this.animate({
						y: 384,
						//x: this.p.x + 100
					}, 2, Q.Easing.Quadratic.Out , {
						callback : function(){
							this.destroy();
						}
					});
				}
			});
			

		});

		this.on("bump.right, bump.left, bump.top", function(colision) {//una forma de escuchar eventos
			if (colision.obj.isA("Goomba") || colision.obj.isA("TortugaVerdeAlada") || colision.obj.isA("TortugaVerde")) {//mismo nombre del sprite xtend

				this.del("platformerControls");
				Q.audio.stop("tema_superficie.mp3");
				Q.audio.play("mario_muere.mp3");
				this.play("morir");
				this.p.muerto = true;

			}
		});
		
		this.on("bump.bottom", function(colision) {//una forma de escuchar eventos
			if (colision.obj.isA("Goomba") || colision.obj.isA("TortugaVerdeAlada") || colision.obj.isA("TortugaVerde")) {//mismo nombre del sprite xtend

				
				Q.audio.play("patada.mp3",{
					debounce : 1500
				});
				

			}
		});

	},
	step : function() {

		if (this.p.muerto === false) {

			if (this.p.vx > 0 && this.p.vy === 0) {

				this.p.flip = false;
				this.play("caminar");
			} else if (this.p.vx < 0 && this.p.vy === 0) {

				this.p.flip = "x";
				this.play("caminar");
			} else if (this.p.vx === 0 && this.p.vy === 0) {

				this.play("quieto");
			} else if (this.p.vy !== 0) {

				Q.audio.play("salto_enano.mp3", {
					debounce : 1500
				});
				this.play("saltar");
			}

		}

	}
});
