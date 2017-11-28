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
		l(this.props.name)
		return <li className={this.state.className} onClick={this.select} style={{cursor: "pointer",  userSelect:"none"}}> {this.props.name} </li>;
	}
}


var listItems = ['Яблоко', 'Груша', 'Виноград', 'Апельсин', 'Киви']

class ItemList extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			items: this.props.data
		}

		this.filterList = this.filterList.bind(this)
	}

	filterList(e){
		var value = e.target.value,
			filtredList = [];

		if(value == ''){
			l('empty string')
			filtredList = this.props.data;

		} else {
			this.props.data.forEach(item => {
				if(item.toLowerCase().search(value.toLowerCase()) !== -1) {
					var newItem = item.replace(new RegExp(value,"ig"), '<span class="match">$&</span>')
					l(newItem)
					filtredList.push(newItem)
				} 
			})
		}
			

		l(filtredList)

		this.setState({
			items: filtredList,
		})
	}

	render(){
		return (
			<div>
				<input placeholder="Search" onInput={this.filterList}></input>
				
				<ul> 
					<h1>{this.props.name || 'List'} </h1>
					{
						this.state.items.map( item => <Item key={item} name={item} />)
					}
				</ul>
			</div>
		)
	}
}

ReactDOM.render(
	<ItemList name="Bebebe List" data={listItems}/>
	,app
)