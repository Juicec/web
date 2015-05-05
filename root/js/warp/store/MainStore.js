//var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
//var actionConstants = require('../constants/ActionConstants');
//var pageConstants = require('../constants/PageConstants');
var _ = require('underscore');

var _userData = {};

function setUserData(pageType) {
    Utils.post({
        url : 'get_user_data',
        success: function(data){
            _userData = data.user_data;
            if (data.user_data.logged_in){
                if (pageType) setPage(pageType, false);
                else setPage(pageConstants.HOME, false);
            }
            else {
                if (pageType) setPage(pageType, false);
                else setPage(pageConstants.HOME, false);
            }
        }
    });
}

var mainStore = _.extend({}, EventEmitter.prototype, {
    getUserData: function() {
        setUserData();
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
/*
AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case actionConstants.PRELOAD:
            if (_.isEmpty(_userData))
                setUserData(action.pageType);
            else
                setPage(action.pageType, true);
            break;

        case actionConstants.SET_PAGE:
            setPage(action.pageType, false, action.extraUrl);
            break;

        case actionConstants.SHOW_MODULE:
            setActiveModule(action.moduleType);
            break;

        case actionConstants.CLOSE_MODULE:
            setActiveModule(null);
            break;

        case actionConstants.SIGN_IN:
            authUser(action.userData);
            break;

        case actionConstants.SIGN_IN_FB:
            authUserFromFB(action.response);
            break;

        case actionConstants.SIGN_IN_GP:
            authUserFromGP(action.authResult);
            break;

        default:
            return true;
    }
    return true;
});
*/

module.exports = mainStore;
