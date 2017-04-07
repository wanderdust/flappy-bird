var gravity = 1; // Constante
var velocity = 9; // Velocidad. Disminuye por la gravedad.
var position = 210; // posicion del pajaro
var fps = 45;
var velocityY = 0; // Variable para darle nuevos valores a velocidad
var obstacleCount = 64;
var j = -1;
var i = 0;
var fall = 0; // Pasa a ser -1 cuando choca con un obstaculo y así se pone la velocidad a 0 en la funcion jump()

$(document).ready(function() {   
   
   var gameInterval = setInterval(mainloop, fps);    //Actualiza la posición del pajaro en cada frame
});

function mainloop() {
   var player = $(".bird");
      
   velocity -= gravity;
   position -= velocity; 
   
   // Aqui los pasamos el valor de la posicion en cada momento al CSS.
   player.css({"top": position + "px"}) 
   
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
         if(position<397 && fall === 0){
            velocity = velocityY;
         }else if(position >= 397 && fall === -1){
            velocityY = -4;

         }
      }); 
   }

// Establece los limites en el mapa
function offLimits(){
   //Limites 
      // 1. Limites suelo-Game over 
   if (position >= 397){
      gravity = 0; 
      velocity = 0;
      noAnimation(); 
      position=397;
      obstacleCount = 66;//PARA (stop) el generador de obstáculos

      // 2. Limites techo-rebote abajo
   } else if(position < 35){
      velocityY = -4;
      velocity = velocityY;
   } else {
      velocityY = 12;
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
   obstacleCount++;
   if (obstacleCount === 65){
      obstacleGenerator();
      obstacleCount = 0;

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
   fall = -1
   velocityY = false;
   obstacleCount = 66; //para que deje de ejecutarse la funcion obstacleGenerator()
   position += gravity;


}

//Genera un enemigo Spagueti monster
function generateEnemy(){
   $(".bird").after('<div class="monster"></div>')
}

