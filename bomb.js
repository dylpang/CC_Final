class Bomb{
	constructor(){
		this.x = random(20, width-20);
		this.y = random(20, height-20);
	}


	display(){
		hitbox(this.x+7, this.y+15); // the 7 and 15 are used to center the hitbox properly with the bombsprite
		animation(bombsprite, this.x, this.y);

	}

	checkbombclick(x, y){
		let d = dist(x, y, this.x, this.y);
		return d;
	}



}

function hitbox(x, y){
	noStroke();
	fill(0,0);
	circle(x, y, 75);
}