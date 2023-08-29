const { Router } = require('express');
// Importar todos los routers;
const countryRouter = require('./country');
const activityRouter = require('./activity');

const router = Router();
// Configurar los routers
router.use('/countries', countryRouter);
router.use('/activities', activityRouter);

module.exports = router;
