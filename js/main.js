var btnSecUp 		= document.getElementById("btn-sec-up");
var btnSecDown 	= document.getElementById("btn-sec-down");
var btnMinUp 		= document.getElementById("btn-min-up");
var btnMinDown 	= document.getElementById("btn-min-down");
var btnStart		= document.getElementById("btn-start");
var btnStop			= document.getElementById("btn-stop");
var secUnits 		= document.getElementById("sec-units");
var secTens 		= document.getElementById("sec-tens");
var minUnits 		= document.getElementById("min-units");
var minTens 		= document.getElementById("min-tens");
var points 			= document.getElementById("points");
var secUnitsList 	= secUnits.querySelectorAll("li");
var secTensList 	= secTens.querySelectorAll("li");
var minUnitsList 	= minUnits.querySelectorAll("li");
var minTensList 	= minTens.querySelectorAll("li");
var pointsList		= points.querySelectorAll("li");
var secUnitsVal 	= 0;
var secTensVal 	= 0;
var minUnitsVal 	= 0;
var minTensVal 	= 0;
var btnStartClick	= 0;
var btnStopClick 	= 0;
var idTimer 		= "";
var idSeparator	= "";
var preset 			= [
	["A", "B", "C", "D", "E", "F", "-"],
	["-", "B", "C", "-", "-", "-", "-"],
	["A", "B", "-", "D", "E", "-", "G"],
	["A", "B", "C", "D", "-", "-", "G"],
	["-", "B", "C", "-", "-", "F", "G"],
	["A", "-", "C", "D", "-", "F", "G"],
	["A", "-", "C", "D", "E", "F", "G"],
	["A", "B", "C", "-", "-", "-", "-"],
	["A", "B", "C", "D", "E", "F", "G"],
	["A", "B", "C", "D", "-", "F", "G"]
];

btnStart.disabled 	= true;
btnStop.disabled 		= true;
btnSecUp.onclick		= function() {setTime(btnSecUp)};
btnSecDown.onclick 	= function() {setTime(btnSecDown)};
btnMinUp.onclick 		= function() {setTime(btnMinUp)};
btnMinDown.onclick 	= function() {setTime(btnMinDown)};
btnStart.onclick 		= function() {
	btnStartClick++;
	idTimer = setInterval(startCount, 1000);
	idSeparator = setInterval(flashPoints, 1000);

	if(btnStartClick >= 1) {
		btnStop.innerHTML	= "Stop";
		btnStartClick		= 0;
		btnStopClick		= 0;
	}
}
btnStop.onclick = function() {
	btnStopClick++;
	stopCount();
}

function flashPoints() {
	if(pointsList[0].style.visibility === "visible" && pointsList[1].style.visibility === "visible") {
		pointsList[0].style.visibility = "hidden";
		pointsList[1].style.visibility = "hidden";
	}
	else {
		pointsList[0].style.visibility = "visible";
		pointsList[1].style.visibility = "visible";
	}
}

function changeDisplay(digit, set) {
	for(var i = 0, j = 0; i < preset[digit].length, j < set.length; i++, j++) {
		if(preset[digit][i] === "-") {
			set[j].removeAttribute("class");
		}
		else {
			set[j].setAttribute("class", preset[digit][i]);
		}
	}
}

function startCount() {
	btnStart.disabled 	= true;
	btnSecUp.disabled 	= true;
	btnSecDown.disabled 	= true;
	btnMinUp.disabled 	= true;
	btnMinDown.disabled 	= true;

	if(secUnitsVal <= 0) {
		secUnitsVal = 9;
		secTensVal--;
		changeDisplay(secUnitsVal, secUnitsList);

		if(secTensVal < 0) {
			secTensVal = 5;
			minUnitsVal--;
			changeDisplay(secTensVal, secTensList);
			
			if(minUnitsVal < 0) {
				minUnitsVal = 9;
				minTensVal--;
				changeDisplay(minUnitsVal, minUnitsList);
				changeDisplay(minTensVal, minTensList);
			}
			changeDisplay(minUnitsVal, minUnitsList);
		}
		changeDisplay(secUnitsVal, secUnitsList);
		changeDisplay(secTensVal, secTensList);
	}

	else {
		secUnitsVal--;
		changeDisplay(secUnitsVal, secUnitsList);
	}

	if(secUnitsVal === 0 && secTensVal === 0 && minUnitsVal === 0 && minTensVal === 0) {
		clearInterval(idTimer);
		clearInterval(idSeparator);
		btnStart.disabled 	= true;
		btnStop.disabled 		= true;
		btnSecUp.disabled 	= false;
		btnSecDown.disabled 	= false;
		btnMinUp.disabled 	= false;
		btnMinDown.disabled 	= false;
		pointsList[0].style.visibility = "visible";
		pointsList[1].style.visibility = "visible";
		var alarm = new Audio();
		alarm.src = 'alarm.mp3';
		alarm.autoplay = true;
	}
}

function stopCount() {
	clearInterval(idTimer);
	clearInterval(idSeparator);
	btnStart.disabled	= false;
	btnStop.innerHTML = "Reset";
	
	if(btnStopClick > 1) {
		btnStopClick 	= 0
		secUnitsVal 	= 0;
		secTensVal 		= 0;
		minUnitsVal 	= 0;
		minTensVal 		= 0;
		changeDisplay(secUnitsVal, secUnitsList);
		changeDisplay(secTensVal, secTensList);		
		changeDisplay(minUnitsVal, minUnitsList);
		changeDisplay(minTensVal, minTensList);
		btnStop.innerHTML 	= "Stop";
		btnSecUp.disabled 	= false;
		btnSecDown.disabled 	= false;
		btnMinUp.disabled 	= false;
		btnMinDown.disabled 	= false;
		btnStop.disabled 		= true;
		btnStart.disabled 	= true;
		pointsList[0].style.visibility = "visible";
		pointsList[1].style.visibility = "visible";
	}
}

function setTime(button) {
	btnStart.disabled 	= false;
	btnStop.disabled 		= false;
	switch (button) {
		case btnSecUp:
			if(secUnitsVal >= 9 && secTensVal >= 5 && minUnitsVal >= 9 && minTensVal >= 5) {
				alert("Значение минут не должно быть более 59");
			}

			else if(secUnitsVal >= 9) {
					secUnitsVal = 0;
					secTensVal++;
					changeDisplay(secUnitsVal, secUnitsList);

					if(secTensVal > 5) {
						secTensVal = 0;
						minUnitsVal++;
						changeDisplay(secTensVal, secTensList);
						
						if(minUnitsVal > 9) {
							minUnitsVal = 0;
							minTensVal++;
							changeDisplay(minUnitsVal, minUnitsList);
							changeDisplay(minTensVal, minTensList);
						}
						changeDisplay(minUnitsVal, minUnitsList);
					}
					changeDisplay(secUnitsVal, secUnitsList);
					changeDisplay(secTensVal, secTensList);
				}

			else {
				secUnitsVal++;
				changeDisplay(secUnitsVal, secUnitsList);
			}
		break;

		case btnSecDown:
			if(secUnitsVal === 0 && secTensVal === 0 && minUnitsVal === 0 && minTensVal === 0) {
				alert("Введите корректное значение времени");
			}

			else if(secUnitsVal <= 0) {
					secUnitsVal = 9;
					secTensVal--;
					changeDisplay(secUnitsVal, secUnitsList);

					if(secTensVal < 0) {
						secTensVal = 5;
						minUnitsVal--;
						changeDisplay(secTensVal, secTensList);
						
						if(minUnitsVal < 0) {
							minUnitsVal = 9;
							minTensVal--;
							changeDisplay(minUnitsVal, minUnitsList);
							changeDisplay(minTensVal, minTensList);
						}
						changeDisplay(minUnitsVal, minUnitsList);
					}
					changeDisplay(secUnitsVal, secUnitsList);
					changeDisplay(secTensVal, secTensList);
				}

			else {
				secUnitsVal--;
				changeDisplay(secUnitsVal, secUnitsList);
			}
		break;

		case btnMinUp:
			if(secUnitsVal >= 0 && secTensVal >= 0 && minUnitsVal >= 9 && minTensVal >= 5) {
				secUnitsVal = 9;
				secTensVal = 5;
				minUnitsVal = 9;
				minTensVal = 5;
				changeDisplay(secUnitsVal, secUnitsList);
				changeDisplay(secTensVal, secTensList);
				changeDisplay(minUnitsVal, minUnitsList);
				changeDisplay(minTensVal, minTensList);

				alert("Значение минут не должно быть более 59");
			}
			else if(minUnitsVal >= 9) {
				minUnitsVal = 0;
				minTensVal++;
				changeDisplay(minUnitsVal, minUnitsList);
				changeDisplay(minTensVal, minTensList);
			}
			else {
				minUnitsVal++;
				changeDisplay(minUnitsVal, minUnitsList);
			}
		break;

		case btnMinDown:
			if(minUnitsVal <= 0 && minTensVal <= 0) {
				alert("Введите корректное значение времени");
			}
			else if(minUnitsVal <= 0) {
				minUnitsVal = 9;
				minTensVal--;
				changeDisplay(minUnitsVal, minUnitsList);
				changeDisplay(minTensVal, minTensList);
			}
			else {
				minUnitsVal--;
				changeDisplay(minUnitsVal, minUnitsList);
			}
		break;
	}
}