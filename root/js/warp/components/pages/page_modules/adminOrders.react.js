var React = require('react');
var MainStore = require('../../../store/MainStore');
var mainActions = require('../../../actions/mainActions');

function getAdminOrdersModuleState() {
    return {
    };
}

var AdminOrdersModule = React.createClass({
    // Get initial state from stores
    getInitialState: function() {
        return getAdminOrdersModuleState();
    },
    // Render our child components, passing state via props
    render: function() {
        return (
            	<div>
                    AdminOrdersModule
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
    	this.setState(getAdminOrdersModuleState());
    }
});

module.exports = AdminOrdersModule;