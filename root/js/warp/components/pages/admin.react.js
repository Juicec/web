var React = require('react');
var MainStore = require('../../store/MainStore');
var mainActions = require('../../actions/mainActions');
var AdminCompaniesModule = require('./page_modules/adminCompanies.react');
var AdminUsersModule = require('./page_modules/adminUsers.react');
var AdminItemsModule = require('./page_modules/adminItems.react');
var AdminOrdersModule = require('./page_modules/adminOrders.react');
var companyActions = require('../../actions/CompanyActions');
var Utils = require('../../utils/Utils');

function getAdminPageState() {
    return {
        userData        : MainStore.getUserData(),
        activeLink      : 'company'
    };
}

var AdminApp = React.createClass({
    // Get initial state from stores
    getInitialState: function() {
        return getAdminPageState();
    },
    changeActiveLink : function(e){
        Utils.setUrl('?type='+e.target.dataset.name);
        this.setState({
            activeLink : e.target.dataset.name
        });
    },
    // Render our child components, passing state via props
    render: function() {
        return (
            	<div className="page-content">
                    <div className="siderbar">
                        <ul>
                            <li className = {this.state.activeLink == 'company' ? 'active':null} data-name="company" onClick={this.changeActiveLink}>Компании</li>
                            <li className = {this.state.activeLink == 'order' ? 'active':null} data-name="order" onClick={this.changeActiveLink}>Заказы</li>
                            <li className = {this.state.activeLink == 'user' ? 'active':null} data-name="user" onClick={this.changeActiveLink}>Пользователи</li>
                            <li className = {this.state.activeLink == 'item' ? 'active':null} data-name="item" onClick={this.changeActiveLink}>Товары</li>
                        </ul>
                    </div>
                    <div className="page-data page-admin">
                        {this.state.activeLink == 'company' ? <AdminCompaniesModule /> : null}
                        {this.state.activeLink == 'order' ? <AdminOrdersModule /> : null}
                        {this.state.activeLink == 'user' ? <AdminUsersModule /> : null}
                        {this.state.activeLink == 'item' ? <AdminItemsModule /> : null}
                    </div>
            	</div>
        );
    },

    // Add change listeners to stores
    componentDidMount: function() {
        var get = Utils.getUrlParams();
        if (get.type && 
            (   get.type == 'company' ||
                get.type == 'order' ||
                get.type == 'user' ||
                get.type == 'item'
            ))
            this.setState({ activeLink: get.type})
    	MainStore.addChangeAllListener(this._onChange);
    },

    // Remove change listers from stores
    componentWillUnmount: function() {
    	MainStore.removeChangeAllListener(this._onChange);
    },

    // Method to setState based upon Store changes
    _onChange: function() {
    	this.setState(getAdminPageState());
    }
});


module.exports = AdminApp;