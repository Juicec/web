var Dispatcher = require('flux').Dispatcher;
var async = require('async');
var PayloadSources = [];

// Create dispatcher instance
var AppDispatcher = new Dispatcher();

queue = async.queue( function (task, callback) {
    var payload = {
        source: PayloadSources[task.source],
        action: task.action
    };
    AppDispatcher.dispatch(payload);
    callback();
}, 1); // only one worker, one event at a time

// Convenience method to handle dispatch requests
AppDispatcher.handleAction = function(action) {
  	queue.push({source: 'VIEW_ACTION', action : action});
}

module.exports = AppDispatcher;
