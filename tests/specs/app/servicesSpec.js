describe('services:usersResources', function() {

	var responseData, backend, http, Users;

	beforeEach(module('services'));

	beforeEach(angular.mock.inject(function($httpBackend) {
		backend = $httpBackend;
	}));

	beforeEach(angular.mock.inject(function(usersResources) {
		Users = usersResources('users.example.com');
		responseData = {};

	}));

	afterEach(function() {
		backend.verifyNoOutstandingRequest();
		backend.verifyNoOutstandingExpectation();
	});

	describe('findAll', function() {
		beforeEach(function() {
			backend.expectGET('users.example.com/findall')
			.respond([
				{
					id: 0,
					name: 'Bartek',
					surname: 'Kowalski1',
					birthDate: 133999200000,
					mobile: 123456789,
					address: 'Poznań'
				},
				{
					id: 1,
					name: 'Anna',
					surname: 'Nowak',
					birthDate: 454975200000,
					mobile: 1234568,
					address: 'Kraków'
				},
				{
					id: 2,
					name: 'Jonasz',
					surname: 'Kura',
					birthDate: 55116000000,
					mobile: 1234568,
					address: 'Kutno'
				}
			]);
		});

		it('Contain all expected items', function() {
			Users.findAll().then(function(resp) {
				responseData = resp.data;
			});
			backend.flush();
			expect(responseData.length).toEqual(3);
		});
	});

	describe('findAll with params', function() {
		beforeEach(function() {
			backend.expectGET('users.example.com/findall?ids=1,2')
			.respond([
				{
					id: 1,
					name: 'Anna',
					surname: 'Nowak',
					birthDate: 454975200000,
					mobile: 1234568,
					address: 'Kraków'
				},
				{
					id: 2,
					name: 'Jonasz',
					surname: 'Kura',
					birthDate: 55116000000,
					mobile: 1234568,
					address: 'Kutno'
				}
			]);
		});

		it('Contain all expected items', function() {
			Users.findAll([1,2]).then(function(resp) {
				responseData = resp.data;
			});
			backend.flush();
			expect(responseData.length).toEqual(2);
		});
	});

	describe('Edit', function () {
		var userData;
		beforeEach(function() {
			userData = {
				id: 2,
				name: 'Jonasz',
				surname: 'Kura',
				birthDate: 55116000000,
				mobile: 1234568,
				address: 'Kutno'
			};
			backend.whenPOST('users.example.com/edit/2',
				function(postData) {
					jsonData = JSON.parse(postData);
					expect(jsonData.mobile).toBe(userData.mobile);
					return true;
				}
			).respond(200, userData);
		});
		it('Correct data are sent with POST request', function() {
			Users.edit(userData).then(function(d) {
				expect(d.data).toEqual(userData);
			});
			backend.flush();
		});
	});

	describe('Delete', function () {
		var userData;
		beforeEach(function() {
			userData = {
				id: 2,
				name: 'Jonasz',
				surname: 'Kura',
				birthDate: 55116000000,
				mobile: 1234568,
				address: 'Kutno'
			};
			backend.whenPOST('users.example.com/remove/2').respond(200, userData);
		});
		it('Return removed user', function() {
			Users.remove(userData).then(function(d) {
				expect(d.data).toEqual(userData);
			});
			backend.flush();
		});
	});
});





