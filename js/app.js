/*global
	$, Lockscreen, Ipad, Dragdealer, Itunes
*/
var App = (function() {

	var itunes_is_loaded = false,
		audio = new Audio(),
		music_screen_displayed = false;

	function init() {
		createStuff();
		attachEvents();
	}

	function createStuff() {
		Lockscreen.petals.draw(16);
		Lockscreen.init();
		createSlideToUnlock();
	}

	function attachEvents() {
		Ipad.areas.power_btn.addEventListener('click', powerOff.bind(null, false));
		Ipad.areas.home_btn.addEventListener('click', powerOff.bind(null, true));
		Ipad.areas.home_btn.addEventListener('dblclick', loadMusic);
		Ipad.areas.prev_btn.addEventListener('click', Lockscreen.prevPlayer);
		Ipad.areas.play_btn.addEventListener('click', Lockscreen.pausePlay);
		Ipad.areas.next_btn.addEventListener('click', Lockscreen.nextPlayer);
	}

	function createSlideToUnlock() {
		new Dragdealer('slider', {
			slide: false,
			animationCallback: function(x, y) {
				Ipad.areas.slide_text.style.opacity = (-0.02 * parseInt(Ipad.areas.unlock_knob.style.left, 10)) + 1;
				/*Ipad.areas.slider.onmousedown = function(e){
					Ipad.areas.unlock_knob.style.left = 0 + 'px';
				};*/
			}

		});
	}

	function loadMusic() {
		Lockscreen.loadPlayer();
		if (!music_screen_displayed) {
			createVolumeControl();
			music_screen_displayed = true;
		}
	}

	function createVolumeControl() {
		var initial_volume = 0.58,
			volume_slider_width = 200;

		//Ipad.areas.volume_knob.style.left = (initial_volume - 0.10) * volume_slider_width + 'px';

		new Dragdealer('volume_slider', {
			slide: false,
			x: initial_volume - 0.1,
			animationCallback: function(x, y) {
				if (x < 0.21) { //breakpoints for making volume knob stay above fill
					Ipad.areas.volume_filler.style.width = ((x * 100) + 10) + '%';
				} else if (x < 0.58) {
					Ipad.areas.volume_filler.style.width = ((x * 100) + 5) + '%';
				} else {
					Ipad.areas.volume_filler.style.width = (x * 100) + '%';
				}
				clearTimeout(Lockscreen.song_loaded_timer);
			}
		});
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


	//audio stuff for itunes
	function canPlayMp3() {
		return !!audio.canPlayType && audio.canPlayType('audio/mp3') !== "";
	}

	function canPlayOgg() {
		return !!audio.canPlayType && audio.canPlayType('audio/ogg; codecs="vorbis"') !== "";
	}

	function loadAudio (file, loop) {
		var song = new Audio(),
			ext;

		if (canPlayMp3()) {
			ext = '.mp3';
		} else if (canPlayOgg()) {
			ext = '.ogg';
		}

		song.setAttribute('src', file + ext);
		song.preload = 'auto';
		song.loop = (loop === true ? true : false);

		return song;
	}

	return {
		init: init,
		itunes_is_loaded: itunes_is_loaded,
		loadItunes: loadItunes,
		canPlayOgg: canPlayOgg,
		canPlayMp3: canPlayMp3,
		loadAudio: loadAudio
	};

})();

App.init();
