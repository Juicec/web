var React = require('react');
var ItemStore = require('../../../store/ItemsStore');
var itemActions = require('../../../actions/ItemsAction');
var Utils = require('../../../utils/Utils');

function getAdminItemsModuleState() {
    return {
        items : ItemStore.getItems(),
        showAddNewItem : false,
        showAddNewCategoty : false,
        pgType : false
    };
}

var AdminItemsModule = React.createClass({
    // Get initial state from stores
    getInitialState: function() {
        return getAdminItemsModuleState();
    },
    toggleSghowNewItem: function(type) {
        this.setState({ showAddNewItem: this.state.showAddNewItem ? false : true, showAddNewCategoty : false, pgType: this.state.showAddNewItem ?  false : 'item' });
    },
    toggleSghowNewCat: function(type) {
        this.setState({ showAddNewCategoty: this.state.showAddNewCategoty ? false : true, showAddNewItem : false, pgType: this.state.showAddNewCategoty ? false : 'cat' });
    },
    // Render our child components, passing state via props
    render: function() {
        var itemRow = function(item, index){
            return(
                <ItemRow key={index} item={item} />
            )
        }.bind(this);
        return (
            	<div>
                    <div className="page-menu">
                        <ul>
                            <li className={ this.state.pgType == 'item' ? 'active' : null } onClick={this.toggleSghowNewItem}>Добавить товар</li>
                            <li className={ this.state.pgType == 'cat' ? 'active' : null } onClick={this.toggleSghowNewCat}>Добавить категорию</li>
                        </ul>
                    </div>
                    <div className="workarea">
                        <div className={ this.state.showAddNewItem ? 'slider show h350' : 'slider hide' } >
                            <AddNewItem toggleShow={this.toggleSghowNewItem} />
                        </div>
                        <div className={ this.state.showAddNewCategoty ? 'slider show h350' : 'slider hide' } >
                            <AddNewCategory toggleShow={this.toggleSghowNewCat} />
                        </div>
                        <div>
                            <h1>Список товаров</h1>
                            <table cellSpacing="0" cellPadding="0">
                                <tr key='0'>
                                    <th>ID</th><th>Изображение</th><th>Наименование</th><th>Описание</th><th>Категория</th><th>Цена</th><th>Измение</th><th>Удаление</th>
                                </tr>
                                { this.state.items.length > 0 ? this.state.items.map(itemRow) : null }
                            </table>
                        </div>
                    </div>
                </div>
        );
    },

    // Add change listeners to stores
    componentDidMount: function() {
        itemActions.loadItems();
    	ItemStore.addChangeAdminItemsListener(this._onChange);
    },

    // Remove change listers from stores
    componentWillUnmount: function() {
    	ItemStore.removeChangeAdminItemsListener(this._onChange);
    },

    // Method to setState based upon Store changes
    _onChange: function() {
    	this.setState(getAdminItemsModuleState());
    }
});

var ItemRow = React.createClass({
    render: function() {
        var item = this.props.item;
        return(
            <tr key={ this.props.key } >
                <td>{ item.id }</td>
                <td className="img"><img src={ item.img ? item.img :  '/img/no_img.png' } /></td>
                <td>{ item.name }</td>
                <td>{ item.description }</td>
                <td>{ item.category_name }</td>
                <td><b>{ item.price }</b> <i>РУБ за { item.unit_name }</i></td>
                <td className="tableCompanyPointer icon-td"><div><i className="fa fa-pencil-square-o"></i></div></td>
                <td className="tableCompanyPointer icon-td"><div><i className="fa fa-times"></i></div></td>
            </tr>
        )
    }
});

var AddNewItem = React.createClass({
    getInitialState: function() {
        return{
            title: '',
            description: '',
            img: false,
            showACcat: false,
            showACunit: false,
            category: {
                id: false,
                name: ''
            },            
            unit: {
                id: false,
                name: ''
            },
            categories: [],
            units: [],
            price: 0
        }
    },

    changeTitle: function(e) {
        this.setState({ title: e.target.value });
    },

    changeDescription: function(e) {
        this.setState({ description: e.target.value });
    },

    changeImg: function(e){
        Utils.post({
            url : 'upload',
            data : { 'userfile' : e.target.files[0] },
            success: function(data){
                if(data.status_code == 0){
                    this.setState({ img: data.path });
                }
            }.bind(this)
        });
    },

    changePrice: function(e) {
        this.setState({ price: e.target.value });
    },

    getCategories: function(e) {
        this.setState({ showACcat: true, category: { name: e.target.value } });
        Utils.post({
            url : 'get_categories',
            data : { 'key' : e.target.value },
            success : function(data){
                if(data.status_code == 0){
                    this.setState({ categories: data.categories });
                }
            }.bind(this)
        })
    },    

    selectCategory: function(category){
        this.setState({ category: category, showACcat: false });
    },

    getUnit: function(e) {
        this.setState({ showACunit: true });
        Utils.post({
            url : 'get_units',
            success : function(data){
                if(data.status_code == 0){
                    this.setState({ units: data.units });
                }
            }.bind(this)
        })
    },

    selectUnit: function(unit){
        this.setState({ unit: unit, showACunit: false });
    },

    addNewItem: function(){
        this.state.error_title = null;
        this.state.error_desc = null;
        this.state.error_price = null;
        this.state.error_cat = null;
        this.state.error_unit = null;

        if (this.state.title == ''){
            this.setState({ error_title: true });
        }
        else if (this.state.description == ''){
            this.setState({ error_desc: true });
        }
        else if (this.state.price == 0){
            this.setState({ error_price: true });
        }
        else if (!this.state.category.id){
            this.setState({ error_cat: true });
        }
        else if (!this.state.unit.id){
            this.setState({ error_unit: true });
        }
        else {
            var data = {
                name        : this.state.title,
                price       : this.state.price,
                description : this.state.description,
                img         : this.state.img,
                category_id : this.state.category.id,
                unit_id     : this.state.unit.id
            }
            itemActions.saveNewItem(data);
        }
    },

    cap: function(){
    },

    render: function() {
        var printCategories = function(category, index){
            return(
                <li key={index} onClick={ this.selectCategory.bind(null, category) } >
                   { category.name } 
                </li>
            )
        }.bind(this)

        var printUnits = function(unit, index){
            return(
                <li key={index} onClick={ this.selectUnit.bind(null, unit) } >
                   { unit.short_name } 
                </li>
            )
        }.bind(this)

        return(
            <div className="add-new">
                <div className="form left-col">
                    <div className="note">Имя товара</div>
                    <input className={ this.state.error_title ? 'error' : null} type="text" onChange={this.changeTitle} />
    
                    <div className="note">Описание</div>
                    <textarea className={ this.state.error_desc ? 'error' : null} onChange={this.changeDescription}></textarea>
    
                    <div className="note">Изображение</div>
                    <input type="file" onChange={this.changeImg}/>
    
                    <div className="autocomplete">
                        <div className="note">Категория</div>
                        <input className={ this.state.error_cat ? 'error' : null}  type="text" onClick={this.getCategories} onChange={this.getCategories} value={ this.state.category.name ? this.state.category.name : null } />
                        { this.state.showACcat ?
                            (
                                <ul className="values">
                                    <h4>Выберите категорию</h4>
                                    { this.state.categories.length > 0 ? this.state.categories.map(printCategories) : <h5>Not found</h5> }
                                </ul>
                            ) : null
                        }
                    </div>
    
                    <div className="left-col">
                        <div className="note">Цена (РУБ)</div>
                        <input className={ this.state.error_price ? 'error' : null}  type="text" onChange={this.changePrice} />
                    </div>

                    <div className="autocomplete right-col unit">
                        <div className="note">Единица</div>
                        <input className={ this.state.error_unit ? 'error' : null}  type="text" onClick={this.getUnit} value={ this.state.unit.name ? this.state.unit.name : null } onChange={ this.cap } />
                        { this.state.showACunit ?
                            (
                                <ul className="values">
                                    <h4>Единица товара:</h4>
                                    { this.state.units.length > 0 ? this.state.units.map(printUnits) : <h5>Not found</h5> }
                                </ul>
                            ) : null
                        }
                    </div>

                    <div className="nav">
                        <button className="cancel" onClick={this.props.toggleShow}>Отмена</button><button onClick={this.addNewItem}>Сохранить</button>
                    </div>
                </div>
                <div className="preview right-col">
                    <h2>Превью</h2>
                    <div className="left-col">
                        { this.state.img ? <img src={ this.state.img } /> : null }
                    </div>
                    <div className="right-col">
                        <h3>{ this.state.title }</h3>
                        { this.state.category.id ? <div><b>Категория:</b> {this.state.category.name}</div> : null }
                        <div>{ this.state.description }</div>
                        <div className="price"><b>Цена:</b> {this.state.price} <i>руб. { this.state.unit.id ? 'за '+this.state.unit.short_name : null }</i></div>
                    </div>
                </div>
            </div>
        )
    }
});


var AddNewCategory = React.createClass({
    getInitialState: function() {
        return{
            title: '',
            img: false
        }
    },

    changeTitle: function(e) {
        this.setState({ title: e.target.value });
    },

    changeImg: function(e){
        Utils.post({
            url : 'upload',
            data : { 'userfile' : e.target.files[0] },
            success: function(data){
                if(data.status_code == 0){
                    this.setState({ img: data.path });
                }
            }.bind(this)
        });
    },  

    addNewCategory: function(){
        this.state.error_title = null;

        if (this.state.title == ''){
            this.setState({ error_title: true });
        }
        else {
            var data = {
                name        : this.state.title,
                img         : this.state.img
            }
            itemActions.saveNewCategory(data);
        }
    },

    render: function() {
        return(
            <div className="add-new">
                <div className="form">
                    <div className="note">Имя категории</div>
                    <input className={ this.state.error_title ? 'error' : null} type="text" onChange={this.changeTitle} />
    
                    <div className="note">Изображение</div>
                    <input type="file" onChange={this.changeImg}/>

                    <div className="nav">
                        <button className="cancel" onClick={this.props.toggleShow}>Отмена</button><button onClick={this.addNewCategory}>Сохранить</button>
                    </div>
                </div>
            </div>
        )
    }
});



module.exports = AdminItemsModule;