"use strict";

var Dispatcher = require('../appDispatcher');
var AuthorApi = require('../api/AuthorApi');
var ActionTypes = require('../constants/actionTypes');

var AuthorActions = {
    createAuthor: function(author) {
        var newAuthor = AuthorApi.saveAuthor(author);

        // This will dispatch an author created event/action to all the stores
        Dispatcher.dispatch({
            actionType: ActionTypes.CREATE_AUTHOR,
            author: newAuthor
        });
    },

    updateAuthor: function(author) {
        var updatedAuthor = AuthorApi.saveAuthor(author);

        Dispatcher.dispatch({
            actionType: ActionTypes.UPDATE_AUTHOR,
            author: updatedAuthor
        });
    },

    deleteAuthor: function(authorId) {
        AuthorApi.deleteAuthor(authorId);

        Dispatcher.dispatch({
            actionType: ActionTypes.DELETE_AUTHOR,
            id: authorId
        });
    }
};

module.exports = AuthorActions;