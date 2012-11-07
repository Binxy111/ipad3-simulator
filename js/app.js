/*global
	$, Lockscreen, Ipad, Dragdealer, Itunes
*/
var App = (function() {

	var itunes_is_loaded = false;

	function init() {
		createStuff();
		attachEvents();
	}

	function createStuff() {
		Lockscreen.petals.draw(16);
		Lockscreen.init();

		new Dragdealer('slider', {
			slide: false,
			animationCallback: function(x, y) {
				Ipad.areas.slide_text.style.opacity = (-0.02 * parseInt(Ipad.areas.unlock_knob.style.left, 10)) + 1;
				/*Ipad.areas.slider.onmousedown = function(e){
					Ipad.areas.unlock_knob.style.left = 0 + 'px';
				};*/
			}

		});

		new Dragdealer('volume_slider', {
			slide: false,
			animationCallback: function(x, y) {
				if (x < 0.21) { //breakpoints for making volume knob stay above fill
					Ipad.areas.volume_filler.style.width = ((x * 100) + 10) + '%';
				} else if (x < 0.58) {
					Ipad.areas.volume_filler.style.width = ((x * 100) + 5) + '%';
				} else {
					Ipad.areas.volume_filler.style.width = (x * 100) + '%';
				}

			}

		});
	}

	function attachEvents() {
		Ipad.areas.power_btn.addEventListener('click', powerOff.bind(null, false));
		Ipad.areas.home_btn.addEventListener('click', powerOff.bind(null, true));
		Ipad.areas.home_btn.addEventListener('dblclick', Lockscreen.loadPlayer);
		Ipad.areas.prev_btn.addEventListener('click', Lockscreen.prevPlayer);
		Ipad.areas.play_btn.addEventListener('click', Lockscreen.playPlayer);
		Ipad.areas.next_btn.addEventListener('click', Lockscreen.nextPlayer);
	}

	function powerOff(home_btn, e) {
		e = e || window.event;
		if (home_btn === true) {
			if (Lockscreen.off) {
				Lockscreen.power();
			}
		} else {
			Lockscreen.power();
		}
		e.returnValue = false;
		return false;
	}

	function loadItunes() {
		console.log('itunes loaded');
	}

	return {
		init: init,
		itunes_is_loaded: itunes_is_loaded,
		loadItunes: loadItunes
	};

})();

App.init();
