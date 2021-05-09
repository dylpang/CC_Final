// Dylan Pangilinan
// Creative Coding Final

let start = 0; // variable to check if game started
let target = []; // array of targets
let bomb = []; // array of bombs
let time = 120;
let score = 0;
let music, continuesound, tagethit, targetmiss; // audio variables
function preload() {
	// images
	backdrop = loadImage('assets/backdrop.png')
	font = loadFont('assets/VCR_OSD_MONO_1.001.ttf');
	bombsprite = loadAnimation('assets/Bomb-01.png', 'assets/Bomb-07.png');
	// sounds
	music = loadSound('assets/8bitmusic.mp3');
	continuesound = loadSound('assets/continuesound.mp3');
	targethit = loadSound('assets/targethit.mp3');
	targetmiss = loadSound('assets/miss.mp3');
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
	}
}


function draw(){
	background(155);
	if(start == 0){
		targetshape(width/2, height/2)
		fill(255);
		if(frameCount % 60 < 30){
		textAlign(CENTER);
		text("Click to start", width/2, height/2+ 200);

	}

	}
	if(start == 1){
		push();
		scale(1.2)
		image(backdrop, 0, 0);
		pop();
		for(i = 0; i < target.length; i++){
			target[i].display();
		}

		fill(255);
		textSize(30);
		text("Score: " + score, 20, 60);
		textSize(50);
		if(frameCount % 60 < 30){
		textAlign(CENTER);
		text("WARMUP ROUND", width/2, 60);
		}
		textAlign(CENTER);
		textSize(30);
		text("Reach 2000 to continue", width/2, 100);
	}

	if(start == 2){
		fill(255);
		textSize(30);
		textAlign(CENTER);
		text("Starting now...", width/2, height/2);
	}


}


function mousePressed(){
	if(start == 0){
		continuesound.play();
		music.setVolume(0.5);
		music.loop();
			start++;
	}

	if(start == 1){
		for(i = 0; i < target.length; i++){
			if(target[i].checkclick(mouseX, mouseY) < 75/2){
				target.slice();
				targethit.play();
				target[i] = new Target();
				score += 100;
				if(score == 2000){
					start++;
			}
		}else if(target[i].checkclick(mouseX, mouseY) > 75/2){
			targetmiss.play();
		}
		}
	}
}



function timer() {


}

