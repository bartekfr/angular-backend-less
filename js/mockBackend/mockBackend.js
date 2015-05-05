angular.module('mockBackend', ['ngMockE2E']).run(['$httpBackend', 'Model', function($httpBackend, Model) {
	//http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
	function getParameterByName(url, name) {
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(url);
		return results === null ? undefined : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
	//findAll
	$httpBackend.whenGET(/users.example.com\/findall/).respond(function(method, url, data) {
		var ids =getParameterByName(url, 'ids');
		if (typeof ids !== 'undefined') {
			ids = ids.split(',');
		}
		var users = Model.findAll(ids);
		return [200, users, {}];
	});
	//find specific item
	$httpBackend.whenGET(/users.example.com\/find/).respond(function(method, url, data) {
		var id =getParameterByName(url, 'id');
		var user = Model.find(id);
		return [200, user, {}];
	});

	//edit item
	$httpBackend.whenPOST(/users.example.com\/edit\/\d+/).respond(function(method, url, data) {
		var id = url.split('/')[2];
		var user = Model.edit(id, data);
		return [201, user];
	});

	//remove item
	$httpBackend.whenPOST(/users.example.com\/remove\/\d+/).respond(function(method, url, data) {
		var id = url.split('/')[2];
		var item = Model.remove(id);
		return [204, item, {}];
	});
}]);