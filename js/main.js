var gravity = 0.9; // Constante
var velocity = 9; // Velocidad. Disminuye por la gravedad.
var position = 210; // posicion del pajaro
var fps = 45;

var velocityY = 0; // Variable para darle nuevos valores a velocidad
var random = (Math.floor(Math.random() * 1001) + 3000);


$(document).ready(function() {   
   
   setInterval(mainloop, fps);    //Actualiza la posición del pajaro en cada frame
   setInterval(obstacleGenerator , random) //Generador de obstaculos cada 3-4 segundos
})

function mainloop() {
   var player = $(".bird");
   
   velocity -= gravity;
   position -= velocity; 
   console.log();

   // Aqui los pasamos el valor de la posicion en cada momento al CSS.
   $(".bird").css({"top": position + "px"}) 

   //Limites 
      // 1. Limites suelo-Game over
   if (position >= 397){
      gravity = 0; 
      velocity = 0;
      noAnimation(); 
      position=397;   
   }
      // 2. Limites techo-rebote abajo
   if(position < 35){
      velocityY = -4;
      velocity = velocityY;
   } else {
      velocityY = 12;
   }

   // Funcion para saltar. Si toca el suelo deja de funcionar.
   $(document).on("click", function(){
      if(position<397){
         velocity = velocityY;
      }else(velocity = 0)
   }); 
   
   //obstacleDelete()
}

   

//funcion para desactivar animaciones css

function noAnimation (){
   $("#container-floor").css({"-webkit-animation-play-state": 'paused'});
   $("#container-sky").css({"-webkit-animation-play-state": 'paused'});
   $(".obstacle-animated").css({"-webkit-animation-play-state": 'paused'});
   $(".ceiling").css({"-webkit-animation-play-state": 'paused'});
   $(".bird").css({"-webkit-animation-play-state": 'paused'})
}

function obstacleGenerator (){ //Seguir probando con arrays a ver.
   $("#obstacle").after("<div id='obstacle' class='obstacle-animated'><div class='obstacle-top'></div><div class='obstacle-bottom'></div></div>")
}
    //$(".div-obstacle-bottom").after("<div class='div-obstacle-bottom'><div class='obstacle-bottom'></div></div>")

//Intento de generador de obstaculos por posicion

 /*function obstacleGenerator() {
   if($(".div-obstacle-bottom").position().left.toFixed(0) < 900 & $(".div-obstacle-bottom").position().left.toFixed(0) >897){
      $(".div-obstacle-bottom").after("<div class='div-obstacle-bottom'><div class='obstacle-bottom'></div></div>")
   }
   
}*/

function obstacleDelete(){
   if ($("#obstacle").position().left < -90){
      $("#obstacle").prev().remove();
   }
}