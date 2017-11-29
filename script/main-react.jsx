var l = console.log;
var app = document.querySelector('.app');

class Item extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			selected: false,
			className: '',
		}

		this.select = this.select.bind(this)
	}

	select(){
		var that = this;
			
		this.setState(function(prevState, props){
			if(prevState.selected){
				return {
					selected: false,
					className: '',
				}

			} else {
				return{
					selected: true,
					className: 'selected'
				}
			}
		})
		
	}

	render(){
		//l(this.props.name)
		return <li className={this.state.className} onClick={this.select} style={{cursor: "pointer",  userSelect:"none"}}> {this.props.name} </li>;
	}
}

class Search extends React.Component{
	constructor(props){
		super(props)

		this.filterList = this.filterList.bind(this)
	}

	filterList(e){
		l('filterList')
		var text = e.target.value.trim(),
			filterFunc = this.props.filterFunc,
			items = Object.keys(this.props.items()),
			filtredList = [];

		l(items)	

		if(text == ''){
			filtredList = items;
		} else {
			items.forEach(item => {
				if(item.toLowerCase().search(text.toLowerCase()) !== -1) {
					var newItem = item.replace(new RegExp(text,"ig"), '<span class="match">$&</span>');
					//newItem = item
					filtredList.push(newItem)
				} 
			})
		}

		l('here')
		filterFunc(filtredList);
	}

	render(){
		return <input onInput={this.filterList}/>
	}
}


var listItems = ['Яблоко', 'Груша', 'Виноград', 'Апельсин', 'Киви']

class ItemList extends React.Component{
	constructor(props){
		super(props)

		var allItems = {};
		this.props.data.forEach(item => allItems[item] = true)

		this.state = {
			items: this.props.data,
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
						this.state.items.map( item => {
							return <Item key={item} name={item} />
						})
					}
				</ul>

				<input onKeyDown={this.addItem}/>
			</div>
		)
	}
}

ReactDOM.render(
	<ItemList name="Bebebe List" data={listItems}/>
	,app
)