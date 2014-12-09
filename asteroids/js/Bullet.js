Bullet = function(x, y, angle, vel) {
	
	var speed = 5; 
	
	this.pos = new Vector2(x+Math.cos(angle)*11,y+Math.sin(angle)*11);
	this.vel = new Vector2(0,0);
	 
	this.vel.x = vel.x + (Math.cos(angle)*speed);
	this.vel.y = vel.y + (Math.sin(angle)*speed);
	
	// instead set Vector with speed and rotate

	this.enabled = true; 
	
	this.update = function() {
		
		this.pos.plusEq(this.vel);
	};

	this.draw = function(c) {
		c.lineWidth =2; 
		c.strokeStyle = "#fff"; 
		c.beginPath(); 
		c.arc(this.pos.x,this.pos.y,2, 0, Math.PI*2, true); 
		c.stroke();
	};
	
	
};