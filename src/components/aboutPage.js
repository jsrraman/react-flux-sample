"use strict";

var React = require('react');

var AboutPage = React.createClass({
	statics: {
		// This gets invoked when this page is transitioned in from another page
		willTransitionTo: function(transition, params, callback) {
			if (confirm('Are you sure you want to read a page that\'s boring?')) {
				transition.about;
			} else {
				callback();
			}
		},

		// This gets invoked when we transit from this page to another page 
		// (Tip: use this for "Do you want to save?" kind of alerts)
		willTransitionFrom: function(transition, component) {
			if (confirm('Are you sure you want to leave the page')) {
				transition.about;
			}
		}
	},

	render: function() {
		return (
			<div>
				<h1>About Page</h1>
			</div>
			)
	}
});

module.exports = AboutPage;