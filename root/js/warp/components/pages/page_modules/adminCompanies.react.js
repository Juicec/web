var React = require('react');
var CompanyStore = require('../../../store/CompanyStore');
var companyActions = require('../../../actions/CompanyActions');

function getAdminCompaniesModuleState() {
    return {
        workarea : 'companiesList'
    };
}

var AdminCompaniesModule = React.createClass({
    // Get initial state from stores
    getInitialState: function() {
        return getAdminCompaniesModuleState();
    },
    addCompany: function(){
        this.setState({
            workarea: 'addNewCompany'
        })
    },
    // Render our child components, passing state via props
    render: function() {
        return (
            <div>
                <div className="page-menu">
                    <ul>
                        <li className="active" onClick={this.addCompany}>Добавить</li>
                    </ul>
                 </div>
                 <div className="workarea">
                     {this.state.workarea == 'companiesList' ? <CompaniesList /> : null}
                     {this.state.workarea == 'addNewCompany' ? <AddNewCompany /> : null}
                 </div>
            </div>
        );
    },
    // Add change listeners to stores
    componentDidMount: function() {
        companyActions.getCompaniesList();
        CompanyStore.addChangeAllListener(this._onChange);

    },

    // Remove change listers from stores
    componentWillUnmount: function() {
        CompanyStore.removeChangeAllListener(this._onChange);
    },

    // Method to setState based upon Store changes
    _onChange: function() {
        this.setState(getAdminCompaniesModuleState());
    }
});

function getCompaniesListState() {
    return {
        companiesData: CompanyStore.getCompaniesData()
    };
}

var CompaniesList = React.createClass({ 
    getInitialState: function() {
        return getCompaniesListState();
    },
    render: function(){  
        var companiesNodes = function(company, index) {
            return (
                <CompaniesNodes company={ company } key={ index + 1 } />
            );
        }; 
        return (
            <table>
                <tr key='0'>
                    <th>№</th><th>Название компании</th><th>Описание компании</th><th>Регистарционный ключ</th>
                </tr>
                { this.state.companiesData.length > 0 ? this.state.companiesData.map(companiesNodes) : null }
            </table>
        );
    },
    // Add change listeners to stores
    componentDidMount: function() {
        companyActions.getCompaniesList();
        CompanyStore.addChangeAllListener(this._onChange);
    },

    // Remove change listers from stores
    componentWillUnmount: function() {
        CompanyStore.removeChangeAllListener(this._onChange);
    },

    // Method to setState based upon Store changes
    _onChange: function() {
        this.setState(getCompaniesListState());
    }
});

var CompaniesNodes = React.createClass({
    render: function() {
        var company = this.props.company;

        return (
            <tr key={ this.props.key }>
                <td>{ company.id }</td><td>{ company.name }</td><td>{ company.description }</td><td>{ company.reg_key }</td>
            </tr>
        );
    }
});

function getAddNewCompanyState() {
    return {
        sameNameError : false
    };
}

var AddNewCompany = React.createClass({
    getInitialState: function(){
        return getAddNewCompanyState();
    },
    closeCreation: function(){
        companyActions.closeCreation();
    },
    addNewCompany: function(){
        var newCompanyData = {
            "name":React.findDOMNode(this.refs.companyName).value,
            "description": React.findDOMNode(this.refs.companyDescription).value
        };
        companyActions.addCompany(newCompanyData);
    },
    render: function(){
        return(
            <div className="add-new-company-div">
                <span>Введите название компании:</span>
                <input type="text" ref="companyName"/>

                <span>Введите описание компании</span>
                <textarea ref="companyDescription"></textarea>
                {this.state.sameNameError == true ? <span>Компания с таким именем уже существует</span>:null}
                <div className="add-new-company-confirm">
                    <span onClick={this.addNewCompany}>Сохранить</span> <span onClick={this.closeCreation}>Отмена</span> 
                </div>
            </div>
        );
    },
    componentDidMount: function() {
        CompanyStore.addSameNameErrorListener(this.onSameNameError);
    },

    // Remove change listers from stores
    componentWillUnmount: function() {
        CompanyStore.removeSameNameErrorListener(this.onSameNameError);
    },

    // Method to setState based upon Store changes
    onSameNameError: function() {
        this.setState({
            sameNameError : true
        });
    }
});

module.exports = AdminCompaniesModule;