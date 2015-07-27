var models = require('../models/models.js');

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
