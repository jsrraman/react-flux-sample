"use strict";

var Dispatcher = require('../appDispatcher');
var AuthorApi = require('../api/AuthorApi');
var ActionTypes = require('../constants/actionTypes');

var InitializeActions = {
    initApp: function() {
        Dispatcher.dispatch({
            actionType: ActionTypes.INITIALIZE,
            initialData: {
                authors: AuthorApi.getAllAuthors()
            }
        });
    }
};

module.exports = InitializeActions;