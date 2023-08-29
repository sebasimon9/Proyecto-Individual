const { Router } = require('express');
const { getActivity, postActivity } = require("../controllers/getActivities");

const router = Router();

router.post('/', postActivity);
router.get('/', getActivity);

module.exports = router;