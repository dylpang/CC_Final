class Target{
	constructor(){
		this.x = random(20, width-20);
		this.y = random(20, height-20);
	}


	display(){
		targetshape(this.x, this.y);
	}

	checkclick(x, y){
		let d = dist(x, y, this.x, this.y);
		return d;
	}





}



function targetshape(x, y){
	noStroke();
	fill("#DF3434");
	circle(x, y, 75);
	fill("#3498DF");
	circle(x, y, 50);
	fill("#DFD034");
	circle(x, y, 25);
	

}