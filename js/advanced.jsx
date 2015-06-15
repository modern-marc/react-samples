var React = require('react');
var FeedSettings = require('js/settings.jsx');
var Checkboxes = require('js/input/settings.jsx');
var Input = require('js/input/input.jsx');


var Advanced = React.createClass({
	getDefaultProps: function(){
		return {
			optionValues: [0, 1, 2]
		};
	},
	getInitialState:function(){
		return { 
			preferSummary: null,
		};
	},
	componentWillMount: function() {
		this.saveInput();
	},
	saveInput: function(){
		var input_data = this.props.input;
		this.setState({ preferSummary: input_data.preferSummary });
	},
	selectChange: function(e){
		var value;
		var options = e.target.options;
		for (var i = 0; i < options.length; i++) {
			if (options[i].selected) {
				value = options[i].value;
			}
		}
		this.setState({ preferSummary: value });
		this.props.updateState("preferSummary", value);
	},
	checkboxChange: function(name, value){
		this.props.checkboxChange(name, value);
	},
	render: function(){
		var that = this;
		var options = this.props.optionValues.map(function(item){
			switch(item){
				case 0:
				case null:
					optionText = "Full Content";
					break; 
				case 1:
					optionText = "Prefer Summary Content";
					break;  
				case 2:   
					optionText = "Summary Content";
					break; 
			}
			if(item === that.state.preferSummary){
				return(<option value={item} selected>{optionText}</option>);
			}
			else{
				return(<option value={item}>{optionText}</option>)
			}
		});
		return (<div>
					<div><label className="inline-label">If posting Body use:</label></div>
				   	<div className="select-wrap">
				   		<select onChange={this.selectChange}>
							{ options }
						</select>
					</div>
					<div><label className="inline-label">Republish items with updated timestamps <a href="#">[?]</a></label></div>
					<Checkboxes name={ "useDateFlag" } 
								itemState={ this.props.useDateFlag } 
								checkboxChange={ this.checkboxChange }
								class_name={"select-wrap"}/>

					<div><label className="inline-label">Pass Feedburner links to your link shortening service <a href="#">[?]</a></label></div>
					<Checkboxes name={ "ignoreOrigLink" } 
								itemState={ this.props.ignoreOrigLink } 
								checkboxChange={ this.checkboxChange }
								class_name={"select-wrap"}/>

					<div><label className="inline-label">Ignore feed items with no title</label></div>
					<Checkboxes name={ "skipNoTitle" } 
								itemState={ this.props.skipNoTitle } 
								checkboxChange={ this.checkboxChange }
								class_name={"select-wrap"}/>

					<div><label className="inline-label">Do not sort feed by item timestamps</label></div>
					<Checkboxes name={ "ignoreSortDate" } 
								itemState={ this.props.ignoreSortDate } 
								checkboxChange={ this.checkboxChange }
								class_name={"select-wrap"}/>
				</div>);
	}
});

module.exports = Advanced;