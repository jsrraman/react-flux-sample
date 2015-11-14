"use strict";

var React = require('react');
var TextInput = require('../common/textInput');
var SelectInput = require('../common/selectInput');
var AuthorStore = require('../../api/authorApi');

var CourseForm = React.createClass({
    propTypes: {
        course: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onSave: React.PropTypes.func.isRequired,
        error: React.PropTypes.object
    },

    //getDefaultProps: function () {
    //    return {
    //        options: [
    //            {
    //                name: 'Name1',
    //                value: 'Value1'
    //            },
    //            {
    //                name: 'Name2',
    //                value: 'Value2'
    //            }
    //        ]
    //    };
    //},

    getInitialState: function () {
        return {
            authors: AuthorStore.getAllAuthors()
        }
    },

    render: function () {
        return (
            <form>
                <h1>Manage Course</h1>
                <TextInput
                    name="title"
                    label="Title"
                    value={this.props.course.title}
                    onChange={this.props.onChange}
                    error={this.props.errors.title}/>

                <SelectInput
                    name="author"
                    label="Author"
                    authors={this.state.authors}/>

                <TextInput
                    name="category"
                    label="Category"
                    value={this.props.course.category}
                    onChange={this.props.onChange}
                    error={this.props.errors.category}/>

                <TextInput
                    name="length"
                    label="Length"
                    value={this.props.course.length}
                    onChange={this.props.onChange}
                    error={this.props.errors.length}/>

                <input type="submit" value="save" className="btn btn-default" onClick={this.props.onSave}/>
            </form>
        );
    }
});

module.exports = CourseForm;