var React = require('react');

class Search extends React.Component{
	constructor(props){
		super(props)

		this.filterList = this.filterList.bind(this)
	}

	filterList(e){
		var text = e.target.value.trim(),
			filterFunc = this.props.filterFunc,
			items = Object.keys(this.props.items()),
			filtredList = [];

		if(text == ''){
			filtredList = items;
		} else {
			items.forEach(item => {
				if(item.toLowerCase().search(text.toLowerCase()) !== -1) {
					//highlighter =(
					//var newItem = item.replace(new RegExp(text,"ig"), '<span class="match">$&</span>');
					var newItem = item
					filtredList.push(newItem)
				} 
			})
		}

		filterFunc(filtredList);
	}

	render(){
		return <input onInput={this.filterList}/>
	}
}

module.exports = Search;