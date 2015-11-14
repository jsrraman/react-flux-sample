"use strict";

var React = require("react");
var Router = require("react-router");
var CourseForm = require("./courseForm");
var CourseActions = require("../../actions/CourseActions");
var CourseStore = require("../../stores/CourseStore");
var toastr = require("toastr");

// Note:
// All the state handling should be done at the parent component
// All the markup should be dedicated to child component
var ManageCoursePage = React.createClass({
    statics: {
        //// This gets invoked when this page is transitioned in from another page
        //willTransitionTo: function(transition, params, callback) {
        //    if (confirm('Are you sure you want to read a page that\'s boring?')) {
        //        transition.about;
        //    } else {
        //        callback();
        //    }
        //},

        // This gets invoked when we transit from this page to another page and the trigger to
        // the transition is not save button
        // (Tip: use this for "Do you want to save?" kind of alerts)
        willTransitionFrom: function (transition, component) {
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

    getInitialState: function () {
        return {
            course: {title: '', author: {id: '', name: ''}, category: '', length: ''},
            errors: {},
            dirty: false
        };
    },

    // Calling the setState in this component life cycle method will not cause a render
    componentWillMount: function () {
        var courseId = this.props.params.id; // from the path '/course:id'

        if (courseId) {
            this.setState({course: CourseStore.getCourseById(courseId)});
        }
    },

    setCourseState: function (event) {
        var field = event.target.name;
        var value = event.target.value;

        if (field == 'author') {
            this.state.course.author.name = value;
        } else {
            this.state.course[field] = value;
        }

        this.setState({dirty: true});

        return this.setState({course: this.state.course});
    },

    isCourseDataValid: function () {
        var isValid = true;

        // Clear the previous errors, if any
        this.state.errors = {};

        if (this.state.course.title.length < 5) {
            this.state.errors.title = 'Title should be at least 5 characters';
            isValid = false;
        }

        if (this.state.course.category.length < 5) {
            this.state.errors.category = 'Category should be at least 5 characters';
            isValid = false;
        }

        if (this.state.course.length.length < 4) {
            this.state.errors.length = 'Length should be at least 4 characters';
            isValid = false;
        }

        this.setState({errors: this.state.errors});

        return isValid;
    },

    saveCourse: function (event) {
        // Prevent the default the submit behaviour of the form
        event.preventDefault();

        if (!this.isCourseDataValid()) {
            return;
        }

        if (this.state.course.id) {
            CourseActions.updateCourse(this.state.course);
        } else {
            CourseActions.createCourse(this.state.course);
        }

        this.setState({dirty: false});

        toastr.success('Course data saved');

        // Use mixin to programmatically redirect to other pages
        this.transitionTo('courses');
    },

    render: function () {
        return (
            <div>
                <CourseForm course={this.state.course}
                            onChange={this.setCourseState}
                            onSave={this.saveCourse}
                            errors={this.state.errors}/>
            </div>
        );
    }
});

module.exports = ManageCoursePage;