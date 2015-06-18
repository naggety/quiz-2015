exports.question = function (req, res) {
  res.render('quizes/question', {pregunta: 'Capital de Italia'});
}

exports.answer = function (req, res) {
  var rsp = req.query.respuesta === 'Roma' ? 'Correcto' : 'Incorrecto';
  res.render('quizes/answer', {respuesta: rsp});
}
