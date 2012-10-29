/*global
	$, Lockscreen, Ipad, Content, Dragdealer
*/
var App = {

	init: function() {
		App.createStuff();
		App.attachEvents();
	},

	createStuff: function() {
		Lockscreen.petals.draw(16);

		new Dragdealer('slider',{
			slide: false,
			animationCallback: function(x, y){
				Ipad.areas.slide_text.style.opacity = (-0.02 * parseInt(Ipad.areas.unlock_knob.style.left, 10)) + 1;
				Ipad.areas.track.onmousedown = function(e){
					Ipad.areas.unlock_knob.style.left = 0 + 'px';
				};
			}

		});
	},

	attachEvents: function() {
		Ipad.areas.power_btn.onclick = function() {
			Content.power();
			return false;
		};

		Ipad.areas.home_btn.onclick = function() {
			if (Content.off) {
				Content.power();
			}
			return false;
		};
	}
};

App.init();
