var gravity = 0.9; // Constante
var velocity = 12; // Velocidad. Disminuye por la gravedad.
var position = 210; // posicion del pajaro

$(document).ready(function() {   //se ejecuta 60 veces por segundo
   setInterval(mainloop, 60);    //Actualiza la posición del pajaro
   
   $("body").on("click", function(){
      velocity = 12;
   })

})


function mainloop() {
   var player = $(".bird");
   
   velocity -= gravity;
   position -= velocity; 
   console.log(velocity)

   $(".bird").css({"top": position + "px"})
   //Aquí los calculos que ejecuten la parábola.

   // Aquí los pasamos el valor de la posicion en cada momento al CSS.
   // Se actualizará con cada intervalo.

  
}

 