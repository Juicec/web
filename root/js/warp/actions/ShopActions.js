var AppDispatcher = require('../dispatcher/AppDispatcher');
var ActionConstants = require('../constants/ActionConstants');

// Define action methods
var shopActions = {

	loadShop: function(){
	  	AppDispatcher.handleAction({
	    	actionType: ActionConstants.SHOP_LOAD
	  	})
	},	

	addToShopCart: function(data){
	  	AppDispatcher.handleAction({
	    	actionType: ActionConstants.SHOP_CART_ADD,
	    	data: data
	  	})
	},	

	loadShopCart: function(data){
	  	AppDispatcher.handleAction({
	    	actionType: ActionConstants.SHOP_CART_LOAD
	  	})
	}
};

module.exports = shopActions;