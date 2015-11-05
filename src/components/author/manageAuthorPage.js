"use strict";

var React = require("react");
var AuthorForm = require("./authorForm");

// Note:
// All the state handling should be done at the parent component
// All the markup should be dedicated to child component
var ManageAuthorPage = React.createClass({
    getInitialState: function() {
        return {
            author: {id: '', firstName: '', lastName: ''}
        };
    },

    setAuthorState: function(event) {
        var field = event.target.name;
        var value = event.target.value;

        this.state.author[field] = value;
        return this.setState({author: this.state.author});
    },

    render: function() {
		return (
			<div>
				<AuthorForm author={this.state.author} onChange={this.setAuthorState}/>
			</div>
			);
	}
});

module.exports = ManageAuthorPage;