app.controller('TradeCtrl', ['$scope', '$stateParams', '$window', 'stocks', 'date', function($scope, $stateParams, $window, stocks, date) {

	$scope.title = "Trade";

	$scope.stock = stocks.getCurrentStockInfo($stateParams.symb);

}]);