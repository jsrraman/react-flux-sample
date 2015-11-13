"use strict";

var React = require('react');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var Redirect = Router.Redirect;

var routes = (
	<Route name="app" path="/" handler={require('./components/app')}>
		<DefaultRoute handler={require('./components/homePage')} />
		<Route name="authors" handler={require('./components/author/authorPage')} />
		<Route name="addAuthor" path="author" handler={require('./components/author/manageAuthorPage')} />
		<Route name="manageAuthor" path="author/:id" handler={require('./components/author/manageAuthorPage')} />
		<Route name="courses" handler={require('./components/course/coursePage')}/>
		<Route name="addCourse" handler={require('./components/course/manageCoursePage')}/>
        <Route name="manageCourse" path="course/:id" handler={require('./components/course/manageCoursePage')} />
		<Route name="about" handler={require('./components/aboutPage')} />
		<NotFoundRoute handler={require('./components/notFoundPage')} />
		<Redirect from="about-us" to="about"/>
		<Redirect from="about/*" to="about"/>
	</Route>
);

module.exports = routes;