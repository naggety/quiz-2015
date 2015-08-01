var models = require('../models/models.js');

exports.autoload = function (req, res, next, commentId) {
  models.Comment.find(commentId).then(function(comment) {
    if (comment) {
      req.comment = comment;
      next();
    }
    else {
      next(new Error('No existe comentario id = ' + commentId));
    }
  });
}

exports.postnew = function (req, res) {
  var comment = models.Comment.build({
    texto: req.body.comment.texto,
    QuizId: req.params.quizId
  });
  var err = comment.validate();
  if (err)
    res.render('comments/formNew', {quizId: req.params.quizId, comment: comment.texto});
  else
    comment.save().then(function() { res.redirect('/quizes/'+req.params.quizId); });
}

exports.publish = function (req, res) {
  req.comment.publicado = req.body.publicado ? true : false;
  req.comment.save().then(function() {
    res.redirect('/quizes/' + req.comment.QuizId);
  });
}
