var scoreCount = {
   init: 0,
   increase: function(){
   	if(monster.velocityX !== 0){
   		var sum = this.init+=0.2;
   		var count = sum.toFixed(0);
   		$("#points").html(count);
   	}
   },
}