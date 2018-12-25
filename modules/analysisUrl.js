

/********* key function ********/

function createUrl(code, city) {

  
  var url = 'http://www.meteociel.fr/previsions/'+ code + '/' + city +'.htm';
  
  console.log(url);
  return {url : url,
  		 code : code,
  		 city : city};
}

/********** module.exports ***********/

module.exports.createUrl = createUrl;