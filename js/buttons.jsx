var React = require('react');

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

module.exports = Buttons;