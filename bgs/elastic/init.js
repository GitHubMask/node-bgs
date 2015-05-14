'use strict';

var config = require('../config');
var winston = require('winston');
var _ = require('lodash');
var Promise = require('bluebird');
var glob = Promise.promisify(require('glob'));
var fs = Promise.promisifyAll(require('fs'));
var path = require('path');
var es = require('elasticsearch');

// -- TMP
var User = require('../models/user/user.model');

// --- New Elastic Client
var esClient = new es.Client({host: config.get('elastic').host});

// --- Get Models
function getModels() {
  return glob(path.join(__dirname, '../models/**/*.model.js'))
    .map(function(filename) {
      return require(filename);
    }
  );
}

// --- Create index if it does not exist
function createIndexIfNotExists() {
  esClient.indices.exists({index: config.get('elastic').index})
    .then(function(exist) {
      if (exist) {
         winston.info('ES Init --- Index [' + config.get('elastic').index + '] is there !');
         return false;
      }

      winston.info('ES Init --- Creating Index [' + config.get('elastic').index + ']');
      return esClient.indices.create({
        index: config.get('elastic').index,
        body: {
          settings: {
            index: {
              number_of_shards: config.get('elastic').number_of_shards,
              number_of_replicas: config.get('elastic').number_of_replicas,
            }
          },
        },
      });
    });
}

// --- ES Init
module.exports = function esInit() {

  return Promise.join(getModels(), createIndexIfNotExists(), _.identity)
    .map(function(Type) {
      return Type.createOrUpdateMapping()
        .tap(function() {
          winston.info('ES Init --- Updating Type [' + Type.dbConfig({}).type + ']');
        })
      ;
    })
    .then(function() {
      if (process.env.INIT_TEST_DATA) {
        winston.info('ES Init --- Creating test data');
        return User.putTestData();
      }
    })
  ;
};
