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
            <table cellSpacing="0" cellPadding="0">
                <tr key='0'>
                    <th>№</th><th>Название компании</th><th>Описание компании</th><th>Телефон</th><th>Регистарционный ключ</th><th>Измение</th><th>Удаление</th>
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

function getCompaniesNodesState() {
    return {
        edit : false,
        deleteCompany: false
    };
}

var CompaniesNodes = React.createClass({
    getInitialState: function(){
        return getCompaniesNodesState();
    },
    editCompany: function(){
        this.setState({
            edit: true
        });
    },
    deleteThisCompany: function(){
        this.setState({
            deleteCompany: true
        });
    },
    render: function() {
        var company = this.props.company;
        return (
            <tr key={ this.props.key } >
                <td>{ company.id }</td><td>{ company.name }</td><td>{ company.description }</td><td>{company.phone}</td>
                <td>{ company.reg_key }</td><td>{this.state.edit ? <EditWindow data = {company} /> : null}<span className="tableCompanySpan" onClick={this.editCompany}>Изенить</span></td>
                <td>{this.state.deleteCompany ? <DeleteWindow data = {company} /> : null}<span className="tableCompanySpan" onClick={this.deleteThisCompany}>Удалить</span></td>
            </tr>
        );
    },
    // Add change listeners to stores
    componentDidMount: function() {
        CompanyStore.addChangeAllListener(this._onChange);
    },

    // Remove change listers from stores
    componentWillUnmount: function() {
        CompanyStore.removeChangeAllListener(this._onChange);
    },

    // Method to setState based upon Store changes
    _onChange: function() {
        this.setState(getCompaniesNodesState());
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
        companyActions.getInitial();
    },
    addNewCompany: function(){
        var newCompanyData = {
            "name":React.findDOMNode(this.refs.companyName).value,
            "description": React.findDOMNode(this.refs.companyDescription).value,
            "phone": React.findDOMNode(this.refs.companyPhone).value
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

                <span>Введите телефон компании:</span>
                <input type="text" ref="companyPhone"/>
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


var EditWindow = React.createClass({
    getInitialState: function(){
        return{
            nameInput: this.props.data.name,
            phoneInput: this.props.data.phone
        };
    },
    closeEditWindow: function(){
        companyActions.getInitial();
    },
    editThisCompany: function(){
        var newData = {
            "name" : this.state.nameInput,
            "description" : React.findDOMNode(this.refs.newCompanyDescription).value,
            "phone" : this.state.phoneInput,
            "id"    : this.props.data.id
        }
        companyActions.edit(newData);
    },
    nameChange: function(event) {
        this.setState({nameInput: event.target.value});
    },
    phoneChange: function(event) {
        this.setState({phoneInput: event.target.value});
    },
    render: function(){
        return(
            <div>
                <div className="black-flow" onClick={this.closeEditWindow}></div>
                <div className="pop-up-company">
                    <span>Название фирмы:</span>
                    <input type="text" ref="newCompanyName" value={this.state.nameInput} onChange={this.nameChange}/>

                    <span>Описание:</span>
                    <textarea ref="newCompanyDescription">{this.props.data.description}</textarea>

                    <span>Телефон:</span>
                    <input type="text" ref="newCompanyPhone" value={this.state.phoneInput} onChange={this.phoneChange}/>

                    <span onClick={this.editThisCompany}>Сохранить</span> <span onClick={this.closeEditWindow}>Отмена</span> 
                </div>
            </div>
        );
    },
    // Add change listeners to stores
    componentDidMount: function() {
        CompanyStore.addChangeAllListener(this._onChange);
    },

    // Remove change listers from stores
    componentWillUnmount: function() {
        CompanyStore.removeChangeAllListener(this._onChange);
    },

    // Method to setState based upon Store changes
    _onChange: function() {
        companyActions.getCompaniesList();
    }
});

var DeleteWindow = React.createClass({
    closeDeleteWindow: function(){
        companyActions.getInitial();
    },
    deleteThisCompany: function(){
        var delData = this.props.data;
        companyActions.deleteCompany(delData);
    },
    render: function(){
        return(
            <div>
                <div className="black-flow" onClick={this.closeDeleteWindow}></div>
                <div className="pop-up-company">
                    <div>Вы уверены, что хотите удалить компанию? Удаление - необратимая операция!</div> 
                    <span onClick={this.deleteThisCompany}>Удалить</span> <span onClick={this.closeDeleteWindow}>Отмена</span> 
                </div>
            </div>
        );
    }
});
module.exports = AdminCompaniesModule;