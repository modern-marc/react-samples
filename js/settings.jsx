var React = require('react');

var Header2 = require('js/CreateFeedHeader2.jsx');
var Buttons = require('js/buttons.jsx');
var Details = require('js/details.jsx');
var Updates = require('js/updates.jsx');
var Customize = require('js/customize.jsx');
var Filters = require('js/filters.jsx');
var Location = require('js/map.jsx');
var Advanced = require('js/advanced.jsx');


var RouteActions = require('app/actions/RouteActions.js');
var RouteStore = require('app/stores/RouteStore.js');


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
