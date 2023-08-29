const { Router } = require('express');
const {getAllCountries,getCountries, getCountryId } = require("../controllers/getCountries.js");

const router = Router();

router.get ('/', getAllCountries);
router.get('/:id', getCountryId);
 
module.exports = router;
