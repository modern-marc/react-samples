var React = require('react');
var FeedSettings = require('js/settings.jsx');
var Checkboxes = require('js/input/settings.jsx');
var Input = require('js/input/input.jsx');

var Updates = React.createClass({
	getDefaultProps: function(){
		return {
			optionValues: [0, 30, 60, 180, 360, 720, 1440]
		};
	},
	checkboxChange: function(name, value){
		this.props.checkboxChange(name, value);
	},
	valueChange: function(name, value){
		this.props.valueChange(name, value);
	},
	selectChange: function(e){
		var value;
		var options = e.target.options;
		for (var i = 0; i < options.length; i++) {
			if (options[i].selected) {
				value = options[i].value;
			}
		}
		this.props.updateState("pullFreq", value);
	},
	render: function(){
		var options, optionText;
		var that = this;
		options = this.props.optionValues.map(function(item){
			switch(item){
				case 0:
					optionText = "Custom: " + item + " Minutes";
					break; 
				case 30:
					optionText = "Every: " + item + " Minutes";
					break;  
				case 60:  
				case 180:  
				case 360: 
				case 720: 
					optionText = "Every: " + (item / 60) + " Hours";
					break; 
				case 1440:
					optionText = "Once a day";
					break; 
			}
			if(item === that.props.pullFreq){
				return(<option value={item} selected>{optionText}</option>);
			}
			else{
				return(<option value={item}>{optionText}</option>)
			}
		});
		return (<div>
					<p className="paragraph-one">Update Frequency</p>
			   		<hr/>
			   		<div className="select-wrap">
				   		<select className="select-left" onChange={this.selectChange}>
							{options}
						</select>
						<span className="select-right"><a href="#" className="select-right-green">Upgrade</a> for faster updates</span>
					</div>
			   		
			   		<p className="paragraph-one">Max Number of Items to Post per Update Period</p>

			   		<InputField name={ "numItems" }
			   					inputValue={ this.props.numItems } 
								class_name={ "input-edit" } 
								value_change={ this.valueChange } />
					
					<p className="paragraph-one">Max Number of Items to Post per Day</p>

			   		<InputField name={ "postLimit" }
			   					inputValue={ this.props.postLimit } 
								class_name={ "input-edit" } 
								value_change={ this.valueChange } />
			   		
			   		<p className="paragraph-one">Trickle items over time</p>

			   		<InputField name={ "itemTrickle" }
			   					inputValue={ this.props.itemTrickle } 
								class_name={ "input-edit" } 
								value_change={ this.valueChange } />

			   		<h4>PuSH Settings</h4>
			   		<p className="paragraph-one">Subscribe to PuSH updates (if available): [?]</p>
			   		<div className="post-fix-margin">
						<Checkboxes name={ "pushEnabled" } 
									itemState={ this.props.pushEnabled } 
									checkboxChange={ this.checkboxChange }/>
			   		</div>

			   		<p className="paragraph-one">Subscribed Hubs:</p>
			   		<table>
			   			<tr>
			   				<th>Hub</th>
			   				<th>Last Push</th>
			   			</tr>
			   			<tr>
			   				<td>No Subscriptions</td>
			   				<td>No Updates Received</td>
			   			</tr>
			   		</table>

				</div>);
	}
});

module.exports = Updates;