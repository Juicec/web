var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var actionConstants = require('../constants/ActionConstants');
var _ = require('underscore');
var Utils = require('../utils/Utils');

var _categories = [];
var _items = [];

function setCategories() {
    Utils.post({
        url : 'get_categories',
        success : function(reqest){
            if(reqest.status_code == 0){
            	_categories = reqest.categories;
    			Utils.post({
    			    url : 'get_items',
    			    success : function(reqest){
    			        if(reqest.status_code == 0){
    			        	_items = reqest.items;
    			            shopStore.emitChangeShop();
    			        }
    			    }.bind(this)
    			})
            }
        }.bind(this)
    })
}

var shopStore = _.extend({}, EventEmitter.prototype, {
    getCategories: function() {
        return _categories;
    },

    getItems: function() {
    	return _items;
    },

    // Emit Change SHOP DATA event
    emitChangeShop: function() {
        this.emit('shop');
    },

    // Add change listener
    addChangeShopListener: function(callback) {
        this.on('shop', callback);
    },

    // Remove change listener
    removeChangeShopListener: function(callback) {
        this.removeListener('shop', callback);
    }
});

// Register callback with AppDispatcher

AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case actionConstants.SHOP_LOAD:
            setCategories();
            break;                          

        default:
            return true;
    }
    return true;
});

module.exports = shopStore;