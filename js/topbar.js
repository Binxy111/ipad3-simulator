var Topbar = {
	init : function(){
		var self = this;		
		if(!Content.lock){
			setTimeout(function(){self.clock(Ipad.areas.time, true);}, 1000);
		} else {
			document.getElementById('lock').style.display = "block";
			setTimeout(function(){self.clock(Ipad.areas.lock_time, false, true);}, 1000);	
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
			}
};
Topbar.init();