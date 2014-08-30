/**
 * Created with WebStorm.
 * Date: 2014-08-29
 * Time: 3:18 PM
 * @author Adam C. Nowak
 * @description
 */

'use strict';

var //express         = require('express'),
  async             = require('async'),
  Mocha             = require('mocha'),
  path              = require('path'),
  fs                = require('fs');

/*
 =================================================================
 BEGIN SETUP THE REQUIRED PLUMBING FOR THE TEST SERVER TO RUN
 =================================================================
 */

var testFile = process.argv[2]; // can be undefined

setUpDependencies();


function setUpDependencies() {
  // sync setup
  //global.redis = new LDRLYRedis();

  // async setup
  var asyncSetup = [];

  // connect to mongodb client
  asyncSetup.push(function(cb) {
    //MongoClient.connect(connectionString, function(err, db) {
    //  global.db = db;
    //
    //  /*
    //   // Handling DB Events
    //   global.db.on('close', function (err) {
    //   if (err) {
    //   }
    //   log.info('MongoDB: closing `connection!');
    //   });
    //
    //   global.db.on('error', function (err) {
    //   log.error(err, 'MongoDB: Connect Error!');
    //   });
    //   */
    //
    //  cb(err, db ? true : false);
    //});
  });

  async.parallel(asyncSetup, function(err, results) {
    if(err) {
      // @TODO handle error
      process.exit(1);
    } else {
      setupMocha();
    }
  });
}

function setupMocha() {
  //SETUP MOCHA
  var mocha = new Mocha({
    reporter : 'spec',
    ui : 'bdd',
    timeout : 9999999
  });

  var testDir = './';
  var testFile = 'test.identify.js';

  fs.readdir(testDir, function(err, files) {
    if(err) {
      console.log(err);
      return;
    }
    //Check to see if a specific file was specified
    if( testFile === undefined) {
      files.forEach(function(file) {
        if(path.extname(file) === '.js') {
          console.log('adding test file: %s', file);
          mocha.addFile(testDir + file);
        }
      });
    } else {
      console.log('adding test file: %s', testFile);
      mocha.addFile(testDir + testFile);
    }

    var runner = mocha.run(function() {
      console.log('finished!');
      process.exit(1);
    });
    runner.on('pass', function(test) {
      console.log('... %s passed', test.title);
    });
    runner.on('fail', function(test) {
      console.log('... %s failed', test.title);
    });
  });
}
