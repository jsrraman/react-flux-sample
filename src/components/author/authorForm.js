"use strict";

var React = require('react');
var TextInput = require('../common/textInput');

var AuthorForm = React.createClass({
    propTypes: {
        author: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onSave: React.PropTypes.func.isRequired,
        error: React.PropTypes.object
    },

    render: function () {
        return (
            <form>
                <h1>Manage Course</h1>
                <TextInput
                    name="firstName"
                    label="First Name"
                    value={this.props.author.firstName}
                    onChange={this.props.onChange}
                    error={this.props.errors.firstName}/>

                <TextInput
                    name="lastName"
                    label="Last Name"
                    value={this.props.author.lastName}
                    onChange={this.props.onChange}
                    error={this.props.errors.lastName}/>

                <input type="submit" value="save" className="btn btn-default" onClick={this.props.onSave}/>
            </form>
        );
    }
});

module.exports = AuthorForm;