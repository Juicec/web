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
	    	actionType: ActionConstants.MAIN_CLOSEFORM
	  	})
	},
	signUp: function(reg_data){
		AppDispatcher.handleAction({
	    	actionType: ActionConstants.MAIN_REG,
	    	reg_data: reg_data
	  	})
	},
	get_departments: function(key){
		AppDispatcher.handleAction({
	    	actionType: ActionConstants.MAIN_GET_DEPARTMENT,
	    	key: key
	  	})
	}
};

module.exports = mainActions;
