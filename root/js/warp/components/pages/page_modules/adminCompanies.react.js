var React = require('react');
var MainStore = require('../../../store/MainStore');
var mainActions = require('../../../actions/mainActions');

function getAdminCompaniesModuleState() {
    return {
    };
}

var AdminCompaniesModule = React.createClass({
    // Get initial state from stores
    getInitialState: function() {
        return getAdminCompaniesModuleState();
    },
    // Render our child components, passing state via props
    render: function() {
        return (
            	<div>
                    AdminCompaniesModule
                    <CompaniesList />
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
    	this.setState(getAdminCompaniesModuleState());
    }
});

var CompaniesList = React.createClass({
    render: function(){
        return (
            <span>List of companies</span>
        );
    }
});

module.exports = AdminCompaniesModule;