var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var actionConstants = require('../constants/ActionConstants');
var _ = require('underscore');
var Utils = require('../utils/Utils');

var _companyData = [];


function getCompanyInfo(userId) {
        Utils.post({
            url : 'get_company_info_to_manager',
            data: {'user_id': userId},
            success: function(data){
                _companyData = data;
                managerStore.emitChangeAll();
            }
        });
}


var managerStore = _.extend({}, EventEmitter.prototype, {
    getCompanyData: function() {
        return _companyData;
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
        case actionConstants.MANAGER_GETINFO:
            getCompanyInfo(action.userId);
            break;                         
        default:
            return true;
    }
    return true;
});

module.exports = managerStore;