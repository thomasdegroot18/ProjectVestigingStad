//Overview of function that gets activated at certain actions of the page
window.addEventListener("load", sizePage);
window.addEventListener("resize", sizePage);
window.addEventListener("scroll", fixNav);

// Function for sizing the main containers (header, navbar, footer en main)
function sizePage() {
  //Getting the height of the window and use it to define the other heights.
  var heightOfWindow = window.innerHeight;
  var heightOfHeader = heightOfWindow / 5;
  var heightOfNavbar = heightOfWindow * 0.1;
  var heightOfFooter = heightOfWindow * 0.1;
  /* sizing min-height property of main so when content is less than rest of page,
  otherwise height auto will take over */
  var minHeightOfmain  = heightOfWindow - (heightOfHeader + heightOfNavbar + heightOfFooter);
  // Return the height to elements
  document.getElementById("header").style.height = heightOfHeader + "px";
  document.getElementById("navbar").style.height = heightOfNavbar + "px";
  document.getElementById("footer").style.height = heightOfNavbar + "px";
  document.getElementById("main").style.minHeight = minHeightOfmain + "px";
  document.getElementById("navcontainer").style.minHeight = minHeightOfmain + "px";
}

  /* determine the current padding-top of main for function fixNav, so padding
  in the size of the header can be added when nav gets fixed (in fixed states it
  ). And when size  substracted the original padding is put back */
    const main = document.getElementById("main");
    let compStyles = window.getComputedStyle(main);
    var paddingMain = compStyles.getPropertyValue('padding-top');
    var i = parseInt(paddingMain);

// Function for creating fixed header. Class fixednav will be added to the body for styling.
function fixNav() {
    // headerHeight is determined because navSize will change due padding added
    var sticky = document.getElementById("navbar").offsetTop;
    var headerHeight = document.getElementById("header").offsetHeight;
    var navSize = document.getElementById("navbar").offsetHeight;
    if (window.pageYOffset > sticky) {
      document.getElementById("main").style.paddingTop = (navSize + i) + "px";
      document.body.classList.add("fixednav");
    }
    if (window.pageYOffset < headerHeight ) {
      document.body.classList.remove("fixednav");
      document.getElementById("main").style.paddingTop = i + "px";
    }
  }

/* Prototype & initializing for DayOrNight which calls on the sunrise/sunset code
the sun code is copied from Triggertrap original code on:
https://github.com/Triggertrap/sun-js */
  var isNightTime = false;
  Date.prototype.sunrise = function(latitude, longitude, zenith) {
  	return this.sunriseSet(latitude, longitude, true, zenith);
  }
  Date.prototype.sunset = function(latitude, longitude, zenith) {
  	return this.sunriseSet(latitude, longitude, false, zenith);
  }

 // Function for determine of current time is Day or Night
 function dayOrNight() {
  var sunset = new Date().sunset(52.3559042,4.9546308);
  var sunrise = new Date().sunrise(52.3559042,4.9546308);
  var current = new Date();

  if (current < sunset && current > sunrise) {
    isNightTime = false;
    nightSwitch();
  } else {
    isNightTime = true;
    nightSwitch();
  }
}

// Function that switches class for day or night after clicking the slidebutton.
function nightSwitch() {
  if(isNightTime) {
    isNightTime = false;
      document.getElementById("p").style.color = "white";
      document.getElementById("riseandset").style.color = "white";
      document.getElementById("current").style.color = "white";
      document.getElementById("toggle-btn").classList.add("active");
      document.body.classList.remove('day');
      document.body.classList.add('night');
  } else {
      isNightTime = true;
      document.getElementById("p").style.color = "black";
      document.getElementById("riseandset").style.color = "black";
      document.getElementById("current").style.color = "black";
      document.getElementById("toggle-btn").classList.remove("active");
      document.body.classList.remove('night');
      document.body.classList.add('day');
    }

  }

/* Sun.js code from Triggertrap, original code on:
https://github.com/Triggertrap/sun-js*/

Date.prototype.sunriseSet = function(latitude, longitude, sunrise, zenith) {
  if(!zenith) {
  	zenith = 90.8333;
  }

  var hoursFromMeridian = longitude / Date.DEGREES_PER_HOUR,
  		dayOfYear = this.getDayOfYear(),
  		approxTimeOfEventInDays,
  		sunMeanAnomaly,
  		sunTrueLongitude,
  		ascension,
  		rightAscension,
  		lQuadrant,
  		raQuadrant,
  		sinDec,
  		cosDec,
  		localHourAngle,
  		localHour,
  		localMeanTime,
  		time;

  if (sunrise) {
    approxTimeOfEventInDays = dayOfYear + ((6 - hoursFromMeridian) / 24);
  } else {
    approxTimeOfEventInDays = dayOfYear + ((18.0 - hoursFromMeridian) / 24);
  }

  sunMeanAnomaly = (0.9856 * approxTimeOfEventInDays) - 3.289;
  sunTrueLongitude = sunMeanAnomaly + (1.916 * Math.sinDeg(sunMeanAnomaly)) + (0.020 * Math.sinDeg(2 * sunMeanAnomaly)) + 282.634;
  sunTrueLongitude =  Math.mod(sunTrueLongitude, 360);
  ascension = 0.91764 * Math.tanDeg(sunTrueLongitude);
  rightAscension = 360 / (2 * Math.PI) * Math.atan(ascension);
  rightAscension = Math.mod(rightAscension, 360);
  lQuadrant = Math.floor(sunTrueLongitude / 90) * 90;
  raQuadrant = Math.floor(rightAscension / 90) * 90;
  rightAscension = rightAscension + (lQuadrant - raQuadrant);
  rightAscension /= Date.DEGREES_PER_HOUR;
  sinDec = 0.39782 * Math.sinDeg(sunTrueLongitude);
  cosDec = Math.cosDeg(Math.asinDeg(sinDec));
  cosLocalHourAngle = ((Math.cosDeg(zenith)) - (sinDec * (Math.sinDeg(latitude)))) / (cosDec * (Math.cosDeg(latitude)));
  localHourAngle = Math.acosDeg(cosLocalHourAngle)

  if (sunrise) {
  	localHourAngle = 360 - localHourAngle;
  }

  localHour = localHourAngle / Date.DEGREES_PER_HOUR;
  localMeanTime = localHour + rightAscension - (0.06571 * approxTimeOfEventInDays) - 6.622;
  time = localMeanTime - (longitude / Date.DEGREES_PER_HOUR);
  time = Math.mod(time, 24);

  var midnight = new Date(0);
  		midnight.setUTCFullYear(this.getUTCFullYear());
  		midnight.setUTCMonth(this.getUTCMonth());
  		midnight.setUTCDate(this.getUTCDate());
  var milli = midnight.getTime() + (time * 60 *60 * 1000);

  return new Date(milli);

}

Date.DEGREES_PER_HOUR = 360 / 24;

  // Utility functions (sun.js code)

Date.prototype.getDayOfYear = function() {
  var onejan = new Date(this.getFullYear(),0,1);
  return Math.ceil((this - onejan) / 86400000);
}
Math.degToRad = function(num) {
  return num * Math.PI / 180;
}
Math.radToDeg = function(radians){
  return radians * 180.0 / Math.PI;
}
Math.sinDeg = function(deg) {
  return Math.sin(deg * 2.0 * Math.PI / 360.0);
}
Math.acosDeg = function(x) {
  return Math.acos(x) * 360.0 / (2 * Math.PI);
}
Math.asinDeg = function(x) {
  return Math.asin(x) * 360.0 / (2 * Math.PI);
}
Math.tanDeg = function(deg) {
  return Math.tan(deg * 2.0 * Math.PI / 360.0);
}
Math.cosDeg = function(deg) {
  return Math.cos(deg * 2.0 * Math.PI / 360.0);
}
Math.mod = function(a, b) {
  var result = a % b;
  if(result < 0) {
    result += b;
  }
  return result;
}

// End code sun.js
