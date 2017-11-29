var React = require('react'),
	Search = require('./SearchPlugin.jsx'),
	Item = require('./Item.jsx'),
	l = console.log;

class ItemsList extends React.Component{
	constructor(props){
		l(props)
		super(props)

		var allItems = {};
		this.props.items && this.props.items.forEach(item => allItems[item] = true)

		this.state = {
			items: this.props.items,
			allItems: allItems,
		}

		this.filterList = this.filterList.bind(this);
		this.addItem = this.addItem.bind(this);
		this.getAllItems = this.getAllItems.bind(this)
	}

	filterList(items){
		this.setState({
			items: items
		})
	}

	addItem(e){
		const keyCode_enter = 13,
			keyCode_esc = 27;

		if(e.keyCode == keyCode_enter){
			var newItem = e.target.value.trim(),
				items = this.state.items,
				allItems = this.state.allItems;
			
			if(newItem == '') return
			items.push(newItem);

			allItems[newItem] = true,

			this.setState({
				items: items,
				allItems: allItems,
			})
			
			e.target.value = '';

		} else if(e.keyCode == keyCode_esc){
			e.target.value = '';
			e.target.blur()
		} else {

		}
	}

	getAllItems(){
		return this.state.allItems
	}

	render(){
		return (
			<div>
				<Search filterFunc={this.filterList} items={this.getAllItems}/>

				<ul> 
					<h1>{this.props.name || 'List'} </h1>
					{
						this.state.items && this.state.items.map( item => {
							return <Item key={item} name={item} />
						})
					}
				</ul>

				<input onKeyDown={this.addItem}/>
			</div>
		)
	}
}

module.exports = ItemsList;