"use strict";

var Dispatcher = require('../appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter; // For broadcasting a given event
var assign = require('object-assign');
var _ = require('lodash');

var CHANGE_EVENT = 'change';

var _courses = [];

// The below statement has the following meaning
// Take an empty object, add the event emitter prototype capability and further
// add our custom behaviour (three methods
// 1. Add change listener
// 2. Remove change listener
// 3. Emit change
// These three methods are common to any store
var CourseStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    getAllCourses: function () {
        return _courses;
    },

    getCourseById: function (id) {
        return _.find(_courses, {id: id});
    }
});

// Private section which is not exposed to the public
Dispatcher.register(function (action) {
    switch (action.actionType) {
        case ActionTypes.INITIALIZE:
        {
            _courses = action.initialData.courses;
            CourseStore.emitChange();
            break;
        }

        case ActionTypes.CREATE_COURSE:
        {
            _courses.push(action.course);
            CourseStore.emitChange();
            break;
        }

        case ActionTypes.UPDATE_COURSE:
        {
            var existingCourse = _.find(_courses, {id: action.course.id});
            var existingCourseIndex = _.indexOf(_courses, existingCourse);

            _courses.splice(existingCourseIndex, 1, action.course);
            CourseStore.emitChange();
            break;
        }

        case ActionTypes.DELETE_COURSE:
        {
            _.remove(_courses, {id: action.id});
            CourseStore.emitChange();
            break;
        }

        default:
        {

        }
    }
});

module.exports = CourseStore;