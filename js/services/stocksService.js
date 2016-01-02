app.service('stocks', 
	['$http', function($http){
	
	var stockData = {};

	var addStockData = function(symb, data){
		stockData[symb] = data;
	}

	var getStockInfo = function(symb, startDate, endDate){
		return $http({
			method: 'GET',
			url: 'http://query.yahooapis.com/v1/public/yql?q= select * from yahoo.finance.historicaldata where symbol = "' + symb +'" and startDate = "'+ startDate +'" and endDate = "'+ endDate +'" &format=json &diagnostics=true &env=store://datatables.org/alltableswithkeys'
		});
	}

	var getCurrentStockInfo = function(symb){
		return stockData[symb];
	}

  return {
  	getStockInfo: getStockInfo, 
  	addStockData: addStockData,
  	getCurrentStockInfo: getCurrentStockInfo,
  	stockData: stockData  	
  }

}]);