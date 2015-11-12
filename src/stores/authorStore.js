"use strict";

var Dispatcher = require('../appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter; // For broadcasting a given event
var assign = require('object-assign');
var _ = require('lodash');

var CHANGE_EVENT = 'change';

var _authors = [];

// The below statement has the following meaning
// Take an empty object, add the event emitter prototype capability and further
// add our custom behaviour (three methods
// 1. Add change listener
// 2. Remove change listener
// 3. Emit change
// These three methods are common to any store
var AuthorStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeChangeListener(CHANGE_EVENT, callback);
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    getAllAuthors: function() {
        return _authors;
    },

    getAuthorById: function(id) {
      return _.find(_authors, {id: id});
    }
});

// Private section which is not exposed to the public
Dispatcher.register(function(action) {
    switch (action.actionType) {
        case ActionTypes.CREATE_AUTHOR: {
            _authors.push(action.author);

            // Whenever the store changes, emit a change
            AuthorStore.emitChange();
        }
    }
});

module.exports = AuthorStore;