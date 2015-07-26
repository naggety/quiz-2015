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
router.get('/quizes/new', ctrllr.getnew);
router.post('/quizes', ctrllr.postnew);
router.get('/quizes/:quizId(\\d+)/edit', ctrllr.getedit);
router.put('/quizes/:quizId(\\d+)', ctrllr.putedit);
router.delete('/quizes/:quizId(\\d+)', ctrllr.delete);
router.get('/author', ctrllr.author);

module.exports = router;
