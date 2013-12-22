Q.animations("goomba_anim", {
	caminar : {
		frames : [1, 0],
		rate : 1 / 4
	},

	aplastar : {
		frames : [3],
		rate : 1,
		loop : false,
		trigger : "aplastado"
	}
});

Q.animations("tortuga_verde_anim", {
	caminar : {
		frames : [0, 1],
		rate : 1 / 4,
		loop : false
	},

	concha : {
		frames : [2, 4],
		rate : 1 / 2,
		loop : false
	}
});

//ANIMACION TORTUGA VERDE ALADA(TAREA1)
Q.animations("tortuga_verde_alada_anim", {
	caminar : {
		frames : [5, 6],
		rate : 1 / 4,
		loop : false
	},
	concha : {
		frames : [2, 4],
		rate : 1 / 2,
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
			frame : 0,
			esConcha : false
		});

		//HABILITAMOS LOS MODULOS PARA QUE LA TORTUGA TENGA ANIMACIONES Y REBOTE
		this.add("2d, aiBounce, animation, tween");

		this.on("bump.top", function(colisiones) {

			if (colisiones.obj.isA("Mario")) {

				//es incorrecto poner
				//this.p.sheet = "enemigos_bajos"; porque no sabe calcular el tamaño

				this.sheet("enemigos_bajos", true);
				//primer parametro indica la hoa de mosaicos a cambiar, true forza el cambio con lo cual recalcula el tamaño del enmigo
				this.p.esConcha = true;
				this.p.vx = 300;
				this.play("concha");
				colisiones.obj.p.vy = -300;

			}

		});

	},
	step : function() {

		if (this.p.esConcha === false) {

			//invertimos la animacion dependiendo de si esta caminando a la derecha o la izquierda
			if (this.p.vx > 0) {

				this.p.flip = "x";
				this.play("caminar");

			} else if (this.p.vx < 0) {

				this.p.flip = false;
				this.play("caminar");

			}

		}

		if (this.p.esConcha === true) {

			this.on("bump.left, bump.right", function(colisiones) {
				if (colisiones.obj.isA("Goomba") || colisiones.obj.isA("TortugaVerde")) {
					Q.audio.play("patada.mp3", {
						debounce : 1500
					});
					colisiones.obj.choqueConcha();
				}
			});

		}

	},

	choqueConcha : function() {

		this.del("2d");

		this.animate({
			y : 400,
			x : this.p.x + 100
		}, 1.5, {
			calback: function (){
				this.destroy();
			}
		});
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

		this.add("2d, aiBounce, animation, tween");
		this.play("caminar");

		//this.on("bump.right, bump.left", this, "colisionDerecha");//otra forma alternativa de escuchar eventos

		this.on("aplastado", function() {

			this.destroy();

		});

		this.on("bump.top", function(colisiones) {//una forma de escuchar eventos
			if (colisiones.obj.isA("Mario")) {//mismo nombre del sprite xtend

				this.p.vx = 0;
				//deteniendo al goomba
				colisiones.obj.p.vy = -300;
				this.play("aplastar");

			}
		});
	},

	colisionDerecha : function(colisiones) {//hay que pasarle una variable que va a cachar las acciones

		if (colisiones.obj.isA("Mario")) {

			colisiones.obj.destroy();

		}

	},

	choqueConcha : function() {

		this.del("2d");

		this.animate({
			y : 400,
			x : this.p.x + 100
		}, 1.5, {
			calback: function (){
				this.destroy();
			}
		});
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
			jumpSpeed : -300,
			esConcha : false
		});

		this.add("2d, aiBounce,animation, tween");
		this.on("bump.top", function(colisiones) {

			if (colisiones.obj.isA("Mario")) {

				//es incorrecto poner
				//this.p.sheet = "enemigos_bajos"; porque no saabe calcular el tamaño

				this.sheet("enemigos_bajos", true);
				//primer parametro indica la hoa de mosaicos a cambiar, true forza el cambio con lo cual recalcula el tamaño del enmigo
				this.p.esConcha = true;
				this.p.vx = 300;
				colisiones.obj.p.vy = -300;
				this.play("concha");

			}

		});

	},
	step : function() {

		if (this.p.esConcha === false) {

			if (this.p.vx > 0) {

				this.p.flip = "x";
				this.play("caminar");
			} else if (this.p.vx < 0) {

				this.p.flip = false;
				this.play("caminar");
			}

		}

		if (this.p.esConcha === true) {

			this.on("bump.left, bump.right", function(colisiones) {
				if (colisiones.obj.isA("Goomba") || colisiones.obj.isA("TortugaVerdeAlada")) {
					Q.audio.play("patada.mp3", {
						debounce : 1500
					});
					colisiones.obj.choqueConcha();
				}
			});

		}

	},

	choqueConcha : function() {

		this.del("2d");

		this.animate({
			y : 400,
			x : this.p.x + 100
		}, 1.5, {
			calback: function (){
				this.destroy();
			}
		});
	}
});
