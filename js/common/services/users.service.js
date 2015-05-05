angular.module('services')
.factory('usersResources', ['$http', function ($http) {
	return function(url) {
		var service = {
			findAll: function(ids) {
				var config = {};
				if (typeof ids !== 'undefined') {
					config = {params:{ids: ids.join()}};
				}
				return $http.get(url + '/findall', config);
				
			},
			find: function(id) {
				var config = {};
				if (typeof id !== 'undefined') {
					config = {params:{id: id}};
				}
				return $http.get(url + '/find', config);
			},
			edit: function(data) {
				return $http.post(url + '/edit/' + data.id, data);
			},
			remove: function(user) {
				var id = user.id;
				return $http.post(url + '/remove/' + id);
			}
		};
		//return object with public methods
		return service;
	}
}]);
