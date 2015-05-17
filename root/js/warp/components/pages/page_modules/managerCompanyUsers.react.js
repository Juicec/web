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
                            <th>Имя</th><th>Фамилия</th><th>E-mail</th><th>Телефон</th><th>Дата регистрации</th><th>Подтверждение</th><th>Удаление</th>
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

function getManagerUserNodesState() {
    return {
        deleteUser: false
    };
}

var UserNodes = React.createClass({
    getInitialState: function(){
        return getManagerUserNodesState();
    },
    confirmUser: function(){
        managerActions.confirm_user(this.props.user.email);
    },
    toggleDeleteUser: function(){
        this.setState({ deleteUser : this.state.deleteUser ? false : true });
    },
    render: function() {
        var user = this.props.user;
        return (
            <tr key={ this.props.key }>
                <td>{ user.first_name }</td>
                <td>{ user.last_name }</td>
                <td>{ user.email }</td>
                <td>{ user.phone }</td>
                <td>{ user.created_on }</td>
                <td className="tableCompanyPointer icon-td">{ user.confirmed == 0 ? <div onClick={ this.confirmUser }><i className="fa fa-check-square-o"></i></div> : "Подтвержден" }</td>
                <td className="tableCompanyPointer icon-td">{ this.state.deleteUser ? <DeleteUser onDeleteUser={ this.toggleDeleteUser } userEmail={ user.email }/> : null }{ user.confirmed == 0 ? <div onClick={ this.toggleDeleteUser }><i className="fa fa-ban"></i></div> : null }</td>
            </tr>
        );
    }
});


var DeleteUser = React.createClass({
    deleteUsers: function(){
        managerActions.deleteUser(this.props.userEmail);
        this.props.onDeleteUser();
    },
    render: function(){
        return (
            <div>
                <div className="black-flow" onClick={ this.props.onDeleteUser }></div>
                <div className="pop-up manager">
                    <div>Вы действительно хотите удалить пользователя? Удаление - необратимая операция!</div>
                    <button className="cancel" onClick={ this.props.onDeleteUser }>Отмена</button>
                    <button className="delete" onClick={ this.deleteUsers }>Удалить</button>
                </div>
            </div>
        );
    }
});

module.exports = ManagerCompanyUsersModule;