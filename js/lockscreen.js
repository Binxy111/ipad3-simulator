var Lockscreen = {
	timer: '',
	init : function(){
		var self = this;
		if(!Content.lock){
			self.timer = setInterval(function(){self.clock(Ipad.areas.time, true);}, 1000);
		} else {
			document.getElementById('lock').style.display = "block";
			self.timer = setInterval(function(){self.clock(Ipad.areas.lock_time, false, true);}, 1000);
			$('#dragme').mouseup(function(){
				if(parseInt(Ipad.areas.unlock_knob.style.left, 10) < 196){
					Ipad.areas.unlock_knob.style.left = 0 + 'px';					
					Ipad.areas.slide_text.style.opacity = 1;
					if(!$('#slidetounlock').hasClass('animate')){
						$('#slidetounlock').addClass('animate');
					}
				} else if(parseInt(Ipad.areas.unlock_knob.style.left, 10) >= 196){
					$(this).click();
					Content.unlock();
				} else if(parseInt(Ipad.areas.unlock_knob.style.left, 10) === 196){
				}
			}).mousedown(function(){
				if(parseInt(Ipad.areas.unlock_knob.style.left, 10) > 1){
					if(!$('#slidetounlock').hasClass('animate')){
						$('#slidetounlock').addClass('animate');
					}
				} else if(parseInt(Ipad.areas.unlock_knob.style.left, 10) === 0) {
					if($('#slidetounlock').hasClass('animate')){
						$('#slidetounlock').removeClass('animate');
					}	

				}
			});	
		}
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
			var amt = amount,
				fixedAngle = 360 / amount,
				flower = document.getElementById('petalring'),
				radius = 6,
				alpha = Math.PI * 2 / amt;
			for(var i = 0;i<amount;i++){
				var angle = fixedAngle * i - 90,
					span = document.createElement('span'),
					theta = alpha * i;
				span.className = 'petal';
				span.style.webkitTransform = 'rotate(' + (angle) + 'deg)';
						span.style.left = Math.cos(theta) * radius + 7 + 'px';
						span.style.top = Math.sin(theta) * radius + 'px';
				flower.appendChild(span);
			}

		}
	}
};
Lockscreen.init();