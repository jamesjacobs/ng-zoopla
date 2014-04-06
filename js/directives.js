propertyApp.directive('backButton', function() {

	return {
		restrict: 'A',
		template: '<a href="" class="back-button"><span class="topcoat-icon icon-back"></span></a>',

		link: function(scope, element, attrs) {
		    element.on('click', function() {
		        scope.slide = 'slide-right';
		        history.back();
		        scope.$apply();
		    });
		 }
	}
});

propertyApp.directive('searchButton', ["$location", function($location) {

	return {
		restrict: 'A',
		template: '<a class="topcoat-icon-button--quiet"><span class="topcoat-icon icon-search"></span></a>',

		link: function(scope, element, attrs) {
		    element.on('click', function() {
		    	scope.slide = 'slide-left';
		    	$location.path('/home');
		    	scope.$apply();
		    });
		 }
	}
}]);
