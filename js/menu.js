var menu = {
   firstClick: false,
   gameOver:false,
}

function hideMenu(){
	$("#start-menu").remove();
}

function startGame(){
	$(document).on("click", function(){
     	if(!menu.firstClick){
     		hideMenu();
      		gameLoop = setInterval(mainloop, environment.fps);    //Actualiza la posicion del pajaro en cada frame
      		menu.firstClick = true;
     	}
   })
}


function menuGameOver(){
	$("#gameplay-area").append('<div id="menu-gameover"><div id="scoreboard"></div><a href="#"><div id="replay"></div></a></div>')
}