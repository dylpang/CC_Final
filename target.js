class Target{
	
	constructor(){
		this.x = random(20, width-20);
		this.y = random(20, height-20);
	}

	display(){
		targetshape(this.x, this.y, this.opac);
	}

	checkclick(x, y){
		let d = dist(x, y, this.x, this.y);
		return d;
	}
}



function targetshape(x, y){
	noStroke();
	fill(223, 52, 52);
	circle(x, y, 75);
	fill(52, 152, 223);
	circle(x, y, 50,);
	fill(223, 208, 52);
	circle(x, y, 25);
	

}