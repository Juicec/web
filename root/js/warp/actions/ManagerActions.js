var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('../constants/ActionConstants');

// Define action methods
var managerActions = {

  	// search
	getCompanyInfo: function(userId) {
	  	AppDispatcher.handleAction({
	    	actionType: ActionConstants.MANAGER_GETINFO,
	    	userId: userId
	  	})
	}
}
module.exports = managerActions;