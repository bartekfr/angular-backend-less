angular.module('directives')
.directive('date', ['$filter', function($filter) {
	return {
		restrict: 'AE',
		require: 'ngModel',
		link: function(scope, element, attr, ctrl) {
			function checkIfValidDate(date) {
				return !isNaN(date);
			}

			function checkIfValidFormat(date) {
				//Date object is created even if values exceed month or day ranges
				return date[0] <= 31 && date[1] <= 12;			
			}

			function toDate(val) {
				var dateArr = val.split('-');
				var date = new Date(dateArr[2], dateArr[1] - 1, dateArr[0]).getTime();
				var validDate = checkIfValidDate(date);
				var validReadableFormat = checkIfValidFormat(dateArr);
				var valid = validDate && validReadableFormat;
				ctrl.$setValidity('date', valid);
				return valid ? date : undefined;
			}

			function toString(val) {
				//assume value stored in db is valid
				return $filter('date')(val, 'dd-M-yyyy');
			}

			ctrl.$formatters.push(toString);
			ctrl.$parsers.push(toDate);
		}
	};
}]);