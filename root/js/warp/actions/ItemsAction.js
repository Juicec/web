var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('../constants/ActionConstants');

// Define action methods
var itemActions = {

	loadItems: function(){
	  	AppDispatcher.handleAction({
	    	actionType: ActionConstants.ITEM_LOAD
	  	})
	},

	saveNewItem: function(data) {
	  	AppDispatcher.handleAction({
	    	actionType: ActionConstants.ITEM_SAVE_NEW,
	    	data: data
	  	})
	},

	saveNewCategory: function(data) {
	  	AppDispatcher.handleAction({
	    	actionType: ActionConstants.CATEGORY_SAVE_NEW,
	    	data: data
	  	})
	}
};

module.exports = itemActions;