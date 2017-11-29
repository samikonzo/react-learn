var React = require('react');

class SearchPlugin extends React.Component{
	constructor(props){
		super(props);
		this.onTextChaged = this.onTextChaged.bind(this)
	}

	onTextChaged(e){
		var text = e.target.value.trim();
		this.props.filter
	}
}