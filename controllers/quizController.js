var models = require('../models/models.js');

exports.autoload = function (req, res, next, quizId) {
  console.log ('Autoload quizId='+quizId);
  models.Quiz.find(quizId).then(function(quiz){
    if (quiz) {
      req.quiz = quiz;
      next();
    }
    else {
      next(new Error('No existe quizId=' + quizId));
    }
  })
  .catch(function(error) {
    next();
  });
};

exports.list = function (req, res) {
  var search = !req.query.search ? false : '%' + req.query.search.replace(' ', '%') + '%';
  var args = !search ? {} : {where: ["pregunta LIKE ?", search], order: [['pregunta', 'ASC']]};
  models.Quiz.findAll(args).then(function(quizes){
    res.render('quizes/list', {quizes: quizes});
  });
};

exports.question = function (req, res) {
  res.render('quizes/question', {quiz: req.quiz});
};

exports.answer = function (req, res) {
  var rsp = req.query.respuesta === req.quiz.respuesta ? 'Correcto' : 'Incorrecto';
  res.render('quizes/answer', {quiz: req.quiz, respuesta: rsp});
};

exports.author = function (req, res) {
  res.render('author');
};
