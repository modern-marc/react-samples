var React = require('react');

var Checkboxes = React.createClass({
	checkboxClick: function(name, value){
		this.props.checkboxChange(name, value);
	},
	render: function(){
		var checkbox;
		if (this.props.itemState){ 
			checkbox = (<input type="checkbox" onClick={this.checkboxClick.bind(this, this.props.name, 0)} checked={ this.props.itemState } className={ this.props.class_name } />);
		}
		else{ 
			checkbox = (<input type="checkbox" onClick={this.checkboxClick.bind(this, this.props.name, 1)} checked={ this.props.itemState } className={ this.props.class_name } />);
		}
		return checkbox;
	}
});

module.exports = Checkboxes;