const express = require('express');
const router = express.Router();
const Joi = require('joi');
const collection = require('../mongoUtil');
const Gig = require('../model/gig');
const mongo = require('mongodb')

router.use(express.static('public'));
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

  const schema = Joi.object().keys({
    artist: Joi.string().min(1).max(50).required(),
    date: Joi.date().required()
});

router.get('/gigbook', function(req, res) {
  collection.gigs.find().toArray(function(err, docs) {
  res.render('index', { title: 'this is a test', gigList:docs });
  });
});

router.post('/gigbook/:user/addgig', function(req, res) {
  const { error } = Joi.validate({ artist: req.body.artist, date: req.body.date }, schema);
    if(error) {
      // temp status code and error - need to add to front end
      res.status(400).send(error);
      return;
    }
    const entry = new Gig(req.body.artist, req.body.date);
    collection.gigs.insertOne(entry);
    res.redirect('/gigbook');
});

router.post('/gigbook/delete', function(req, res) {
  collection.gigs.deleteOne( { _id: new mongo.ObjectID(req.body._id) });
  res.redirect('/gigbook');
});

module.exports = router;

//for login - future feature

// router.get('/user/:name', function(req, res) {
// res.render('index', { title: 'Account Options' });
// });
