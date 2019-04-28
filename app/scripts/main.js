var globalRefreshWeather = 0,
    optionsVisible       = false,
    pomodoroStarted     = false,
    pomodoroPeriod      = 0;


function formatTime(t){
  if (t < 10) { t = '0' + t };
  return t;
}

function clock(){
  var now   = new Date(),
      h     = now.getHours(),
      m     = formatTime(now.getMinutes()),
      sleep = setTimeout(clock, 500);

  document.getElementById('time').innerHTML = h + ':' + m;
  document.getElementById('subtitle').innerHTML = greeter(h,m);

  // Update the pomodoro timer
  if (pomodoroStarted) {
    if (pomodoroPeriod < 1500){
      pomodoroPeriod += .25;
      document.getElementById('p-bar').style.width = pomodoroPeriod + 'px';
    } else {
      if (pomodoroPeriod < 2100){

      }
    }
  } else {
    document.getElementById('p-bar').style.width = 0;
  };

  // Update the weather every 5 minutes if not refreshed
  if (globalRefreshWeather === ((500 * 2) * 60 * 5)) {
    console.log('weather update!');
    weather();
    globalRefreshWeather = 0;
  } else {
    globalRefreshWeather += 500;
  }

}


function monthName(m){
  if (m === 0) {
    return 'Enero';
  } else if(m === 1) {
    return 'Febrero';
  } else if(m === 2) {
    return 'Marzo';
  } else if(m === 3) {
    return 'Abril';
  } else if(m === 4) {
    return 'Mayo';
  } else if(m === 5) {
    return 'Junio';
  } else if(m === 6) {
    return 'Julio';
  } else if(m === 7) {
    return 'Agosto';
  } else if(m === 8) {
    return 'Septiembre';
  } else if(m === 9) {
    return 'Octubre';
  } else if(m === 10) {
    return 'Noviembre';
  } else if(m === 11) {
    return 'Diciembre';
  }
}

function greeter(h,m){
  if ((h >= 0) && (h < 2)){
    return 'No es hora de ir a dormir?';
  } else if ((h >= 2) && (h < 4)) {
    return 'Va a ser una noche larga';
  } else if ((h >= 4) && (h < 6)) {
    return 'Dormir es para los debiles';
  } else if ((h >= 6) && (h < 8)) {
    return 'Carpe Diem';
  } else if ((h >= 8) && (h < 10)) {
    return 'Hello World!';
  } else if ((h >= 10) && (h < 12)) {
    return 'Es tiempo de café';
  } else if ((h >= 12) && (h < 14)) {
    // Easter Egg
    if ((h === 13) && (m === 37)) {
      document.getElementById('main').style.backgroundImage = 'url("/images/99.gif")';
      return 'hacking time';
    }
    return 'Que hay para almorzar?';
  } else if ((h >= 14) && (h < 18)) {
    return 'Todavia hay mucho que hacer';
  } else if ((h >= 18) && (h < 20)) {
    return '';
  } else {
    return 'Hasta mañana!';
  }
}

function getLastDayOfMonth(month) {
  if (month === 1) {
    var now = new Date();
    if ((now.getYear() % 4 === 0) && ((now.getYear % 100 !== 0) || (now.getYear % 400 === 0))){
      return 29
    } else {
      return 28
    }
  } else {
    if (month % 2 === 0) {
      return 31
    } else {
      return 30
    }
  }
}


function generateCalendar(){
  var now        = new Date(),
      today      = now.getDay(),
      thisMonth  = now.getMonth(),
      thisDay    = now.getDate(),
      widgetCode = '<p>' + monthName(thisMonth) + '</p>';

  if (today === 0) { today = 7 };
  var fstDayWeek = thisDay - today + 1; // Compensacion de la semana para que comience el lunes


  widgetCode = widgetCode + '<ul class="vertical-lst calendar-days">';

  if (fstDayWeek <= 0) {
    thisMonth -= 1;
    fstDayWeek = getLastDayOfMonth(thisMonth) + fstDayWeek;
  }

  var day = fstDayWeek;

  for (var i = 1; i <= 7; i++) {
    if (day > getLastDayOfMonth(thisMonth)) {
      day = 1
    }

    if (thisDay === day) {
      widgetCode = widgetCode + '<li class="today">' + formatTime(day) + '</li>';
    } else {
      widgetCode = widgetCode + '<li>' + formatTime(day) + '</li>';
    }

    day += 1;
  }

  widgetCode = widgetCode + '</ul>';
  document.getElementById('calendar').innerHTML = widgetCode;
}


function randomizeBackground(){
  var imgName = Math.floor(Math.random() * 52);

  imgName = formatTime(imgName) + '.gif';

  var mainBackground = document.getElementById('main');
  mainBackground.style.backgroundImage = 'url("/images/' + imgName + '")';
}


function toCelsius(temp){
  return Math.floor(temp - 273.15)
}


function weather(){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if (xhttp.readyState == 4 && xhttp.status == 200){

      var wtrInfo = JSON.parse(xhttp.response);

      var widgetCode = '<p><img src="/images/weather/' + wtrInfo.weather[0].icon + '.png">';
      widgetCode = widgetCode + '<span>' + toCelsius(wtrInfo.main.temp) + 'º</span><br/>';
      widgetCode = widgetCode + wtrInfo.weather[0].description + '</p>';

      document.getElementById('weather').innerHTML = widgetCode;

    }
  }
  xhttp.open('GET','http://api.openweathermap.org/data/2.5/weather?id=3837855&APPID=c0786e625f846db6c23e87404a2ccf04',true);
  xhttp.send();
}

window.addEventListener('keydown', function(event){
  if (event.keyCode === 40) {
    document.getElementById('menu-container').classList.add('onTop');
    document.getElementById('widget-container').classList.add('onBottom');
    event.preventDefault();
  }
  if (event.keyCode === 38) {
    document.getElementById('menu-container').classList.remove('onTop');
    document.getElementById('widget-container').classList.remove('onBottom');
  }

  if (event.keyCode === 17) {
    if (optionsVisible === true) {
      document.getElementById('options').classList.remove('from-left');
      optionsVisible = false;
    } else {
      document.getElementById('options').classList.add('from-left');
      optionsVisible = true;
    }
  }
});


window.addEventListener('wheel', function(event){
  if (event.deltaY > 0) {
    document.getElementById('menu-container').classList.add('onTop');
    document.getElementById('widget-container').classList.add('onBottom');
    event.preventDefault();
  } else {
    document.getElementById('menu-container').classList.remove('onTop');
    document.getElementById('widget-container').classList.remove('onBottom');
  }
});

window.onload = function(){
  randomizeBackground();
  clock();
  generateCalendar();
  weather();

  // Initialize pomodoro timer
  document.getElementById('start-pomodoro').addEventListener('click', function(event){ pomodoroStarted = !pomodoroStarted; })

  var search = document.getElementById('search-box');

  search.addEventListener('keydown', function(event){
    if (event.keyCode === 13) {
      location='https://www.google.com/search?q=' + encodeURIComponent(document.getElementById('search-box').value);
    }
  });
}
