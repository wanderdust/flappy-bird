
$(document).ready(function() {      
   var gameLoop = false;
   startGame();
   
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

   //Hace que el objeto avance
   moveItem(banana);
   moveItem(monster);

   //Elimina los objetos que se salen del mapa
   removeItem(monster, "monster");
   removeItem(banana, "banana");

   //Los crea aleatoriamente
   bananaRandom();
   monsterRandom();

   //Establece cuando el bird es invencible
   invencibility();

   //Lleva la cuenta de la puntuacion
   score.increase(); 

   //Lleva la cuenta de cuando la puntuacion aumenta por coger algo
   score.multiplyScore();

   //Aumenta la dificultad a medida que ganas puntos
   addDificutly();

   
};
