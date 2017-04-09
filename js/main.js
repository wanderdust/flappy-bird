var environment = {
   gravity: 0.25,         // Constante
   fps: 1000/60,          // el loop se ejecuta 60fps 
   fallCondition: 0,      // Pasa a ser -1 cuando choca con un obstaculo y asi se pone la velocidad a 0 en la funcion jump()
   obstacleCount: 179,    //Variable para el bucle que genera los obstaculos
   obstacleCountStop: function(){return this.obstacleCount = 181},
   animationStop: function(){
      $(".animated").css({"-webkit-animation-play-state": 'paused'})    //funcion para desactivar animaciones css
   },
}

var bird = {
   width: 34,           
   height: 24,
   positionX: 60,      //Posicion X del pájaro
   positionY: 210,     // guarda la posicion del pajaro en cada frame
   velocityY: 6,       // Velocidad -y del pajaro. No cte.
   velocityReset: 6,    // Es constante. Variable para darle nuevos valores a velocidad
   

   
}


var monster = {
   width: 60,
   height: 49,
   positionX:1400,   //Guarda la posicion -X del monster en cada frame. 1400px es la inicial.
   positionY: 0, //   //guarda la posicion aleatoria -Y entre 49px y 371px (ver monsterCreate())
   velocityX:-5,     //numero de px que avanza en cada frame. Cte
   unique: 1,        //variable para que solo se pueda crear un monstruo a la vez
   move: function(){    
      this.positionX += this.velocityX;
      $(".monster").css({"left":this.positionX+ "px"});     
   },                                                             // Actualiza positionX en cada frame
   stop: function(){
      return this.velocityX = 0;
   }                                                              // Pone a 0 velocityX, para que el monstruo deje de avanzar

}



$(document).ready(function() {   
   
   var gameInterval = setInterval(mainloop, environment.fps);    //Actualiza la posicion del pajaro en cada frame
});

function mainloop() {        
   bird.velocityY -= environment.gravity;
   bird.positionY -= bird.velocityY; 
   
   // Aqui los pasamos el valor de la posicion en cada momento al CSS.
   $(".bird").css({"top": bird.positionY + "px"}) 
   
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

   monsterCreate();

   monsterDissapear();
   
   
};

// Funcion para saltar. Si toca el suelo deja de funcionar.
   function jump(){
      $(document).on("click", function(){
         if(bird.positionY<397 && environment.fallCondition === 0){
            bird.velocityY = environment.velocityReset;
         }else if(bird.positionY >= 397 && environment.fallCondition === -1){
            environment.velocityY = -4;

         }
      }); 
   }

// Establece los limites en el mapa
function offLimits(){
   //Limites 
      // 1. Limites suelo-Game over 
   if (bird.positionY >= 397){
      environment.gravity = 0; 
      bird.velocityY = 0;
      environment.animationStop(); 
      bird.positionY=397;
      environment.obstacleCountStop()   //PARA (stop) el generador de obstáculos
      monster.stop();
      

      // 2. Limites techo-rebote abajo
   } else if(bird.positionY < 35){
      environment.velocityReset = -environment.gravity;
      bird.velocityY = environment.velocityReset;
   } else {environment
      environment.velocityReset = 7.2;
   };
}


// Aqui se crean los nuevos divs de obstaculos de diferentes tamanos
function obstacleGenerator (){
   var randomNumber = (Math.floor(Math.random()*(165))+35);
   var heightTop = randomNumber;
   var heightBottom = 235-randomNumber;

   $("#gameplay-area").append("<div class='obstacle-animated animated'><div class='obstacle-top' style='height:"+heightTop+"px;'></div><div class='obstacle-bottom' style='height:"+heightBottom+"px;'></div></div>");

};

//Bucle de 0 a 45 que ejecuta la funcion obstacleGenerator cada 45 fps

function obstacleTimer(){
   environment.obstacleCount++;
   if (environment.obstacleCount === 180){
      obstacleGenerator();
      environment.obstacleCount = 0;

   }
}


//Funcion que elimina los obstaculos cuando desparecen de la pantalla

function obstacleDelete(){
   if ($(".obstacle-animated:first").position().left < -90){
      $(".obstacle-animated:first").remove();

   }
};

function collisionDetector(obj1, obj2){
   if (obj1.positionX < obj2.positionX + obj2.width &&
      obj1.positionX + obj1.width > obj2.positionX &&
      obj1.positionY < obj2.positionY + obj2.height &&
      obj1.height + obj1.positionY > obj2.positionY) {
         fallDown();
         monster.stop();
   }
}

// Detector de colisiones

function isCollide() {
   //Detector de colisiones obstacle-top 
   if( bird.positionX < $(".obstacle-animated").position().left + 90 &&
       bird.positionX + bird.width > $(".obstacle-animated").position().left &&
       bird.positionY < $(".obstacle-top").position().top + $(".obstacle-top").height() + 30 &&
      bird.height +bird.positionY > 0) {
         fallDown();
         monster.stop();
   }     
   
   //Detector de colisiones obstacle-bottom
   if (bird.positionX < $(".obstacle-animated").position().left + 90 &&
      bird.positionX + bird.width > $(".obstacle-animated").position().left &&
      bird.positionY > 388 - $(".obstacle-bottom").height() &&
      bird.height + bird.positionY < 388) {  
         fallDown();
         monster.stop();
   }
    
     collisionDetector(bird, monster);
  
}

// Cuando el pájaro se choca cae al suelo
function fallDown(){
   environment.animationStop();
   environment.fallCondition = -1
   environment.obstacleCountStop(); //para que deje de ejecutarse la funcion obstacleGenerator()
   bird.positionY += environment.gravity;


}

// Que aparezca un monstruo y se mueva por el mapa.
function monsterCreate(){
     if(monster.unique == 1){ //si es 0 retorna false, si es cualquier otro numero retorna true
         monster.positionY = Math.random()*(322)+49
         $("#gameplay-area").append('<div class="monster animated" style="top:'+ monster.positionY +'px"></div>');
         monster.unique = 0;
     } else{ 
      monster.move();
      
   }
}

function monsterDissapear(){
   if(monster.positionX < -50){
         $(".monster").remove();
         monster.positionX = 1400;
         monster.unique = 1;
      }
}



