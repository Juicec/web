var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('../constants/ActionConstants');

// Define action methods
var mainActions = {

  	// search
	load: function(pageType) {
	  	AppDispatcher.handleAction({
	    	actionType: ActionConstants.MAIN_LOAD,
	    	pageType: pageType
	  	})
	},
	signout: function(){
		AppDispatcher.handleAction({
	    	actionType: ActionConstants.MAIN_SIGNOUT
	  	})
	},
	closeForm: function(){
		AppDispatcher.handleAction({
	    	actionType: ActionConstants.AUTH_CLOSEFORM
	  	})
	},
	signUp: function(reg_data){
		AppDispatcher.handleAction({
	    	actionType: ActionConstants.MAIN_REG,
	    	reg_data: reg_data
	  	})
	}
};

module.exports = mainActions;
