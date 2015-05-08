var React = require('react');
var MainStore = require('../../store/MainStore');
var mainActions = require('../../actions/mainActions');
var AdminCompaniesModule = require('./page_modules/adminCompanies.react');
var AdminUsersModule = require('./page_modules/adminUsers.react');
var AdminItemsModule = require('./page_modules/adminItems.react');
var AdminOrdersModule = require('./page_modules/adminOrders.react');
var companyActions = require('../../actions/CompanyActions');

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
                    <div className="page-data">
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