var React = require('react');
var MainStore = require('../../../store/MainStore');
var mainActions = require('../../../actions/mainActions');

function getAdminUsersModuleState() {
    return {
    };
}

var AdminUsersModule = React.createClass({
    // Get initial state from stores
    getInitialState: function() {
        return getAdminUsersModuleState();
    },
    // Render our child components, passing state via props
    render: function() {
        return (
            	<div>
                    AdminUsersModule
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
    	this.setState(getAdminUsersModuleState());
    }
});

module.exports = AdminUsersModule;