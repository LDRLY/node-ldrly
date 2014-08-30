/**
 * Created with WebStorm.
 * Date: 2014-08-29
 * Time: 2:30 PM
 * @author Adam C. Nowak
 * @description
 */

/*jshint node: true */
'use strict';

/**
 * Require Node and Ldrly modules.
 * @type {exports}
 */
var events    = require('events'),
  request     = require('request'),
  util        = require('util'),
//Required LDRLY Modules
  defaults    = require('./defaults');

/**
 * Ldrly constructor.
 * @param options
 * @constructor
 */
function Ldrly() {
  //The user's API key
  this._key         = null;
  //The user's Secret API Key
  this._key_secret   = null;
  //The queue of stats
  this._queue        = null;
  //Set the defaults
  this.defaults = defaults;

  this._last_flush = null;
  this._initialized = false;
}

/**
 * Inherit the EventEmitter.
 */
util.inherits(Ldrly, events.EventEmitter);

/**
 * Initialize the Ldrly module.
 * @param options Object containing the arguments required for the function.
 *          REQUIRED  String  key         - Your API Key
 *          REQUIRED  String  secret_key  - Your API Secret Key
 *          OPTIONAL  Object  defaults    - Defaults to overwrite the module defaults.
 * @param callback  Returns an a document if successful; otherwise an Error.
 */
Ldrly.prototype.init = function(options) {
  var self = this;
  //Check to make sure the API key has been provided
  if (options && options.key && typeof options.key === 'string') {
    self._key = options.key;
  } else {
    throw new Error('key is a required variable. Please provide your API Key as a string!');
  }
  //Check to make sure that the API secret key has been provided
  if (options && options.key && typeof options.key === 'string') {
    self._key_secret = options.secret_key;
  } else {
    throw new Error('secret_key is a required variable. Please provide your API Secret Key as a string!');
  }
  //Check to see if new defaults are provided
  if (options && options.defaults && typeof options.defaults === 'object') {
    self.defaults = options.defaults;
  }

  //Initialize the last time the queue was flushed
  this._last_flush = new Date(0);
  //Initialize the queue
  this._queue = [];
  //Indicate the API is initialized
  this._initialized = true;

  this.emit('initialize')
};

/**
 * Function to check if the LDRLY Module has been properly initialized.
 * @private
 */
Ldrly.prototype._isInitialized = function () {
  if (!this._initialized) {
    throw new Error('Module is not initialized, call Ldrly.init(options)');
  }
};

/* ***********************************************
    Functionality related to Identifying Users
   *********************************************** */
/**
 * Identify a particular user within the LDRLY API. Used to provide additional details about a user via their UID.
 * ldrly.identify({uid, user_data})
 * @param options
 *          REQUIRED  String  uid   - The user's identity
 *          REQUIRED  Object  data  - The data to identify against the user
 *            OPTIONAL  String  username  - The username to display for the user on the leaderboards. If not provided,
 *                                          the default username of 'Anonymous user' will be used.
 *            OPTIONAL  String  icon_url  - A url to the image that should be displayed with their username on
 *                                          the leaderboards. If not provided a generic profile image will be used.
 */
Ldrly.prototype.identify = function (options) {
  //Check the formatting of the data
  if ( this._validateIdentifyData(options) ) {
    //Post the data to the API
    this._postIdentifyData(options);
  }
};

/**
 * Check to make sure that the data provided to the identify call is formatted correctly
 * @param options Inherited from Ldrly.prototype.identify
 * @returns {*}
 * @private
 */
Ldrly.prototype._validateIdentifyData = function (options) {
  var error = null;
  //Check to see if required options are provided
  if (!options) {
    error = new Error('Missing required fields for identify!');
    error.required = ['uid', 'data'];
    this.emit('error', error);
    return false;
  }
  if (options && !options.uid) {
    error = new Error('Missing required field: uid.');
    error.required = ['uid'];
    this.emit('error', error);
    return false;
  }
  if (options && options.uid && typeof options.uid !== 'string') {
    error = new Error('Missing required field: uid. Please provide the user\'s identity as a string!');
    error.required = ['uid'];
    this.emit('error', error);
    return false;
  }
  if (options && !options.data) {
    error = new Error('Missing required field: data.');
    error.required = ['data'];
    this.emit('error', error);
    return false;
  }

  //Validation occurred and passed
  return true;
};

/**
 * POST the user's data to the API.
 * @param options Inherited from Ldrly.prototype.identify
 * @private
 */
Ldrly.prototype._postIdentifyData = function (options) {
  var self = this,
    request_options = {
    url : this.defaults.url + this.defaults.resource.identify,
    json : options
  };
  request.post(request_options, handlePostResponse);
  function handlePostResponse(error, response, body) {
    if (error || response.statusCode === 400 || 401 || 403 || 404 || 406 || 500) {
      var err = new Error('Problem communicating with the API!');
      err.statusCode = response.statusCode;
      //If there is a body, return it
      if (body) {
        err.body = response.body;
      }
      //Emit the error
      return self.emit('error', err);
    }
    //Emit the identified call - return the user id
    self.emit('identified', { user : options.uid });
  }//END handlePostResponse
};


/*  ***********************************************
      Functionality related to Posting Stats
    *********************************************** */

//TODO Handle posting a new stat -> ldrly.postStat({uid, level, stats})
Ldrly.prototype.postStat = function (options) {
  //Check to make sure the wrapper is initialized
  this._isInitialized();

  //TODO Process the provided stats
  //TODO  Ensure the JSON is formatted appropriately
  //TODO  If so, add the data to the queue

};


//TODO Flush the queue
//TODO  Check if the queue >= the max queue size
//TODO  Check if the timer has expired


/**
 * Expose 'Ldrly'
 * @type {Ldrly}
 */
//Export the module
module.exports = Ldrly;