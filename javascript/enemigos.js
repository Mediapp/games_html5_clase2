Q.animations("goomba_anim", {
	caminar : {
		frames : [1, 0],
		rate : 1 / 4
	}
});

Q.animations("tortuga_verde_anim", {
	caminar : {
		frames : [0, 1],
		rate : 1 / 4,
		loop : false
	}
});

//ANIMACION TORTUGA VERDE ALADA(TAREA1)
Q.animations("tortuga_verde_alada_anim", {
	caminar : {
		frames : [5, 6],
		rate : 1 / 4,
		loop : false
	}
});

//DEFINICION TORTUGA VERDE ALADA
Q.Sprite.extend("TortugaVerdeAlada", {
	init : function(p) {

		this._super(p, {
			sheet : "enemigos_altos",
			sprite : "tortuga_verde_alada_anim", //note que usamos una animacion que definimos
			x : 200,
			y : 40,
			vx : 120,
			frame : 0
		});

		//HABILITAMOS LOS MODULOS PARA QUE LA TORTUGA TENGA ANIMACIONES Y REBOTE
		this.add("2d, aiBounce, animation");

	},
	step : function() {

		//invertimos la animacion dependiendo de si esta caminando a la derecha o la izquierda
		if (this.p.vx > 0) {

			this.p.flip = "x";
			this.play("caminar");

		} else if (this.p.vx < 0) {

			this.p.flip = false;
			this.play("caminar");

		}
	}
});

Q.Sprite.extend("Goomba", {
	init : function(p) {

		this._super(p, {
			sheet : "enemigos_bajos",
			sprite : "goomba_anim",
			x : 110,
			y : 40,
			vx : 120,
			frame : 0,
			jumpSpeed : -300
		});

		this.add("2d, aiBounce, animation");
		this.play("caminar");
	}
});

Q.Sprite.extend("TortugaVerde", {
	init : function(p) {

		this._super(p, {
			sheet : "enemigos_altos",
			sprite : "tortuga_verde_anim",
			x : 180,
			y : 40,
			vx : 120,
			frame : 0,
			jumpSpeed : -300
		});

		this.add("2d, aiBounce,animation");
	},
	step : function() {

		if (this.p.vx > 0) {

			this.p.flip = "x";
			this.play("caminar");
		} else if (this.p.vx < 0) {

			this.p.flip = false;
			this.play("caminar");
		}
	}
});
