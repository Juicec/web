var React = require('react');
var Header = require('./modules/Header.react');
var MainStore = require('../store/MainStore');
var mainActions = require('../actions/mainActions');
var Admin = require('./pages/admin.react');
var Manager = require('./pages/manager.react');
//var pageConstants = require('../constants/PageConstants');
//var modulesConstants = require('../constants/ModulesConstants');

function getState() {
    return {
        userData        : MainStore.getUserData()
    };
}

var MainApp = React.createClass({
    // Get initial state from stores
    getInitialState: function() {
        return getState();
    },

    getUserData: function(e) {
        mainActions.load();
    },

    // Render our child components, passing state via props
    render: function() {
        var mainPart = function(pageType) {
            switch(pageType){
                case 'shop':
                    return(
                        <div>
                            shop
                        </div>
                    );
                    break;
                case 'admin':
                    return(
                        <div>
                            { this.state.userData.role_id == 3 ? <Admin /> : null }
                            { this.state.userData.role_id == 2 ? <Manager /> : null }
                        </div>
                    );
                    break;
                default:
                    return(
                        <div>
                            home
                        </div>
                    );
                    break;
            }
        }.bind(this);

        return (
            	<div className="page-container">
                    <Header />
                    { mainPart(this.props.page) }
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
    	this.setState(getState());
    }
});

module.exports = MainApp;