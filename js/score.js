var score = {
   init: 0,
   count: 0,
   amount: 0.2,
   itemValue: 0,
   increase: function(){
   	if(monster.velocityX !== 0){
		var sum = (this.init+=this.amount) + this.itemValue;
   		this.count = sum.toFixed(0);
   		$("#points").html(this.count);
   		}	
   },

   doubleScore: function(){
   	if(inmune.have !==true){
   		this.amount = 0.2
   	}else{
   		this.amount = 0.4;
   		$("#points").append("<span> x2<span>")
   	}
   }
};

