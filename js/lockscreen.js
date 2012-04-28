var Lockscreen = {
	init : function(){
		var self = this;
		if(!Content.lock){
			setInterval(function(){self.clock(Ipad.areas.time, true);}, 1000);
		} else {
			document.getElementById('lock').style.display = "block";
			setInterval(function(){self.clock(Ipad.areas.lock_time, false, true);}, 1000);
			$('#dragme').mouseup(function(){
				if(parseInt(Ipad.areas.unlock_knob.style.left, 10) < 196){
					Ipad.areas.unlock_knob.style.left = 0 + 'px';					
					Ipad.areas.slideText.style.opacity = 1;
					console.log('mouseup lt 196');
					if(!$('#slidetounlock').hasClass('animate')){
						$('#slidetounlock').addClass('animate');
					}
				} else if(parseInt(Ipad.areas.unlock_knob.style.left, 10) >= 196){
					console.log('mouseup gt 196');
					$(this).click();
					Content.unlock();
				} else if(parseInt(Ipad.areas.unlock_knob.style.left, 10) === 196){
					console.log('mouseup e 196');
				}
			}).mousedown(function(){
				if(parseInt(Ipad.areas.unlock_knob.style.left, 10) > 1){
					if(!$('#slidetounlock').hasClass('animate')){
						$('#slidetounlock').addClass('animate');
						console.log('over1');
					}
				} else if(parseInt(Ipad.areas.unlock_knob.style.left, 10) === 0) {
					console.log('down 0');
					if($('#slidetounlock').hasClass('animate')){
						$('#slidetounlock').removeClass('animate');
						console.log('over1');
					}	

				}
			});	
		}
	},
	els : {
			
	},
	clock : function(area,suffix,locked){
				var date = new Date(), 
					hour = (date.getHours() > 12) ? parseInt(date.getHours(),10) - 12 : date.getHours(),
					minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes(),
					ampm = '';
				if(suffix){
					ampm = (parseInt(date.getHours(),10) < 12)? ' AM' : ' PM';
				}
				if(hour === 0){hour = 12;}
				area.innerHTML = hour + ":" + minutes + ampm;
				if(locked){
					var formatted = date.toLocaleDateString();
					Ipad.areas.lock_date.innerHTML = formatted.substring(0, formatted.lastIndexOf(','));
				}
	},
	petals : {
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
	}
};
Lockscreen.init();