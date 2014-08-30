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
  flush_at : 30,
  flush_after : 10000,
  max_queue_size : 10000,
  timer_interval : 10000
};