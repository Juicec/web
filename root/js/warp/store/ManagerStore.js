var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var actionConstants = require('../constants/ActionConstants');
var _ = require('underscore');
var Utils = require('../utils/Utils');

var _companiesData = [];


function getCompaniesList() {
    if( _companiesData.length < 1){
        Utils.post({
            url : 'get_companies',
            success: function(data){
                _companiesData = data.companies;
                companyStore.emitChangeAll();
            }
        });
    }
}


var managerStore = _.extend({}, EventEmitter.prototype, {
    getCompaniesData: function() {
        return _companiesData;
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
        case actionConstants.COMPANY_GETLIST:
            getCompaniesList();
            break;                         
        default:
            return true;
    }
    return true;
});

module.exports = managerStore;