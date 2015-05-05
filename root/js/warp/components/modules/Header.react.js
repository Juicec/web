var React = require('react');
var MainStore = require('../../store/MainStore');
var mainActions = require('../../actions/mainActions');
var AuthForm = require('../modules/AuthForm.react');
function getState() {
    return {
        userData        : MainStore.getUserData(),
        showAuthForm    : false,
        authorized      : MainStore.getAuthFlag()
    };
}
var Header = React.createClass({
	getInitialState: function() {
        return getState();
    },
    showAuthForm: function(e){
        this.setState({ showAuthForm : true });
    },
    signout: function(){
        mainActions.signout();
    },
	render: function() {
		return(
				<div id="header">
					<div id="head_menu">
						<div className="head_col">
							<div className="web_logo">tasks book</div>
						</div>
						<div className="head_col">
							<div >
								<div className="sign_btn" onClick={ this.state.authorized ? this.signout : this.showAuthForm } > { this.state.authorized ? 'SignOut' : 'SignIn' } </div>
								<div className="sign_block">
									{ this.state.showAuthForm ? <AuthForm /> : null }
								</div>
							</div>
						</div>
					</div>
				</div>	
		)
	},
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

module.exports = Header;
