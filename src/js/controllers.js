'use strict';

angular.module('myApp.controllers', []).controller('IssueCtrl', function ($scope, $http) {

	$http.get('https://api.github.com/repos/angular/angular.js/issues?state=open&sort=updated&page=1&per_page=100&assignee=*').success(function(issues){
		var assignees = [];
		var data = [];

		issues.forEach(function(issue){
			assignees.push({category: issue.assignee.login});
		});

		assignees = _.groupBy(assignees, function(assignee){return assignee.category; });

		assignees = _.sortBy(assignees, function(assignee){return assignee.length; }).reverse();

		assignees = assignees.slice(0, 10);

		assignees.forEach(function(assignee){
			data.push({catergory: assignee[0].category, value: assignee.length});
		});

		$scope.data = data;
	});

	$scope.x = function(){
		return function(d){
			return d.catergory;
		};
	};

	$scope.y = function(){
		return function(d){
			return d.value;
		};
	};
});
