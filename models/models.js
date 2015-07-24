var path = require('path');

// importa sequelize y crea una instancia para sqlite
var Sequelize = require('sequelize');
var sequelize = new Sequelize(null, null, null, {dialect:"sqlite", storage:"quiz.sqlite"});

// importa la definición de la tabla Quiz, y la exporta a su vez
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
exports.Quiz = Quiz;

// crea e inicializa la tabla
sequelize.sync().success(function() {
  Quiz.count().success(function(count) {
    if (count === 0) {
      Quiz
        .create({pregunta: 'Capital de Italia', respuesta: 'Roma'})
        .success(function(){ console.log('BBDD inicializada'); });
    }
  });
});
