"use strict";

window.$ = window.jQuery = require('jquery');

var React = require('react');
var HomePage = require('./components/homePage');
var AboutPage = require('./components/aboutPage');
var Header = require('./components/common/header');
var AuthorPage = require('./components/authorPage');

var App = React.createClass({
	render: function() {
		var Child;

		switch(this.props.route) {
			case 'about': {
				Child = AboutPage;
				break;
			}

			case 'authors': {
				Child = AuthorPage;
				break;
			}

			default: {
				Child = HomePage;
				break;
			}
		}

		return (
			<div>
				<Header/>
				<Child/>
			</div>
			);
	}
});

function render() {
	var route = window.location.hash.substr(1);
	React.render(<App route={route}/>, document.getElementById('app'));
}

window.addEventListener('hashchange', render);
render();