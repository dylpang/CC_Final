class Target{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}


	display(){
		targetshape(this.x, this.y);
	}



}



function targetshape(x, y){
	noStroke();
	fill("#DF3434");
	circle(x, y, 75)
	fill("#3498DF");
	circle(x, y, 50);
	fill("#DFD034");
	circle(x, y, 25);
	

}