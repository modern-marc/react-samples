var React = require('react');

var InputField = React.createClass({
	valueChange: function(name, event){
		var value = event.target.value;
		this.props.value_change(name, value);
	},
	render: function(){
		return (<input type="text" className={this.props.class_name} value={ this.props.inputValue } onChange={ this.valueChange.bind(this, this.props.name) } />);
	}
});

module.exports = InputField;