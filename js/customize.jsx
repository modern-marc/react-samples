var React = require('react');
var FeedSettings = require('js/settings.jsx');
var Checkboxes = require('js/input/settings.jsx');
var Input = require('js/input/input.jsx');

var Customize = React.createClass({
	getInitialState:function(){
		return { 
			title: null,
			body: null,
		};
	},
	componentWillMount: function() {
		this.saveInput();
	},
	saveInput: function(data){
		var input_data = this.props.input;
		if (input_data.rules){
			var title, body;
			if (undefined != input_data.rules.fields && input_data.rules.fields.length){
				for (var i=0; i < input_data.rules.fields.length; i++){
					if (input_data.rules.fields[i] === 'body'){
						body = 1;
					}
					else if (input_data.rules.fields[i] === 'title'){
						title = 1;
					}
				}
				if (this.state.body === null){
					body = 0;
				}
				if (this.state.title === null){
					title = 0;
				}
			}
			else{
				body = 0; 
				title = 0;
			}
			this.setState({ body: body, title: title });
		}
	},
	valueChange: function(name, value){
		this.props.valueChange(name, value);
	},
	checkboxChange: function(name, value){
		switch(name){
			case "title":
				this.setState({ title: value });
				setTimeout(this.checkTitleBody, 250);
				break;
			case "body":
				this.setState({ body: value });
				setTimeout(this.checkTitleBody, 250);
				break;
			default:
				this.props.checkboxChange(name, value);
		}
	},
	checkTitleBody: function(){
		var fields = [];
		var fieldTypes = ["title", "body"];
		for (var i=0; i < fieldTypes.length; i++){
			var type = fieldTypes[i];
			if(this.state[type]){
				fields.push(type);
			}
			else{
				var index = fields.indexOf(type);
				if(index !== -1){
				   fields.splice(index, 1);
				}
			}
		}
		this.props.updateState("fields", fields);
	},
	render: function(){
		var prefixSpace, postfixSpace, searchCase, find, body, title;
			/*if (input){
				var checkboxArray = {"prefixSpace": prefixSpace, "postfixSpace": postfixSpace, "search": search, "find": find, "title": title, "body": body};
				for (var key in checkboxArray){
					if (this.state[key]){
						checkboxArray[key] = (<input type="checkbox" onClick={this.checkboxChange.bind(this, key, 0)} defaultChecked />);
					}
					else{
						checkboxArray[key] = (<input type="checkbox" onClick={this.checkboxChange.bind(this, key, 1)} />);
					}
				}
			}*/
		return (<div>
					<p className="paragraph-one">Prefix / Suffix</p>
			   		<hr/>
			   		<div>
			   			<label className="inline-label">Start items with:</label>
			   		</div>
			   		<div>
			   			<InputField name={ "prefixText" }
			   					inputValue={ this.props.prefixText } 
								class_name={ "input-edit" } 
								value_change={ this.valueChange } />
			   		</div>
			   		<div className="post-fix-margin"> 

						<Checkboxes name={ "prefixSpace" } 
									itemState={ this.props.prefixSpace } 
									checkboxChange={ this.checkboxChange }/>

			   			<span className="inline-label">No space after prefix <a href="#">[?]</a></span>
			   		</div>
			   		
			   		<div>
			   			<label className="inline-label">End items with:</label>
			   		</div>
			   		<div>
			   			<InputField name={ "postfixText" }
			   					inputValue={ this.props.postfixText } 
								class_name={ "input-edit" } 
								value_change={ this.valueChange } />
			   		</div>
			   		<div className="post-fix-margin">

			   			<Checkboxes name={ "postfixSpace" } 
									itemState={ this.props.postfixSpace } 
									checkboxChange={ this.checkboxChange }/>

			   			<span className="inline-label">No space before suffix <a href="#">[?]</a></span>
			   		</div>
					
					<p className="paragraph-one">Find and Replace / Remove <a href="#">[?]</a></p>
			   		<hr/>
			   		<table className="customize-table">
			   			<tr>  
			   				<th className="font-12">Action</th>
			   				<th className="font-12">Find Text</th>
			   				<th className="font-12">Replace With</th>
			   			</tr>
			   			<tr>
			   				<td>
						   		<select>
									<option value="replace">Replace</option>
									<option value="remove">Remove</option>
								</select>
							</td>
			   				<td>
					   			<InputField name={ "search" }
					   					inputValue={ this.props.search } 
										class_name={ "input-edit" } 
										value_change={ this.valueChange } />
			   				</td>
			   				<td>
					   			<InputField name={ "replace" }
					   					inputValue={ this.props.replace } 
										class_name={ "input-edit" } 
										value_change={ this.valueChange } />
			   				</td>
			   			</tr>
			   			<tr>
			   				<td colSpan="3" className="font-12">
			   					Case sensitive:
			   					<Checkboxes name={ "searchCase" } 
											itemState={ this.props.searchCase } 
											checkboxChange={ this.checkboxChange }
											class_name={"margin-right"} />
			   					Match whole word:
			   					<Checkboxes name={ "find" } 
											itemState={ this.props.find } 
											checkboxChange={ this.checkboxChange }
											class_name={"margin-right"} />
			   					search fields: 
			   					<Checkboxes name={ "title" } 
									itemState={ this.state.title } 
									checkboxChange={ this.checkboxChange }
									class_name={"margin-left"} />title 
			   					<Checkboxes name={ "body" } 
											itemState={ this.state.body } 
											checkboxChange={ this.checkboxChange }
											class_name={"margin-left"}/>body
			   				</td>
			   			</tr>
			   		</table>
			   	</div>

		);
	}
});

module.exports = Customize;