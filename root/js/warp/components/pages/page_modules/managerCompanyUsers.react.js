var React = require('react');
var ManagerStore = require('../../../store/ManagerStore');
var managerActions = require('../../../actions/ManagerActions');
var _ = require('underscore');

function getManagerCompanyUsersModuleState() {
    return {
        companyUsers: ManagerStore.getCompanyUsers()
    };
}

var ManagerCompanyUsersModule = React.createClass({
    // Get initial state from stores
    getInitialState: function() {
        return getManagerCompanyUsersModuleState();
    },
    // Render our child components, passing state via props
    render: function() {
        console.log(this.state.companyUsers);
        var usersNodes = function(user, index) {
            return (
                <UserNodes user={ user } key={ index + 1 }/>
            );
        };
        return (
            <div>
                <div className="page-menu">
                    <ul>
                        <li className="active">Пользователи компании</li>
                    </ul>
                 </div>
                 <div className="workarea">
                    <table>
                        <tr>
                            <th>Имя</th><th>Фамилия</th><th>E-mail</th><th>Телефон</th><th>Дата регистрации</th>
                        </tr>
                        { this.state.companyUsers.length > 0 ? this.state.companyUsers.map(usersNodes) : null }
                    </table>    
                 </div>
            </div>
        );
    },

    componentDidMount: function(){
        managerActions.getCompanyUsers(this.props.user.user_id);
        ManagerStore.addChangeAllListener(this._onChange);
    },
    // Remove change listers from stores
    componentWillUnmount: function() {
        ManagerStore.removeChangeAllListener(this._onChange);
    },

    // Method to setState based upon Store changes
    _onChange: function() {
        this.setState(getManagerCompanyUsersModuleState());
    }
});

var UserNodes = React.createClass({
    render: function() {
        var user = this.props.user;
        return (
            <tr key={ this.props.key }>
                <td>{ user.first_name }</td>
                <td>{ user.last_name }</td>
                <td>{ user.email }</td>
                <td>{ user.phone }</td>
                <td>{ user.created_on }</td>
            </tr>
        );
    }
});

module.exports = ManagerCompanyUsersModule;