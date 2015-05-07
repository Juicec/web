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
            if(data.logged_in){
                _userData = data.user;
                _userData.authFlag = true;
            }

            mainStore.emitChangeAll();
        }
    });
}


function signOut() {
    Utils.post({
        url : 'logout',
        success: function(request){
            if(request.status_code == 0){
                _userData = {};
                mainStore.emitChangeAll();
            }
        }
    });
}

function closeSignForm(){
    _userData.authError = false;
    mainStore.emitChangeAll();
}

function signUp(reg_data){
    Utils.post({
        url: 'register',
        data: {'email': reg_data.email, 'password': reg_data.password, 'first_name': reg_data.first_name, 'last_name': reg_data.last_name},
        success: function(){
            signIn(reg_data);
        }
    });
}

var mainStore = _.extend({}, EventEmitter.prototype, {
    getUserData: function() {
        return _userData;
    },

    getAuthFlag: function(){
        return _userData.authFlag;
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
        case actionConstants.MAIN_SIGNOUT:
            signOut();
            break; 
        case actionConstants.AUTH_CLOSEFORM:
            closeSignForm();
            break;   
        case actionConstants.MAIN_REG:
            signUp(action.reg_data);
            break;              

        default:
            return true;
    }
    return true;
});

module.exports = mainStore;
