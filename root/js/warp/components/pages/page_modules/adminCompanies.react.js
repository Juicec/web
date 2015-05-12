var React = require('react');
var CompanyStore = require('../../../store/CompanyStore');
var companyActions = require('../../../actions/CompanyActions');
var _ = require('underscore');

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
    showCompanies: function(){
        this.setState({
            workarea : 'companiesList'
        });
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
                    {this.state.workarea == 'addNewCompany' ? <AddNewCompany onAdd={ this.showCompanies }/> : null}
                    <CompaniesList />
                 </div>
            </div>
        );
    },

    componentDidMount: function(){
        companyActions.getCompaniesList();
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
                <CompaniesNodes company={ company } key={ index + 1 }/>
            );
        };
        return (
            <table cellSpacing="0" cellPadding="0">
                <tr key='0'>
                    <th>№</th><th>Название компании</th><th>Описание компании</th><th>Телефон</th><th>Регистарционный ключ</th><th>E-mail администратора</th><th>Измение</th><th>Удаление</th>
                </tr>
                { this.state.companiesData.length > 0 ? this.state.companiesData.map(companiesNodes) : null }
            </table>
        );
    },
    // Add change listeners to stores //Нужны!!
    componentDidMount: function() {
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
        deleteCompany: false,
        manager: false
    };
}

var CompaniesNodes = React.createClass({
    getInitialState: function(){
        return getCompaniesNodesState();
    },
    toggleDeleteWindow: function() {
        this.setState({ deleteCompany : this.state.deleteCompany ? false : true });
    },
    toggleEditWindow: function(){
        this.setState({ edit : this.state.edit ? false : true });
    },
    toggleManagerWindow: function(){
        this.setState({ manager : this.state.manager ? false : true });
    },
    render: function() {
        var company = this.props.company;
        return (
            <tr key={ this.props.key } >
                <td>{ company.id }</td>
                <td>{ company.name }</td>
                <td>{ company.description }</td>
                <td>{ company.phone }</td>
                <td>{ company.reg_key }</td>
                <td className="tableCompanyPointer" >{ this.state.manager ? <ManagerWindow data={ company } onManager={ this.toggleManagerWindow }/> : null}<div className="manager-span" onClick={ this.toggleManagerWindow } >{ _.isEmpty(company.manager_email) ? 'Добавить' : company.manager_email }</div></td>
                <td className="tableCompanyPointer icon-td" onClick={ this.toggleEditWindow }>{ this.state.edit ? <EditWindow data={ company } onEdit={ this.toggleEditWindow }/> : null}<span><i className="fa fa-pencil-square-o"></i></span></td>
                <td className="tableCompanyPointer icon-td" onClick={this.toggleDeleteWindow}>{ this.state.deleteCompany ? <DeleteWindow data={ company } onDelete={ this.toggleDeleteWindow } /> : null}<span><i className="fa fa-times"></i></span></td>
            </tr>
        );
    }
});

function getAddNewCompanyState() {
    return {
        sameNameError : CompanyStore.getSameNameError(),
        chooseUser: false
    };
}

var AddNewCompany = React.createClass({
    getInitialState: function(){
        return getAddNewCompanyState();
    },
    closeCreation: function(){
        this.props.onAdd();
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
                    <button onClick={this.addNewCompany}>Сохранить</button><button onClick={this.closeCreation}>Отмена</button> 
                </div>
            </div>
        );
    },
    componentDidMount: function() { //Нужны!!!
        CompanyStore.addSameNameErrorListener(this.onSameNameError);
    },

    // Remove change listers from stores
    componentWillUnmount: function() {
        CompanyStore.removeSameNameErrorListener(this.onSameNameError);
    },

    // Method to setState based upon Store changes
    onSameNameError: function() {
        var temp = getAddNewCompanyState();
        if(temp.sameNameError)
            this.setState(temp);
        else
            this.props.onAdd();
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
        this.props.onEdit();
    },
    editThisCompany: function(){
        var newData = {
            "name" : this.state.nameInput,
            "description" : React.findDOMNode(this.refs.newCompanyDescription).value,
            "phone" : this.state.phoneInput,
            "id"    : this.props.data.id
        }
        companyActions.edit(newData);
        this.props.onEdit();
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
                <div className="pop-up company">
                    <div className="note">Название фирмы:</div>
                    <input type="text" ref="newCompanyName" defaultValue={this.state.nameInput} onChange={this.nameChange}/>

                    <div className="note">Описание:</div>
                    <textarea ref="newCompanyDescription" defaultValue={ this.props.data.description } ></textarea>

                    <div className="note">Телефон:</div>
                    <input type="text" ref="newCompanyPhone" defaultValue={this.state.phoneInput} onChange={this.phoneChange}/>

                    <button className="cancel" onClick={this.closeEditWindow}>Отмена</button>
                    <button onClick={this.editThisCompany}>Сохранить</button>
                </div>
            </div>
        );
    }
});

var DeleteWindow = React.createClass({
    closeDeleteWindow: function(){
        this.props.onDelete();
        //companyActions.getInitial();
    },
    deleteThisCompany: function(){
        var delData = this.props.data;
        companyActions.deleteCompany(delData);
        this.props.onDelete();
    },
    render: function(){
        return(
            <div>
                <div className="black-flow" onClick={this.closeDeleteWindow}></div>
                <div className="pop-up company">
                    <div>Вы уверены, что хотите удалить компанию? Удаление - необратимая операция!</div> 
                    <button className="cancel" onClick={this.closeDeleteWindow}>Отмена</button> 
                    <button onClick={this.deleteThisCompany}>Удалить</button>
                </div>
            </div>
        );
    }
});


function getManagerWindowState() {
    return {
        users : CompanyStore.getSearchedUsers(),
        chooseInput: '',
        userData: {},
        changeUser: false
    };
}

var ManagerWindow = React.createClass({
    getInitialState: function(){

        return getManagerWindowState();
    },
    addNew: function(){
        var managerData = {
            "company_id": this.props.data.id,
            "email": this.state.chooseInput,
            "manager_fn": this.state.userData.fn,
            "manager_ln": this.state.userData.ln,
            "manager_phone": this.state.userData.phone
        };
        companyActions.setManager(managerData);
        this.props.onManager();
    },
    changeManager: function(){
         var managerData = {
            "company_id": this.props.data.id,
            "email": this.state.chooseInput,
            "manager_fn": this.state.userData.fn,
            "manager_ln": this.state.userData.ln,
            "manager_phone": this.state.userData.phone,
            "old_email": this.props.data.manager_email
        };
        companyActions.changeManager(managerData);
        this.props.onManager();
    },
    getUsers: function(e){
        if(_.isEmpty(e.target.value)){
            this.setState({
                users: {}
            });
        }else{
            companyActions.get_users(e.target.value);
        }
        this.setState({chooseInput: event.target.value});
    },
    closeManagerWindow: function(){
        this.props.onManager();
    },
    chooseUser: function(data){
        this.setState({
            chooseInput: data.email,
            userData: data,
            users: {}
        });
    },
    deleteManager: function(){
        var managerData = {
            "company_id": this.props.data.id,
            "old_email": this.props.data.manager_email
        };
        companyActions.deleteManager(managerData);
        this.props.onManager();
    },
    toggleChangeManager: function(){
        this.setState({ changeUser : this.state.changeUser ? false : true });
    },
    render: function(){
        var searchedUsers = function(user, index) {
            return (
                <SearchedUsers user={ user } key={ index } onChoose={ this.chooseUser }/>
            );
        }.bind(this);
        return(
            <div>
                <div className="black-flow" onClick={ this.closeManagerWindow }></div>
                <div className="pop-up company">
                { _.isEmpty(this.props.data.manager_fn) ? 
                    <div>
                        <div className="note">Введите email:</div>
                        <input type="text" onChange={ this.getUsers } value={ this.state.chooseInput }/>
                        <div className="search-results">{ this.state.users.length > 0 ? this.state.users.map(searchedUsers) : null }</div>
                        <button className="cancel" onClick= { this.closeManagerWindow }>Отмена</button>
                        <button onClick={ this.addNew }>Сохранить</button>  
                    </div>
                 :
                    <div>
                        <div className="note">Имя менеджера:</div>
                        <div>{ this.props.data.manager_fn }</div>
                        <div className="note">Фамилия менеджера:</div>
                        <div>{ this.props.data.manager_ln }</div>
                        <div className="note">Email менеджера:</div>
                        <div>{ this.props.data.manager_email }</div>
                        <div className="note">Телефон менеджера:</div>
                        <div>{ this.props.data.manager_phone }</div>
                        { this.state.changeUser ? 
                            <div>
                                <div className="note">Введите email:</div>
                                <input type="text" onChange={ this.getUsers } value={ this.state.chooseInput }/>
                                <div className="search-results">{ this.state.users.length > 0 ? this.state.users.map(searchedUsers) : null }</div>
                                <button onClick={ this.changeManager }>Сохранить</button>
                            </div>
                            :
                            null
                        }
                        <button className="cancel" onClick={ this.deleteManager }>Удалить</button>
                        <button onClick={ this.toggleChangeManager }>Изменить</button>
                        <button onClick={ this.closeManagerWindow }>Закрыть</button>
                    </div>  
                }      
                </div>
            </div>
        );
    },
    componentDidMount: function() {
        CompanyStore.addChangeAllListener(this._onChange);
        this.setState({
            users: {}
        });
    },

    // Remove change listers from stores
    componentWillUnmount: function() {
        CompanyStore.removeChangeAllListener(this._onChange);
    },

    // Method to setState based upon Store changes
    _onChange: function() {
        this.setState({
            users : CompanyStore.getSearchedUsers()
        });
    }
});

var SearchedUsers = React.createClass({
    click: function(e){
        this.props.onChoose(e.target.dataset);
    },
    render: function() {
        var user = this.props.user;
        return (
            <div key={ this.props.key } onClick={ this.click }>
                <span data-email={ user.email } data-fn={ user.first_name } data-ln={ user.last_name } data-phone={ user.phone }>{ user.email }</span>
            </div>
        );
    }
});


module.exports = AdminCompaniesModule;