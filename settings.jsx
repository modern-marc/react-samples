var React = require('react');
var GoogleMapsAPI = window.google.maps;
var ReactGoogleMaps = require('react-googlemaps');
var Header2 = require('app/components/CreateFeedHeader2.jsx');
var RouteActions = require('app/actions/RouteActions.js');
var RouteStore = require('app/stores/RouteStore.js');

var Map = ReactGoogleMaps.Map;
var Marker = ReactGoogleMaps.Marker;
var LatLng = GoogleMapsAPI.LatLng;

var Buttons = React.createClass({
	showTabComponent: function(component){
		this.props.showTab(component);
	},
	render: function(){
		var that = this;
		var selectedTab = this.props.selectedTab;
		var buttons = this.props.tabs.map(function(btn){
			var btnText = btn.data === 'Customize' ? 'Customize Text' : btn.data;
			var btnClass = selectedTab === btn.data ? "btn-small active" : "btn-small";
			return (<button className={ btnClass } onClick={ that.showTabComponent.bind(that, btn.data) }>{ btnText }</button>);
		});
		return <div>{ buttons }</div>;
	}
});

var InputField = React.createClass({
	valueChange: function(name, event){
		var value = event.target.value;
		this.props.value_change(name, value);
	},
	render: function(){
		return (<input type="text" className={this.props.class_name} value={ this.props.inputValue } onChange={ this.valueChange.bind(this, this.props.name) } />);
	}
});

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

var SelectField = React.createClass({
	render: function(){
		return null;
	}
});


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


var Scheduling = React.createClass({
	render: function(){
		return null;
	},
});


var Location = React.createClass({
	getInitialState:function(){
		return { 
			inputData: null,
			useGeo: null,
			defaultGeo: null,
			overrideItemGeo: null,
			mapShow: false,
			center: new LatLng(45.524, -122.676),
			zoom: 10,
			position: null
		};
	},

	componentWillMount: function() {
		this.saveInput();
	},

	saveInput: function(data){
		var input_data = this.props.input;
		this.setState({ inputData: input_data, useGeo: input_data.useGeo, defaultGeo: input_data.defaultGeo, overrideItemGeo: input_data.overrideItemGeo });
		
		if (input_data.defaultGeo.length === 2){
			this.setState({ center: new LatLng(Number(input_data.defaultGeo[0]), Number(input_data.defaultGeo[1])), position: new LatLng(Number(input_data.defaultGeo[0]), Number(input_data.defaultGeo[1]))  });
		}
		else{
			this.checkGeolocation();
		}
		
		if (input_data.useGeo){
			this.setState({ mapShow: true });
		}
	},

	handleMapClick: function(mapEvent) {
		var defaultGeo = []
		for(var key in mapEvent.latLng) {
			if(key === 'A' || key === 'F'){
		    	defaultGeo.push(mapEvent.latLng[key]);
			}
		}
		this.setState({ position: mapEvent.latLng, center: mapEvent.latLng });
		this.props.updateState("defaultGeo", defaultGeo);
	},

	removeMarker: function(){
		this.setState({ position: null });
		this.props.updateState("defaultGeo", []);
	},

	handleCenterChange: function(map) {
		this.setState({ center: map.getCenter() });
	},

	checkboxChange: function(name, val){
		switch(name){
			case "useGeo":
				this.setState({ mapShow: val, useGeo: val });
				this.props.updateState("useGeo", val);
				break;
			case "overrideItemGeo":
				this.setState({ overrideItemGeo: val });
				this.props.updateState("overrideItemGeo", val);
				break;
		}
	},

	checkGeolocation: function(){
		if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(this.showPosition);
	    }
	},

	showPosition: function(currentPosition) {
	    this.setState({ center: new LatLng(Number(currentPosition.coords.latitude), Number(currentPosition.coords.longitude)) });
	},

	render: function(){
		var useGeo, overrideItemGeo;
		var input = this.state.inputData;
		var marker = this.state.position ? (<p className="font-12">To remove your default location, <span onClick={ this.removeMarker }>CLICK HERE</span> to remove it and hit 'Save'.</p>) : null;
		var map = this.state.mapShow ? (<div>
					<div>Set your feeds default location <a href="#">[?]</a></div>
					<Map
						initialZoom={this.state.zoom}
						center={this.state.center}
						onCenterChange={this.handleCenterChange}
						width={700}
						height={350}
						onClick={this.handleMapClick}>
						<Marker position={this.state.position} />
					</Map>
					{ marker }
					<p className="font-12">
						<Checkboxes name={ "overrideItemGeo" } 
									itemState={ this.state.overrideItemGeo } 
									checkboxChange={ this.checkboxChange }/> Default location overrides feed item location 
						<a href="#">[?]</a>
					 </p>
				   </div>) : null;
		return (<div>
					<p className="paragraph-one">Location</p>
			   		<hr/>
				   	<div className="font-12">
				   		<Checkboxes name={ "useGeo" } 
									itemState={ this.state.useGeo } 
									checkboxChange={ this.checkboxChange }/> Use Location <a href="#">[?]</a></div>
				   	<br/>
				   	{ map }
			   	</div>);
	}
});


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


var FeedSettings = React.createClass({
	contextTypes: {
		router: React.PropTypes.func
	},
	getDefaultProps: function() {
		return {
			buttons: [
				{data: 'Details'},
				{data: 'Updates'},
				{data: 'Customize'},
				{data: 'Filters'},
				{data: 'Scheduling'},
				{data: 'Location'},
				{data: 'Advanced'},
			],
		};
	},
	getInitialState:function(){
		return { 
			selectedTab: 'Details',			
			inputId: null,
			inputData: null,
			updates: {},
		};
	},
	componentWillMount: function(){
		this.getUrlParam();
	},
	componentDidMount: function() {
		RouteStore.addChangeListener(this._onInputChange);
	},
	componentWillUnmount: function() {
		RouteStore.removeChangeListener(this._onInputChange);
	},
	_onInputChange: function(){
		var input_data = RouteStore.getCurrentInput();
		this.setState({ inputData: input_data});
	},
	getUrlParam: function(){
		var input_id = this.context.router.getCurrentParams().inputId;
		this.setState({ inputId: input_id });
		RouteActions.getInput(input_id);
	},
	showTab: function(component){
		this.setState({ selectedTab: component });
	},
	valueChange: function(name, value){
		switch(name){
			case "prefixSpace":
				this.setState({ prefixSpace: value });
				this.updateState("prefixSpace", value);
				break;
			case "postfixSpace":
				this.setState({ postfixSpace: value });
				this.updateState("postfixSpace", value);
				break;
			case "searchCase":
				this.setState({ searchCase: value });
				this.updateState("case", value);
				break;
			case "find":
				this.setState({ find: value });
				this.updateState("find", value);
				break;
			case "prefixText":
				this.setState({ inputData.prefixText: value });
				this.updateState(name, value);
				break;
			case "postfixText":
				this.setState({ postfixText: value });
				this.updateState(name, value);
				break;
			case "search":
				this.setState({ search: value });
				this.updateState(name, value);
				break;
			case "replace":
				this.setState({ replace: value });
				this.updateState(name, value);
				break;
			case "all":
				this.setState({ all: value });
				this.updateState(name, value);
				break;
			case "any":
				this.setState({ any: value });
				this.updateState(name, value);
				break;
			case "none":
				this.setState({ none: value });
				this.updateState(name, value);
				break;
			default:
				this.setState({ inputData[name]: value });
				this.updateState(name, value);
		}
	},
	updateState: function(inputKey, inputValue){
		var currentUpdates = this.state.updates;
		currentUpdates[inputKey] = inputValue;
		this.setState({ updates: currentUpdates });
	},
	render: function(){
		var currentTab, saveUpdates;
		console.log(this.state.updates);
		var saveUpdates = Object.keys(this.state.updates).length > 0 ? true : false;
		switch(this.state.selectedTab){
			case "Details":
				currentTab = <Details input={this.state.inputData} updateState={this.updateState} valueChange={ this.valueChange } />;
				break;
			case 'Updates': 
				currentTab = <Updates input={this.state.inputData} updateState={this.updateState} valueChange={ this.valueChange }  />;
				break;
			case'Customize': 
				currentTab = <Customize input={this.state.inputData} updateState={this.updateState} valueChange={ this.valueChange } />;
				break;
			case 'Filters':
				currentTab = <Filters input={this.state.inputData} updateState={this.updateState} valueChange={ this.valueChange } />;
				break;
			case 'Scheduling': 
				currentTab = <Scheduling input={this.state.inputData} updateState={this.updateState} />;
				break;
			case 'Location':
				currentTab = <Location input={this.state.inputData} updateState={this.updateState} />;
				break;
			case 'Advanced':
				currentTab = <Advanced input={this.state.inputData} updateState={this.updateState} valueChange={ this.valueChange }  />;
				break;
		}
		
		return(<div>
				<Header2 inputId={this.state.inputId} 
						updateList={this.state.updates} 
						buttonText={"Save"} 
						buttonActive={saveUpdates} />
			   	<div className="btn-group">
			   		<Buttons tabs={this.props.buttons} 
			   				showTab={this.showTab} 
			   				selectedTab={this.state.selectedTab} /> 
			   		{ currentTab }
			   	</div>
			   </div>);
	}
});

module.exports = FeedSettings;
