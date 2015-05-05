angular.module('directives')
.directive('phone', [ function() {
	return {
		restrict: 'AE',
		require: "ngModel",
		link: function(scope, element, attr, ctrl) {
			//just basic simple phone number validation, it will not work for every phone number format
			var regex = /^\+*\d{6,12}$/;
			var validator = function(value){
				value += '';
				var formattedValue = value.replace(/[\. ,:-]+/g, '');
				var valid = regex.test(formattedValue);
				ctrl.$setValidity('phone', valid);
				return valid ? formattedValue : undefined;
			};

			ctrl.$parsers.push(validator);
			ctrl.$formatters.push(validator);
		}
	};
}]);