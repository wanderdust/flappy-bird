var environment = {
   gravity: 0.25,         // Constante
   fps: 1000/60,          // el loop se ejecuta 60fps 
   fallCondition: 0,      // Pasa a ser -1 cuando choca con un obstaculo y asi se pone la velocidad a 0 en la funcion jump()
   obstacleCount: 179,    //Variable para el bucle que genera los obstaculos
   obstacleCountStop: function(){return this.obstacleCount = 181},
   animationStop: function(){
      $(".animated").css({"-webkit-animation-play-state": 'paused'})    //funcion para desactivar animaciones css
   },
}

var bird = {
   width: 34,           
   height: 24,
   positionX: 60,      //Posicion X del pájaro
   positionY: 210,     // guarda la posicion del pajaro en cada frame
   velocityY: 6,       // Velocidad -y del pajaro. No cte.
   velocityReset: 7.2    // Es constante. Variable para resetear la velocidad a 6  
}


var monster = {
   width: 60,
   height: 49,
   positionX:1400,   //Guarda la posicion -X del monster en cada frame. 1400px es la inicial.
   positionY: 0,    //guarda la posicion aleatoria -Y entre 49px y 371px (ver monsterCreate())
   positionYGenerator:function(){return Math.random()*(322)+49;},    //Genera un numero aleatorio de posicion -Y que mas adelante se guarda en positionY
   velocityX:-5,     //numero de px que avanza en cada frame. Cte
   unique: 1,        //variable para que solo se pueda crear un monstruo a la vez
   move: function(){    
      this.positionX += this.velocityX;
      $(".monster").css({"left":this.positionX+ "px"});     
   },                                 // Actualiza positionX en cada frame
   stop: function(){
      return this.velocityX = 0;
   }                                  // Pone a 0 velocityX, para que el monstruo deje de avanzar

}


var banana = {
   height: 20,
   width: 20,
   positionX:1400,     //Guarda la posicion -X de banana en cada frame. 1400px es la inicial.
   positionY: 0,        //guarda la posicion aleatoria -Y generada por positionYGenerator
   positionYGenerator:function(){
      return $(".obstacle-bottom:last").position().top - 60;
   },                      //Genera una posicion entre obstacle top y obstacle bottom
   velocityX: -3,       //número de px que avanza en cada frame
   unique: 1,           //variable para que solo se pueda crear un monstruo a la vez
   move: function(){    
      this.positionX += this.velocityX;
      $(".banana").css({"left":this.positionX+ "px"});     
   },                                   // Actualiza positionX en cada frame
   remove: function(){
      $(".banana").remove();
   },                                     //Elimina el objeto DOM de banana
   stop: function(){
      return this.velocityX = 0;
   }                                       // Pone a 0 velocityX, para que el monstruo deje de avanzar                               
}


$(document).ready(function() {   
   
   var gameInterval = setInterval(mainloop, environment.fps);    //Actualiza la posicion del pajaro en cada frame
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

   //Crea elementos en el juego
   //addObject(monster, "monster");
   //addObject(banana, "banana");

   //Hace que el objeto avance
   moveObject(banana);
   moveObject(monster);

   //Elimina los objetos que se salen del mapa
   removeObject(monster, "monster");
   removeObject(banana, "banana");

   bananaRandom();
   
};

// Funcion para saltar. Si toca el suelo deja de funcionar.
   function jump(){
      $(document).on("click", function(){
         if(bird.positionY<397 && environment.fallCondition === 0){
            bird.velocityY = bird.velocityReset;
         }
      }); 
   }

// Establece los limites en el mapa
function offLimits(){
   //Limites 
      // 1. Limites suelo-Game over 
   if (bird.positionY >= 397){
      environment.gravity = 0; 
      bird.velocityY = 0;     
      bird.positionY=397;    
      gameOver();
      // 2. Limites techo-rebote abajo
   } else if(bird.positionY < 35){
      bird.velocityReset = -environment.gravity;
      bird.velocityY = bird.velocityReset;
   } else {
      bird.velocityReset = 7.2;
   };
}


// Aqui se crean los nuevos divs de obstaculos de diferentes tamanos
function obstacleGenerator (){
   var randomNumber = (Math.floor(Math.random()*(165))+35);
   var heightTop = randomNumber;
   var heightBottom = 235-randomNumber;

   $("#gameplay-area").append("<div class='obstacle-animated animated'><div class='obstacle-top' style='height:"+heightTop+"px;'></div><div class='obstacle-bottom' style='height:"+heightBottom+"px;'></div></div>");

};

//Bucle de 0 a 45 que ejecuta la funcion obstacleGenerator

function obstacleTimer(){
   environment.obstacleCount++;
   if (environment.obstacleCount === 180){
      obstacleGenerator();
      environment.obstacleCount = 0;

   }
}


//Funcion que elimina los obstaculos cuando desparecen de la pantalla

function obstacleDelete(){
   if ($(".obstacle-animated:first").position().left < -90){
      $(".obstacle-animated:first").remove();

   }
};

// Cuando el pájaro se choca cae al suelo
function fallDown(){
   environment.animationStop();
   environment.fallCondition = -1
   environment.obstacleCountStop(); //para que deje de ejecutarse la funcion obstacleGenerator()
}


//Para todo el juego
function gameOver(){
   fallDown();
   monster.stop();
   banana.stop();
   environment.animationStop(); 
   environment.obstacleCountStop()   //PARA (stop) el generador de obstáculos
}

//funcion para las colisiones
function collisionDetector(obj1, obj2, func){
   if (obj1.positionX < obj2.positionX + obj2.width &&
      obj1.positionX + obj1.width > obj2.positionX &&
      obj1.positionY < obj2.positionY + obj2.height &&
      obj1.height + obj1.positionY > obj2.positionY) {
         func(); //Realizar alguna accion
         
   }
}

// Detector de colisiones

function isCollide() { //No puedo refactorizar las 2 primeras porque la posicion depende del tiempo y no del px, ya que funciona con CSS
   //Detector de colisiones obstacle-top 
   if( bird.positionX < $(".obstacle-animated").position().left + 90 &&
       bird.positionX + bird.width > $(".obstacle-animated").position().left &&
       bird.positionY < $(".obstacle-top").position().top + $(".obstacle-top").height() + 32 &&
      bird.height +bird.positionY > 0) {
         gameOver();
   }     
   
   //Detector de colisiones obstacle-bottom
   if (bird.positionX < $(".obstacle-animated").position().left + 90 &&
      bird.positionX + bird.width > $(".obstacle-animated").position().left &&
      bird.positionY > 388 - $(".obstacle-bottom").height() &&
      bird.height + bird.positionY < 388) {  
         gameOver();
   }
    
   collisionDetector(bird, monster, gameOver);

   collisionDetector(bird, banana, banana.remove);
  
}



// Que aparezca un platano o monstruo en el mapa

function addObject(obj, className){
    if(obj.unique == 1){ //si es 0 retorna false, si es cualquier otro numero retorna true
         var x = obj.positionYGenerator();
         obj.positionY = x;
         $("#gameplay-area").append("<div class='"+className+" animated' style='top:"+ obj.positionY +"px'></div>");
         obj.unique = 0;
     } 
}

// Que el platano o monstruo se mueva

function moveObject(obj){
   if(obj.unique !== 1){
      obj.move();
   }
}


// Elimina los objetos que se han salido del mapa

function removeObject(obj, className){
   if(obj.positionX < -50){
         $("."+className).remove();
         obj.positionX = 1400;
         obj.unique = 1;
      }
}

function bananaRandom(){
   if(banana.unique === 1 && environment.obstacleCount == 10){
      addObject(banana, "banana");
   }
}