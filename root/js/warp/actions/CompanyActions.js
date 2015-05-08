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
	closeCreation: function(){
		AppDispatcher.handleAction({
	    	actionType: ActionConstants.COMPANY_CLOSECREATION
	  	})
	}
};

module.exports = companyActions;