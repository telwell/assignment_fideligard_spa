app.service('profile', 
	['$http', function($http){
	
	var info = {
		cash: 100000, 
		transactions: [],
		portfolio: {}
	};

	var updatePortfolio = function(){
		info.portfolio = {};

		angular.forEach(info.transactions, function(transaction){
			
			// The symbol is already in our portfolio.
			if(info.portfolio[transaction.symbol]){
				
				// If this is a BUY
				if(transaction.buySell == 'buy'){
					info.portfolio[transaction.symbol].quantity += transaction.quantity;
					info.portfolio[transaction.symbol].total += (transaction.orderPrice * transaction.quantity);

				// SELL SELL SELL!!
				} else {
					
					// QUESTION: This is a doozy. I'm essentially trying to make profit the total sale price
					// minus the average price for those shares up to this point.
					info.portfolio[transaction.symbol].rawProfit += (transaction.orderPrice * transaction.quantity) - ((info.portfolio[transaction.symbol].total/info.portfolio[transaction.symbol].quantity) * transaction.quantity);
					info.portfolio[transaction.symbol].quantity -= transaction.quantity;
					info.portfolio[transaction.symbol].total -= transaction.orderPrice * transaction.quantity;
				}

			// Otherwise it's a new symbol
			} else {
				info.portfolio[transaction.symbol] = {
					quantity: transaction.quantity,
					total: (transaction.orderPrice * transaction.quantity),
					rawProfit: 0
				}
			}
		});
	}

	var getPortfolio = function(){
		return info.portfolio;
	}

  return {
  	info: info, 
  	updatePortfolio: updatePortfolio,
  	getPortfolio: getPortfolio
  }

}]);