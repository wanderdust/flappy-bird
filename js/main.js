var gravity = ((Math.pow(1.1),2)-1); // Fuerza exponencial que tira hacia abajo
var velocity = 15; // Numero constante
var position = 220; // posicion del pajaro

$(document).ready(function() {   //se ejecuta 60 veces por segundo
   setInterval(mainloop, 60);    //Actualiza la posición del pajaro
});

function mainloop() {
   var player = $(".bird");
   
   velocity -= gravity;
   position -= velocity; 
   console.log(position)

   $(".bird").css({"top": position + "px"})
   //Aquí los calculos que ejecuten la parábola.

   // Aquí los pasamos el valor de la posicion en cada momento al CSS.
   // Se actualizará con cada intervalo.
}