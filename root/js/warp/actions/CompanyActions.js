var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('../constants/ActionConstants');

// Define action methods
var companyActions = {

  	// search
	getCompaniesList: function() {
	  	AppDispatcher.handleAction({
	    	actionType: ActionConstants.COMPANY_GETLIST
	  	})
	},
	addCompany: function(newCompanyData){
		AppDispatcher.handleAction({
	    	actionType: ActionConstants.COMPANY_ADDNEW,
	    	newCompanyData: newCompanyData
	  	})
	},
	getInitial: function(){
		AppDispatcher.handleAction({
	    	actionType: ActionConstants.COMPANY_GETINITIAL
	  	})
	},
	edit: function(newData){
		AppDispatcher.handleAction({
	    	actionType: ActionConstants.COMPANY_EDIT,
	    	newData: newData
	  	})
	},
	deleteCompany: function(delData){
		AppDispatcher.handleAction({
	    	actionType: ActionConstants.COMPANY_DEL,
	    	delData: delData
	  	})
	}
};

module.exports = companyActions;