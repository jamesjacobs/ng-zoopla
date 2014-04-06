'use strict';

// Define our app and specify the module dependencies our app will use
var propertyApp = angular.module('propertyApp', [
	'ngResource',
	'ngRoute',
	'ngAnimate',
	'propertyControllers',
	'truncate'
]);

// Configure routes and bind templates and controllers to URLs
propertyApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/home', {
			templateUrl: 'partials/home.html',
			controller: 'HomeCtrl'
		}).
		when('/properties', {
			templateUrl: 'partials/property-list.html',
			controller: 'PropertyListCtrl'
		}).
		when('/properties/:propertyId', {
			templateUrl: 'partials/property-detail.html',
			controller: 'PropertyDetailCtrl'
		}).
		otherwise({
			redirectTo: 'home'
		});

	}]);

// Configure a custom Filter to change telephone numbers into a callable tel link
propertyApp.filter('telLink', function() {
	return function(tel) {

		// To avoid interpolating error
		if(tel) {

			// Remove any leading zeros
			if(tel.charAt(0) === '0') {
	    		tel = tel.substr(1);
	    	}

	    	tel = "44" + tel;

	    	// Remove any internal whiespace
	    	return tel.replace(" ", "");
		}
	}
});