app.controller('DateCtrl', ['$scope', '$window', 'stocks', 'date', function($scope, $window, stocks, date) {
  

	$scope.dateSlider = {
		value: new Date('2015'), 
		options: {
			floor: new Date('2015').getTime(),
			ceil: new Date('2016').getTime(),
			translate: function(value) {
				return '';
			},
			hideLimitLabels: true
		}
	};

	$scope.$watch(
		"dateSlider.value",
		function(value){
			console.log("Send to date service");
			date.dateSet(value);
		}
	);

}]);