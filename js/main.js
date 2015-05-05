angular.module('app', ['services', 'directives', 'mockBackend'])
.factory('Users', ['usersResources', function (usersRes){
	return usersRes('users.example.com');
}]);