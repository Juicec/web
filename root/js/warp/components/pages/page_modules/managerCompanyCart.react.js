var React = require('react');
var ManagerStore = require('../../../store/ManagerStore');
var MainStore = require('../../../store/MainStore');
var managerActions = require('../../../actions/ManagerActions');
var _ = require('underscore');

function getManagerCompanyCartModuleState(){
	return{
		totalCart: ManagerStore.totalCart(),
		totalPrice: 0,
		companyInfo: ManagerStore.getCompanyData(),
		departments: ManagerStore.getDepartments()
	};
}

var ManagerCompanyCart = React.createClass({
	getInitialState: function(){
		return getManagerCompanyCartModuleState();
	},
	toggleSaleClosed: function(){
		managerActions.toggleSaleClosed(this.state.companyInfo.id);
	},
	render: function(){
		var departments = function(department, index){
			return(
				<Department department={ department } key={ index } company_id={ this.props.user.company_id }/>
			);
		}.bind(this);

        var totalCartUsersNode =  function(item, index) {
            return (
                <TotalCartUsersNodes key={ index + 1 } item={ item }/>
            );
        };

        if(this.state.totalPrice == 0){
	        for(var key in this.state.totalCart){
	        	this.state.totalPrice += this.state.totalCart[key].value*this.state.totalCart[key].price;
	        }
	    }

		return(
			<div>
				<div className="page-menu">
                    <ul>
                        <li className="active">Корзина компании</li>
                    </ul>
                </div>
                <div className="workarea manager-company-cart">
                	{ this.state.departments.length > 0 ? this.state.departments.map(departments) : null }
                    <div className="summary-manager-company-cart">
                    	<table className="head-table">
                    		<tr>
                    			<th>Итого на компанию: { MainStore.convertIntToCurrency(this.state.totalPrice) } РУБ</th>
                    			<th>{ this.state.companyInfo.sale_closed == "0" ? <button onClick={ this.toggleSaleClosed }>Закрыть заказы</button> : <button onClick={ this.toggleSaleClosed }>Открыть заказы</button> }</th>
                    		</tr>
                    	</table>	
                    	<table className="single-user-cart">
							<tr>
								<th>Номер</th><th>Изображение</th><th>Название</th><th>Категория</th><th>Цена</th><th>Кол-во</th><th>Сумма</th>
							</tr>
							{ this.state.totalCart.length > 0 ? this.state.totalCart.map(totalCartUsersNode) : null }

						</table>
                    </div>
                </div>
			</div>
		);
	},
	componentDidMount: function(){
        managerActions.getTotalCart(this.props.user.company_id);
        managerActions.getCompanyInfo(this.props.user.user_id);
        managerActions.getDepartmentsIds(this.props.user.company_id);
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

function getDepartmentState(dep_id){
	return{
		cartUsers: ManagerStore.cartUsers(dep_id)
	};
}


var Department  =React.createClass({
	getInitialState: function(){
		return getDepartmentState(this.props.department.dep_id);
	},
	render: function(){
		var cartUsersNode =  function(user, index) {
            return (
                <CartUsersNodes user={ user } key={ index + 1 } company_id={ this.props.company_id } />
            );
        }.bind(this);
		return(
			<div>
				{ this.state.cartUsers.length > 0 ? <div><h1>{ this.props.department.name }</h1> { this.state.cartUsers.map(cartUsersNode) }</div> : null }		
			</div>
		);
	},
	componentDidMount: function(){
        managerActions.getCartUsers(this.props.company_id, this.props.department.dep_id);
        ManagerStore.addChangeAllListener(this._onChange);
    },
    // Remove change listers from stores
    componentWillUnmount: function() {
        ManagerStore.removeChangeAllListener(this._onChange);
    },

    // Method to setState based upon Store changes
    _onChange: function() {
        this.setState(getDepartmentState(this.props.department.dep_id));
    }
});

var TotalCartUsersNodes = React.createClass({
	getInitialState: function(){
		return {
			zoomImage: false
		};
	},
	toggleZoomImage: function(){
		this.setState({ zoomImage : this.state.zoomImage ? false : true });
	},
	render: function(){
		var item = this.props.item;
		return (
			<tr key={ this.props.key }>
				<td>{ item.item_id }</td>
				<td><ZoomImage onZoom={ this.toggleZoomImage } img={ item.img }  classNameProp = { this.state.zoomImage ? "pop-up-image in" : "pop-up-image" }/><img src={ item.img } /></td>
				<td>{ item.name }</td>
				<td>{ item.cat_name }</td>
				<td>{ MainStore.convertIntToCurrency(item.price) } руб/{ item.short_name }</td>
				<td>{ MainStore.convertIntToCurrency(item.value) }</td>
				<td>{ MainStore.convertIntToCurrency(item.value * item.price) } руб</td>
			</tr>
		);
	}
});

var ZoomImage = React.createClass({
	render: function(){
		return(
			<div>
				<div className={ this.props.classNameProp == "pop-up-image in" ? "black-flow zoom-in" : "black-flow zoom-out"}></div>
				<div className={ this.props.classNameProp }>
					<div className="close-pop-up-image" onClick={ this.props.onZoom }>
						<i className="fa fa-times"></i>
					</div>
					<img src={ this.props.img } onClick={this.nothing} />
				</div>
			</div>
		);
	}
});

function getCartUsersNodes(user_id){
	return{
		userCart: ManagerStore.userCart(user_id),
		totalCost: 0,
		cartShow: false
	};
}

var CartUsersNodes = React.createClass({
	getInitialState: function(){
		return getCartUsersNodes(this.props.user.id);
	},
	toggleCartShow: function(){
		this.setState({ cartShow : this.state.cartShow ? false : true});
	},
	render: function(){
		if(this.state.totalCost == 0){
			for(var key in this.state.userCart){
	        	this.state.totalCost += this.state.userCart[key].value*this.state.userCart[key].price;
	        }
	    }

		var itemsNode =  function(item, index) {
				return (
                	<ItemNodes item={ item } key={ index + 1 } user={ this.props.user }/>
            	);
        }.bind(this);
		return(
			<div key={ this.props.key } className="cart-users">
				<table className="head-table">
					<tr>
						<td>{ this.props.user.first_name }</td>
						<td>{ this.props.user.last_name }</td>
						<td>{ this.props.user.email }</td>
						<td>{ this.props.user.phone }</td>
						<td>Итого: { MainStore.convertIntToCurrency(this.state.totalCost) } РУБ</td>
					</tr>
				</table>
				<div className="toggle-user-cart" onClick={ this.toggleCartShow }><i className={ this.state.cartShow ? "fa fa-caret-down inverse" : "fa fa-caret-down" }></i></div>
				<div className={ this.state.cartShow ? "single-user-cart show" : "single-user-cart" }>
					<table>
						<tr>
							<th>Номер</th><th>Изображение</th><th>Название</th><th>Категория</th><th>Цена</th><th>Кол-во</th><th>Сумма</th>
						</tr>
						{ this.state.userCart.length > 0 ? this.state.userCart.map(itemsNode) : null }
					</table>	
				</div>	
			</div>
		);
	},
	componentDidMount: function(){
        managerActions.getUserCart(this.props.company_id, this.props.user.user_id);
        ManagerStore.addChangeAllListener(this._onChange);
    },
    // Remove change listers from stores
    componentWillUnmount: function() {
        ManagerStore.removeChangeAllListener(this._onChange);
    },

    // Method to setState based upon Store changes
    _onChange: function() {
        this.setState(getCartUsersNodes(this.props.user.user_id));
    }
});

var ItemNodes = React.createClass({
	getInitialState: function(){
		return {
			zoomImage: false
		};
	},
	toggleZoomImage: function(){
		this.setState({ zoomImage : this.state.zoomImage ? false : true });
	},
	render: function(){
		var item = this.props.item;
		return(
			<tr key={ this.props.key }>
				<td>{ item.item_id }</td>
				<td><ZoomImage onZoom={ this.toggleZoomImage } img={ item.img }  classNameProp = { this.state.zoomImage ? "pop-up-image in" : "pop-up-image" }/><img  src={ item.img } /></td>
				<td>{ item.name }</td>
				<td>{ item.cat_name }</td>
				<td>{ MainStore.convertIntToCurrency(item.price) } руб/{ item.short_name }</td>
				<td>{ MainStore.convertIntToCurrency(item.value) }</td>
				<td>{ MainStore.convertIntToCurrency(item.value * item.price) } руб</td>
			</tr>		
		);
	}
});

module.exports = ManagerCompanyCart;