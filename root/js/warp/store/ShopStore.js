var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var actionConstants = require('../constants/ActionConstants');
var _ = require('underscore');
var Utils = require('../utils/Utils');

var _categories = [];
var _items = [];
var _shopCart = [];

function loadShop() {
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

function addToShopCart(data) {
    Utils.post({
        url : 'add_to_shop_cart',
        data : { item_id : data.item_id, qty : data.qty },
        success : function(reqest){
            if(reqest.status_code == 0){
            	loadShopCart();
            }
        }.bind(this)
    })
}

function removeFromSH(item_id){
    Utils.post({
        url : 'delete_from_shopcart',
        data: { item_id : item_id },
        success : function(reqest){
            if(reqest.status_code == 0){
                loadShopCart();
            }
        }
    })
}

function editShopCart(item_id, qty) {
    Utils.post({
        url : 'edit_shopcart',
        data : { item_id : item_id, qty : qty },
        success : function(reqest){
            if(reqest.status_code == 0){
                loadShopCart();
            }
        }.bind(this)
    })
}

function loadShopCart() {
    Utils.post({
        url : 'get_shopcart',
        success : function(reqest){
            if(reqest.status_code == 0){
            	_shopCart = reqest.shopcart;
            	shopStore.emitChangeShopCart();
            }
        }
    })
}

var shopStore = _.extend({}, EventEmitter.prototype, {
    getCategories: function() {
        return _categories;
    },

    getItems: function() {
    	return _items;
    },

    getShopCart: function() {
    	return _shopCart;
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
    },

    // Emit Change SHOPCART DATA event
    emitChangeShopCart: function() {
        this.emit('shopcart');
    },

    // Add change listener
    addChangeShopCartListener: function(callback) {
        this.on('shopcart', callback);
    },

    // Remove change listener
    removeChangeShopCartListener: function(callback) {
        this.removeListener('shopcart', callback);
    }
});

// Register callback with AppDispatcher

AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case actionConstants.SHOP_LOAD:
            loadShop();
            break;           

        case actionConstants.SHOP_CART_ADD:
            addToShopCart(action.data);
            break;

        case actionConstants.SHOP_CART_LOAD:
            loadShopCart();
            break;          

        case actionConstants.SHOP_CART_REMOVE:
            removeFromSH(action.item_id);
            break;          

        case actionConstants.SHOP_CART_EDIT:
            editShopCart(action.item_id, action.qty);
            break;  

        default:
            return true;
    }
    return true;
});

module.exports = shopStore;