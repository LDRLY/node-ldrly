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
var key       = 'WkKr2yZNAVcJvA7u',
  secret      = '3207c0eccc28dfdf4fb0992e78deaaa8c04d2c2e',
  user_id     = 'me',
  user_data   = {
    username : 'tester1',
    icon_url : 'http://graph.facebook.com/tester1/picture'
  },
  count       = 0,
  counter     = 0;

//Setup events for the ldrly module
ldrly.on('error', function (error) {
  console.log('Error has occurred!!!');
  console.log(error);
});

ldrly.on('processed', function(data) {
  //counter = counter - ldrly.defaults.max_queue_size;
  //console.log('Queue has been processed! (%d)', ldrly.defaults.max_queue_size);
  console.log('Queue size: %d', data.queue_size);
  console.log('Stats processed: %d', count-counter);

  console.timeEnd('Time to send all stats: ');
});

ldrly.on('identified', function(uid) {
  console.log('User %s has been identified!', uid);
});

//Initialize the library
ldrly.init({ key : key, secret_key : secret});

/**
 * The functionality to Identify a User.
 */
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

/**
 * Test the functionality to Post Stat against a User.
 */
var stat_data = {
  "uid" : "526fe42b9c7b9ad606000006",
  "level" : 20,
  "stats" : [
    {
      "coins_earned" : {
        "$sum" : 10,
        "categories" : {
          "game_type" : "slots",
          "room" : "gorilla"
        }
      }
    },
    {
      "biggest_coins_win" : {
        "$max" : 50,
        "categories" : {
          "game_type" : "slots",
          "room" : "gems"
        }
      }
    }
  ]
};

//Test Validation
ldrly.postStat();
ldrly.postStat({});
ldrly.postStat({ uid : []});
ldrly.postStat({ uid : user_id });
ldrly.postStat({ uid : user_id, level: 15, data : [] });
ldrly.postStat(stat_data);

//Set the amount of stats to post
count = 100000;
counter = count;
//Start the timer for sending the stats
console.time('Time to send all stats: ');

//Post a bunch of stats
for (var i=0; i < count; i++) {
  ldrly.postStat(stat_data);
}