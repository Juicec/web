var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var actionConstants = require('../constants/ActionConstants');
var _ = require('underscore');
var Utils = require('../utils/Utils');

var _companyData = [];
var _companyUsers = [];


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

function getCompanyUsers(userId){
    Utils.post({
        url : 'get_company_users_to_manager',
        data: {'user_id': userId},
        success: function(data){
            _companyUsers = data.users;
            managerStore.emitChangeAll();
        }
    });
}

function confirmUser(userEmail){
    Utils.post({
        url : 'confirm_user',
        data: {'user_email': userEmail},
        success: function(data){
            for(var key in _companyUsers){
                if(_companyUsers[key].email == userEmail){
                    _companyUsers[key].confirmed = 1;
                }
            }
            managerStore.emitChangeAll();
        }
    });
}

function deleteUser(userEmail){
    Utils.post({
        url : 'delete_user',
        data: {'user_email': userEmail},
        success: function(data){
            for(var key in _companyUsers){
                if(_companyUsers[key].email == userEmail){
                    _companyUsers[key] = [];
                }
            }
            managerStore.emitChangeAll();
        }
    });
}

var managerStore = _.extend({}, EventEmitter.prototype, {
    getCompanyData: function() {
        return _companyData;
    },
    getCompanyUsers: function() {
        return _companyUsers;
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
        case actionConstants.MANAGER_GETUSERS:
            getCompanyUsers(action.userId);
            break;
        case actionConstants.MANAGER_CONFIRMUSER:
            confirmUser(action.userEmail);
            break; 
        case actionConstants.MANAGER_DELETEUSER:
            deleteUser(action.userEmail);
            break;    
        default:
            return true;
    }
    return true;
});

module.exports = managerStore;