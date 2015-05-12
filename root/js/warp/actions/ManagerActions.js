var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('../constants/ActionConstants');

// Define action methods
var managerActions = {

  	// search
	load: function(pageType) {
	  	AppDispatcher.handleAction({
	    	actionType: ActionConstants.MAIN_LOAD,
	    	pageType: pageType
	  	})
	}
}
module.exports = managerActions;