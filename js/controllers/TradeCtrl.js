app.controller('TradeCtrl', ['$scope', '$stateParams', '$window', '$location', 'stocks', 'date', 'profile', function($scope, $stateParams, $window, $location, stocks, date, profile) {

	$scope.stock = stocks.getCurrentStockInfo($stateParams.symb);

	$scope.profile = profile.info;

	$scope.currentPage = 'trade';

	$scope.go = function (page) {
		$location.path('/' + page);
	}

	if($scope.stock){
		$scope.formData = {
			symbol: $scope.stock.query.results.quote[0].Symbol, 
			orderDate: new Date($scope.stock.query.results.quote[0].Date), 
			orderPrice: parseFloat($scope.stock.query.results.quote[0].Close),
			cashAvailable: $scope.profile.cash,
			valid: false
		};
	}

	// Our custom validation for the form. Essentially we're looking
	// whether we're buying or selling and then validating our responses
	// from there. 
	$scope.$watch(
		"formData.orderCost",
		function(value){
			if($scope.formData){
				// We're going to have different versions of valid  
				// when we're buying or selling so I'll separate
				// these out into different statements
				if( $scope.formData.buySell == 'buy'){
					$scope.formData.valid = (value <= $scope.formData.cashAvailable ? true : false);
				} else if( $scope.formData.buySell == 'sell'){

					// Make sure we have a portfolio AND
					// that we have enough stocks to trade.
					if($scope.profile){
						var currentStocks = $scope.profile.portfolio[$scope.formData.symbol].quantity;
						$scope.formData.valid = (currentStocks >= $scope.formData.quantity ? true : false);
					} else {
						$scope.formData.valid = false;	
					}
				} else {
					$scope.formData.valid = false;
				}
			}
		}
	);

	$scope.processForm = function(formIsValid){
		// Our regular validations are passed, these will
		// very rarely fail for now.
		if( formIsValid ){
			
			// These are our custom validations and are more likely to fail.
			if( $scope.formData.valid == true ){
				$scope.profile.transactions.push($scope.formData);

				// Because we only really need to do this when
				// another transaction happens.
				profile.updatePortfolio();
				$scope.profile.cash = $scope.profile.cash - $scope.formData.orderCost;
				$scope.formData = {};
				$location.path('transactions');
			} else {
				$window.alert("Not valid, try again!");
			}
		}
	}

}]);