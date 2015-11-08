"use strict";

var React = require("react");
var Router = require("react-router");
var AuthorForm = require("./authorForm");
var AuthorApi = require("../../api/authorApi");
var toastr = require("toastr");

// Note:
// All the state handling should be done at the parent component
// All the markup should be dedicated to child component
var ManageAuthorPage = React.createClass({
    mixins: [
        Router.Navigation
    ],

    getInitialState: function() {
        return {
            author: {id: '', firstName: '', lastName: ''},
            errors: {}
        };
    },

    setAuthorState: function(event) {
        var field = event.target.name;
        var value = event.target.value;

        this.state.author[field] = value;
        return this.setState({author: this.state.author});
    },

    isAuthorDataValid: function () {
        var isValid = true;

        // Clear the previous errors, if any
        this.state.errors = {};

        if (this.state.author.firstName.length < 3) {
            this.state.errors.firstName = 'First name should be at least 3 characters';
            isValid = false;
        }

        if (this.state.author.lastName.length < 3) {
            this.state.errors.lastName = 'Last name should be at least 3 characters';
            isValid = false;
        }

        this.setState({errors: this.state.errors});

        return isValid;
    },

    saveAuthor: function(event) {
        // Prevent the default the submit behaviour of the form
        event.preventDefault();

        if (!this.isAuthorDataValid()) {
            return;
        }

        AuthorApi.saveAuthor(this.state.author);

        toastr.success('Author data saved');

        // Use mixin to programmatically redirect to other pages
        this.transitionTo('authors');
    },

    render: function() {
		return (
			<div>
				<AuthorForm author={this.state.author}
                            onChange={this.setAuthorState}
                            onSave={this.saveAuthor}
                            errors={this.state.errors}/>
			</div>
			);
	}
});

module.exports = ManageAuthorPage;