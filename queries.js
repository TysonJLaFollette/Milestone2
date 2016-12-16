var promise = require('bluebird');

// Initialization Options for pg-promise
var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);


var connectionString = 'postgres://ubuntu:asdf@localhost:5432/scores';
var db = pgp(connectionString);

// add query functions

module.exports = {
  getAllScores: getAllScores,
  getSingleScore: getSingleScore,
  createScore: createScore,
  updateScore: updateScore,
  removeScore: removeScore
};

function getAllScores(req, res, next) {
  console.log("getAllScores");
  db.any('select * from hiscores ORDER BY id ASC;')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL scores.'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleScore(req, res, next) {
  var scoreID = parseInt(req.params.id);
  db.one('select * from hiscores where id = $1', scoreID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE score.'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createScore(req, res, next) {
  req.body.score = parseInt(req.body.score);
  db.none('insert into hiscores(name, score)' +
      'values(${name}, ${score})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one score.'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateScore(req, res, next) {
  db.none('update hiscores set name=$1, score=$2 where id=$3',
    [req.body.name, parseInt(req.body.score), parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated score.'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeScore(req, res, next) {
  var scoreID = parseInt(req.params.id);
  db.result('delete from hiscores where id = $1', scoreID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} score`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}