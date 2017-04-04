var gravity = 0.9; // Constante
var velocity = 9; // Velocidad. Disminuye por la gravedad.
var position = 210; // posicion del pajaro
var fps = 45;

var velocityY = 0; // Variable para darle nuevos valores a velocidad
//var random = 2000; //Numero aleatorio para generar obstaculos
var obstacleCount = 44;
var j = -1;

$(document).ready(function() {   
   
   var gameInterval = setInterval(mainloop, fps);    //Actualiza la posición del pajaro en cada frame
   //setInterval(obstacleGenerator, random) //Opcion para crear los obstaculos

});

function mainloop() {
   var player = $(".bird");
   
   
   velocity -= gravity;
   position -= velocity; 
   
   

   // Aqui los pasamos el valor de la posicion en cada momento al CSS.
   player.css({"top": position + "px"}) 

   //Limites 
      // 1. Limites suelo-Game over
   if (position >= 397){
      gravity = 0; 
      velocity = 0;
      noAnimation(); 
      position=397;
      obstacleCount = 46;

   };
      // 2. Limites techo-rebote abajo
   if(position < 35){
      velocityY = -4;
      velocity = velocityY;
   } else {
      velocityY = 12;
   };

   // Funcion para saltar. Si toca el suelo deja de funcionar.
   $(document).on("click", function(){
      if(position<397){
         velocity = velocityY;
      }else(velocity = 0)
   }); 

   //Bucle para generar obstaculos
   
   obstacleCount++;
   if (obstacleCount === 45){
      obstacleGenerator();
      obstacleCount = 0;
   }
   
   obstacleDelete();


};

   

//funcion para desactivar animaciones css

function noAnimation (){
   $("#container-floor").css({"-webkit-animation-play-state": 'paused'});
   $("#container-sky").css({"-webkit-animation-play-state": 'paused'});
   $(".obstacle-animated").css({"-webkit-animation-play-state": 'paused'});
   $(".ceiling").css({"-webkit-animation-play-state": 'paused'});
   $(".bird").css({"-webkit-animation-play-state": 'paused'})
};

// Funcion que generalos obstaculos entre 1 y 4 segundos
function obstacleGenerator (){
   var i = j+1;

   $("#"+j).after("<div class='obstacle-animated' id="+(j+1)+" ><div class='obstacle-top'></div><div class='obstacle-bottom'></div></div>")

   var randomNumber = (Math.random()*5.9)+1.1
   var heightTop = 210/randomNumber;
   var heightBottom = 210-heightTop

     $("#"+i+" .obstacle-top").css({"height": heightTop + "px"})
   $("#"+i+" .obstacle-bottom").css({"height": heightBottom + "px"})

   j++;

   console.log(randomNumber)
};


//Funcion que elimina los obstaculos cuando desparecen de la pantalla

function obstacleDelete(){
   if ($(".obstacle-animated:first").position().left < -90){
      $(".obstacle-animated:first").remove();

   }
};


