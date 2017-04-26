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
   tripleScore: false,        //TripleScore es false por defecto
   multiplyScore: function(){    //cambia amount a x2 o x3
   	if(!inmune.have){
   		this.amount = 0.2
   	}else if(inmune.have && this.tripleScore && monster.velocityX){
   		this.amount = 0.6;
   		$("#points").append('<span class="multiply"> x3<span>')
   	}else if (inmune.have && monster.velocityX){
   		this.amount = 0.4;
   		$("#points").append('<span class="multiply"> x2<span>')
   	}
   },
   final: [0],            //Array with the current score
   splitScore: [],        //Array with the current splited score
   highScore: [],         //Array with the highest Score
   splitHighScore: []     //Array with the highest splited score
};

// Aumenta la dificultad a medida que avanas en el juego
function addDificutly(){
  if(score.count < 199){
    environment.obstacleHeight = 200
  }else if(score.count > 200 && score.count < 900){
      environment.obstacleHeight = 235;
   }else if (score.count >= 900 && score.count < 1500){
       environment.obstacleHeight = 250;
   }else if (score.count >= 1500 && score.count < 2000){
       environment.obstacleHeight = 260;
       banana.addRandom = 0.6;
       monster.addRandom = 0.95;
   }else if (score.count >= 2000){
      environment.obstacleHeight = 275;
       banana.addRandom = 0.5;
       monster.addRandom = 0.94;
   }
}


//Hace los calculos para poner las imagenes de los numeros en vez de solo numeros
function finalScore(){
  score.final.splice(0,1,score.count);
  score.splitScore = score.final[0].split("");
  score.highScore.push(score.count);
  var sortedScore = score.highScore.sort(function(a,b){return b-a});
  score.splitHighScore = sortedScore[0].split("");
}

//Incluye la puntuacion final y mas alta en el DOM
function showScore(){
  for(var i = 0; i<score.splitScore.length; i++){
    $("#scoreFinal").append("<img class='font-numbers' src='images/font_small_"+score.splitScore[i]+".png'></img>");
  }
  for(var i = 0; i<score.splitHighScore.length; i++){
     $("#highScore").append("<img class='font-numbers' src='images/font_small_"+score.splitHighScore[i]+".png'></img>");
  }
  showMedal()
}

//Te da una medalla en funcion de tu puntuacion
function showMedal(){
  if(score.count >= 2000){
    $("#medal").html("<img src='images/medal_platinum.png'></img>")
  }else if(score.count>=1500){
    $("#medal").html("<img src='images/medal_gold.png'></img>")
  }else if(score.count>=1000){
    $("#medal").html("<img src='images/medal_silver.png'></img>")
  }else if(score.count>=500){
    $("#medal").html("<img src='images/medal_bronze.png'></img>")
  }
}

