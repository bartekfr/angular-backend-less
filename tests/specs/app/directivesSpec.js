describe('directives:phone', function() {
	var element, scope;

	beforeEach(module('directives'));
	beforeEach(inject(function($compile, $rootScope) {
		var linkingFn = $compile("<input ng-model='mobile' type='text' phone/>");
		scope = $rootScope;
		element = linkingFn(scope);
	}));

	it('Phone cannot be too short', function() {
		scope.mobile = 123;
		scope.$digest();
		expect(element.hasClass('ng-invalid-phone')).toBeTruthy();
	});

	it('Phone cannot be too long', function() {
		scope.mobile = 123123123123123;
		scope.$digest();
		expect(element.hasClass('ng-invalid-phone')).toBeTruthy();
	});

	it('Phone can be formatted with dashes', function() {
		scope.mobile = '123-345-789-123';
		scope.$digest();
		expect(element.hasClass('ng-invalid-phone')).toBeFalsy();
	});

	it('Phone can be formatted with spaces', function() {
		scope.mobile = '123 345 789 123';
		scope.$digest();
		expect(element.hasClass('ng-invalid-phone')).toBeFalsy();
	});

	it('Phone can start with +', function() {
		element.val('+123-456-789').triggerHandler('input');
		scope.$digest();
		expect(element.hasClass('ng-invalid-phone')).toBeFalsy();
	});

	it('Only digits are saved to model', function() {
		element.val('123-456-789').triggerHandler('input');
		scope.$digest();
		expect(scope.mobile == '123456789').toBeTruthy();
	});
});
describe('directives:date', function() {

	var element, scope;

	beforeEach(module('directives'));
	beforeEach(inject(function($compile, $rootScope) {
		var linkingFn = $compile("<input ng-model='date' type='text' date/>");
		scope = $rootScope;
		element = linkingFn(scope);
	}));

	it('Timestamp is converted to readable string before displaying', function() {
		scope.date = 133999200000;
		scope.$digest();
		var val = element.val();
		expect(val == '01-4-1974').toBeTruthy();
	});

	it('Timestamp is saved to model', function() {
		element.val('01-10-1971').triggerHandler('input');
		scope.$digest();
		expect(scope.date == 55116000000).toBeTruthy();
	});

	it('Month cannot be greater than 12', function() {
		element.val('01-13-1971').triggerHandler('input');
		scope.$digest();
		expect(element.hasClass('ng-invalid-date')).toBeTruthy();
	});

	it('Days cannot be greater than 31', function() {
		element.val('33-1-1971').triggerHandler('input');
		scope.$digest();
		expect(element.hasClass('ng-invalid-date')).toBeTruthy();
	});
})
describe('directives:address', function() {

	var element, scope;

	beforeEach(module('directives'));
	beforeEach(inject(function($compile, $rootScope) {
		var linkingFn = $compile("<input ng-model='address' type='text' address/>");
		scope = $rootScope;
		element = linkingFn(scope);
	}));

	it('Address from model is converted to string', function() {
		scope.address = {
			city: 'Krakow',
			street: 'Sukiennice',
			number: '33'
		}
		scope.$digest();
		var val = element.val();
		expect(val == 'Krakow, Sukiennice 33').toBeTruthy();
	});

	it('Address string os converted to object', function() {
		element.val('Krakow, Sukiennice 12').triggerHandler('input');
		scope.$digest();
		var address = {
			city: 'Krakow',
			street: 'Sukiennice',
			number: 12
		}
		expect(scope.address).toEqual(address);
	});
	it('Only city is not enough', function() {
		element.val('Poznan').triggerHandler('input');
		scope.$digest();
		expect(element.hasClass('ng-invalid-address')).toBeTruthy();
	});

	it('City and street name is still not enough', function() {
		element.val('Poznan, warszawska').triggerHandler('input');
		scope.$digest();
		expect(element.hasClass('ng-invalid-address')).toBeTruthy();
	});

	it('You must eneter whole address', function() {
		element.val('Poznan, warszawska 22').triggerHandler('input');
		scope.$digest();
		expect(element.hasClass('ng-valid-address')).toBeTruthy();
	});

	it('You will not trick me by empty city', function() {
		element.val(', warszawska 22').triggerHandler('input');
		scope.$digest();
		expect(element.hasClass('ng-invalid-address')).toBeTruthy();
	});

	it('Street name must have only letters, not numbers', function() {
		element.val('Poznan, 22sss3 22').triggerHandler('input');
		scope.$digest();
		expect(element.hasClass('ng-invalid-address')).toBeTruthy();
	});

});





