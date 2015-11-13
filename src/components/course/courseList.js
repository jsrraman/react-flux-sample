"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
//var AuthorActions = require('../../actions/authorActions');
var toastr = require('toastr');

var CourseList = React.createClass({
	propTypes: {
		courses: React.PropTypes.array.isRequired
	},

    //deleteCourse: function(id, event) {
    //    event.preventDefault();
    //    CourseActions.deleteCourse(id);
    //    toastr.success('Author Deleted');
    //},

	render: function() {
	var createAuthorRow = function(course) {
			return (
				<tr key={course.id}>
					<td><Link to="manageCourse" params={{id: course.id}}>{course.id}</Link></td>
					<td>{course.firstName} {course.lastName}</td>
				</tr>
			);
		};
		
		return (
			<div>
				<table className="table">
					<thead>
					    <th>Delete</th>
						<th>Title</th>
						<th>Author</th>
						<th>Category</th>
						<th>Length</th>
					</thead>
					<tbody>
						{this.props.courses.map(createAuthorRow, this)}
					</tbody>
				</table>
			</div>
			);
	}
});

module.exports = CourseList;