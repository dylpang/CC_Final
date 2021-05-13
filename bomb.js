class Bomb{
	constructor(){
		this.x = random(20, width-20);
		this.y = random(20, height-20);
		this.position = new createVector(this.x, this.y);
		this.velocity = new createVector((random(-1, 1)), int(random(-6, 6)));
	}


	display(){
		hitbox(this.position.x+7, this.position.y+15); // the 7 and 15 are used to center the hitbox properly with the bombsprite
		animation(bombsprite, this.position.x, this.position.y);

	}

	checkclick(x, y){
		let d = dist(x, y, this.position.x, this.position.y);
		return d;
	}

	update(){
		this.position.add(this.velocity);
	}

	checkedges(){ //repositions bomb randomly within the frame
		if(this.position.x > width){
			this.position.x = 0;
		}else if(this.position.x < 0){
			this.position.x = width;
		}
		if(this.position.y > height){
			this.position.y = 0;
		}else if(this.position.y < 0){
			this.position.y = height;
		}
	}

	stop(){
		this.velocity.x = 0;
		this.velocity.y = 0;
	}

	play(){
		this.velocity.x = random(-9, 9);
		this.velocity.y = random(-9, 9);
	}



}

function hitbox(x, y){
	noStroke();
	fill(0,0); // invisible circle
	circle(x, y, 75);
}