var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var actionConstants = require('../constants/ActionConstants');
var _ = require('underscore');
var Utils = require('../utils/Utils');

var _companyData = [];
var _companyUsers = [];
var _cartUsers = [];
var _userCart = [];
var _totalCart = [];
var _departments = [];


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

function getCartUsers(company_id, dep_id){
    Utils.post({
        url : 'get_cart_users',
        data: {'company_id': company_id, 'department_id': dep_id},
        success: function(data){
            _cartUsers[dep_id] = data.users;
            managerStore.emitChangeAll();
        }
    });
}

function getUserCart(company_id, user_id){
    Utils.post({
        url : 'get_user_cart',
        data: {'company_id': company_id, 'user_id': user_id},
        success: function(data){
            _userCart[user_id] = data.items;
            managerStore.emitChangeAll();
        }
    });
}

function getTotalCart(company_id){
     Utils.post({
        url : 'get_total_cart',
        data: {'company_id': company_id},
        success: function(data){
            _totalCart = data.items;
            managerStore.emitChangeAll();
        }
    });
}

function toggleSaleClosed(company_id){
    Utils.post({
        url : 'toggle_sale_closed',
        data: {'company_id': company_id},
        success: function(data){
            _companyData.sale_closed = Math.abs(_companyData.sale_closed - 1);
        }
    });
}

function getDepartmentsIds(company_id){
    Utils.post({
        url : 'get_departments',
        data: {'company_id': company_id},
        success: function(data){
            _departments = data.departments;
            managerStore.emitChangeAll();
        }
    });
}

var managerStore = _.extend({}, EventEmitter.prototype, {
    getCompanyData: function() {
        return _companyData;
    },
    cartUsers: function(dep_id){
        return Array.isArray(_cartUsers[dep_id]) ? _cartUsers[dep_id] : [];
    },
    userCart: function(user_id){
        return Array.isArray(_userCart[user_id]) ? _userCart[user_id] : [];
    },
    totalCart: function(){
        return _totalCart;
    },
    getDepartments: function(){
        return _departments;
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
        case actionConstants.MANAGER_CARTUSERS:
            getCartUsers(action.company_id, action.dep_id);
            break; 
        case actionConstants.MANAGER_USERCART:
            getUserCart(action.company_id, action.user_id);
            break; 
        case actionConstants.MANAGER_TOTALCART:
            getTotalCart(action.company_id);
            break; 
        case actionConstants.MANAGER_TOGGLESALECLOSED:
            toggleSaleClosed(action.company_id);
            break;
        case actionConstants.MANAGER_GETDEPARTMENTS:
            getDepartmentsIds(action.company_id);
            break; 
        default:
            return true;
    }
    return true;
});

module.exports = managerStore;