var environment = {
   gravity: 0.25,         // Constante
   fps: 1000/60,          // el loop se ejecuta 60fps 
   fallCondition: false,      // Pasa a ser true cuando choca con un obstaculo y asi se pone la velocidad a 0 en la funcion jump()
   obstacleCount: 119,    //Variable para el bucle que genera los obstaculos
   obstacleCountStop: function(){return this.obstacleCount = 121},
   animationStop: function(){
      $(".animated").css({"-webkit-animation-play-state": 'paused'});    //funcion para desactivar animaciones css
      $(".animated").css({"-moz-animation-play-state": 'paused'});
      $(".animated").css({"-o-animation-play-state": 'paused'});
   },
   animationStart: function(){
      $(".animated").css({"-webkit-animation-play-state": 'running'});    //funcion para desactivar animaciones css
      $(".animated").css({"-moz-animation-play-state": 'running'});
      $(".animated").css({"-o-animation-play-state": 'running'});
   },
   obstacleHeight: 235,
};





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
      // 3. Mientras este en dentro de los limites
   } else {
      bird.velocityReset = 7.2;
   };
};


// Aqui se crean los nuevos divs de obstaculos de diferentes tamanos
function obstacleGenerator (){
   var minHeight = environment.obstacleHeight - 70;
   var randomNumber = (Math.floor(Math.random()*(minHeight))+35);
   var heightTop = randomNumber;
   var heightBottom = environment.obstacleHeight-randomNumber;
   $("#gameplay-area").append("<div class='obstacle-animated animated obs-speed'><div class='obstacle-top' style='height:" + heightTop + "px;'></div><div class='obstacle-bottom' style='height:" + heightBottom + "px;'></div></div>");
};

//Bucle de 0 a 45 que ejecuta la funcion obstacleGenerator
function obstacleTimer(){
   environment.obstacleCount++;
   if (environment.obstacleCount === 120){
      obstacleGenerator();
      environment.obstacleCount = 0;

   }
};


//Funcion que elimina los obstaculos cuando desparecen de la pantalla
function obstacleDelete(){
   if ($(".obstacle-animated:first").position().left < -90){
      $(".obstacle-animated:first").remove();

   }
};

// Cuando el pájaro se choca cae al suelo
function fallDown(){
   environment.animationStop();
   environment.fallCondition = true;
   environment.obstacleCountStop(); //para que deje de ejecutarse la funcion obstacleGenerator()

};


//Para todo el juego
function gameOver(){
   if(!inmune.have){ //Si inmune.have es true se desactivan las colisiones
      fallDown();
      monster.stop();
      banana.stop();
      environment.animationStop(); 
      environment.obstacleCountStop()   //PARA (stop) el generador de obstáculos
   }else if (inmune.have && bird.positionY >= 397){ //Si inmune.have es true pero tocas el suelo GAME OVER
      inmune.have = false;
   }
};

//funcion para las colisiones
function collisionDetector(obj1, obj2, fn){
   if (obj1.positionX < obj2.positionX + obj2.width &&
      obj1.positionX + obj1.width > obj2.positionX &&
      obj1.positionY < obj2.positionY + obj2.height &&
      obj1.height + obj1.positionY > obj2.positionY) {
         fn(); //Realizar alguna accion
         
   }
};

// Detector de colisiones
function isCollide() { //No puedo refactorizar las 2 primeras porque la posicion depende del tiempo y no del px, ya que funciona con CSS
   //Detector de colisiones obstacle-top 
   if( bird.positionX < $(".obstacle-animated").position().left + 90 &&
       bird.positionX + bird.width > $(".obstacle-animated").position().left &&
       bird.positionY < $(".obstacle-top").position().top + $(".obstacle-top").height() &&
       bird.height + bird.positionY > 0) {
         gameOver();
   };       
   //Detector de colisiones obstacle-bottom
   if (bird.positionX < $(".obstacle-animated").position().left + 90 &&
      bird.positionX + bird.width > $(".obstacle-animated").position().left &&
      bird.positionY > 388 - $(".obstacle-bottom").height() &&
      bird.height + bird.positionY < 388) {  
         gameOver();
   }    
   collisionDetector(bird, monster, monsterDie);
   collisionDetector(bird, banana,  banana.grab);
};