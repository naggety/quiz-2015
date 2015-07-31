var users = {
  admin: {id: 1, username: "admin", password: "1234"},
  pepe:  {id: 2, username: "pepe",  password: "5678"}
}

exports.login = function (req, res) {
  var errors = req.session.errors || false;
  var args = errors ? {errors: errors} : {}
  req.session.errors = undefined;
  res.render('login', args);
}

exports.create = function (req, res) {
  var login = req.body.login;
  var pass  = req.body.password;
  if (users[login] && pass === users[login].password) {
    req.session.user = {id: users[login].id, username: users[login].username};
    res.redirect(req.session.redir.toString());
  }
  else {
    req.session.errors = ["Los datos de acceso son incorrectos"];
    res.redirect('/login');
  }
}

exports.destroy = function (req, res) {
  delete req.session.user;
  res.redirect(req.session.redir.toString());
}
