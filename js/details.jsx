var React = require('react');
var FeedSettings = require('js/settings.jsx');
var Checkboxes = require('js/input/settings.jsx');
var Input = require('js/input/input.jsx');

var Details = React.createClass({
	getInitialState:function(){
		return { 
		};
	},
	checkboxChange: function(name, value){
		this.props.checkboxChange(name, value);
	},
	valueChange: function(name, value){
		this.props.valueChange(name, value);
	},
	render: function(){
		var input = this.props.input;
		var inputUrl = input ? input.url : null;
		return (<div className="margin-top-15">
					<div><label className="paragraph-one">Feed Url:</label></div>
					<div><span className="font-12">{ inputUrl }</span></div>
					<div className="margin-top-15"><label className="inline-label">Name</label></div>
					<div>
						<InputField name={ "name" }
									inputValue={ this.props.name } 
									class_name={ "input-edit" } 
									value_change={ this.valueChange } />
					</div>
					<div className="inline-label-small">Name defaults to the feed name if not provided</div>
					<div className="margin-top-15"><label className="inline-label">Post Photos <a href="#">[?]</a></label></div>
					<div>
						<Checkboxes name={ "postImages" } 
									itemState={ this.props.postImages } 
									checkboxChange={ this.checkboxChange }/>
					</div>

					<div className="margin-top-15"><label className="inline-label">Input Active</label></div>
					<div>
						<Checkboxes name={ "activeFlag" } 
									itemState={ this.props.activeFlag } 
									checkboxChange={ this.checkboxChange }/>
					</div>

					<div className="margin-top-15"><label className="inline-label">Retrieve Log</label></div>
					<table>
						<tr>
							<td>Retrieval</td>
							<td>Status</td>
							<td>Notes</td>
						</tr>
						<tr>
							<td colSpan="3">This feed has not been retrieved in the last 72 hours.</td>
						</tr>
					</table>
				</div>);
	}
});

module.exports = Details;