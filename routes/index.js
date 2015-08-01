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
router.param('commentId', commentCtrllr.autoload);  // autoload :commentId

router.get('/login', sessionCtrllr.login);
router.post('/login', sessionCtrllr.create);
router.post('/logout', sessionCtrllr.destroy);

router.get('/quizes', ctrllr.list);
router.get('/quizes/:quizId(\\d+)', ctrllr.question);
router.get('/quizes/:quizId(\\d+)/answer', ctrllr.answer);
router.get('/quizes/new', sessionCtrllr.loginRequired, ctrllr.getnew);
router.post('/quizes', sessionCtrllr.loginRequired, ctrllr.postnew);
router.get('/quizes/:quizId(\\d+)/edit', sessionCtrllr.loginRequired, ctrllr.getedit);
router.put('/quizes/:quizId(\\d+)', sessionCtrllr.loginRequired, ctrllr.putedit);
router.delete('/quizes/:quizId(\\d+)', sessionCtrllr.loginRequired, ctrllr.delete);
router.get('/author', ctrllr.author);

router.post('/quizes/:quizId(\\d+)/comments', commentCtrllr.postnew);
router.put('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)', sessionCtrllr.loginRequired, commentCtrllr.publish);

module.exports = router;
