var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var actionConstants = require('../constants/ActionConstants');
var _ = require('underscore');
var Utils = require('../utils/Utils');

var _companiesData = [];
var _adminsData = [];
var _sameNameError = false;
var _searchedUsers = [];

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


function addNewCompany(newCompanyData){
    Utils.post({
        url : 'add_company',
        data: {"name" : newCompanyData.name, "description": newCompanyData.description, "phone": newCompanyData.phone},
        success: function(data){
            if(data.status_code == '0'){
                var new_compapany = {
                    description : newCompanyData.description,
                    encoded_id  : data.encoded_id,
                    id          : data.id,
                    name        : newCompanyData.name,
                    phone       : newCompanyData.phone,
                    reg_key     : data.reg_key
                }
                _companiesData.push(new_compapany);
                _sameNameError = false;

                companyStore.emitChangeAll();
            }

            if(data.status_code == '2'){
                _sameNameError = true;
            }
            companyStore.emitSameNameError();
        }
    });
}

function companyEdit(newData){
    Utils.post({
        url : 'update_company',
        data: {"name" : newData.name, "description": newData.description, "phone": newData.phone, "id": newData.id},
        success: function(data){
              for(var key in _companiesData){
                if(_companiesData[key].id == newData.id){
                    _companiesData[key].name = newData.name;
                    _companiesData[key].description = newData.description;
                    _companiesData[key].phone = newData.phone;
                }
            }
            companyStore.emitChangeAll();
        }
    });
}

function companyDelete(delData){
    Utils.post({
        url : 'remove_company',
        data: {"id": delData.id},
        success: function(data){
            for(var key in _companiesData){
                if(_companiesData[key].id == delData.id){
                    delete _companiesData[key];
                }
            }
            companyStore.emitChangeAll();
        }
    });
}

function findUsers(userData){
    Utils.post({
        url : 'search_users',
        data: {"key": userData},
        success: function(data){
            _searchedUsers = data.users;
            companyStore.emitChangeAll();
        }
    });
}

function setUserInManager(managerData){
    Utils.post({
        url : 'company_manager_set',
        data: {"company_id": managerData.company_id, "email": managerData.email},
        success: function(data){
            companyStore.emitChangeAll();
        }
    });
}

var companyStore = _.extend({}, EventEmitter.prototype, {
    getCompaniesData: function() {
        return _companiesData;
    },

    getSameNameError: function() {
        return _sameNameError;
    },

    getSearchedUsers: function(){
        return _searchedUsers;
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
    },



    emitSameNameError: function() {
        this.emit('same_name_error');
    },

    // Add change listener
    addSameNameErrorListener: function(callback) {
        this.on('same_name_error', callback);
    },

    // Remove change listener
    removeSameNameErrorListener: function(callback) {
        this.removeListener('same_name_error', callback);
    }
});

// Register callback with AppDispatcher

AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case actionConstants.COMPANY_GETLIST:
            getCompaniesList();
            break; 
        case actionConstants.COMPANY_ADDNEW:
            addNewCompany(action.newCompanyData);
            break;   
        case actionConstants.COMPANY_EDIT:
            companyEdit(action.newData);
            break;
        case actionConstants.COMPANY_DEL:
            companyDelete(action.delData);
            break; 
        case actionConstants.COMPANY_GETUSERS:
            findUsers(action.userData);
            break;  
         case actionConstants.COMPANY_SETMANAGER:
            setUserInManager(action.managerData);
            break;                        
        default:
            return true;
    }
    return true;
});

module.exports = companyStore;