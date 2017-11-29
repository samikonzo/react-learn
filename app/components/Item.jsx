var React = require('react');

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
		return <li className={this.state.className} onClick={this.select} style={{cursor: "pointer",  userSelect:"none"}}> {this.props.name} </li>;
	}
}

module.exports = Item;