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
                    {this.state.userData.role_id >=2 ? <li><a href="/shop">главная</a></li> : null}
                    {this.state.userData.role_id >=2 ? <li><a href="/shop">магазин</a></li> : null}
					{this.state.userData.role_id >=2 ? <li><a href="/admin">панель администратора</a></li> : null}
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