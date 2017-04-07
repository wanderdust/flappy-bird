var enviroment = {
   gravity: 1,          // Constante
   fps: 45,             // Numero de veces que se ejecuta el loop por segundo
   fallCondition: 0,    // Pasa a ser -1 cuando choca con un obstaculo y asi se pone la velocidad a 0 en la funcion jump()
   obstacleCount: 64    //Variable para el bucle que genera los obstaculos
}

var bird = {
   position: 210,    // posicion del pajaro
   velocity: 9,      // Velocidad y del pajaro
   velocityReset: 0, // Variable para darle nuevos valores a velocidad
}

$(document).ready(function() {   
   
   var gameInterval = setInterval(mainloop, enviroment.fps);    //Actualiza la posicion del pajaro en cada frame
});

function mainloop() {        
   bird.velocity -= enviroment.gravity;
   bird.position -= bird.velocity; 
   
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
   
};

// Funcion para saltar. Si toca el suelo deja de funcionar.
   function jump(){
      $(document).on("click", function(){
         if(bird.position<397 && enviroment.fallCondition === 0){
            bird.velocity = enviroment.velocityReset;
         }else if(bird.position >= 397 && enviroment.fallCondition === -1){
            enviroment.velocityReset = -4;

         }
      }); 
   }

// Establece los limites en el mapa
function offLimits(){
   //Limites 
      // 1. Limites suelo-Game over 
   if (bird.position >= 397){
      enviroment.gravity = 0; 
      bird.velocity = 0;
      noAnimation(); 
      bird.position=397;
      enviroment.obstacleCount = 66;//PARA (stop) el generador de obstáculos

      // 2. Limites techo-rebote abajo
   } else if(bird.position < 35){
      enviroment.velocityReset = -4;
      bird.velocity = enviroment.velocityReset;
   } else {
      enviroment.velocityReset = 12;
   };
}

//funcion para desactivar animaciones css

function noAnimation (){
   $(".animated").css({"-webkit-animation-play-state": 'paused'});
};



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
   if (enviroment.obstacleCount === 65){
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
   var bird = $(".bird");
   var ot = $(".obstacle-top");
   var ob = $(".obstacle-bottom");
   var div = $(".obstacle-animated")
   
   //Detector de colisiones obstacle-top 
   if( 60 < div.position().left + 90 &&
       60 + bird.width() > div.position().left &&
       bird.position().top < ot.position().top + ot.height() + 30 &&
       bird.height() + bird.position().top > 0) {

      fallDown();
   }     
   
   //Detector de colisiones obstacle-bottom
   if (60 < div.position().left + 90 &&
      60 + bird.width() > div.position().left &&
      bird.position().top > 388 - ob.height() &&
      bird.height() + bird.position().top < 388) {
   
      fallDown();

   }
    
}

// Cuando el pájaro se choca cae al suelo
function fallDown(){
   noAnimation();
   enviroment.fallCondition = -1
   enviroment.obstacleCount = 66; //para que deje de ejecutarse la funcion obstacleGenerator()
   bird.position += enviroment.gravity;


}

//Genera un enemigo Spagueti monster
function generateEnemy(){
   $(".bird").after('<div class="monster"></div>')
}

