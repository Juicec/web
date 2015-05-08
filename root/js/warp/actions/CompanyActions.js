var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('../constants/ActionConstants');

// Define action methods
var companyActions = {

  	// search
	getCompaniesList: function() {
	  	AppDispatcher.handleAction({
	    	actionType: ActionConstants.COMPANY_GETLIST
	  	})
	}
};

module.exports = companyActions;