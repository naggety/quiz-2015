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

exports.getnew = function (req, res) {
  res.render('quizes/formNew', {quiz: {pregunta: '', respuesta: ''}});
}

exports.postnew = function (req, res) {
  var quiz = models.Quiz.build(req.body.quiz); // usa el objeto quiz recibido en el body del mensaje en formato urlencoded
  var err = quiz.validate();
  if (err) {
    res.render('quizes/formNew', {quiz: quiz, errors: err});
  }
  else {
    quiz
      .save({fields: ["pregunta", "respuesta"]})  // lo guarda en la bbdd
      .then(function() { res.redirect('/quizes'); });
  }
}

exports.getedit = function (req, res) {
  res.render('quizes/formEdit', {quiz: req.quiz});
}

exports.putedit = function (req, res) {
  req.quiz.pregunta = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  var err = req.quiz.validate();
  if (err) {
    res.render('quizes/formEdit', {quiz: req.quiz, errors: err});
  }
  else {
    req.quiz
      .save({fields: ["pregunta", "respuesta"]})  // lo guarda en la bbdd
      .then(function() { res.redirect('/quizes'); });
  }
}

exports.delete = function (req, res) {
  req.quiz.destroy()
    .then(function() { res.redirect('/quizes'); })
    .catch(function(err) { next(err); });
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
