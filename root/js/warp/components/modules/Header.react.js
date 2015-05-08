var React = require('react');
var MainStore = require('../../store/MainStore');
var mainActions = require('../../actions/mainActions');
var AuthForm = require('../modules/AuthForm.react');
var TopMenu = require('../modules/TopMenu.react');
function getState() {
    return {
        userData        : MainStore.getUserData(),
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
							<a className="web_logo_a" href="/home"><div className="web_logo">Company</div></a>
						</div>
                        <div className="head_col">
                            <TopMenu />
                        </div>
						<div className="head_col">
							<div >
								<div className="sign_btn" onClick={ this.state.authorized ? this.signout : this.showAuthForm } >{ this.state.authorized ? 'выйти' : 'авторизация' }</div>
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
