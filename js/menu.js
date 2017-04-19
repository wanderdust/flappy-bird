var menu = {
   firstClick: false,	//Para que empiece el juego
   //gameOver:false,
}

//Cuando hace firstClick se quita el Menu principal para dar paso al juego
function hideMenu(){
	$("#start-menu").remove();
}

//Cuando haces el primer Click empieza el juego
function startGame(){
	$(document).on("click", function(){
     	if(!menu.firstClick){
     		hideMenu();
      		gameLoop = setInterval(mainloop, environment.fps);    //Actualiza la posicion del pajaro en cada frame
      		menu.firstClick = true;
     	}
   })
}

//Aparece un menu de Game Over
function menuGameOver(){
	$("#gameplay-area").append('<div id="menu-gameover"><div id="scoreboard"></div><a href="#"><div id="replay"></div></a></div>')
	environment.stop(); //Para parar el setInterval
}