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

		.state('index.portfolio', {
			url: '/portfolio',
			templateUrl: 'js/templates/main/portfolio.html',
			controller: 'PortfolioCtrl'
		})

		.state('index.trade', {
			url: '/trade/:symb',
			templateUrl: 'js/templates/main/trade.html',
			controller: 'TradeCtrl'
		})

});

// Error Logging
app.run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});