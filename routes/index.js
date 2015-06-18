var express = require('express');
var router = express.Router();

var ctrllr = require('../controllers/quizController');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.get('/quizes/question', ctrllr.question);
router.get('/quizes/answer', ctrllr.answer);

module.exports = router;
