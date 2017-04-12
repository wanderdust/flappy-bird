var score = {
   init: 0,                //puntuacion inicial con decimales
   count: 0,               //puntuacion actual sin decimales
   amount: 0.2,            //Cantidad de puntos que se suman por cada frame
            
   increase: function(){   // sumador de puntos por cada frame
   	if(monster.velocityX){
		var sum = (this.init+=this.amount);
   		this.count = sum.toFixed(0);
   		$("#points").html(this.count);
   		}	
   },
   multiplyScore: function(){    //cambia amount a x2 o x3
   	if(!inmune.have){
   		this.amount = 0.2
   	}else if(inmune.have && this.tripleScore && monster.velocityX !== 0){
   		this.amount = 0.6;
   		$("#points").append('<span class="multiply"> x3<span>')
   	}else if (inmune.have && monster.velocityX !== 0){
   		this.amount = 0.4;
   		$("#points").append('<span class="multiply"> x2<span>')
   	}
   },
   tripleScore: false,        //TripleScore es false por defecto
   
};

// Aumenta la dificultad a medida que avanas en el juego
function addDificutly(){
   if(score.count > 200 && score.count < 900){
      environment.obstacleHeight = 235;
   }else if (score.count > 900 && score.count < 1500){
       environment.obstacleHeight = 260;
   }else if (score.count > 1500 && score.count < 2000){
       environment.obstacleHeight = 270;
       banana.addRandom = 0.6;
       monster.addRandom = 0.95;
   }else if (score.count > 2000){
      environment.obstacleHeight = 275;
       banana.addRandom = 0.5;
       monster.addRandom = 0.94;
   }else{environment.obstacleHeight = 235}
}