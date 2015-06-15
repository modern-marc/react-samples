var React = require('react');
var FeedSettings = require('js/settings.jsx');
var Checkboxes = require('js/input/settings.jsx');
var Input = require('js/input/input.jsx');

var Filters = React.createClass({
	getInitialState:function(){
		return { 
			category: null, 
			itemTitle: null,
			content: null,
			itemLink: null,
			author: null,
		};
	},
	componentWillMount: function() {
		this.saveInput();
	},
	saveInput: function(data){
		var input_data = this.props.input;
		var category, itemTitle, content, itemLink, author;
		if (input_data.filters.filters){
			if (undefined != input_data.filters.filters && input_data.filters.filters.length){
				for (var i=0; i < input_data.filters.filters.length; i++){
					if (input_data.filters.filters[i] === 'category'){
						category = 1;
					}
					if (input_data.filters.filters[i] === 'itemTitle'){
						itemTitle = 1;
					}
					if (input_data.filters.filters[i] === 'content'){
						content = 1;
					}
					if (input_data.filters.filters[i] === 'itemLink'){
						itemLink = 1;
					}
					if (input_data.filters.filters[i] === 'author'){
						author = 1;
					}
				}
				if (this.state.category === null){
					category = 0;
				}
				if (this.state.itemTitle === null){
					itemTitle = 0;
				}
				if (this.state.content === null){
					content = 0;
				}
				if (this.state.itemLink === null){
					itemLink = 0;
				}
				if (this.state.author === null){
					author = 0;
				}
			}
			else{
				category = 0;
				itemTitle = 0;
				content = 0;
				itemLink = 0;
				author = 0;
			}
			this.setState({ category: category, itemTitle: itemTitle, content: content, itemLink: itemLink, author: author });
		}
	},
	valueChange: function(name, value){
		this.props.valueChange(name, value);
	},
	checkboxChange: function(name, value){
		switch(name){
			case "category":
				this.setState({ category: value });
				setTimeout(this.checkFilters, 250);
				break;
			case "itemTitle":
				this.setState({ itemTitle: value });
				setTimeout(this.checkFilters, 250);
				break;
			case "content":
				this.setState({ content: value });
				setTimeout(this.checkFilters, 250);
				break;
			case "itemLink":
				this.setState({ itemLink: value });
				setTimeout(this.checkFilters, 250);
				break;
			case "author":
				this.setState({ author: value });
				setTimeout(this.checkFilters, 250);
				break;
		}
	},
	checkFilters: function(){
		var filters = [];
		var filterTypes = ["category", "itemTitle", "content", "itemLink", "author"];
		for (var i=0; i < filterTypes.length; i++){
			var type = filterTypes[i];
			if(this.state[type]){
				filters.push(type);
			}
			else{
				var index = filters.indexOf(type);
				if(index !== -1){
				   filters.splice(index, 1);
				}
			}
		}
		this.props.updateState("filters", filters);
	},
	render: function(){
		/*var input = this.props.inputData;
		if (input){
			if (input){
				var checkboxObj = {"category": category, "itemTitle": itemTitle, "content": content, "itemLink": itemLink, "author": author};
				for (var key in checkboxObj){
					if (this.state[key]){
						checkboxObj[key] = (<input type="checkbox" onClick={this.checkboxChange.bind(this, key, 0)} defaultChecked />);
					}
					else{
						checkboxObj[key] = (<input type="checkbox" onClick={this.checkboxChange.bind(this, key, 1)} />);
					}
				}
			}
		}*/
		return (<div>
					<p className="paragraph-one">Choose which fields dlvr.it will use for filtering:</p>
			   		<hr/>
					<div className="font-12 margin-bottom-25">
						Title:<Checkboxes name={ "itemTitle" } 
											itemState={ this.state.itemTitle } 
											checkboxChange={ this.checkboxChange }
											class_name={"margin-right"}/>
						Body Content:<Checkboxes name={ "content" } 
												itemState={ this.state.content } 
												checkboxChange={ this.checkboxChange }
												class_name={"margin-right"}/>
						Categories:<Checkboxes name={ "category" } 
												itemState={ this.state.category } 
												checkboxChange={ this.checkboxChange }
												class_name={"margin-right"}/>
						Author:<Checkboxes name={ "author" } 
											itemState={ this.state.author } 
											checkboxChange={ this.checkboxChange }
											class_name={"margin-right"}/>
						Link (unshortened URL):<Checkboxes name={ "itemLink" } 
															itemState={ this.state.itemLink } 
															checkboxChange={ this.checkboxChange }
															class_name={"margin-right"}/>
					</div>
					<div><label className="inline-label">Filter behavior:</label></div>
				   	<div className="select-wrap">
				   		<select>
							<option value="anywhere">Match sequence anywhere</option>
							<option value="words">Match whole words</option>
						</select>
					</div>

				   	<div><label className="inline-label">Posted items must contain all the terms:</label></div>
				   	<div>
			   			<InputField name={ "all" }
			   					inputValue={ this.props.all } 
								class_name={ "input-edit" } 
								value_change={ this.valueChange } />
				   	</div>
				   	<div className="post-fix-margin">
				   		<span className="inline-label-small">Separate terms using a comma.</span>
				   	</div>

				   	<div><label className="inline-label">Posted items must contain any of the terms:</label></div>
				   	<div>
			   			<InputField name={ "any" }
			   					inputValue={ this.props.any } 
								class_name={ "input-edit" } 
								value_change={ this.valueChange } />
				   	</div>
				   	<div className="post-fix-margin">
				   		<span className="inline-label-small">Separate terms using a comma.</span>
				   	</div>

				   	<div><label className="inline-label">Ignore items that contain any of the terms:</label></div>
				   	<div>
			   			<InputField name={ "none" }
			   					inputValue={ this.props.none } 
								class_name={ "input-edit" } 
								value_change={ this.valueChange } />
				   	</div>
				   	<div className="post-fix-margin">
				   		<span className="inline-label-small">Separate terms using a comma.</span>
				   	</div>
				</div>
			   	);
	}
});

module.exports = Filters;