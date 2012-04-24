var Petals = {
	draw : function(amount){
		var amount = amount,
			fixedAngle = 360 / amount,
			flower = document.getElementById('petalring'),
			radius = 6,
			modCount = 0,
			alpha = Math.PI * 2 / amount;
		for(var i = 0;i<amount;i++){
			var angle = fixedAngle * i - 90,
				span = document.createElement('span'),
				theta = alpha * i;
			span.className = 'petal';
			span.style.webkitTransform = 'rotate(' + (angle) + 'deg)';
			/*if((angle) % 90 == 0){
				switch(angle){
					case 0:
						span.style.top = magicNumber + 'px';
						break;
					case 90:
						//span.style.left = '-' + magicNumber + 'px';
						span.style.left = magicNumber/3 + 'px';
						break;
					case 180:
						span.style.top = '-' + magicNumber + 'px';
						break;
					case 270:
						//span.style.left = magicNumber + 'px';
						span.style.right = magicNumber/3 + 'px';
						break;
					case 360:
						span.style.top = magicNumber + 'px';
						break;
				}
			} else {*/
				//if(angle > 0 && angle < 90){
					//span.style.top = (-.004 * (angle * angle) - (.035 * angle) + magicNumber) + 'px';
					//span.style.left = (.004 * (angle * angle) - (.695 * angle) - magicNumber/*might comment magicNumber out*/) + 'px';
					span.style.left = Math.cos(theta) * radius + 7 + 'px';
					span.style.top = Math.sin(theta) * radius + 'px';
				/*} else if(angle > 90 && angle < 180){
					
				} else if(angle > 180 && angle < 270){
					
				} else if(angle > 270 && angle < 360){
					
				}
			}*/
			flower.appendChild(span);
		}
		
	}
};