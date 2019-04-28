"use strict";function formatTime(a){return 10>a&&(a="0"+a),a}function clock(){{var a=new Date,b=a.getHours(),c=formatTime(a.getMinutes());setTimeout(clock,500)}document.getElementById("time").innerHTML=b+":"+c,document.getElementById("subtitle").innerHTML=greeter(b,c),pomodoroStarted?1500>pomodoroPeriod&&(pomodoroPeriod+=.25,document.getElementById("p-bar").style.width=pomodoroPeriod+"px"):document.getElementById("p-bar").style.width=0,3e5===globalRefreshWeather?(console.log("weather update!"),weather(),globalRefreshWeather=0):globalRefreshWeather+=500}function monthName(a){return 0===a?"Enero":1===a?"Febrero":2===a?"Marzo":3===a?"Abril":4===a?"Mayo":5===a?"Junio":6===a?"Julio":7===a?"Agosto":8===a?"Septiembre":9===a?"Octubre":10===a?"Noviembre":11===a?"Diciembre":void 0}function greeter(a,b){return a>=0&&2>a?"No es hora de ir a dormir?":a>=2&&4>a?"Va a ser una noche larga":a>=4&&6>a?"Dormir es para los debiles":a>=6&&8>a?"Carpe Diem":a>=8&&10>a?"Hello World!":a>=10&&12>a?"Es tiempo de café":a>=12&&14>a?13===a&&37===b?(document.getElementById("main").style.backgroundImage='url("/images/99.gif")',"hacking time"):"Que hay para almorzar?":a>=14&&18>a?"Todavia hay mucho que hacer":a>=18&&20>a?"":"Hasta mañana!"}function getLastDayOfMonth(a){if(1===a){var b=new Date;return b.getYear()%4!==0||b.getYear%100===0&&b.getYear%400!==0?28:29}return a%2===0?31:30}function generateCalendar(){var a=new Date,b=a.getDay(),c=a.getMonth(),d=a.getDate(),e="<p>"+monthName(c)+"</p>";0===b&&(b=7);var f=d-b+1;e+='<ul class="vertical-lst calendar-days">',0>=f&&(c-=1,f=getLastDayOfMonth(c)+f);for(var g=f,h=1;7>=h;h++)g>getLastDayOfMonth(c)&&(g=1),e=d===g?e+'<li class="today">'+formatTime(g)+"</li>":e+"<li>"+formatTime(g)+"</li>",g+=1;e+="</ul>",document.getElementById("calendar").innerHTML=e}function randomizeBackground(){var a=Math.floor(52*Math.random());a=formatTime(a)+".gif";var b=document.getElementById("main");b.style.backgroundImage='url("/images/'+a+'")'}function toCelsius(a){return Math.floor(a-273.15)}function weather(){var a=new XMLHttpRequest;a.onreadystatechange=function(){if(4==a.readyState&&200==a.status){var b=JSON.parse(a.response),c='<p><img src="/images/weather/'+b.weather[0].icon+'.png">';c=c+"<span>"+toCelsius(b.main.temp)+"º</span><br/>",c=c+b.weather[0].description+"</p>",document.getElementById("weather").innerHTML=c}},a.open("GET","https://api.openweathermap.org/data/2.5/weather?id=3837855&APPID=c0786e625f846db6c23e87404a2ccf04",!0),a.send()}var globalRefreshWeather=0,optionsVisible=!1,pomodoroStarted=!1,pomodoroPeriod=0;window.addEventListener("keydown",function(a){40===a.keyCode&&(document.getElementById("menu-container").classList.add("onTop"),document.getElementById("widget-container").classList.add("onBottom"),a.preventDefault()),38===a.keyCode&&(document.getElementById("menu-container").classList.remove("onTop"),document.getElementById("widget-container").classList.remove("onBottom")),17===a.keyCode&&(optionsVisible===!0?(document.getElementById("options").classList.remove("from-left"),optionsVisible=!1):(document.getElementById("options").classList.add("from-left"),optionsVisible=!0))}),window.addEventListener("wheel",function(a){a.deltaY>0?(document.getElementById("menu-container").classList.add("onTop"),document.getElementById("widget-container").classList.add("onBottom"),a.preventDefault()):(document.getElementById("menu-container").classList.remove("onTop"),document.getElementById("widget-container").classList.remove("onBottom"))}),window.onload=function(){randomizeBackground(),clock(),generateCalendar(),weather(),document.getElementById("start-pomodoro").addEventListener("click",function(){pomodoroStarted=!pomodoroStarted});var a=document.getElementById("search-box");a.addEventListener("keydown",function(a){13===a.keyCode&&(location="https://www.google.com/search?q="+encodeURIComponent(document.getElementById("search-box").value))})};