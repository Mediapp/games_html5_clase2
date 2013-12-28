
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
			jumpSpeed : -500
		});

		this.add("2d, platformerControls, animation");

	},
	step : function() {

		if (this.p.vx > 0 && this.p.vy === 0) {

			this.p.flip = false;
			this.play("caminar");
		} else if (this.p.vx < 0 && this.p.vy === 0) {

			this.p.flip = "x";
			this.play("caminar");
		} else if (this.p.vx === 0 && this.p.vy === 0) {

			this.play("quieto");
		} else if (this.p.vy !== 0) {

			this.play("saltar");
		}

	}
});
