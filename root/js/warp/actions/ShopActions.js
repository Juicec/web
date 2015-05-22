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

	deleteFromShopCart: function(item_id){
	  	AppDispatcher.handleAction({
	    	actionType: ActionConstants.SHOP_CART_REMOVE,
	    	item_id: item_id
	  	})
	},	

	editShopCart: function(item_id, qty){
	  	AppDispatcher.handleAction({
	    	actionType: ActionConstants.SHOP_CART_EDIT,
	    	item_id: item_id,
	    	qty: qty
	  	})
	},	


	loadShopCart: function(data){
	  	AppDispatcher.handleAction({
	    	actionType: ActionConstants.SHOP_CART_LOAD
	  	})
	}
};

module.exports = shopActions;