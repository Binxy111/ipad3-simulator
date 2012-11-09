/*global
	$, Lockscreen, Ipad, Dragdealer, Itunes
*/
var App = (function() {

	var itunes_is_loaded = false, //has the home button been pressed twice yet?
		audio = new Audio(), //used to test for compatibility
		song_is_paused = true, //keeps track of pause/play
		music = {
			playlist: [], //list of songs that will play
			index: 0,
			current_song: null,
			previous_song: null,
			next_song: null,
			library_item: null,
			volume: 0
		},
		music_timer = null; //timer to listen for next song

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
		Ipad.areas.prev_btn.addEventListener('click', prevPlayer);
		Ipad.areas.play_btn.addEventListener('click', pausePlay);
		Ipad.areas.next_btn.addEventListener('click', nextPlayer);
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

				adjustVolume(x);
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

		e.preventDefault();
	}

	//audio stuff for itunes

	function loadMusic(e) {
		e = e || window.event;

		Lockscreen.loadPlayer();

		if (!itunes_is_loaded) {
			var random_album = Math.floor(Math.random() * Itunes.library.length);
			createVolumeControl();
			loadItunes(random_album);
			itunes_is_loaded = true;
		}

		e.preventDefault();
	}

	function loadItunes(randomAlbum) {
		var i = 0,
			songs = Itunes.library[randomAlbum].songs,
			dir = Itunes.BASE_DIR + Itunes.library[randomAlbum].dir + '/',
			song;

		//@todo make this better once there is more than 1 album
		music.library_item = randomAlbum;

		for (i; i < songs.length; i++) {
			song = loadAudio(dir + songs[i], false);
			music.playlist.push(song);
		}
	}

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

	function adjustVolume(level) {
		music.volume = level;
		if (music.current_song !== null) {
			music.current_song.volume = level;
		}
	}


	function pausePlay() {
		if (Lockscreen.lock) {
			if (song_is_paused) {
				playPlayer();
				Ipad.areas.music_play_icon.style.display = 'block';
				song_is_paused = false;
			} else {
				pausePlayer();
				Ipad.areas.music_play_icon.style.display = 'none';
				song_is_paused = true;
			}
			Lockscreen.song_loaded = true;
			clearTimeout(Lockscreen.song_loaded_timer);
		} else {

		}
	}

	function playPlayer() {

		music.previous_song = music.current_song;
		music.current_song = music.playlist[music.index];

		music.current_song.play();
		music.current_song.volume = music.volume;
		updateDisplay();

		music_timer = setInterval(function() {
			if (music.current_song.currentTime >= music.current_song.duration) {
				clearInterval(music_timer);
				nextPlayer();
			}
		}, 200);

		return false;
	}

	function pausePlayer() {
		clearInterval(music_timer);
		music.current_song.pause();
		return false;
	}

	function nextPlayer() {
		clearInterval(music_timer);
		if (music.index + 1 > music.playlist.length - 1) {
			music.index = 0;
		} else {
			music.index++;
		}
		if (music.current_song !== null) {
			music.current_song.currentTime = 0;
			music.current_song.pause();
			playPlayer();
		} else {
			updateDisplay();
		}

		return false;
	}

	function findPrevSong() {
		if (music.index - 1 < 0) {
			music.index = music.playlist.length - 1;
		} else {
			music.index--;
		}
	}

	function prevPlayer() {
		clearInterval(music_timer);
		if (music.current_song !== null) {
			if (music.current_song.currentTime < 3) {
				findPrevSong();
			}
			music.current_song.currentTime = 0;
			music.current_song.pause();
			playPlayer();
		} else {
			findPrevSong();
			updateDisplay();
		}
		return false;
	}

	function updateDisplay() {
		var item = Itunes.library[music.library_item];
		Ipad.areas.artist.innerHTML = item.artist;
		Ipad.areas.song.innerHTML = item.songs[music.index];
		Ipad.areas.album.innerHTML = item.album;
		if (!!item.cover) {
			Ipad.areas.screen.className = '';
			Ipad.areas.screen.style.backgroundImage = 'url(' + Itunes.BASE_DIR + encodeURIComponent(item.dir) + '/' + encodeURIComponent(item.cover) + ')';
		} else {
			Ipad.areas.screen.className = 'none';
		}

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
