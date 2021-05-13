// Dylan Pangilinan
// Creative Coding Final

let start = 0; // variable to check if game started
let target = []; // array of targets
let hearts = []; // array of hearts
// different targets
let gametarget = [];
let gametarget2 = [];
let movingtarget = [];
let x = 0; // for main menu animation
let bomb; // array of bombs
let gametime, totaltime, temptime; //timer help from Jason Erdreich - https://youtu.be/QZDG2FmCjTo
let timelimit = 10;
let spawnrate = 1;
let score = 0; //score for warmup
let gamescore = 0; // score for game start
let tempscore = 0;
let highscore = 0; // highscore
let lives = 3;
let music, continuesound, tagethit, targetmiss, bombsound; // audio variables
function preload() {
	// images
	mainmenu = loadImage('assets/mainmenu.png');
	backdrop = loadImage('assets/backdrop.png');
	gamebackground = loadImage('assets/gamebackground.jpg');
	hearts = loadAnimation('assets/hearts-01.png', 'assets/hearts-03.png');
	font = loadFont('assets/VCR_OSD_MONO_1.001.ttf');
	bombsprite = loadAnimation('assets/Bomb-01.png', 'assets/Bomb-07.png');
	// sounds
	music = loadSound('assets/8bitmusic.mp3');
	continuesound = loadSound('assets/continuesound.mp3');
	targethit = loadSound('assets/targethit.mp3');
	targetmiss = loadSound('assets/miss.mp3');
	bombsound = loadSound('assets/bombsound.mp3');
}

function setup(){
	frameRate(60);
	smooth();
	start = 0;
	createCanvas(1200, 800);
	textFont(font);
	textSize(50);
	for (let i = 0; i < 1; i++){ // creating a new target to spawn
		target[i] = new Target();
		gametarget[i] = new Target();
		gametarget2[i] = new Target();
		movingtarget[i] = new Movingtarget();
	}

	bomb = new Bomb();

}


function draw(){
	background(0);

	totaltime = millis();
	gametime = totaltime;
	//main menu
	if(start == 0){
		loadingscreen();
	}
	//warmup round
	if(start == 1){
		warmup();
	}
	//game start
	if(start == 2){
		gamestart();
	}
	// if game ends
	if(start == 3){
		gameover();
	}


}


function loadingscreen(){
		push();
		scale(.6);
		image(mainmenu, -70, 0);
		pop();
		x += 5;
		if(x == width + 550){
			x = 0;
		}
		textAlign(CENTER);
		targetshape(-300 + x, height/2);
		targetshape(-500 + x, height/2);
		targetshape(-100 + x, height/2);
		goldtarget(-400 + x, height/2);
		goldtarget(-200 + x, height/2);	
		fill(255);	
		textSize(90);
		text("Aim Train", -300 + x, 350);
		fill(255);	
		textAlign(CENTER);
		textSize(50);
		text("Dylan Pangilinan / Creative Coding Final", width/2, 100);

		if(frameCount % 60 < 30){
		textSize(80);
		text("Press enter start", width/2, height/2+ 250);

	}
}

function warmup(){
		//background
		push();
		scale(1.2);
		image(backdrop, 0, 0);
		pop();
		bomb.update();
		bomb.checkedges();
		bomb.display();

		if(mouseIsPressed){ // something I couldn't get was to play the bomb animation seemlessly from a single click without holding it :/
		if(bomb.checkclick(mouseX, mouseY) < 75/2){
			bombsprite.play();
		}
		}else{
			bombsprite.stop();
		}

		for(i = 0; i < target.length; i++){
			target[i].display();
		}

		fill(255);
		textSize(30);
		text("Score: " + score, 20, 60);
		text("Lives: " + lives, 20, 140);
		textSize(50);
		if(frameCount % 60 < 30){
		textAlign(CENTER);
		text("WARMUP ROUND", width/2, 60);
		}
		textAlign(CENTER);
		textSize(30);
		text("Reach 1000 to continue", width/2, 100);
		text("Avoid hitting the bomb", width/2, 140);
		if(lives == 0){
			textSize(50);
			text("You only have 3 lives!!", width/2, 200);
		}
		if(score == 1000){
			fill(0, 255, 0,100);
			rect(0, 0, width, height);
			fill(255);
			textSize(100);
			textAlign(CENTER);
			text("WARMUP COMPLETED!", width/2, height/2);
			textSize(50);
			text("Press enter to start game", width/2, height/2 + 100);
		}
}

function gamestart(){
		push();
		scale(0.7);
		image(gamebackground, -80, -20);
		pop();

		if(score == 0){ //workaround so timer doesn't reset after mouseclick again
			temptime = totaltime;
			lives = 3;
			score += 100;

		}
		tempttime = temptime; 
		gametime  = totaltime - temptime;
		fill(255);
		textSize(30);
		text("Score: " + gamescore, 20, 60);
		text(" Time: " + int(gametime/1000), 20, 100);
		text("Lives: " , 20, 140);

		animation(hearts, 180, 130);
		if(lives == 3){
			hearts.changeFrame(0);
		}
		hearts.stop();

		for(i = 0; i < gametarget.length; i++){
			gametarget[i].display();
			gametarget2[i].display();
		}
		for(i = 0; i < movingtarget.length; i++){
			movingtarget[i].update();
			movingtarget[i].checkedges();
			movingtarget[i].display();
		}
		bombsprite.changeFrame(0);
		bomb.play();
		bomb.update();
		bomb.checkedges();
		bomb.display();

		if(mouseIsPressed){
		if(bomb.checkclick(mouseX, mouseY) < 75/2){
			bombsprite.play();
		}
		}else{
			bombsprite.stop();
		}

}

function gameover(){
	textSize(100);
	textAlign(CENTER);
	frameRate(60);
	if(frameCount % 60 < 30){
		text("GAMEOVER", width/2, height/2);
	}
	tempscore = gamescore;
	if(tempscore > highscore){ // get highscore
		highscore = tempscore;
	}
	fill(255);
	text("SCORE: " + gamescore, width/2, height/2 + 100);
	text("HIGH SCORE: " + highscore, width/2, height/2 + 200)
	textSize(50);
	text("Press space to restart", width/2, height/2 + 350);
	text("Press enter to go to mainmenu", width/2, height/2 + 275);


}

function keyPressed(){
	if(keyCode == ENTER && start == 0){
		continuesound.play();
		music.setVolume(0.5);
		music.loop();
		start++;
	}

	if(keyCode == ENTER && start == 1 && score == 1000){
		start++;
		score = 0;
		continuesound.play();

	}

	if(keyCode == ENTER && start == 3){
		music.stop();
		start = 0;
		score = 0;
		gamescore = 0;
		continuesound.play();

	}

	if(keyCode == 32 && start == 3){
		start = 2;
		gamescore = 0;
		lives = 3;
		score = 0;
	}


}


function mouseClicked(){

	//warmup round
	if(start == 1){

		for(i = 0; i < target.length; i++){
			if(target[i].checkclick(mouseX, mouseY) < 75/2){
				target.slice();
				targethit.play();
				target[i] = new Target();
				if(score != 1000){
				score += 100;
			}
		}else if(target[i].checkclick(mouseX, mouseY) > 75/2 && bomb.checkclick(mouseX, mouseY) > 75/2){
			fill(255,0, 0, 200);
			rect(0, 0, width, height);
			if(lives > 0){
				lives--;
			}
			targetmiss.play();
		}else if(bomb.checkclick(mouseX, mouseY) < 75/2){
			bomb.stop();
			bombsound.play();
		}

		}
	}
	if(start ==2){

		for(i = 0; i < gametarget.length; i++){
			if(gametarget[i].checkclick(mouseX, mouseY) < 75/2){
				gamescore += 100;
				gametarget.slice();	
				gametarget[i] = new Target();
				targethit.play(); 
			}else if(gametarget2[i].checkclick(mouseX, mouseY) < 75/2){
				gamescore += 100;
				gametarget2.slice();
				gametarget2[i] = new Target();
				targethit.play();

			}
			else if(movingtarget[i].checkclick(mouseX, mouseY) < 75/2){
				gamescore += 200;
				targethit.play();
				movingtarget[i] = new Movingtarget();

			}else if(bomb.checkclick(mouseX, mouseY) < 75/2){
				bombsound.play();
				start++;


			}else{
				fill(255,0, 0, 230);
				rect(0, 0, width, height);
				lives--;
				targetmiss.play();
				if(lives == 2){
					hearts.changeFrame(1);
				}
				if(lives == 1){
					hearts.changeFrame(2);
				}
				if(lives == 0){
					start++;
				}
			}
		}

	}
}



