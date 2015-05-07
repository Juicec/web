var React = require('react');
var MainStore = require('../../store/MainStore');
var mainActions = require('../../actions/mainActions');

function getAdminPageState() {
    return {
        userData        : MainStore.getUserData()
    };
}

var AdminApp = React.createClass({
    // Get initial state from stores
    getInitialState: function() {
        return getAdminPageState();
    },

    // Render our child components, passing state via props
    render: function() {
        return (
            	<div className="page-content">
                    <div className="siderbar">
                        <h2>Компании</h2>
                        <ul>
                            <li>one</li>
                            <li>two</li>
                        </ul>
                        <h2>Заказы</h2>
                        <ul>
                            <li>one</li>
                            <li>two</li>
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