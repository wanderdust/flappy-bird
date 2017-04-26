var Enemy = function(name){
   var obj = {
      name: name,
      height: 49,
      width: 60,
      positionX:1400,   //Guarda la posicion -X del monster en cada frame. 1400px es la inicial.
      positionY: 0,     //Guarda la posicion aleatoria -Y entre 49px y 371px (ver monsterCreate()).
      velocityX:-6,     //Numero de px que avanza en cada frame. Cte.
      unique: true,     //variable para que solo se pueda crear un monstruo (de ese objeto) a la vez.
      addRandom: 0.9989,//Numero para la Condicion enemyRandom.
   };
   $.extend(obj, Enemy.methods)                   
   return obj;
};

Enemy.methods = {
   positionYGenerator: function(){
      return Math.random()*(322)+49;
   }, //Genera un numero aleatorio de posicion -Y que mas adelante se guarda en positionY
   move: function(){    
      this.positionX += this.velocityX;
      $("."+this.name).css({"left":this.positionX+ "px"});     
   }, // Actualiza positionX en cada frame
   remove: function(){
      $("."+this.name).remove();
   }, //Lo elimina del mapa
   stop: function(){
      return this.velocityX = 0;
   }, // Pone a 0 velocityX, para que el monstruo deje de avanzar
};


var Collectable = function(name){
   var obj = {
      name: name,
      height: 20,
      width: 20,
      positionX:1400,   //Guarda la posicion -X de banana en cada frame. 1400px es la inicial.
      positionY: 0,     //Guarda la posicion aleatoria -Y generada por positionYGenerator.
      velocityX: -4.05, //Numero de px que avanza en cada frame.Cte.
      unique: true,     //variable para que solo se pueda crear un collectable (de ese objeto) a la vez.
      addRandom:0//0.75, //Numero para la Condicion enemyRandom.
   }
   $.extend(obj, Collectable.methods)
   return obj;
};

Collectable.methods = {
   positionYGenerator: function(){
      var heightTop = $(".obstacle-top:last").height();
      var heightBottom = $(".obstacle-bottom:last").height();
      var result = 388 - heightTop - heightBottom;
      var middle = result/2;
      return middle + heightTop+16;
   }, //Genera una posicion entre obstacle top y obstacle bottom.
   move: function(){
      this.positionX += this.velocityX;
      $("."+this.name).css({"left":this.positionX+ "px"});     
   }, //Actualiza positionX en cada frame.
   stop: function(){
      return this.velocityX = 0;
   }, //Pone a 0 velocityX, para que el monstruo deje de avanzar.
   remove: function(){
       $("."+this.name).remove();
   }, //Funcion para eliminar el Collectable del mapa.
   grab: function(){
      $("."+this.name).remove();
      inmune.have = true;
      inmune.time = 300;
      sounds.soundBanana.play();
   }, //Funcion cuando el pajaro coge el Collectable.
};

//Creamos los objetos...
var monster = Enemy("monster");
var otherMonster = Enemy("otherMonster");
var banana = Collectable("banana")


//Para que aparezca un platano o monstruo en el mapa
function addItem(obj, domClassName){
    if(obj.unique){            //si es 0 retorna false, si es cualquier otro numero retorna true
         var x = obj.positionYGenerator();
         obj.positionY = x;
         $("#gameplay-area").append("<div class='"+domClassName+" animated' style='top:"+ obj.positionY +"px'></div>");
         obj.unique = false;
     } 
};

// Que el platano o monstruo se mueva
function moveItem(obj){
   if(!obj.unique){
      obj.move();
   }
};

function executeMove(){
   moveItem(banana);
   moveItem(monster);
   moveItem(otherMonster);
};

// Elimina los objetos que se han salido del mapa
function removeItem(obj, domClassName){
   if(obj.positionX < -50){
         $("."+domClassName).remove();
         obj.positionX = 1400;
         obj.unique = true;
      }
};

//Ejecuta la funcion addItem cuando se da la condicion
function collectableRandom(collectable, domClassName){
   var random = Math.random()
   if(collectable.unique && environment.obstacleCount == 10 && random > collectable.addRandom){
      addItem(collectable, domClassName);
   }
};

//Ejecuta la funcion addItem cuando se da la condicion
function enemyRandom(enemy, domClassName){
   var random = Math.random()
   if(enemy.unique && random > enemy.addRandom){
      addItem(enemy, domClassName);
   };
};

//Te hace invencible durante 300fps
function invencibility(){
  if(inmune.have){
      inmune.duration();
      bird.changeColor();
  }else{
      score.tripleScore = false;
   };
};

//Si te toca el monstruo mientras eres invencible mueres
function monsterDie(enemy){
   if(inmune.have){
      enemy.remove();
      sounds.soundKick.play();
      score.tripleScore = true;
   }else {gameOver()}
};