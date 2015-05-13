var React = require('react');
var ManagerStore = require('../../../store/ManagerStore');
var managerActions = require('../../../actions/ManagerActions');
var _ = require('underscore');

function getAdminCompaniesModuleState() {
    return {
        companyInfo: ManagerStore.getCompanyData()
    };
}

var ManagerCompanyInfoModule = React.createClass({
    // Get initial state from stores
    getInitialState: function() {
        return getAdminCompaniesModuleState();
    },
    // Render our child components, passing state via props
    render: function() {
        return (
            <div>
                <div className="page-menu">
                    <ul>
                        <li className="active">Информация о компании</li>
                    </ul>
                 </div>
                 <div className="workarea">
                 	<div>Номер компании</div>
                 	<div>{ this.state.companyInfo.id }</div> 
                 	<div>Название компании</div>
                 	<div>{ this.state.companyInfo.name }</div> 
                 	<div>Описание компании</div>
                 	<div>{ this.state.companyInfo.description }</div> 
                 	<div>Телефон компании</div>
                 	<div>{ this.state.companyInfo.phone }</div> 
                 	<div>Регистрационный ключ</div>
                 	<div>{ this.state.companyInfo.reg_key }</div> 
                 	<div>Дата регистрации на сайте</div>
                 	<div>{ this.state.companyInfo.created_on }</div> 
                 </div>
            </div>
        );
    },

    componentDidMount: function(){
        managerActions.getCompanyInfo(this.props.user.user_id);
        ManagerStore.addChangeAllListener(this._onChange);
    },
    // Remove change listers from stores
    componentWillUnmount: function() {
        ManagerStore.removeChangeAllListener(this._onChange);
    },

    // Method to setState based upon Store changes
    _onChange: function() {
        this.setState(getAdminCompaniesModuleState());
    }
});

module.exports = ManagerCompanyInfoModule;