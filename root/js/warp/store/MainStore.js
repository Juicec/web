var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var actionConstants = require('../constants/ActionConstants');
var _ = require('underscore');
var Utils = require('../utils/Utils');

var _userData = {};

function setUserData(pageType) {
    Utils.post({
        url : 'get_user_data',
        success: function(data){
            _userData = data.user;
            mainStore.emitChangeAll();
        }
    });
}

var mainStore = _.extend({}, EventEmitter.prototype, {
    getUserData: function() {
        return _userData;
    },

    // Emit Change ALL DATA event
    emitChangeAll: function() {
        this.emit('change_all');
    },

    // Add change listener
    addChangeAllListener: function(callback) {
        this.on('change_all', callback);
    },

    // Remove change listener
    removeChangeAllListener: function(callback) {
        this.removeListener('change_all', callback);
    }
});

// Register callback with AppDispatcher

AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case actionConstants.MAIN_LOAD:
            setUserData();
            break;

        default:
            return true;
    }
    return true;
});

module.exports = mainStore;
