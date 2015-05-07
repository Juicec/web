var React = require('react');
var MainStore = require('../../store/MainStore');

function getState() {
    return {
        userData        : MainStore.getUserData()
    };
}

var TopMenu = React.createClass({
	getInitialState: function() {
        return getState();
    },
	render: function() {
		return(
				<ul>
					{this.state.userData.role_id == 3 ? <li><a href="/admin">Админ панель</a></li> : null}
				</ul>
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

module.exports = TopMenu;