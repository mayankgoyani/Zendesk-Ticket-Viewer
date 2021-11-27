var express = require('express');
var router = express.Router();
var ticket = require('../services/ticket.service')


/* GET home page. */
router.get('/getUser', ticket.getUser);
router.get('/', ticket.getTickets);
router.get('/:id',ticket.getTicket)


module.exports = router;
