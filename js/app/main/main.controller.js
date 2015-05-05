angular.module('app')
.controller('main', ['$scope', 'Users', '$filter', function ($scope, Users, $filter) {
	//store checked users
	$scope.checked = {};

	$scope.edit = function(data) {
		delete data.checked; //remove property added only for temporary needs, don't save it to model
		return Users.edit(data).then(function(resp) {
			console.log('saved', resp.data);

		});
	};

	$scope.refresh = function() {
		Users.findAll().then(function(resp) {
			$scope.users = resp.data;
		});
	};

	$scope.check = function() {
		$scope.checked = $filter('filter')($scope.users, {checked: true});
	};

	$scope.editAll = function() {
		//separate ajax call for every edited item is not efficent, all edited items should be sent in one ajax call
		//but according to web service specification there is no such method that accepts multiple edited documents
		angular.forEach($scope.checked, function(val) {
			$scope.edit(val).then(function() {
				val.checked = false;
			});
		});
	};

	$scope.removeUserFromScope = function(id) {
		var removed = $filter('filter')($scope.users, {id: id});
		var index = $scope.users.indexOf(removed[0]);
		$scope.users.splice(index, 1);
	}

	$scope.delete = function(user) {
		Users.remove(user).then(function(resp) {
			console.log("deleted", resp.data);
			$scope.removeUserFromScope(user.id);
		});
	};

	$scope.refresh();
}]);
