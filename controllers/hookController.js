var analysisGenerator = require('../modules/analysisGenerator');
var url = require('../modules/analysisUrl');

function getFieldInformation (req, res){

	res.type('json');

	var input_code = req.body.code;
	var input_city = req.body.city;

	// Vérifions si le code est bien un nombre ? 
	if(Number.isInteger(parseInt(input_code)) === false ){
		res.send('Erreur dans le code');	
	}


	analysisGenerator.getProperties( url.createUrl(input_code,input_city), function(callback){

			if (callback === 0 ){
				return res.send('Erreur dans le code ou le nom de la ville ! ')
			}

			console.log(callback);
			return res.send(JSON.stringify(callback));
		}


		)
}




module.exports.getFieldInformation = getFieldInformation;

