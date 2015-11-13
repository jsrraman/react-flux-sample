"use strict";

var React = require("react");
var Router = require("react-router");
var Link = Router.Link;
var CourseList = require("./courseList");
//var AuthorStore = require("../../stores/authorStore");

var CoursePage = React.createClass({
    getInitialState: function () {
        return {
            //authors: AuthorStore.getAllAuthors()
            courses: []
        };
    },

    componentWillMount: function () {
        //AuthorStore.addChangeListener(this._onChange)
    },

    componentWillUnmount: function () {
        //AuthorStore.removeChangeListener(this._onChange)
    },

    _onChange: function () {
        //this.setState({courses: AuthorStore.getAllAuthors()});
        this.setState({courses: []});
    },

    render: function () {
        return (
            <div>
                <h1>Courses</h1>
                <Link to="addCourse" className="btn btn-default">Add Course</Link>
                <CourseList courses={this.state.courses}/>
            </div>
        );
    }
});

module.exports = CoursePage;