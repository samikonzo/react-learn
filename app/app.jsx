var ReactDOM = require('react-dom');
var React = require('react');
var ItemsList = require('./components/ItemsList.jsx');

const propsValues = {
	items : ['Яблоко', 'Груша', 'Виноград', 'Апельсин', 'Киви'],
	name : 'Продуктовый лист',
}

ReactDOM.render(
	<ItemsList items={propsValues.items} name={propsValues.name} />,
	document.querySelector('.app')
)	