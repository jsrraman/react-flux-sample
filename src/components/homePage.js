"use strict";

var React = require('react');

var Router = require('react-router');
var Link = Router.Link;

var HomePage = React.createClass({
	render: function() {
		return (
			<div className="jumbotron">
				<h1>Hello World from React</h1>
				<Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
			</div>
			);	
	}
});

module.exports = HomePage;