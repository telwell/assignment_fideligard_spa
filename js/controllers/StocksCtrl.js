app.controller('StocksCtrl', ['$scope', '$window', 'stocks', 'date', function($scope, $window, stocks, date) {

	var symbols = ['AAPL', 'GOOG', 'JBLU', 'FB', 'LNKD', 'WMT', 'BAMM'];

	$scope.stockData = stocks.stockData;

	$scope.dateInfo = date.getInfo();

	$scope.stockFilter = '';

	$scope.$watch(
		'dateInfo.date',
		function(endDate){

			// 31 days in the past
			var startDate = new Date(endDate - 2678400000);
			endDate = new Date(endDate);

			// Wow that was annoying to force everything into YQL. I'll
			// need to refactor this later on.
			var finalDates = { start: {}, end: {} };

			finalDates.start.year = startDate.getFullYear().toString();
			finalDates.start.month = (startDate.getMonth() + 1).toString();
			finalDates.start.day = startDate.getDate().toString();

			finalDates.end.year = endDate.getFullYear().toString();
			finalDates.end.month = (endDate.getMonth() + 1).toString();
			finalDates.end.day = endDate.getDate().toString();
			
			if(finalDates.start.month.length == 1){ finalDates.start.month = "0" + finalDates.start.month }
			if(finalDates.start.day.length == 1){ finalDates.start.day = "0" + finalDates.start.day }
			if(finalDates.end.month.length == 1){ finalDates.end.month = "0" + finalDates.end.month }
			if(finalDates.end.day.length == 1){ finalDates.end.day = "0" + finalDates.end.day }
			
			finalStart = finalDates.start.year + "-" + finalDates.start.month + "-" + finalDates.start.day;
			finalEnd = finalDates.end.year + "-" + finalDates.end.month + "-" + finalDates.end.day;

			for(var i=0;i<symbols.length;i++){
				stocks.getStockInfo(symbols[i], finalStart, finalEnd).then(function(response) {
					$window.console.log("Stock found!");
					stocks.addStockData(response.data.query.results.quote[0].Symbol, response.data);
				}, function(response) {
					$window.console.log(response);
				});
			}

		}
	);

}]);