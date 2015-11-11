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
            action: newAuthor
        });
    }
};

module.exports = AuthorActions;