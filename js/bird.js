var bird = {
   width: 34,           
   height: 24,
   positionX: 60,      //Posicion X del pájaro
   positionY: 210,     // guarda la posicion del pajaro en cada frame
   velocityY: 6,       // Velocidad -y del pajaro. No cte.
   velocityReset: 7.2,    // Variable para resetear la velocidad  
   changeColor: function(){
      if(inmune.have === true){
         $(".bird").css({"background-image": 'url(images/bird-invincible.png)'})
      }else{
         $(".bird").css({"background-image": 'url(images/bird.png)'})
      }
   }
};


var inmune = {                               //Objeto que recoge las propiedades de Invincibilidad
   have: false,                              //Inmunidad desactivada si es false
   time: 300,           
   duration: function(){                     //Duracion de la inmunidad
      this.time--;
      if (!this.time && this.have){
         this.have = false;
      }
   }
};



// Funcion para saltar. Si toca el suelo deja de funcionar.
   function jump(){
      $(document).on("click", function(){
         if(bird.positionY<397 && !environment.fallCondition){
            bird.velocityY = bird.velocityReset;
         }
      }); 

      //Handle space bar
      $(document).keydown(function(e){
         //space bar!
         if(e.keyCode == 32 || e.keyCode == 38)
             if(bird.positionY<397 && !environment.fallCondition){
               bird.velocityY = bird.velocityReset;
         }
      });
   };



