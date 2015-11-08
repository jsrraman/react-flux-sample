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
    statics: {
        //// This gets invoked when this page is transitioned in from another page
        //willTransitionTo: function(transition, params, callback) {
        //    if (confirm('Are you sure you want to read a page that\'s boring?')) {
        //        transition.about;
        //    } else {
        //        callback();
        //    }
        //},

        // This gets invoked when we transit from this page to another page
        // (Tip: use this for "Do you want to save?" kind of alerts)
        willTransitionFrom: function(transition, component) {
            if (component.state.dirty) {
                if (!confirm('Are you sure you want to leave without saving the changes?')) {
                    transition.abort();
                }
            }
        }
    },

    mixins: [
        Router.Navigation
    ],

    getInitialState: function() {
        return {
            author: {id: '', firstName: '', lastName: ''},
            errors: {},
            dirty: false
        };
    },

    setAuthorState: function(event) {
        var field = event.target.name;
        var value = event.target.value;

        this.state.author[field] = value;

        this.setState({dirty:true});

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

        this.setState({dirty:false});

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