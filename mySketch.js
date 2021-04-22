let start; // variable to check if game started
let targets = []; // array of targets

function setup(){
	start = 0;
	createCanvas(1200, 800);
	textSize(50);
	for (let i=0; i<= 10; i++){
		targets[i] = new Target(random(0,width), random(0, height));
	}
}


function draw(){
	background(0);
	if(start == 0){
		fill(255);
		text("Press enter to start", width/2-200, height/2);
	}
	if(start == 1){
		for(let i = 0; i < targets.length; i++){
			targets[i].display();
		}

	}

}

function keyPressed() {
	if (keyCode == ENTER && start ==0){
		start++;
	}
}