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
   multiplyScore: function(){
   	if(!inmune.have ){
   		this.amount = 0.2
   	}else if(inmune.have && this.tripleScore){
   		this.amount = 0.6;
   		$("#points").append('<span class="multiply"> x3<span>')
   	}else if (inmune.have){
   		this.amount = 0.4;
   		$("#points").append('<span class="multiply"> x2<span>')
   	}
   },
   tripleScore: false,
   
};