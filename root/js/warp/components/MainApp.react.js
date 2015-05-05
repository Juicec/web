var React = require('react');
//var SignIn = require('./modules/signIn.react');
var MainStore = require('../store/MainStore');
var mainActions = require('../actions/mainActions');
//var pageConstants = require('../constants/PageConstants');
//var modulesConstants = require('../constants/ModulesConstants');

function getState() {
    return {
        userData: MainStore.getUserData()
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
                            admin
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
        };

        return (
        	<div className="page-container">
                <div onClick={ this.getUserData } >Get user data</div>
                { this.state.userData.first_name ? this.state.userData.first_name : 'error' }
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