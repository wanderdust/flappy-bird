var monster = {
   width: 60,
   height: 49,
   positionX:1400,      //Guarda la posicion -X del monster en cada frame. 1400px es la inicial.
   positionY: 0,        //guarda la posicion aleatoria -Y entre 49px y 371px (ver monsterCreate())
   positionYGenerator:function(){return Math.random()*(322)+49;},    //Genera un numero aleatorio de posicion -Y que mas adelante se guarda en positionY
   velocityX:-6,        //numero de px que avanza en cada frame. Cte
   unique: true,        //variable para que solo se pueda crear un monstruo a la vez
   move: function(){    
      this.positionX += this.velocityX;
      $(".monster").css({"left":this.positionX+ "px"});     
   },                                 // Actualiza positionX en cada frame
   remove: function(){
      $(".monster").remove();
   },                    
   stop: function(){
      return this.velocityX = 0;
   },                                  // Pone a 0 velocityX, para que el monstruo deje de avanzar
   addRandom: 0.998
};


var banana = {
   height: 20,
   width: 20,
   positionX:1400,      //Guarda la posicion -X de banana en cada frame. 1400px es la inicial.
   positionY: 0,        //Guarda la posicion aleatoria -Y generada por positionYGenerator
   positionYGenerator:function(){
      var heightTop = $(".obstacle-top:last").height();
      var heightBottom = $(".obstacle-bottom:last").height();
      var result = 388 - heightTop - heightBottom;
      var middle = result/2;
      return middle + heightTop+16;

   },                      //Genera una posicion entre obstacle top y obstacle bottom
   velocityX: -4.05,       //número de px que avanza en cada frame
   unique: true,           //variable para que solo se pueda crear un monstruo a la vez
   move: function(){       // Actualiza positionX en cada frame
      this.positionX += this.velocityX;
      $(".banana").css({"left":this.positionX+ "px"});     
   },                                     
   grab: function(){                      // Funcion cuando el pajaro coge la banana
      $(".banana").remove();
      inmune.have = true;
      inmune.time = 300;
      sounds.soundBanana.play();
   },                                     
   stop: function(){                      // Pone a 0 velocityX, para que el monstruo deje de avanzar  
      return this.velocityX = 0;
   },                                      
   remove: function(){                    //Funcion para eliminar la banana sin mas
       $(".banana").remove();
   },
   addRandom:0.75                           
};





// Que aparezca un platano o monstruo en el mapa
function addItem(obj, className){
    if(obj.unique){            //si es 0 retorna false, si es cualquier otro numero retorna true
         var x = obj.positionYGenerator();
         obj.positionY = x;
         $("#gameplay-area").append("<div class='"+className+" animated' style='top:"+ obj.positionY +"px'></div>");
         obj.unique = false;
     } 
};

// Que el platano o monstruo se mueva
function moveItem(obj){
   if(!obj.unique){
      obj.move();
   }
};

// Elimina los objetos que se han salido del mapa
function removeItem(obj, className){
   if(obj.positionX < -50){
         $("."+className).remove();
         obj.positionX = 1400;
         obj.unique = true;
      }
};

//Ejecuta la funcion addItem cuando se da la condicion
function bananaRandom(){
   var random = Math.random()
   if(banana.unique && environment.obstacleCount == 10 && random > banana.addRandom){
      addItem(banana, "banana");
   }
};

//Ejecuta la funcion addItem cuando se da la condicion
function monsterRandom(){
   var random = Math.random()
   if(monster.unique && random > monster.addRandom){
      addItem(monster, "monster");
   }
};

//Te hace invencible durante 300fps
function invencibility(){
  if(inmune.have){
      inmune.duration();
      bird.changeColor();
  }else{score.tripleScore = false;}
}

//Si te toca el monstruo mientras eres invencible mueres
function monsterDie(){
   if(inmune.have){
      monster.remove();
      sounds.soundKick.play();
      score.tripleScore = true;
   }else {gameOver()}
}