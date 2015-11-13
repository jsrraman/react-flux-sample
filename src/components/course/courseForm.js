"use strict";

var React = require('react');
var Input = require('../common/textInput');

var CourseForm = React.createClass({
    propTypes: {
        course: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onSave: React.PropTypes.func.isRequired,
        error: React.PropTypes.object
    },

    render: function () {
        return (
            <form>
                <h1>Manage Course</h1>
                <Input
                    name="title"
                    label="Title"
                    value={this.props.course.title}
                    onChange={this.props.onChange}
                    error={this.props.errors.title}/>

                <Input
                    name="author"
                    label="Author"
                    value={this.props.course.author.name}
                    onChange={this.props.onChange}
                    error={this.props.errors.authorName}/>

                <Input
                    name="category"
                    label="Category"
                    value={this.props.course.category}
                    onChange={this.props.onChange}
                    error={this.props.errors.category}/>

                <Input
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