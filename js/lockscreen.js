var Lockscreen = {

	//properties___________________________________________

	lock				: true,
	off					: false,
	timer				: null,
	music				: false,
	song_loaded			: false,
	song_loaded_timer	: null,


	// constants___________________________________________

	MUSIC_TIME		: 4000,


	init : function() {
		var self = this,
			slide_to_unlock = $('#slidetounlock');
		if (!Lockscreen.lock) {
			self.timer = setInterval(function() {
				self.clock(Ipad.areas.clock, true);
			}, 1000);
		} else {
			document.getElementById('lock').style.display = "block";
			self.timer = setInterval(function() {
				self.clock(Ipad.areas.lock_time, false, true);
			}, 1000);

			$('#unlockbar').mouseup(function() {
				if (parseInt(Ipad.areas.unlock_knob.style.left, 10) < 196) {
					Ipad.areas.unlock_knob.style.left = 0 + 'px';
					Ipad.areas.slide_text.style.opacity = 1;
					if (!slide_to_unlock.hasClass('animate')) {
						slide_to_unlock.addClass('animate');
					}
				} else if (parseInt(Ipad.areas.unlock_knob.style.left, 10) >= 196) {
					$(this).click();
					self.unlock();
				} else if (parseInt(Ipad.areas.unlock_knob.style.left, 10) === 196) {

				}
			}).mousedown(function() {
				if (parseInt(Ipad.areas.unlock_knob.style.left, 10) > 1) {
					if (!slide_to_unlock.hasClass('animate')) {
						slide_to_unlock.addClass('animate');
					}
				} else if (parseInt(Ipad.areas.unlock_knob.style.left, 10) === 0) {
					if (slide_to_unlock.hasClass('animate')) {
						slide_to_unlock.removeClass('animate');
					}
				}
			});
		}
	},

	clock : function(area, suffix, locked) {
		var date = new Date(),
			hour = (date.getHours() > 12) ? parseInt(date.getHours(),10) - 12 : date.getHours(),
			minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes(),
			ampm = '';
		if (suffix) {
			ampm = (parseInt(date.getHours(),10) < 12)? ' AM' : ' PM';
		}
		if (hour === 0) {
			hour = 12;
		}
		area.innerHTML = hour + ":" + minutes + ampm;
		if (locked) {
			var formatted = date.toLocaleDateString();
			Ipad.areas.lock_date.innerHTML = formatted.substring(0, formatted.lastIndexOf(','));
		}
	},

	unlock : function() {
		Ipad.areas.lock_icon.style.display = 'none';
		Ipad.areas.unlock_bar.style.display = 'none';
		Ipad.areas.player_bar.style.display = 'none';
		Ipad.areas.lock_bar.style.display = 'none';
		this.lock = false;
		Lockscreen.init();
	},

	power : function() {
		var self = this;

		if (!self.off) {
			Ipad.areas.unlock_bar.style.display = 'none';
			Ipad.areas.lock_bar.style.display = 'none';
			Ipad.areas.player_bar.style.display = 'none';
			Ipad.areas.top_bar.style.visibility = 'hidden';
			Ipad.areas.screen.className = 'off';
			self.off = true;
		} else {
			clearInterval(Lockscreen.timer);
			Ipad.areas.top_bar.style.visibility = 'visible';
			Ipad.areas.screen.className = '';
			Ipad.areas.unlock_bar.style.display = 'block';
			Ipad.areas.lock_bar.style.display = 'block';
			Ipad.areas.unlock_knob.style.left = 0 + 'px';
			Ipad.areas.slide_text.style.opacity = 1;

			if (!self.lock) {
				self.lock = true;
			}

			self.off = false;
		}

		self.checkSlide();
	},

	checkSlide : function() {
		if (Ipad.areas.slide_text.className.indexOf('animate') !== -1) {
			Ipad.areas.slide_text.className = Ipad.areas.slide_text.className.substring(0, Ipad.areas.slide_text.className.indexOf('animate'));
		} else if (Ipad.areas.slide_text.className.indexOf('animate') == -1) {
			Ipad.areas.slide_text.className += ' animate';
		}
	},

	petals : {
		draw : function(amount) {
			var amt = amount,
				fixedAngle = 360 / amount,
				flower = document.getElementById('petalring'),
				radius = 6,
				alpha = Math.PI * 2 / amt;
			for (var i = 0;i<amount;i++) {
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
	},

	//Event Handlers _________________________________________________

	loadPlayer: function() {
		var self = Lockscreen;
		if (!App.itunes_is_loaded) {
			App.loadItunes();
			App.itunes_is_loaded = true;
		}
		clearInterval(self.song_loaded_timer);
		if (!self.music) {
			self.clock(Ipad.areas.clock, true);
			self.timer = setInterval(function() {
				self.clock(Ipad.areas.clock, true);
			}, 1000);
			Ipad.areas.clock.style.display = 'block';
			Ipad.areas.lock_icon.style.left = '-25px';
			Ipad.areas.lock_bar.style.display = 'none';
			Ipad.areas.player_bar.style.display = 'block';
			if (!self.song_loaded) {
				self.song_loaded_timer = setTimeout(function() {
					self.music = true;
					self.loadPlayer();
				}, self.MUSIC_TIME);
			}
		} else {
			Ipad.areas.clock.style.display = 'none';
			Ipad.areas.lock_icon.style.left = '0px';
			Ipad.areas.player_bar.style.display = 'none';
			Ipad.areas.lock_bar.style.display = 'block';
		}

		self.music = !self.music;
	},

	playPlayer: function() {
		alert('play shit');
		return false;
	},

	pausePlayer: function() {
		alert('pause shit');
		return false;
	},

	nextPlayer: function() {
		alert('next shit');
		return false;
	},

	prevPlayer: function() {
		alert('previous shit');
		return false;
	}

};