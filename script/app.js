'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var l = console.log;
var app = document.querySelector('.app');

var Item = function (_React$Component) {
	_inherits(Item, _React$Component);

	function Item(props) {
		_classCallCheck(this, Item);

		var _this = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, props));

		_this.state = {
			selected: false,
			className: ''
		};

		_this.select = _this.select.bind(_this);
		return _this;
	}

	_createClass(Item, [{
		key: 'select',
		value: function select() {
			var that = this;

			this.setState(function (prevState, props) {
				if (prevState.selected) {
					return {
						selected: false,
						className: ''
					};
				} else {
					return {
						selected: true,
						className: 'selected'
					};
				}
			});
		}
	}, {
		key: 'render',
		value: function render() {
			//l(this.props.name)
			return React.createElement(
				'li',
				{ className: this.state.className, onClick: this.select, style: { cursor: "pointer", userSelect: "none" } },
				' ',
				this.props.name,
				' '
			);
		}
	}]);

	return Item;
}(React.Component);

var Search = function (_React$Component2) {
	_inherits(Search, _React$Component2);

	function Search(props) {
		_classCallCheck(this, Search);

		var _this2 = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this, props));

		_this2.filterList = _this2.filterList.bind(_this2);
		return _this2;
	}

	_createClass(Search, [{
		key: 'filterList',
		value: function filterList(e) {
			l('filterList');
			var text = e.target.value.trim(),
			    filterFunc = this.props.filterFunc,
			    items = Object.keys(this.props.items()),
			    filtredList = [];

			l(items);

			if (text == '') {
				filtredList = items;
			} else {
				items.forEach(function (item) {
					if (item.toLowerCase().search(text.toLowerCase()) !== -1) {
						var newItem = item.replace(new RegExp(text, "ig"), '<span class="match">$&</span>');
						//newItem = item
						filtredList.push(newItem);
					}
				});
			}

			l('here');
			filterFunc(filtredList);
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement('input', { onInput: this.filterList });
		}
	}]);

	return Search;
}(React.Component);

var listItems = ['Яблоко', 'Груша', 'Виноград', 'Апельсин', 'Киви'];

var ItemList = function (_React$Component3) {
	_inherits(ItemList, _React$Component3);

	function ItemList(props) {
		_classCallCheck(this, ItemList);

		var _this3 = _possibleConstructorReturn(this, (ItemList.__proto__ || Object.getPrototypeOf(ItemList)).call(this, props));

		var allItems = {};
		_this3.props.data.forEach(function (item) {
			return allItems[item] = true;
		});

		_this3.state = {
			items: _this3.props.data,
			allItems: allItems
		};

		_this3.filterList = _this3.filterList.bind(_this3);
		_this3.addItem = _this3.addItem.bind(_this3);
		_this3.getAllItems = _this3.getAllItems.bind(_this3);
		return _this3;
	}

	_createClass(ItemList, [{
		key: 'filterList',
		value: function filterList(items) {
			this.setState({
				items: items
			});
		}
	}, {
		key: 'addItem',
		value: function addItem(e) {
			var keyCode_enter = 13,
			    keyCode_esc = 27;

			if (e.keyCode == keyCode_enter) {
				var newItem = e.target.value.trim(),
				    items = this.state.items,
				    allItems = this.state.allItems;

				if (newItem == '') return;
				items.push(newItem);

				allItems[newItem] = true, this.setState({
					items: items,
					allItems: allItems
				});

				e.target.value = '';
			} else if (e.keyCode == keyCode_esc) {
				e.target.value = '';
				e.target.blur();
			} else {}
		}
	}, {
		key: 'getAllItems',
		value: function getAllItems() {
			return this.state.allItems;
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(Search, { filterFunc: this.filterList, items: this.getAllItems }),
				React.createElement(
					'ul',
					null,
					React.createElement(
						'h1',
						null,
						this.props.name || 'List',
						' '
					),
					this.state.items.map(function (item) {
						return React.createElement(Item, { key: item, name: item });
					})
				),
				React.createElement('input', { onKeyDown: this.addItem })
			);
		}
	}]);

	return ItemList;
}(React.Component);

ReactDOM.render(React.createElement(ItemList, { name: 'Bebebe List', data: listItems }), app);
