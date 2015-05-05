describe('controllers:main', function() {

	var $scope, mainCtrl, Users, usersData, $controller, $rootScope;

	beforeEach(module('app'));

	beforeEach(inject(function(usersResources) {
		Users = usersResources('users.example.com');
		usersData = [
			{
				id: 0,
				name: "Bartek",
				surname: "Kowalski1",
				birthDate: 133999200000,
				mobile: 123456789,
				address: "Poznań",
			},
			{
				id: 1,
				name: "Anna",
				surname: "Nowak",
				birthDate: 454975200000,
				mobile: 1234568,
				address: "Kraków"
			},
			{
				id: 2,
				name: "Jonasz",
				surname: "Kura",
				birthDate: 55116000000,
				mobile: 1234568,
				address: "Kutno"
			}
		];
	}));

	beforeEach(inject(function(_$controller_, _$rootScope_){
		$controller = _$controller_;
		$rootScope = _$rootScope_;
		$scope = $rootScope.$new();

		mainCtrl = $controller('main', {
			$scope: $scope,
			Users: Users
		});
	}));

	it('checked property is empty on init', function() {
		expect($scope.checked).toEqual({});
	});

	it('Refresh method calls findAll', function() {
		spyOn(Users, 'findAll').and.callThrough();
		$scope.refresh();
		expect(Users.findAll).toHaveBeenCalled();
	});

	it('Check method works', function() {
		$scope.users = usersData;
		$scope.users[0].checked = true;
		$scope.users[1].checked = true;
		$scope.$digest();
		$scope.check();
		expect($scope.checked.length).toEqual(2);
	});

	it('check property is removed before saving in db', function() {
		$scope.users = usersData;
		var user = $scope.users[0];
		user.checked = true;
		$scope.$digest();
		$scope.edit(user);
		expect(user.checked).toBeUndefined();
	});

	it('Calling delete removes user from scope', function() {
		$scope.users = usersData;
		$scope.removeUserFromScope(0);
		$scope.removeUserFromScope(2);
		expect($scope.users.length).toEqual(1);
	});

	it('editAll calls edit method for each item', function() {
		spyOn($scope, 'edit').and.callThrough();
		$scope.users = usersData;
		$scope.users[0].checked = true;
		$scope.users[1].checked = true;
		$scope.$digest();
		$scope.check();
		$scope.editAll();
		expect($scope.edit.calls.count()).toEqual(2);
	});
});





