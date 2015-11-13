"use strict";

var Dispatcher = require('../appDispatcher');
var CourseApi = require('../api/CourseApi');
var ActionTypes = require('../constants/actionTypes');

var CourseActions = {
    createCourse: function(course) {
        var newCourse = CourseApi.saveCourse(course);

        // This will dispatch an author created event/action to all the stores
        Dispatcher.dispatch({
            actionType: ActionTypes.CREATE_COURSE,
            course: newCourse
        });
    },

    updateCourse: function(course) {
        var updatedCourse = CourseApi.saveCourse(course);

        Dispatcher.dispatch({
            actionType: ActionTypes.UPDATE_COURSE,
            course: updatedCourse
        });
    },

    deleteCourse: function(courseId) {
        CourseApi.deleteCourse(courseId);

        Dispatcher.dispatch({
            actionType: ActionTypes.DELETE_COURSE,
            id: courseId
        });
    }
};

module.exports = CourseActions;