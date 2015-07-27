// importa módulos varios
var path = require('path');

// datos BBDD
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = url[6] || null;
var user     = url[2] || null;
var pwd      = url[3] || null;
var protocol = url[1] || null;
var dialect  = url[1] || null;
var port     = url[5] || null;
var host     = url[4] || null;
var storage  = process.env.DATABASE_STORAGE;

// importa sequelize y crea una instancia para sqlite o postgress
var Sequelize = require('sequelize');
var sequelize = new Sequelize(DB_name, user, pwd, {
  dialect: protocol,
  protocol: protocol,
  port: port,
  host: host,
  storage: storage, // solo sqlite
  omitNull: true    // solo postgres
});

// importa la definición de las tablas
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
var Comment = sequelize.import(path.join(__dirname, 'comments'));
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

exports.Quiz = Quiz;
exports.Comment = Comment;

// crea e inicializa la tabla
sequelize.sync().success(function() {
  Quiz.count().success(function(count) {
    if (count === 0) {
      Quiz.create({pregunta: 'Capital de Italia', respuesta: 'Roma', tema: 'humanidades'});
      Quiz.create({pregunta: 'Capital de Portugal', respuesta: 'Lisboa', tema: 'humanidades'})
        .then(function(){ console.log('BBDD inicializada'); });
    }
    // descomentar para borrar todas las filas
    // else {
    //   Quiz.destroy().success(function(){ console.log("BBDD borrada")});
    // }
  });
});
