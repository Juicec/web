var React = require('react');
var shopStore = require('../../store/ShopStore');
var shopActions = require('../../actions/ShopActions');
var Utils = require('../../utils/Utils');

function getShopState() {
    return {
        categories : shopStore.getCategories(),
        items: shopStore.getItems(),
        viewType: 2,
        fCategory: false,
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
    				<li key={index}>
            	    	<div className="img"><img src={ item.img ? item.img :  '/img/no_img.png' } /></div>
            	    	<h3 className="title">{ item.name }</h3>
            	    	<div className="category">категория: <span className="right">{ item.category_name }</span></div>
            	    	<div className="price">цена: <span className="right"><b>{ item.price }</b> <i>р. за { item.unit_name }</i></span></div>
            	    	<div className="nav">
            	    		<input type="text" defaultValue="1" /><button onClick={this.addToShopCart}>В корзину</button>
            	    	</div>
    				</li>
    			);
    		}
    	}.bind(this);

        return (
        	<div className="page-content">
            	<div className="page-data page-shop">
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

module.exports = Shop;