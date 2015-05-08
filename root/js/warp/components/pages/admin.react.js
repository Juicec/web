var React = require('react');
var MainStore = require('../../store/MainStore');
var mainActions = require('../../actions/mainActions');

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
                        <div className="page-menu">
                            <ul>
                                <li className="active" >Первый</li>
                                <li>Второй</li>
                                <li>Ещё что-то</li>
                            </ul>
                        </div>
                        <div className="workarea">
                            some data ololo
                        </div>
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