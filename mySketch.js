// Dylan Pangilinan
// Creative Coding Final

let start = 0; // variable to check if game started
let target = []; // array of targets
let hearts = [];
let gametarget = [];
let bomb; // array of bombs
let gametime, totaltime, temptime; //timer help from Jason Erdreich - https://youtu.be/QZDG2FmCjTo
let spawnrate = 1;
let score = 0; //score for warmup
let gamescore = 0; // score for game start
let lives = 3;
let music, continuesound, tagethit, targetmiss, bombsound; // audio variables
function preload() {
	// images
	mainmenu = loadImage('assets/mainmenu.png');
	backdrop = loadImage('assets/backdrop.png');
	heart = loadImage('assets/heart.png');
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
	for (let i = 0; i < 1; i++){
		target[i] = new Target();
		gametarget[i] = new Target();
	}


	bomb = new Bomb();

	timer = new Timer();
	timer.duration = 2000;
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


}


function loadingscreen(){
		push();
		scale(.6);
		image(mainmenu, -70, 0);
		pop();
		targetshape(width/2, height/2);
		fill(255);
		textAlign(CENTER);
		textSize(70);
		text("Aim Train", width/2, 300);
		if(frameCount % 60 < 30){
		textAlign(CENTER);
		text("Press enter start", width/2, height/2+ 250);

	}
}

function warmup(){
		//background
		push();
		scale(1.2);
		image(backdrop, 0, 0);
		pop();

		bomb.display();

		if(mouseIsPressed){
		if(bomb.checkbombclick(mouseX, mouseY) < 75/2){
			bombsprite.play();
			bombsound.play();

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
		text("Reach 2000 to continue", width/2, 100);
		text("Avoid hitting the bombs", width/2, 140);
}

function gamestart(){
		gametime -= temptime;
		fill(255);
		textSize(30);
		text("Score: " + gamescore, 20, 60);
		text("Timer: " + int(gametime)/1000, 20, 100);
		text("Lives: " + lives, 20, 140);

		heartone = image(heart, 500, 600);
		hearttwo = image(heart, 450, 600);
		heartthree = image(heart, 550, 600);


		for(i =0; i < gametarget.length; i++){
			gametarget[i].display();
		}
		if(floor((random()*100)+1) <= spawnrate || gametarget.length <= 1){ // code adapted from https://github.com/HxxxxxS/AimBoost/blob/master/sketch.js
			gametarget.push(new Target());
		}

}

function keyPressed(){
	if(keyCode == ENTER && start == 0){
		continuesound.play();
		music.setVolume(0.5);
		music.loop();
		start++;
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
				score += 100;
				if(score == 100){
					start++;
					score = 0;
			}
		}else if(target[i].checkclick(mouseX, mouseY) > 75/2 && bomb.checkbombclick(mouseX, mouseY) > 75/2){
			fill(255,0, 0, 200);
			rect(0, 0, width, height);
			lives--;
			targetmiss.play();
		}
		}
	}
	if(start ==2){
		if(score == 0){ //workaround so timer doesn't reset after mouseclick again
		temptime = totaltime;
		lives = 3;
		score += 100;

	}
		for(i = 0; i < gametarget.length; i++){
			if(gametarget[i].checkclick(mouseX, mouseY) < 75/2){
				gamescore += 100;
				gametarget.splice(i, 1);	
				gametarget[i] = new Target();

				targethit.play(); 

			} else if(gametarget[i].checkclick(mouseX, mouseY) > 75/2){
				lives--;
				targetmiss.play();
			}

		}

	}
}


