/* global document */

'use strict';

const allNodeList = document.querySelectorAll('*');
const allElements = Array.prototype.slice.call(allNodeList, 0);

const prefixElements = document.querySelectorAll('.prefix');
const suffixElements = document.querySelectorAll('.suffix');

function el(selector) {
	let qSelector = document.querySelector(selector);
	return qSelector;
}

function setClockElOn(selector) {
	let qSelector = el(selector);
	if (qSelector === null) {
		console.log('Element not found: ' + selector);
	} else {
		el(selector).classList.add('on');
	}
}

function setPrefixElOn(number) {
	prefixElements[number - 1].classList.add('on');
}

function setSuffixElOn(number) {
	if (parseInt(number, 10) === 13) {
		number = 1;
	}
	suffixElements[number - 1].classList.add('on');
}

function setMinutes(minutes) {
	minutes = minutes.toString().split('');

	switch (parseInt(minutes[0], 10)) { // eslint-disable-line default-case
		case 2:
			setClockElOn('.twenty-minutes');
			break;
		case 3:
			setClockElOn('.thirty-minutes');
			break;
		case 4:
			setClockElOn('.forty-minutes');
			break;
		case 5:
			setClockElOn('.fifty-minutes');
			break;
	}

	if (minutes % 10 !== 0) {
		setSuffixElOn(parseInt(minutes[1], 10));
	}
}

function clearClock() {
	allElements.forEach(element => {
		element.classList.remove('on');
	});
}

/** Main / Update Clock
----------------------------------------------------------------------------- */
function updateClock() {
	const date = new Date();
	let hour = date.getHours();
	const minutes= date.getMinutes();

	document.getElementById("currenthour").innerHTML = ""+hour +":"+ minutes
	// Convert 24 hour time to 12 hour
	clearClock();
	setClockElOn(".il");
	setClockElOn(".est");
	if(hour === 0){
		setClockElOn(".minuit");
	} else if(hour === 12){
		setClockElOn(".midi");
	} else {
		if(hour === 1){
			setClockElOn(".heure")
		}else{
			setClockElOn(".heures")
		}
		if (hour <= 16) {
			setClockElOn(".h"+["une", "deux","trois","quatre","cinq","six","sept","huit","neuf","dix","onze", "", "treize", "quatorze", "quinze", "seize"][hour-1]);
		} else if(17 <= hour && hour < 20){
			setClockElOn(".hdix");
			setClockElOn(".h"+["sept","huit","neuf"][hour-17]);
		} else if(20 === hour){
			setClockElOn(".hvingt");
		} else if(21 <= hour && hour < 24){
			setClockElOn(".hvingt");
			if (hour === 21) {
				setClockElOn(".et1");
			}
			setClockElOn(".h"+["une", "deux","trois"][hour-21]);
		}
	}

	if (minutes === 0) {
		setClockElOn(".pile");
	} else if (minutes === 15 || minutes === 30) {
		setClockElOn(".et2");
		if (minutes === 15) {
			setClockElOn(".quart");
		} else {
			if (hour === 12 || hour === 0) {
				setClockElOn(".demi");
			} else {
				setClockElOn(".demie");
			}
		}
	} else{
		let dizaine = Math.floor(minutes/10);
		let unite = minutes%10;
		if (2 <= dizaine) {
			setClockElOn("."+["vingt", "trente", "quarante", "cinquante"][dizaine-2]);
			if (unite !== 0) {
				setClockElOn("."+["un", "deux","trois","quatre","cinq","six","sept","huit","neuf"][unite-1]);
				if(unite === 1){
					setClockElOn(".et3");
				}
			}
		} else if (dizaine === 1) {
			if (unite === 0 || unite >= 7) {
				setClockElOn(".dix");
				setClockElOn("."+["sept","huit","neuf"][unite-7])
			} else if (1<= unite && unite <= 6 && unite !== 5) {
				setClockElOn("."+["onze", "douze","treize","quatorze","" , "seize"][unite-1]);
			}
		} else if (dizaine === 0) {
			setClockElOn("."+["une", "deux","trois","quatre","cinq","six","sept","huit","neuf"][unite-1]);
		}

	}

	/*
	// One minute past [hour]
	if (parseInt(minutes, 10) === 1) {
		setClockElOn('.one');
		setClockElOn('.minute');
		setClockElOn('.past');
		setSuffixElOn(hour);
		return;
	}

	// [minutes] past [hour]
	if (minutes <= 12 && minutes >= 2) {
		setPrefixElOn(minutes);
		setClockElOn('.minutes');
		setClockElOn('.past');
		setSuffixElOn(hour);
		return;
	}

	switch (minutes) { // eslint-disable-line default-case
		// [hour] o'clock
		case 0:
			setPrefixElOn(hour);
			setClockElOn('.oclock');
			return;
		// [hour] [minutes]
		case 13:
			setPrefixElOn(hour);
			setClockElOn('.thirteen');
			return;
		case 14:
			setPrefixElOn(hour);
			setClockElOn('.fourteen');
			return;
		case 16:
			setPrefixElOn(hour);
			setClockElOn('.sixteen');
			return;
		case 17:
			setPrefixElOn(hour);
			setClockElOn('.seventeen');
			return;
		case 18:
			setPrefixElOn(hour);
			setClockElOn('.eighteen');
			return;
		case 19:
			setPrefixElOn(hour);
			setClockElOn('.nineteen');
			return;
		// Quarter past [hour]
		case 15:
			setClockElOn('.quarter');
			setClockElOn('.past');
			setSuffixElOn(hour);
			return;
		// Twenty past [hour]
		case 20:
			setClockElOn('.twenty');
			setClockElOn('.past');
			setSuffixElOn(hour);
			return;
		// Half past [hour]
		case 30:
			setClockElOn('.half');
			setClockElOn('.past');
			setSuffixElOn(hour);
			return;
		// Half to [next hour]
		case 40:
			setClockElOn('.twenty');
			setClockElOn('.to');
			setSuffixElOn(hour + 1);
			return;
		// Quarter to [next hour]
		case 45:
			setClockElOn('.quarter');
			setClockElOn('.to');
			setSuffixElOn(hour + 1);
			return;
		// Ten to [next hour]
		case 50:
			setClockElOn('.ten');
			setClockElOn('.to');
			setSuffixElOn(hour + 1);
			return;
		// Five to [next hour]
		case 55:
			setClockElOn('.five');
			setClockElOn('.to');
			setSuffixElOn(hour + 1);
			return;
	}
	*/
	// [hour] [minutes]
	// setPrefixElOn(hour);
	// setMinutes(minutes);
}

function init_empty_glyph(){
	let glyphs = document.querySelectorAll("glyph");
	glyphs.forEach(glyph => {
		if(glyph.innerHTML === ""){
			glyph.innerHTML = ""+ String.fromCharCode(97+Math.floor(Math.random()*26));;
		}
	});
}

/** Tick / init
----------------------------------------------------------------------------- */
init_empty_glyph();
setInterval(updateClock, 1000);
updateClock();

document.addEventListener(
	"keydown",
	function (e) {
		if (e.keyCode === 13) {
			toggleFullScreen();
		}
	},
	false,
);

function toggleFullScreen() {
	if (!document.fullscreenElement) {
		document.documentElement.requestFullscreen();
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		}
	}
}
