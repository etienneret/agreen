var express = require('express');
var router = express.Router();
var hook_controller = require('../controllers/hookController')


 
/**************** lead_created *****************/

// /price-estimator.herokuapp.com/api/v1/estimate_price (for local tests)

router.post('/api/v1/meteociel',hook_controller.getFieldInformation)

/********** module.exports ***********/

module.exports = router;



