"use strict";

var React = require('react');
var Router = require('react-router');
var routes = require('./routes');

// Note: Router.HistoryLocation will give you clean URLs (without # in the url path) but
// for this to work correctly we need to configure the server to support clean URLs i.e
// Redirect all the requests through client side index page. Without this I am facing the following issues
// 1. Refreshing a page like http://localhost:3000/author throws 404 error
// 2. Mutating the state via this.setState (for example this.setState({dirty:false}) during transition
// is not setting the state variables properly. May be this is due to the lack of server side configuration
// for the clean URLs

//Router.run(routes, Router.HistoryLocation, function (Handler) {
//    React.render(<Handler/>, document.getElementById('app'));
//});

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('app'));
});