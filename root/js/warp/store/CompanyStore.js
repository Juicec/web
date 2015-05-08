var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var actionConstants = require('../constants/ActionConstants');
var _ = require('underscore');
var Utils = require('../utils/Utils');

var _companiesData = {};

function getCompaniesList() {
    Utils.post({
        url : 'get_companies',
        success: function(data){
            _companiesData = data.companies;
            companyStore.emitChangeAll();
        }
    });
}

function addNewCompany(newCompanyData){
    Utils.post({
        url : 'add_company',
        data: {"name" : newCompanyData.name, "description": newCompanyData.description, "phone": newCompanyData.phone},
        success: function(data){
            if(data.status_code == '0'){
                companyStore.emitChangeAll();
            }

            if(data.status_code == '2'){
                companyStore.emitSameNameError();
            }
        }
    });
}

function companyGetInitial(){
    companyStore.emitChangeAll();
}

function companyEdit(newData){
    Utils.post({
        url : 'update_company',
        data: {"name" : newData.name, "description": newData.description, "phone": newData.phone, "id": newData.id},
        success: function(data){
            companyStore.emitChangeAll();
        }
    });
}

function companyDelete(delData){
    Utils.post({
        url : 'remove_company',
        data: {"id": delData.id},
        success: function(data){
            companyStore.emitChangeAll();
        }
    });
}

var companyStore = _.extend({}, EventEmitter.prototype, {
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
        case actionConstants.COMPANY_GETINITIAL:
            companyGetInitial();
            break; 
        case actionConstants.COMPANY_EDIT:
            companyEdit(action.newData);
            break;
        case actionConstants.COMPANY_DEL:
            companyDelete(action.delData);
            break;                   
        default:
            return true;
    }
    return true;
});

module.exports = companyStore;