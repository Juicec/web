var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var actionConstants = require('../constants/ActionConstants');
var _ = require('underscore');
var Utils = require('../utils/Utils');

var _items = [];

function saveNewItem(data){
	if (!data.img) data.img = '';
    Utils.post({
        url : 'save_item',
        data : data,
        success : function(reqest){
            if(reqest.status_code == 0){
            	_items.push(reqest.item);
                itemsStore.emitChangeAdminItems();
            }
        }.bind(this)
    })
}

function saveNewCategory(data){
    Utils.post({
        url : 'save_category',
        data : data,
        success : function(reqest){
            if(reqest.status_code == 0){
                itemsStore.emitChangeAdminItems();
            }
        }.bind(this)
    })
}

function setItems(){
    Utils.post({
        url : 'get_items',
        success : function(reqest){
            if(reqest.status_code == 0){
            	_items = reqest.items;
                itemsStore.emitChangeAdminItems();
            }
        }.bind(this)
    })
}

var itemsStore = _.extend({}, EventEmitter.prototype, {
    getItems: function() {
        return _items;
    },

    // Emit Change ALL DATA event
    emitChangeAdminItems: function() {
        this.emit('admin_items');
    },

    // Add change listener
    addChangeAdminItemsListener: function(callback) {
        this.on('admin_items', callback);
    },

    // Remove change listener
    removeChangeAdminItemsListener: function(callback) {
        this.removeListener('admin_items', callback);
    }
});

// Register callback with AppDispatcher

AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case actionConstants.ITEM_LOAD:
            setItems();
            break;    

        case actionConstants.ITEM_SAVE_NEW:
            saveNewItem(action.data);
            break;             

        case actionConstants.CATEGORY_SAVE_NEW:
            saveNewCategory(action.data);
            break;                 

        default:
            return true;
    }
    return true;
});

module.exports = itemsStore;