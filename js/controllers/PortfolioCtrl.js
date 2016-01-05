app.controller('PortfolioCtrl', ['$scope', '$stateParams', '$window', '$location', 'stocks', 'date', 'profile', function($scope, $stateParams, $window, $location, stocks, date, profile) {

	$scope.currentPage = 'portfolio';

	$scope.go = function (page) {
		$location.path('/' + page);
	}

	$scope.portfolio = profile.getPortfolio();

	$scope.stockData = stocks.stockData;

	$scope.totals = {
		costBasis: 0,
		currentValue: 0,
		profitLoss: 0, 
		oneD: 0, 
		sevenD: 0, 
		thirtyD: 0
	}

}]);