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
    render: function(){  
        var companiesNodes = function(company, index) {
            return (
                <CompaniesNodes company={ company } key={ index } />
            );
        }; 
        return (
            <table>
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
})

module.exports = AdminCompaniesModule;