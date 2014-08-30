/**
 * Created with WebStorm.
 * Date: 2014-08-29
 * Time: 3:39 PM
 * @author Adam C. Nowak
 * @description
 */

/*jshint node: true */
'use strict';

/**
 * Require Node and Ldrly modules.
 * @type {exports}
 */
var ldrly     = require('../lib/index');

//Required variables
var key       = 'testkey',
  secret      = 'secret_key',
  user_id     = 'me',
  user_data   = {
    username : 'tester1',
    icon_url : 'http://graph.facebook.com/tester1/picture'
  };

//Setup events for the ldrly module
ldrly.on('error', function (error) {
  console.log('Error has occurred!!!');
  console.log(error);
});

ldrly.on('processed', function() {
  console.log('Queue has been processed!');
});

ldrly.on('identified', function(uid) {
  console.log('User %s has been identified!', uid);
});

//Initialize the library
ldrly.init({ key : key, secret_key : secret});

//Identify a user
// Failure cases
ldrly.identify();
ldrly.identify({});
ldrly.identify({ uid : []});
ldrly.identify({ uid : user_id });
ldrly.identify({ uid : user_id, data : [] });
//  Success cases
ldrly.identify({ uid : user_id, data : {} });
ldrly.identify({ uid : user_id, data : user_data });

//describe('LdrlyNode', function() {
//  describe('.init', function () {
//    it('should return no error', function (data) {
//      done();
//    });
//  });
//});