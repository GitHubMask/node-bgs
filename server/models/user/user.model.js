'use strict';

var conf = require('../../config');
var _ = require('lodash');
var util = require('util');
var winston = require('winston');
var esobject = require('esobject');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

function NoUserFoundError() {
  Error.call(this);
}
util.inherits(NoUserFoundError, Error);

function DuplicateUserError() {
  Error.call(this);
}
util.inherits(DuplicateUserError, Error);

// --- ES OBJECT MAGICAL KINGDOM
var User = module.exports = esobject.create({

  // --- Database
  db: _.merge({}, conf.get('elastic'), {type: 'user'}),

  // --- Mapping
  mapping: __dirname + '/user.map.yaml',

  // Basic Import Strategy
  import: require('./user.import'),

});

// --- Find by Username, must be unique
User.getByUsername = function(username) {
  return User.search({filter: {term: {username: username}}})
    .then(function(result) {
      if (result.elements.length === 0)
        throw new NoUserFoundError('No user found');
      else if (result.elements.length > 1)
        throw new DuplgetByUsernameicateUserError('2 users with the same name, omfg !!!');
      return result.elements[0];
    })
  ;
}

// --- Find by Username and Password
User.getFromAuth = function(username, password) {
  return User.getByUsername(username)
    .then(function(result){
      console.log("before", result);
      if (bcrypt.compareSync(password, result.password)) {
        console.log("after", result);
        return result;
      }
      throw new NoUserFoundError('No user found');
    })
  ;
}

// --- Test users
User.putTestData = function() {
  var users = ["john", "paul", "jessica", "pingouine", "rené", "micheline", "sara", "biloute"];

  Promise.resolve(users)
    .map(function(username) {
      return User.getByUsername(username)
        .catch(NoUserFoundError, function() {
          var thisUser = new User();
          return thisUser.import({
            username: username,
            password: bcrypt.hashSync(username),
            email: username + '@' + username + '.com',
            firstname: username,
            lastname: username,
            picture: 'pic'
          }).call('save');
        })
    })
  ;

}
