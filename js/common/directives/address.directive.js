angular.module("directives")
.directive('address', [ function() {
	return {
		restrict: 'AE',
		require: "ngModel",
		link: function(scope, element, attr, ctrl) {
			var parseAddress = function(value){
				var addressParams = value.split(',');
				var city = addressParams[0].trim();
				var street = addressParams[1];
				var streetRegex = /([^\d\s]{2,})\s+(\d+)/;
				var execResult = null;
				if (angular.isDefined(street)) {
					execResult = streetRegex.exec(street);
				}
				valid = (city !== '') && (execResult !== null);
				ctrl.$setValidity('address', valid);
				if (valid) {
					return {
						city: city,
						street: execResult[1],
						number: parseInt(execResult[2], 10)
					};
				}
			};

			function toString(value) {
				return value.city + ', ' + value.street + ' ' + value.number;
			}

			ctrl.$parsers.push(parseAddress);
			ctrl.$formatters.push(toString);
		}
	};
}]);

