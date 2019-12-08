window.onload = () => {
  const btnSecUp = document.querySelector('.button_second_up');
  const btnSecDown = document.querySelector('.button_second_down');
  const btnMinUp = document.querySelector('.button_minute_up');
  const btnMinDown = document.querySelector('.button_minute_down');
  const btnStart = document.querySelector('.button_start');
  const btnStop = document.querySelector('.button_stop');
  const minTensList = document.querySelectorAll('.indicator')[0].children;
  const minUnitsList = document.querySelectorAll('.indicator')[1].children;
  const secTensList = document.querySelectorAll('.indicator')[2].children;
  const secUnitsList = document.querySelectorAll('.indicator')[3].children;
  let secUnitsVal = 0;
  let secTensVal = 0;
  let minUnitsVal = 0;
  let minTensVal = 0;
  let btnStartClick = 0;
  let btnStopClick = 0;
  let idTimer = '';
  let idSeparator = '';
  const preset = [
    ['A', 'B', 'C', 'D', 'E', 'F', '-'], ['-', 'B', 'C', '-', '-', '-', '-'], ['A', 'B', '-', 'D', 'E', '-', 'G'], ['A', 'B', 'C', 'D', '-', '-', 'G'], ['-', 'B', 'C', '-', '-', 'F', 'G'], ['A', '-', 'C', 'D', '-', 'F', 'G'], ['A', '-', 'C', 'D', 'E', 'F', 'G'], ['A', 'B', 'C', '-', '-', '-', '-'], ['A', 'B', 'C', 'D', 'E', 'F', 'G'], ['A', 'B', 'C', 'D', '-', 'F', 'G'],
  ];
  
  btnStart.disabled = true;
  btnStop.disabled = true;
  
  function flashPoints(param) {
    const points = document.querySelectorAll('.separator__point');
    if (param === 'show') {
      points[0].classList.remove('separator__point_invisible');
      points[1].classList.remove('separator__point_invisible');
    } else {
      points[0].classList.toggle('separator__point_invisible');
      points[1].classList.toggle('separator__point_invisible');
    }
  }
  
  function changeDisplay(digit, set) {
    for (let i = 0, j = 0; i < preset[digit].length, j < set.length; i++, j++) {
      const className = set[j].classList;
      if (preset[digit][i] === '-') className.remove(className[1]);
      else className.add(`${className[0]}_${preset[digit][i]}`);
    }
  }
  
  function startCount() {
    btnStart.disabled = true;
    btnSecUp.disabled = true;
    btnSecDown.disabled = true;
    btnMinUp.disabled = true;
    btnMinDown.disabled = true;
  
    if (secUnitsVal <= 0) {
      secUnitsVal = 9;
      secTensVal -= 1;
      changeDisplay(secUnitsVal, secUnitsList);
  
      if (secTensVal < 0) {
        secTensVal = 5;
        minUnitsVal -= 1;
        changeDisplay(secTensVal, secTensList);
  
        if (minUnitsVal < 0) {
          minUnitsVal = 9;
          minTensVal -= 1;
          changeDisplay(minUnitsVal, minUnitsList);
          changeDisplay(minTensVal, minTensList);
        }
        changeDisplay(minUnitsVal, minUnitsList);
      }
      changeDisplay(secUnitsVal, secUnitsList);
      changeDisplay(secTensVal, secTensList);
    } else {
      secUnitsVal -= 1;
      changeDisplay(secUnitsVal, secUnitsList);
    }
  
    if (
      secUnitsVal === 0
      && secTensVal === 0
      && minUnitsVal === 0
      && minTensVal === 0
    ) {
      clearInterval(idTimer);
      clearInterval(idSeparator);
      flashPoints('show');
      btnStart.disabled = true;
      btnStop.disabled = true;
      btnSecUp.disabled = false;
      btnSecDown.disabled = false;
      btnMinUp.disabled = false;
      btnMinDown.disabled = false;
      const alarm = new Audio();
      alarm.src = 'sounds/alarm.mp3';
      alarm.autoplay = true;
    }
  }
  
  function stopCount() {
    clearInterval(idTimer);
    clearInterval(idSeparator);
    btnStart.disabled = false;
    btnStop.innerHTML = 'Reset';
  
    if (btnStopClick > 1) {
      btnStopClick = 0;
      secUnitsVal = 0;
      secTensVal = 0;
      minUnitsVal = 0;
      minTensVal = 0;
      changeDisplay(secUnitsVal, secUnitsList);
      changeDisplay(secTensVal, secTensList);
      changeDisplay(minUnitsVal, minUnitsList);
      changeDisplay(minTensVal, minTensList);
      flashPoints('show');
      btnStop.innerHTML = 'Stop';
      btnSecUp.disabled = false;
      btnSecDown.disabled = false;
      btnMinUp.disabled = false;
      btnMinDown.disabled = false;
      btnStop.disabled = true;
      btnStart.disabled = true;
    }
  }
  
  function setTime(unit, action) {
    btnStart.disabled = false;
    btnStop.disabled = false;
  
    function increaseSecond() {
      if (
        secUnitsVal >= 9
        && secTensVal >= 5
        && minUnitsVal >= 9
        && minTensVal >= 5
      ) {
        return false;
      }
      if (secUnitsVal >= 9) {
        secUnitsVal = 0;
        secTensVal += 1;
        changeDisplay(secUnitsVal, secUnitsList);
  
        if (secTensVal > 5) {
          secTensVal = 0;
          minUnitsVal += 1;
          changeDisplay(secTensVal, secTensList);
  
          if (minUnitsVal > 9) {
            minUnitsVal = 0;
            minTensVal += 1;
            changeDisplay(minUnitsVal, minUnitsList);
            changeDisplay(minTensVal, minTensList);
          }
          changeDisplay(minUnitsVal, minUnitsList);
        }
        changeDisplay(secUnitsVal, secUnitsList);
        changeDisplay(secTensVal, secTensList);
      } else {
        secUnitsVal += 1;
        changeDisplay(secUnitsVal, secUnitsList);
      }
    }
  
    function decreaseSecond() {
      if (
        secUnitsVal === 0
        && secTensVal === 0
        && minUnitsVal === 0
        && minTensVal === 0
      ) {
        return false;
      }
      if (secUnitsVal <= 0) {
        secUnitsVal = 9;
        secTensVal -= 1;
        changeDisplay(secUnitsVal, secUnitsList);
  
        if (secTensVal < 0) {
          secTensVal = 5;
          minUnitsVal -= 1;
          changeDisplay(secTensVal, secTensList);
  
          if (minUnitsVal < 0) {
            minUnitsVal = 9;
            minTensVal -= 1;
            changeDisplay(minUnitsVal, minUnitsList);
            changeDisplay(minTensVal, minTensList);
          }
          changeDisplay(minUnitsVal, minUnitsList);
        }
        changeDisplay(secUnitsVal, secUnitsList);
        changeDisplay(secTensVal, secTensList);
      } else {
        secUnitsVal -= 1;
        changeDisplay(secUnitsVal, secUnitsList);
      }
    }
  
    function increaseMinute() {
      if (
        secUnitsVal >= 0
        && secTensVal >= 0
        && minUnitsVal >= 9
        && minTensVal >= 5
      ) {
        secUnitsVal = 9;
        secTensVal = 5;
        minUnitsVal = 9;
        minTensVal = 5;
        changeDisplay(secUnitsVal, secUnitsList);
        changeDisplay(secTensVal, secTensList);
        changeDisplay(minUnitsVal, minUnitsList);
        changeDisplay(minTensVal, minTensList);
        return false;
      }
      if (minUnitsVal >= 9) {
        minUnitsVal = 0;
        minTensVal += 1;
        changeDisplay(minUnitsVal, minUnitsList);
        changeDisplay(minTensVal, minTensList);
      } else {
        minUnitsVal += 1;
        changeDisplay(minUnitsVal, minUnitsList);
      }
    }
  
    function decreaseMinute() {
      if (minUnitsVal <= 0 && minTensVal <= 0) {
        return false;
      }
      if (minUnitsVal <= 0) {
        minUnitsVal = 9;
        minTensVal -= 1;
        changeDisplay(minUnitsVal, minUnitsList);
        changeDisplay(minTensVal, minTensList);
      } else {
        minUnitsVal -= 1;
        changeDisplay(minUnitsVal, minUnitsList);
      }
    }
  
    if (unit === 'second') {
      if (action === 'increase') increaseSecond();
      if (action === 'decrease') decreaseSecond();
    }
  
    if (unit === 'minute') {
      if (action === 'increase') increaseMinute();
      if (action === 'decrease') decreaseMinute();
    }
  }
  
  btnSecUp.onclick = () => setTime('second', 'increase');
  btnSecDown.onclick = () => setTime('second', 'decrease');
  btnMinUp.onclick = () => setTime('minute', 'increase');
  btnMinDown.onclick = () => setTime('minute', 'decrease');
  btnStart.onclick = () => {
    if (
      secUnitsVal === 0
      && secTensVal === 0
      && minUnitsVal === 0
      && minTensVal === 0
    ) {
      return false;
    }
    btnStartClick += 1;
    idTimer = setInterval(startCount, 1000);
    idSeparator = setInterval(flashPoints, 1000);
  
    if (btnStartClick >= 1) {
      btnStop.innerHTML = 'Stop';
      btnStartClick = 0;
      btnStopClick = 0;
    }
  };
  btnStop.onclick = () => {
    btnStopClick += 1;
    stopCount();
  };
};