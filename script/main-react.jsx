var injection = {
	name: 'Denis',
}

class Timer extends React.Component{
	render(){
		return (
			<div className="timer">
				{(new Date()).toLocaleTimeString()}
			</div>
		);
	}
}

function tick(){
	ReactDOM.render(
		<Timer/>,
		document.querySelector('body')
	)
}

setTimeout(function f(){
	tick()
	setTimeout(f, 1000)
}, 0)