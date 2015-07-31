var express = require('express');
var router = express.Router();

var ctrllr = require('../controllers/quizController');
var commentCtrllr = require('../controllers/commentController');
var sessionCtrllr = require('../controllers/sessionController');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.param('quizId', ctrllr.autoload);  // autoload :quizId

router.get('/login', sessionCtrllr.login);
router.post('/login', sessionCtrllr.create);
router.post('/logout', sessionCtrllr.destroy);

router.get('/quizes', ctrllr.list);
router.get('/quizes/:quizId(\\d+)', ctrllr.question);
router.get('/quizes/:quizId(\\d+)/answer', ctrllr.answer);
router.get('/quizes/new', ctrllr.getnew);
router.post('/quizes', ctrllr.postnew);
router.get('/quizes/:quizId(\\d+)/edit', ctrllr.getedit);
router.put('/quizes/:quizId(\\d+)', ctrllr.putedit);
router.delete('/quizes/:quizId(\\d+)', ctrllr.delete);
router.get('/author', ctrllr.author);

router.post('/quizes/:quizId(\\d+)/comments', commentCtrllr.postnew);

module.exports = router;
