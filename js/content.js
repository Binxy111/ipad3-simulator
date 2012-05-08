var Content = {
	init : function(){
		if(this.lock){
			//Ipad.content.innerHTML = ''
		}	
	},
	unlock : function(){
		Ipad.areas.lock_icon.style.display = 'none';
		Ipad.areas.unlock_bar.style.display = 'none';
		Ipad.areas.lock_bar.style.display = 'none';
		this.lock = false;
		Lockscreen.init();
	},
	power : function(){
		if(!this.off){
			Ipad.areas.unlock_bar.style.display = 'none';
			Ipad.areas.lock_bar.style.display = 'none';
			Ipad.areas.top_bar.style.visibility = 'hidden';
			Ipad.areas.screen.className = 'off';
			this.off = true;	
		} else {
			clearInterval(Lockscreen.timer);
			$('#time').html('<div id="lock" style="display:block;"><div class="ring"></div><div class="base"></div></div>');
			Ipad.areas.top_bar.style.visibility = 'visible';
			Ipad.areas.screen.className = '';
			Ipad.areas.unlock_bar.style.display = 'block';
			Ipad.areas.lock_bar.style.display = 'block';
			Ipad.areas.unlock_knob.style.left = 0 + 'px';
			Ipad.areas.slide_text.style.opacity = 1;
			if(!this.lock){
				this.checkSlide();
				this.lock = true;
			}
			this.off = false;
		}
	},
	checkSlide : function () {
		if(Ipad.areas.slide_text.className.indexOf('animate') !== -1){
			Ipad.areas.slide_text.className = Ipad.areas.slide_text.className.substring(0, Ipad.areas.slide_text.className.indexOf('animate'));
		} else if(Ipad.areas.slide_text.className.indexOf('animate') == -1){
			Ipad.areas.slide_text.className += ' animate';
		}
	},
	els : {
				
	},
	lock: true,
	off	: false
};