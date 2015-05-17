var keyMirror = require('react/lib/keyMirror');

// Define action constants
module.exports = keyMirror({
    MAIN_LOAD      	  		: null,
    MAIN_SIGNOUT   	  		: null,
    MAIN_CLOSEFORM 	  		: null,
    MAIN_REG				: null,
    COMPANY_GETLIST	  		: null,
    COMPANY_ADDNEW 	  		: null,
    COMPANY_EDIT	  		: null,
    COMPANY_DEL		  		: null,
    COMPANY_GETUSERS		: null,
    COMPANY_SETMANAGER		: null,
    COMPANY_CHANGEMANAGER	: null,
    COMPANY_DELMANAGER		: null,
    MANAGER_GETINFO         : null,
    MANAGER_GETUSERS        : null,
    CATEGORY_SAVE_NEW       : null,
    ITEM_LOAD               : null,
    ITEM_SAVE_NEW           : null,
    SHOP_LOAD               : null,
    MANAGER_CONFIRMUSER     : null,
    MANAGER_DELETEUSER      : null
});
