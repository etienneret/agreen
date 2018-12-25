var request = require('request');


//le but est qu'avec le jour et l'heure de récupérer une Date UTC
function getDate(day, hour) {

  var today = new Date();
  var day_today = today.getDate();
  var month = today.getMonth();// attention, commence à 0 - 11 (décembre)
  var year =  today.getFullYear();

  if (day == day_today) {

    var date = new Date(year, month, day, hour + 1); // hour +1 car 0 à 23

    return date;
  //var anniversaire = new Date(1995,11,17,3,24,0);
  } else if (day < day_today) {
    month += 1; // on change de mois et si on est en décembre le mois 12 va devenir 1 et on va gagner une année
    var date = new Date(year, month, day, hour + 1);
    return date;

  }

  var date = new Date(year, month, day, hour + 1);
  return date;
};

function getProperties(url, callback) {

  var result = [];
  request({
    method: 'GET',
    url: url.url,

  }, function (error, response, body) {

      console.log(response.statusCode);

      // si jamais on ne réussit pas à récuperer l'information, il doit y avoir une erreur sur le code 
      if(response.statusCode !== 200){
        return 0; 
      }

      // on repère dans le body, la partie qui nous intéresse, elle est juste après le tag <table style="border-collapse: collapse;
      var raw_information = body.split('<table style="border-collapse: collapse;')[1];

      // chaque ligne du tableau commence par <tr
      var information = raw_information.split('<tr');

      // on enlève le dernier element
      information.pop();

      for (var i = 3; i < information.length; i++) {// on commence à 3 car les 3 premiers sont les headers du tableau
        result.push(getHourlyDetails(information[i], url.code, url.city));
      };

      callback(getDay(result));

    });
};

function getHourlyDetails(raw_array, code, city) {

  var information_array = raw_array.split('</td');

  // pour certain elt du tableau information_array il y a le jour précisé, pour le reste il ne l'ait pas. Concretement
  // il y a un elt de plus dans l'information_array[i] quand la date est précisé

  let regex = /([0-9][0-9])(?=<br)/; // on prend les 2 chiffres avant <br
  //let regex = /[0-9&._-]*[0-9&._-]*[0-9&._-](?=<br)/ //(?=<br) prend les caractères avant <br et après on prend tous les cas de -99 à 99

  var i = 0;
  // est ce qu'il y a le jour (day) précisé ? Si oui, on le récupére et i=1 sinon on laisse i = 0
  if (information_array[i].match(regex) !== null) {
    var day = information_array[i].match(regex)[0];
    i += 1;
  }

  // Récupération des informations qui nous intéressent
  var hour = information_array[i].split('>').pop();
  var temperature = information_array[i + 1].replace('</font>', '').split('>').pop();
  temperature = temperature.substring(0, temperature.indexOf(' '));
  var windchill = information_array[i + 2].replace('</font>', '').split('>').pop();
  var wind_orientation = information_array[i + 3].split(' : ').pop().substring(0, 3);
  var wind = information_array[i + 4].split('>').pop();
  var wind_gust = information_array[i + 5].split('>').pop();
  var precipitation = information_array[i + 6].split('>').pop();
  var humidity = information_array[i + 7].split('>').pop().substring(0, 2);
  var pression = information_array[i + 8].split('>').pop().substring(0, 4);

  var result = {
    date: day,
    time: parseInt(hour),
    temperature: parseInt(temperature),
    windchill: parseInt(windchill),
    wind_orientation: parseInt(wind_orientation),
    wind:  parseInt(wind),
    wind_gust: parseInt(wind_gust),
    precipitation:  precipitation,
    humidity: parseInt(humidity),
    pression: parseInt(pression),
    code: parseInt(code),
    city: city
  };

  return result;
};

// l'idée de cette fonction c'est de compléter l'information sur le jour manquante et de transformer ce jour en date UTC
function getDay(array) {
  var dayDate;
  for (elt in array) {

    if (typeof array[elt].date !== 'undefined') {
      dayDate = parseInt(array[elt].date);

      // transforme le date
      array[elt].date = getDate(parseInt(array[elt].date), array[elt].time);

      continue;
    }

    array[elt].date = getDate(dayDate, array[elt].time);

  }

  return array;
};

module.exports.getProperties = getProperties;
