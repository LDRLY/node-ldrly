/**
 * Created with WebStorm.
 * Date: 2014-08-29
 * Time: 2:32 PM
 * @author Adam C. Nowak
 * @description
 */

/*jshint node: true */
'use strict';

/**
 * Export the default settings for the LDRLY Node.js wrapper to work
 * @type {{url: string, resource: {batch: string}, flush_at: number, flush_after: number, max_queue_size: number, timer_interval: number}}
 */
module.exports = {
  url : 'http://api.v1.ldrly.com',
  resource : {
    batch: '/v1/stats',
    identify : '/v1/identify'
  },
  flush_at : 10,          //Flush count - How many to send per flush
  max_queue_size : 1000,  //Bundle up to 1000 data items
  timer_interval : 250   //Max timer interval, 5 seconds
};