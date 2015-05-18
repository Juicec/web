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

function updateItem(data){
    Utils.post({
        url : 'update_item',
        data: data,
        success : function(reqest){
            if(reqest.status_code == 0){
                for(var key in _items){
                    if(_items[key].id == data.id){
                        _items[key].name = data.name;
                        _items[key].description =data.description;
                        _items[key].price = data.price;
                        _items[key].unit_id = data.unit_id;
                        _items[key].category_id = data.category_id;
                        _items[key].img = data.img;
                    }
                }
                itemsStore.emitChangeAdminItems();
            }
        }.bind(this)
    })
}

function deleteItem(itemId){
    Utils.post({
        url : 'remove_item',
        data: {"id" : itemId},
        success : function(reqest){
            if(reqest.status_code == 0){
                for(var key in _items){
                    if(_items[key].id == itemId){
                        delete _items[key];
                    }
                }
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
        case actionConstants.ITEM_UPDATE:
            updateItem(action.data);
            break; 
        case actionConstants.ITEM_DELETE:
            deleteItem(action.itemId);
            break;    
        default:
            return true;
    }
    return true;
});

module.exports = itemsStore;