var gravity = 0.9; // Constante
var velocity = 12; // Velocidad. Disminuye por la gravedad.
var position = 210; // posicion del pajaro
var fps = 40;

var test = 666;

$(document).ready(function() {   
   
   setInterval(mainloop, fps);    //Actualiza la posición del pajaro
   
   $("body").on("click", function(){
      velocity = 12;
   })    
})

function mainloop() {
   var player = $(".bird");
   
   velocity -= gravity;
   position -= velocity; 
   console.log();

   // Aquí los pasamos el valor de la posicion en cada momento al CSS.
   $(".bird").css({"top": position + "px"}) 
}


if (position < 0){
   console.log(test)
}