var React = require('react');
var ManagerStore = require('../../../store/ManagerStore');
var managerActions = require('../../../actions/ManagerActions');
var _ = require('underscore');

function getManagerCompanyCartModuleState(){
	return{
		cartUsers: ManagerStore.cartUsers(),
		totalCart: ManagerStore.totalCart()
	};
}

var ManagerCompanyCart = React.createClass({
	getInitialState: function(){
		return getManagerCompanyCartModuleState();
	},
	render: function(){
		var cartUsersNode =  function(user, index) {
            return (
                <CartUsersNodes user={ user } key={ index + 1 } company_id={ this.props.user.company_id }/>
            );
        }.bind(this);

        var totalCartUsersNode =  function(item, index) {
            return (
                <TotalCartUsersNodes key={ index + 1 } item={ item }/>
            );
        };

		return(
			<div>
				<div className="page-menu">
                    <ul>
                        <li className="active">Корзина компании</li>
                    </ul>
                </div>
                <div className="workarea manager-company-cart">
                    { this.state.cartUsers.length > 0 ? this.state.cartUsers.map(cartUsersNode) : null }
                    <div className="summary-manager-company-cart">
                    	<table>
                    		<tr>
                    			<th>Итого на компанию: </th>
                    		</tr>
                    	</table>	
                    	<table className="single-user-cart">
							<tr>
								<th>Номер</th><th>Изображение</th><th>Название</th><th>Описание</th><th>Цена</th><th>Кол-во</th><th>Сумма</th>
							</tr>
							{ this.state.totalCart.length > 0 ? this.state.totalCart.map(totalCartUsersNode) : null }
						</table>
                    </div>
                </div>
			</div>
		);
	},
	componentDidMount: function(){
        managerActions.getCartUsers(this.props.user.company_id);
        managerActions.getTotalCart(this.props.user.company_id);
        ManagerStore.addChangeAllListener(this._onChange);
    },
    // Remove change listers from stores
    componentWillUnmount: function() {
        ManagerStore.removeChangeAllListener(this._onChange);
    },

    // Method to setState based upon Store changes
    _onChange: function() {
        this.setState(getManagerCompanyCartModuleState());
    }
});


var TotalCartUsersNodes = React.createClass({
	render: function(){
		var item = this.props.item;
		return (
			<tr key={ this.props.key }>
				<td>{ item.item_id }</td>
				<td><img src={ item.img } /></td>
				<td>{ item.name }</td>
				<td>{ item.description }</td>
				<td>{ item.price } руб/{ item.short_name }</td>
				<td>{ item.value }</td>
				<td>{ item.value * item.price } руб</td>
			</tr>
		);
	}
});

function getCartUsersNodes(){
	return{
		cartUsers: ManagerStore.userCart()
	};
}

var CartUsersNodes = React.createClass({
	getInitialState: function(){
		return getCartUsersNodes();
	},
	render: function(){
		var itemsNode =  function(item, index) {
			if(item.owner==this.props.user.first_name){
				return (
                	<ItemNodes item={ item } key={ index + 1 } user={ this.props.user }/>
            	);
			}   
        }.bind(this);
		return(
			<div key={ this.props.key } className="cart-users">
				<table>
					<tr>
						<td>{ this.props.user.first_name }</td>
						<td>{ this.props.user.last_name }</td>
						<td>{ this.props.user.email }</td>
						<td>{ this.props.user.phone }</td>
					</tr>
				</table>
				<table className="single-user-cart">
					<tr>
						<th>Номер</th><th>Изображение</th><th>Название</th><th>Описание</th><th>Цена</th><th>Кол-во</th><th>Сумма</th>
					</tr>
					{ this.state.cartUsers.length > 0 ? this.state.cartUsers.map(itemsNode) : null }
				</table>		
			</div>
		);
	},
	componentDidMount: function(){
        managerActions.getUserCart(this.props.company_id);
        ManagerStore.addChangeAllListener(this._onChange);
    },
    // Remove change listers from stores
    componentWillUnmount: function() {
        ManagerStore.removeChangeAllListener(this._onChange);
    },

    // Method to setState based upon Store changes
    _onChange: function() {
        this.setState(getCartUsersNodes(this.props.user.id));
    }
});

var ItemNodes = React.createClass({
	render: function(){
		var item = this.props.item;
		return(
			<tr key={ this.props.key }>
				<td>{ item.item_id }</td>
				<td><img src={ item.img } /></td>
				<td>{ item.name }</td>
				<td>{ item.description }</td>
				<td>{ item.price } руб/{ item.short_name }</td>
				<td>{ item.value }</td>
				<td>{ item.value * item.price } руб</td>
			</tr>		
		);
	}
});

module.exports = ManagerCompanyCart;