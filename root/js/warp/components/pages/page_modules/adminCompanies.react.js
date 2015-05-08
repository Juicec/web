var React = require('react');
var CompanyStore = require('../../../store/CompanyStore');
var companyActions = require('../../../actions/CompanyActions');

function getAdminCompaniesModuleState() {
    return {
    };
}

var AdminCompaniesModule = React.createClass({
    // Get initial state from stores
    getInitialState: function() {
        return getAdminCompaniesModuleState();
    },
    // Render our child components, passing state via props
    render: function() {
        return (
            	<div>
                    AdminCompaniesModule
                    <CompaniesList />
                </div>
        );
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
    getCompaniesList: function(){
        companyActions.getCompaniesList();
    },
    render: function(){  
        this.getCompaniesList();
        var companiesNodes = this.state.companiesData.map(function (company) {
          return (
            <tr>
                <td>company.id</td><td>company.name</td><td>company.description</td><td>company.reg_key</td>
            </tr>
          );
        }); 
        return (
            <table>
                {companiesNodes}
            </table>
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
        this.setState(getCompaniesListState());
    }
});

module.exports = AdminCompaniesModule;