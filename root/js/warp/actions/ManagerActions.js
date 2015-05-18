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
	},
	getCompanyUsers: function(userId){
		AppDispatcher.handleAction({
	    	actionType: ActionConstants.MANAGER_GETUSERS,
	    	userId: userId
	  	})
	},
	confirm_user: function(userEmail){
		AppDispatcher.handleAction({
	    	actionType: ActionConstants.MANAGER_CONFIRMUSER,
	    	userEmail: userEmail
	  	})
	},
	deleteUser: function(userEmail){
		AppDispatcher.handleAction({
	    	actionType: ActionConstants.MANAGER_DELETEUSER,
	    	userEmail: userEmail
	  	})
	},
	getCartUsers: function(company_id){
		AppDispatcher.handleAction({
	    	actionType: ActionConstants.MANAGER_CARTUSERS,
	    	company_id: company_id
	  	})
	},
	getUserCart: function(company_id){
		AppDispatcher.handleAction({
	    	actionType: ActionConstants.MANAGER_USERCART,
	    	company_id: company_id
	  	})
	},
	getTotalCart: function(company_id){
		AppDispatcher.handleAction({
	    	actionType: ActionConstants.MANAGER_TOTALCART,
	    	company_id: company_id
	  	})
	}
}
module.exports = managerActions;