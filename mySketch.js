// Dylan Pangilinan
// Creative Coding Final

let start = 0; // variable to check if game started
let target = []; // array of targets
let time = 120;
let score = 0;

function preload() {
	font = loadFont('assets/VCR_OSD_MONO_1.001.ttf');
}

function setup(){
	frameRate(60);
	start = 0;
	createCanvas(1200, 800);
	textFont(font);
	textSize(50);
	for (let i = 0; i < 1; i++){
		target[i] = new Target();
	}

}


function draw(){
	background(0);
	if(start == 0){
		targetshape(width/2, height/2)
		fill(255);
		if(frameCount % 60 < 30){
		textAlign(CENTER);
		text("Click to start", width/2, height/2+ 200);
	}
	}
	if(start == 1){
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
			start++;
	}

	if(start == 1){
		for(i = 0; i < target.length; i++){
			if(target[i].checkclick(mouseX, mouseY) < 75/2){
				target.slice();
				target[i] = new Target();
				score += 100;
				if(score == 2000){
					start++;
				}
			}
		}
	}
}


function timer() {


}

