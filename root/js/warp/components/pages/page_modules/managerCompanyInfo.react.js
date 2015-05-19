var React = require('react');
var ManagerStore = require('../../../store/ManagerStore');
var managerActions = require('../../../actions/ManagerActions');
var _ = require('underscore');

function getManagerCompaniesModuleState() {
    return {
        companyInfo: ManagerStore.getCompanyData()
    };
}

var ManagerCompanyInfoModule = React.createClass({
    // Get initial state from stores
    getInitialState: function() {
        return getManagerCompaniesModuleState();
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
                    <table className="company-info-table">
                        <tr>
                            <td>Номер компании</td><td>{ this.state.companyInfo.id }</td>
                        </tr>
                        <tr>
                            <td>Название компании</td><td>{ this.state.companyInfo.name }</td>
                        </tr>
                        <tr>
                            <td>Телефон компании</td><td>{ this.state.companyInfo.phone }</td>
                        </tr>
                        <tr>
                            <td>Регистрационный ключ</td><td>{ this.state.companyInfo.reg_key }</td>
                        </tr>
                        <tr>
                            <td>Дата регистрации на сайте</td><td>{ this.state.companyInfo.created_on }</td>
                        </tr>
                        <tr>
                            <td>Описание компании</td><td>{ this.state.companyInfo.description }</td>
                        </tr>
                        <tr>
                            <td>Статус заказов</td><td>{ this.state.companyInfo.sale_closed == 0 ? "Открыты" : "Закрыты" }</td>
                        </tr>
                    </table>
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
        this.setState(getManagerCompaniesModuleState());
    }
});

module.exports = ManagerCompanyInfoModule;