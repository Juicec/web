var React = require('react');
var MainStore = require('../../store/MainStore');
var mainActions = require('../../actions/mainActions');
var managerActions = require('../../actions/ManagerActions');
var ManagerCompanyInfo = require('./page_modules/managerCompanyInfo.react');
var ManagerCompanyUsers = require('./page_modules/managerCompanyUsers.react');
var ManagerCompanyCart = require('./page_modules/managerCompanyCart.react');

function getAdminPageState() {
    return {
        userData        : MainStore.getUserData(),
        activeLink      : 'companyInfo'
    };
}

var ManagerApp = React.createClass({
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
                            <li className = {this.state.activeLink == 'companyInfo' ? 'active':null} data-name="companyInfo" onClick={this.changeActiveLink}>Информация о компании</li>
                            <li className = {this.state.activeLink == 'companyUsers' ? 'active':null} data-name="companyUsers" onClick={this.changeActiveLink}>Пользователи компании</li>
                            <li className = {this.state.activeLink == 'companyCart' ? 'active':null} data-name="companyCart" onClick={this.changeActiveLink}>Корзина компании</li>
                        </ul>
                    </div>
                    <div className="page-data page-admin">
                        	{ this.state.activeLink == 'companyInfo' ? <ManagerCompanyInfo user={ this.state.userData } /> : null }
                            { this.state.activeLink == 'companyUsers' ? <ManagerCompanyUsers user={ this.state.userData } /> : null }
                            { this.state.activeLink == 'companyCart' ? <ManagerCompanyCart user={ this.state.userData } /> : null }

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

module.exports = ManagerApp;