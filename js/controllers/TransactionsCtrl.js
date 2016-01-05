app.controller('TransactionsCtrl', ['$scope', '$stateParams', '$window', '$location', 'stocks', 'date', 'profile', function($scope, $stateParams, $window, $location, stocks, date, profile) {

	$scope.currentPage = 'transactions';

	$scope.go = function (page) {
		$location.path('/' + page);
	}

	$scope.transactions = profile.info.transactions;

}]);