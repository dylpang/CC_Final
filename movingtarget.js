class Movingtarget{

	constructor(){
		this.x = random(20, width-20);
		this.y = random(20, height-20);
		this.position = new createVector(this.x, this.y);
		this.velocity = new createVector(int(random(-6, 6)), int(random(-6, 6)));
	}

	display(){
		goldtarget(this.position.x, this.position.y);
	}

	checkclick(x, y){
		let d = dist(x, y, this.position.x, this.position.y);
		return d;
	}

	update(){
		this.position.add(this.velocity);
	}

	checkedges(){ //repositions the target within the frame
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
}



function goldtarget(x, y){
	noStroke();
	fill(166, 124, 0);
	circle(x, y, 75);
	fill(255,191,0);
	circle(x, y, 50);
	fill(255,220,115);
	circle(x, y, 25);
	

}