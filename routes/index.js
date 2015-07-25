var express = require('express');
var router = express.Router();

var ctrllr = require('../controllers/quizController');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.param('quizId', ctrllr.autoload);  // autoload :quizId

router.get('/quizes', ctrllr.list);
router.get('/quizes/:quizId(\\d+)', ctrllr.question);
router.get('/quizes/:quizId(\\d+)/answer', ctrllr.answer);
router.get('/author', ctrllr.author);

module.exports = router;
