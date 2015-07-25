var models = require('../models/models.js');

exports.list = function (req, res) {
  models.Quiz.findAll().then(function(quizes){
    res.render('quizes/list', {quizes: quizes});
  });
};

exports.question = function (req, res) {
  models.Quiz.find(req.params.quizId).then(function(quiz){
    res.render('quizes/question', {quiz: quiz});
  });
};

exports.answer = function (req, res) {
  models.Quiz.find(req.params.quizId).then(function(quiz){
    var rsp = req.query.respuesta === quiz.respuesta ? 'Correcto' : 'Incorrecto';
    res.render('quizes/answer', {quiz: quiz, respuesta: rsp});
  });
};

exports.author = function (req, res) {
  res.render('author');
};
