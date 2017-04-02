var gravity = 0.9; // Constante
var velocity = 9; // Velocidad. Disminuye por la gravedad.
var position = 210; // posicion del pajaro
var fps = 40;

$(document).ready(function() {   
   
   setInterval(mainloop, fps);    //Actualiza la posición del pajaro
   
   
})

function mainloop() {
   var player = $(".bird");
   
   velocity -= gravity;
   position -= velocity; 
   console.log();

   // Aquí los pasamos el valor de la posicion en cada momento al CSS.
   $(".bird").css({"top": position + "px"}) 

   //Límites
   if (position < 32 || position > 395){
      gravity = 0; velocity = 0;
      noAnimation()
      
   }
}

// Funcion para saltar
$(document).on("click", function(){
      velocity = 12;
})    

//función para desactivar animaciones css

function noAnimation (){
   $("#container-floor").css({"-webkit-animation-play-state": 'paused'});
   $("#container-sky").css({"-webkit-animation-play-state": 'paused'});
   $(".div-obstacle-top").css({"-webkit-animation-play-state": 'paused'});
   $(".div-obstacle-bottom").css({"-webkit-animation-play-state": 'paused'});
   $(".ceiling").css({"-webkit-animation-play-state": 'paused'});
   $(".bird").css({"-webkit-animation-play-state": 'paused'})
}

