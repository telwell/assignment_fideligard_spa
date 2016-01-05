var app = angular.module( 'fideliguardSPA',['ui.router', 'rzModule'] );

app.config(function($stateProvider, $urlRouterProvider) {

	// Set the default
	$urlRouterProvider.otherwise('');

	// set up some states on $stateProvider
	$stateProvider

		.state('index', {
			url: '',
			views: {
				'stocks': {
					templateUrl: 'js/templates/stocks.html', 
					controller: 'StocksCtrl'
				},
				'main': {
					templateUrl: 'js/templates/main/_main.html',
					controller: 'TradeCtrl'
				}
			}
		})

		// QUESTION: I don't know what was going wrong here, 
		// but having the template named 'portfolio.html' was giving me
		// errors, I had to change the name for some unknown reason.
		.state('index.portfolio', {
			url: '/portfolio',
			templateUrl: 'js/templates/main/_portfolio.html',
			controller: 'PortfolioCtrl'
		})

		.state('index.trade', {
			url: '/trade/:symb',
			templateUrl: 'js/templates/main/trade.html',
			controller: 'TradeCtrl'
		})

		// QUESTION: Same thing here! Had to rename to _transactions.
		.state('index.transactions', {
			url: '/transactions',
			templateUrl: 'js/templates/main/_transactions.html',
			controller: 'TransactionsCtrl'
		})

});

// Error Logging
app.run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});