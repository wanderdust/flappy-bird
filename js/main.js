var gravity = 0.9; // Constante
var velocity = 9; // Velocidad. Disminuye por la gravedad.
var position = 210; // posicion del pajaro
var fps = 45;

var velocityY = 0; // Variable para darle nuevos valores a velocidad

$(document).ready(function() {   
   
   setInterval(mainloop, fps);    //Actualiza la posición del pajaro en cada frame
   
})

function mainloop() {
   var player = $(".bird");
   
   velocity -= gravity;
   position -= velocity; 
   console.log(velocity);

   // Aqui los pasamos el valor de la posicion en cada momento al CSS.
   $(".bird").css({"top": position + "px"}) 

   //Limites 
      // 1. Limites suelo-Game over
   if (position > 391){
      gravity = 0; 
      velocity = 0;
      noAnimation();    
   }
      // 2. Limites techo-rebote abajo
   if(position < 35){
      velocityY = -4;
      velocity = velocityY  
   } else {
      velocityY = 12;
   }

   // Funcion para saltar. Si toca el suelo deja de funcionar.
   $(document).on("click", function(){
      if(position<391){
         velocity = velocityY;
      }else(velocity = 0)
   }); 
}

   

//funcion para desactivar animaciones css

function noAnimation (){
   $("#container-floor").css({"-webkit-animation-play-state": 'paused'});
   $("#container-sky").css({"-webkit-animation-play-state": 'paused'});
   $(".div-obstacle-top").css({"-webkit-animation-play-state": 'paused'});
   $(".div-obstacle-bottom").css({"-webkit-animation-play-state": 'paused'});
   $(".ceiling").css({"-webkit-animation-play-state": 'paused'});
   $(".bird").css({"-webkit-animation-play-state": 'paused'})
}

