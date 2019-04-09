const express = require('express');
const router = express.Router();
const Joi = require('joi');

router.use(express.static('public'));

const gigList = [];

var bodyParser = require('body-parser');
  router.use(bodyParser.urlencoded({ extended: true }));

  const schema = Joi.object().keys({
    artist: Joi.string().min(1).max(50).required(),
    date: Joi.date().required()
});

router.get('/', function(req, res) {
  res.render('index', { title: 'this is a test', gigList });
});

//for login - future feature

// router.get('/user/:name', function(req, res) {
// res.render('index', { title: 'Account Options' });
// });

router.post('/:user/addgig', function(req, res) {

  console.log(req);

  const { error } = Joi.validate({ artist: req.body.artist, date: req.body.date }, schema);
    if(error) {
      // temp status code and error - need to add to front end
      res.status(400).send('Artist must be entered with a valid date');
      return;
    }
  const newGig = {
    id: gigList.length + 1,
    artist: req.body.artist,
    date: req.body.date
  };
  gigList.push(newGig);
   res.redirect('/');

});

module.exports = router;
