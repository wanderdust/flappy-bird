var enviroment = {
   gravity: 0.25,          // Constante
   fps: 1000/60,             // el loop se ejecuta 60fps 
   fallCondition: 0,    // Pasa a ser -1 cuando choca con un obstaculo y asi se pone la velocidad a 0 en la funcion jump()
   obstacleCount: 179,    //Variable para el bucle que genera los obstaculos
   obstacleCountStop: function(){return this.obstacleCount = 181},
   animationStop: function(){
      $(".animated").css({"-webkit-animation-play-state": 'paused'})    //funcion para desactivar animaciones css
   },
}

var bird = {
   position: 210,    // posicion del pajaro
   velocityY: 6,     // Velocidad -y del pajaro. No cte.
   velocityReset: 6, // Es constante. Variable para darle nuevos valores a velocidad
   
}

var monster = {
   div:'<div class="monster animated"></div>',
   positionX:1400,
   velocityX:-5,
   unique: 1,   //variable para que solo se pueda crear un monstruo a la vez
   stop: function(){
      return this.velocityX = 0;
   }

}


$(document).ready(function() {   
   
   var gameInterval = setInterval(mainloop, enviroment.fps);    //Actualiza la posicion del pajaro en cada frame
});

function mainloop() {        
   bird.velocityY -= enviroment.gravity;
   bird.position -= bird.velocityY; 
   
   // Aqui los pasamos el valor de la posicion en cada momento al CSS.
   $(".bird").css({"top": bird.position + "px"}) 
   
   // Funcion para que el pájaro salte
   jump();

   // Establece los limites en el mapa
   offLimits();

   //Bucle para generar obstaculos cada 45fps
   obstacleTimer();
   
   //Elimina los obstaculos que se han salido del mapa
   obstacleDelete();
   
   //Detecta cuando bird ha hecho colision
   isCollide();

   //fireball.fire();

   monsterCreate();

   monsterDissapear();

   
};

// Funcion para saltar. Si toca el suelo deja de funcionar.
   function jump(){
      $(document).on("click", function(){
         if(bird.position<397 && enviroment.fallCondition === 0){
            bird.velocityY = enviroment.velocityReset;
         }else if(bird.position >= 397 && enviroment.fallCondition === -1){
            enviroment.velocityY = -4;

         }
      }); 
   }

// Establece los limites en el mapa
function offLimits(){
   //Limites 
      // 1. Limites suelo-Game over 
   if (bird.position >= 397){
      enviroment.gravity = 0; 
      bird.velocityY = 0;
      enviroment.animationStop(); 
      bird.position=397;
      enviroment.obstacleCountStop()   //PARA (stop) el generador de obstáculos
      monster.stop();

      // 2. Limites techo-rebote abajo
   } else if(bird.position < 35){
      enviroment.velocityReset = -enviroment.gravity;
      bird.velocityY = enviroment.velocityReset;
   } else {
      enviroment.velocityReset = 7.2;
   };
}


// Aqui se crean los nuevos divs de obstaculos de diferentes tamanos
function obstacleGenerator (){
   var randomNumber = (Math.floor(Math.random()*(196))+35);
   var heightTop = randomNumber;
   var heightBottom = 265-randomNumber;

   $("#gameplay-area").append("<div class='obstacle-animated animated'><div class='obstacle-top' style='height:"+heightTop+"px;'></div><div class='obstacle-bottom' style='height:"+heightBottom+"px;'></div></div>");

};

//Bucle de 0 a 45 que ejecuta la funcion obstacleGenerator cada 45 fps

function obstacleTimer(){
   enviroment.obstacleCount++;
   if (enviroment.obstacleCount === 180){
      obstacleGenerator();
      enviroment.obstacleCount = 0;

   }
}


//Funcion que elimina los obstaculos cuando desparecen de la pantalla

function obstacleDelete(){
   if ($(".obstacle-animated:first").position().left < -90){
      $(".obstacle-animated:first").remove();

   }
};

// Detector de colisiones

function isCollide() {
   //Detector de colisiones obstacle-top 
   if( 60 < $(".obstacle-animated").position().left + 90 &&
       60 + $(".bird").width() > $(".obstacle-animated").position().left &&
       $(".bird").position().top < $(".obstacle-top").position().top + $(".obstacle-top").height() + 30 &&
       $(".bird").height() + $(".bird").position().top > 0) {

      fallDown();
   }     
   
   //Detector de colisiones obstacle-bottom
   if (60 < $(".obstacle-animated").position().left + 90 &&
      60 + $(".bird").width() > $(".obstacle-animated").position().left &&
      $(".bird").position().top > 388 - $(".obstacle-bottom").height() &&
      $(".bird").height() + $(".bird").position().top < 388) {
   
      fallDown();

   }
    
}

// Cuando el pájaro se choca cae al suelo
function fallDown(){
   enviroment.animationStop();
   enviroment.fallCondition = -1
   enviroment.obstacleCountStop(); //para que deje de ejecutarse la funcion obstacleGenerator()
   bird.position += enviroment.gravity;


}

// Que aparezca un monstruo y se mueva por el mapa.
function monsterCreate(){
     if(monster.unique == 1){ //si es 0 retorna false, si es cualquier otro numero retorna true
         $("#gameplay-area").append(monster.div);
         monster.unique = 0;
     } else{ 
      monster.positionX += monster.velocityX;
      $(".monster").css({"left":monster.positionX+ "px"});
   }
}

function monsterDissapear(){
   if(monster.positionX < -50){
         $(".monster").remove();
         monster.positionX = 1400;
         monster.unique = 1;
      }
}