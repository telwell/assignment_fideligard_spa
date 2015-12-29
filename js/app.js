var app = angular.module( 'fideliguardSPA',['ui.router'] );

app.config(function($stateProvider, $urlRouterProvider) {

	// Set the default
	$urlRouterProvider.otherwise('');

	// set up some states on $stateProvider
	$stateProvider

		// General products view. I didn't specify a controller
		// b/c in my index I had to include the ProductsCtrl in 
		// order to have the filter work properly.
		.state('products', {
			url: '',
			templateUrl: 'js/templates/products.html',
			controller: 'ProductsCtrl'
		})

		// Individual product view
		.state('show', {
			url: '/show/:id',
			templateUrl: 'js/templates/product.html',
			controller: 'ProductCtrl'
		})

		// Cart view/update page
		.state('cart', {
			url: '/cart',
			templateUrl: 'js/templates/cart.html',
			controller: 'CartCtrl'
		})
});

// Error Logging
app.run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});