ShipMoving = function(x,y) {


	this.pos = new Vector2(x,y); 
	this.angle = 0;
	this.vel = new Vector2(0,0); 
	var temp = new Vector2(0,0);

	this.thrustAmount = 0;
	
	this.thrustPower = 0.25; 
	this.rotateSpeed = 9;

	this.enabled = true;

	this.update = function() {
		this.pos.plusEq(this.vel);
	};
	
	this.thrust = function() {
			
		temp.reset(this.thrustPower,0); 

		temp.rotate(this.angle); 
		this.vel.plusEq(temp);

		if(this.thrustAmount < 25 ) {
			this.thrustAmount++;
		}
			
	
	};
	
	this.rotateLeft = function() {
		this.angle -= this.rotateSpeed;
	};
	this.rotateRight = function() {
		this.angle += this.rotateSpeed;
	};

	this.explode = function() {
		c.save();
		c.translate(this.pos.x, this.pos.y);

		this.enabled = false;



		c.restore();
	};
	
	
	// c = canvas context
	this.draw = function(c, thrusting) {		
		
		if(this.enabled) {

			c.save();
			c.translate(this.pos.x, this.pos.y); 
			c.rotate(this.angle * Vector2Const.TO_RADIANS);

			c.strokeStyle = "#fff"; 
			c.lineWidth = 2; 
			
			c.beginPath();
			c.moveTo(-10, -10);
			c.lineTo(-10, 10);
			c.lineTo(14, 0);
			c.closePath(); 
			c.stroke();
			
			if(thrusting) {
				c.beginPath();
				c.moveTo(-11,-6);
				c.lineTo((this.thrustAmount*-1)-10,0);
				c.lineTo(-11,6)
				c.stroke();
			}
			else if(this.thrustAmount>0) {
				this.thrustAmount--;
			}
			else {
				this.thrustAmount = 0;
			}

			c.restore();
		}

	};


}; 