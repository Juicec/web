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
	getCartUsers: function(company_id, dep_id){
		AppDispatcher.handleAction({
	    	actionType: ActionConstants.MANAGER_CARTUSERS,
	    	company_id: company_id,
	    	dep_id: dep_id
	  	})
	},
	getUserCart: function(company_id, user_id){
		AppDispatcher.handleAction({
	    	actionType: ActionConstants.MANAGER_USERCART,
	    	company_id: company_id,
	    	user_id: user_id
	  	})
	},
	getTotalCart: function(company_id){
		AppDispatcher.handleAction({
	    	actionType: ActionConstants.MANAGER_TOTALCART,
	    	company_id: company_id
	  	})
	},
	toggleSaleClosed: function(company_id){
		AppDispatcher.handleAction({
	    	actionType: ActionConstants.MANAGER_TOGGLESALECLOSED,
	    	company_id: company_id
	  	})
	},
	getDepartmentsIds: function(company_id){
		AppDispatcher.handleAction({
	    	actionType: ActionConstants.MANAGER_GETDEPARTMENTS,
	    	company_id: company_id
	  	})
	}
}
module.exports = managerActions;