"use strict";

var React = require('react');

var SelectInput = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        authors: React.PropTypes.array.isRequired,
        value: React.PropTypes.string,
        onChange: React.PropTypes.func.isRequired
    },

    getInitialState: function () {
        return {
            options: []
        }
    },

    componentWillMount: function () {
        var authors = this.props.authors;

        for (var i = 0; i < authors.length; i++) {
            var author = authors[i];

            this.state.options.push(
                <option key={i} value={author.firstName}>{author.firstName}</option>
            )
        }

        this.setState({options: this.state.options});
    },

    render: function () {
        var wrapperClass = 'form-group';

        //if (this.props.error && this.props.error.length > 0) {
        //    wrapperClass += " " + 'has-error';
        //}

        return (
            <div className={wrapperClass}>
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <div className="field">
                    <select
                        name={this.props.name}
                        className="form-control"
                        ref={this.props.name}
                        onChange={this.props.onChange}>
                        {this.state.options}
                    </select>
                </div>
            </div>
        );
    }
});

module.exports = SelectInput;