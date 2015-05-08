var React = require('react');
var MainStore = require('../../../store/MainStore');
var mainActions = require('../../../actions/mainActions');

function getAdminItemsModuleState() {
    return {
    };
}

var AdminItemsModule = React.createClass({
    // Get initial state from stores
    getInitialState: function() {
        return getAdminItemsModuleState();
    },
    // Render our child components, passing state via props
    render: function() {
        return (
            	<div>
                    AdminItemsModule
                </div>
        );
    },

    // Add change listeners to stores
    componentDidMount: function() {
    	MainStore.addChangeAllListener(this._onChange);
    },

    // Remove change listers from stores
    componentWillUnmount: function() {
    	MainStore.removeChangeAllListener(this._onChange);
    },

    // Method to setState based upon Store changes
    _onChange: function() {
    	this.setState(getAdminItemsModuleState());
    }
});

module.exports = AdminItemsModule;