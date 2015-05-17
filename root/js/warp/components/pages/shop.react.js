var React = require('react');
var shopStore = require('../../store/ShopStore');
var shopActions = require('../../actions/ShopActions');
var Utils = require('../../utils/Utils');
var _ = require('underscore');

function getShopState() {
    return {
        categories : shopStore.getCategories(),
        items: shopStore.getItems(),
        viewType: 2,
        fCategory: false,
        windowItem: {}
    };
}

var Shop = React.createClass({
    // Get initial state from stores
    getInitialState: function() {
        return getShopState();
    },

    toggleViewType: function() {
    	this.setState({ viewType: this.state.viewType == 1 ? 2 : 1 });
    },
    catChanged: function(e) {
    	this.setState({ fCategory: e.target.value == 0 ? false : e.target.value });
    },
    showItemWindow: function(id) {
    	this.setState({ windowItem : this.state.items[id] });
    },
    closeItemWindow: function() {
    	this.setState({ windowItem : {} });
    },
    cap: function(e) {
    	e.preventDefault();
    	e.stopPropagation();
    },
    addToShopCart: function(item_id, type, e){
    	var qty = 1;
    	if( type == 'win'){
    		qty = React.findDOMNode(this.refs.win_item).value;
    	}
    	else {
    		qty = React.findDOMNode(this.refs['item_'+item_id]).value;
    	}
    	if(parseInt(qty)){
    		shopActions.addToShopCart({ item_id: item_id, qty: qty });
    	}
    	else{
    		alert('Количество должно быть числом!')
    	}
    	e.stopPropagation();
    },
    // Render our child components, passing state via props
    render: function() {
    	var printCategory = function(cat, index){
    		return(
    			<option key={index} value={cat.id} >{cat.name}</option>
    		)
    	}.bind(this);

    	var printItem = function(item, index){
    		if (this.state.fCategory && item.category_id != this.state.fCategory){
    			return(
    				<span key={index}></span>
    			);
    		}
    		else{
    			return(
    				<li key={index} onClick={ this.showItemWindow.bind(null, index) } >
            	    	<div className="img"><img src={ item.img ? item.img :  '/img/no_img.png' } /></div>
            	    	<h3 className="title">{ item.name }</h3>
            	    	<div className="category">категория: <span className="right">{ item.category_name }</span></div>
            	    	<div className="price">цена: <span className="right"><b>{ item.price }</b> <i>р. за { item.unit_name }</i></span></div>
            	    	<div className="nav">
            	    		<input type="text" ref={ 'item_'+item.id } defaultValue="1" /><button onClick={this.addToShopCart.bind(null, item.id, 'list')}>В корзину</button>
            	    	</div>
    				</li>
    			);
    		}
    	}.bind(this);

        return (
        	<div className="page-content">
            	<div className="page-data page-shop">
            		{ !_.isEmpty(this.state.windowItem) ? 
            			(
            				<div className="window" onClick={this.closeItemWindow} >
            					<div className="window-content item-window" onClick={this.cap}>
            						<div className="header">
            							<h1>Информация о товаре</h1>
            							<div className="close" onClick={this.closeItemWindow} ><i className="fa fa-times"></i></div>
            						</div>
            						<div className="content">
            							<div className="left-col">
            								<img src={ this.state.windowItem.img ? this.state.windowItem.img :  '/img/no_img.png' } />
            							</div>
            							<div className="right-col">
            								<h2>{ this.state.windowItem.name }</h2>
            								<div>Категория: { this.state.windowItem.category_name }</div>
            								<div className="description">{ this.state.windowItem.description }</div>
            								<div className="price">цена: <span className="right"><b>{ this.state.windowItem.price }</b> <i>р. за { this.state.windowItem.unit_name }</i></span></div>
            	    						<div className="nav">
            	    							<input type="text" ref="win_item" defaultValue="1" /><button onClick={this.addToShopCart.bind(null, this.state.windowItem.id, 'win')}>В корзину</button>
            	    						</div>
            							</div>
            						</div>
            					</div>
            				</div>
            			) : null
       				}
            	    <div className="page-menu">
            	        <ul>
            	            <li>
            	            	<span>Категория: </span>
								<select className={ this.state.fCategory ? 'active' : null } onChange={ this.catChanged } >
								  	<option value="0" className="default">Не выбрана</option>
								  	{ this.state.categories.length > 0 ? this.state.categories.map(printCategory) : null }
								</select>
            	            </li>
            	        </ul>
            	        <ul className="menu-right">
            	        	<li>
            	        		<span>Отображение: </span>
            	        		<span className={ this.state.viewType == 1 ? 'active' : null } onClick={this.toggleViewType} title="список"><i className="fa fa-th-list"></i> </span>
            	        		<span className={ this.state.viewType == 2 ? 'active' : null } onClick={this.toggleViewType} title="блоки"><i className="fa fa-th"></i></span>
            	        	</li>
            	        </ul>
            	    </div>
            		<div className="workarea">
            			<h1>Товары</h1>
            			<div className="content shop">
            				<ul className={ this.state.viewType == 1 ? 'items-list' : 'items-grid' }>
            					{ this.state.items.length > 0 ? this.state.items.map(printItem) : null  }
            				</ul>
            			</div>
            		</div>
            		<ShopCart />
            	</div>
            </div>
        );
    },

    // Add change listeners to stores
    componentDidMount: function() {
        shopActions.loadShop();
    	shopStore.addChangeShopListener(this._onChange);
    },

    // Remove change listers from stores
    componentWillUnmount: function() {
    	shopStore.removeChangeShopListener(this._onChange);
    },

    // Method to setState based upon Store changes
    _onChange: function() {
    	this.setState(getShopState());
    }
});

function getShopCartState() {
    return {
        items : shopStore.getShopCart()
    };
}

var ShopCart = React.createClass({
	getInitialState: function(){
		return getShopCartState();
	},

	toggleShow: function() {
		this.setState({ showFull: this.state.showFull ? false : true });
	},

	editShopCart: function(item_id){

	},

	render: function() {
		var printItem = function(item, index){
			return(
				<tr key={index}>
					<td className="remove"><div title="Удалить" ><i className="fa fa-times"></i></div></td>
					<td className="img"><img src={ item.img ? item.img :  '/img/no_img.png' } /></td>
					<td>{ item.name }</td>
					<td>категория: { item.category_name }</td>
					<td className="qty"><input defaultValue={ item.value } /> { item.unit_name }</td>
					<td>{ item.value*item.price }</td>
					<td className="change"><button onClick={this.editShopCart.bind(null, item.id)}>Изменить</button></td>
				</tr>
			)
		}.bind(this)

		return(
			<div className="shopcart-preview">
				<div className="label" onClick={this.toggleShow} >
					<div className="icon"><i className={ this.state.showFull ? 'fa fa-chevron-down' : 'fa fa-chevron-up' }></i></div>
					<div className="icon-text">Моя корзина</div>
				</div>
				{ this.state.showFull ? 
					(
						<div className="preview-content">
							<h1>Моя корзина</h1>
							<div>
								<table cellSpacing="0" cellPadding="0">
									<tr>
										<th></th>
										<th></th>
										<th>Наименование</th>
										<th>Категория</th>
										<th>Количество</th>
										<th>Цена</th>
										<th></th>
									</tr>
									{ this.state.items.length > 0 ? this.state.items.map(printItem) : null }
								</table>
							</div>
						</div>
					) : null
				}
			</div>
		)
	},

    // Add change listeners to stores
    componentDidMount: function() {
        shopActions.loadShopCart();
    	shopStore.addChangeShopCartListener(this._onChange);
    },

    // Remove change listers from stores
    componentWillUnmount: function() {
    	shopStore.removeChangeShopCartListener(this._onChange);
    },

    // Method to setState based upon Store changes
    _onChange: function() {
    	this.setState(getShopCartState());
    }
})

module.exports = Shop;