const express = require('express');
const router = express.Router();
const Joi = require('joi');
const gigsCollection = require('../mongoGigsDB');
const usersCollection = require('../mongoUsersDB');
const Gig = require('../model/gig');
const User = require('../model/user');
const mongo = require('mongodb')

router.use(express.static('public'));
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

const gigsSchema = Joi.object().keys({
  artist: Joi.string().min(1).max(50).required(),
  date: Joi.date().required()
});

const usersSchema = Joi.object().keys({
  username: Joi.string().min(1).max(50).required(),
  password: Joi.required()
});

router.get('/gigbook', function(req, res) {
  gigsCollection.gigs.find().toArray(function(err, docs) {
  res.render('index', { title: 'this is a test', gigList:docs });
  });
});

router.post('/gigbook/login', function(req, res) {
  usersCollection.users.findOne( { _id: new mongo.ObjectID('5cd48b305cf715f9dee2f8df') });
  res.redirect('/gigbook');
  });

router.get('/gigbook/newuser', function(req, res) {
  console.log('test');
  res.render('registration');
});

router.post('/gigbook/adduser', function(req, res) {
  const { error } = Joi.validate({ username: req.body.registrationuser, password: req.body.registrationpassword }, usersSchema);
    if(error) {
      res.status(400).send(error);
      return;
    }
  const entry = new User(req.body.registrationuser, req.body.registrationpassword);
  usersCollection.users.insertOne(entry);
  res.redirect('/gigbook');
});

router.post('/gigbook/:user/addgig', function(req, res) {
  const { error } = Joi.validate({ artist: req.body.artist, date: req.body.date }, gigsSchema);
    if(error) {
      res.status(400).send(error);
      return;
    }
    const entry = new Gig(req.body.artist, req.body.date);
    gigsCollection.gigs.insertOne(entry);
    res.redirect('/gigbook');
});

router.post('/gigbook/delete', function(req, res) {
  gigsCollection.gigs.deleteOne( { _id: new mongo.ObjectID(req.body._id) });
  res.redirect('/gigbook');
});

module.exports = router;
