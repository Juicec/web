var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('../constants/ActionConstants');

// Define action methods
var shopActions = {

	loadShop: function(){
	  	AppDispatcher.handleAction({
	    	actionType: ActionConstants.SHOP_LOAD
	  	})
	}
};

module.exports = shopActions;