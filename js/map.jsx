var React = require('react');
var FeedSettings = require('js/settings.jsx');
var Checkboxes = require('js/input/settings.jsx');
var Input = require('js/input/input.jsx');

var GoogleMapsAPI = window.google.maps;
var ReactGoogleMaps = require('react-googlemaps');
var Map = ReactGoogleMaps.Map;
var Marker = ReactGoogleMaps.Marker;
var LatLng = GoogleMapsAPI.LatLng;


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

module.exports = Location;