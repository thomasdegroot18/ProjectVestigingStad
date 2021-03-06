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
      document.body.classList.remove('day');
      document.body.classList.add('night');
  } else {
      isNightTime = true;
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
