var express = require('express');
var router = express.Router();

var db = require('../queries');

router.get('/', function(req, res){
    res.render('index');
});
router.get('/lowscoreboard', function(req,res){
    res.render('lowscore');
});
router.get('/hiscoreboard',function(req,res){
    res.render('hiscore');
});
router.get('/scores', db.getAllScores);
router.get('/scores/:id', db.getSingleScore);
router.post('/scores', db.createScore);
router.post('/scores/:id', db.updateScore);
router.delete('/scores/:id', db.removeScore);


module.exports = router;