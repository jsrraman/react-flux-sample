"use strict";

var React = require("react");
var AuthorForm = require("./authorForm");
var AuthorApi = require("../../api/authorApi");

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

    saveAuthor: function(event) {
        // Prevent the default the submit behaviour of the form
        event.preventDefault();
        AuthorApi.saveAuthor(this.state.author);
    },

    render: function() {
		return (
			<div>
				<AuthorForm author={this.state.author} onChange={this.setAuthorState} onSave={this.saveAuthor}/>
			</div>
			);
	}
});

module.exports = ManageAuthorPage;