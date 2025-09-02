const express = require ('express');
const {subscribe, getSubscribers}= require('../controllers/subscriber.controller');


const router= express.Router();

router.post('/subscribe', subscribe);
router.get('/subscribers', getSubscribers);

module.exports = router;