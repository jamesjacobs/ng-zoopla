// Define our app's controllers
var propertyControllers = angular.module('propertyControllers', []);

// Create our HomeCtrl and inject its dependancies 
propertyControllers.controller('HomeCtrl', ['$scope', 'SearchData', '$location', 
    function($scope, SearchData, $location) {

        // Set scopes defaults for the search
        $scope.radius = 1;
        $scope.minBeds = 1;
        $scope.minPrice = 50000;
        $scope.maxPrice = 100000;

        // When a search is performed, perform basic validation and set submitted data
        $scope.searchForm = function() {

            if ($scope.maxPrice < $scope.minPrice) {

                alert("Error - Maximum price must be greater than the minimum price");

            } else {

                SearchData.set('postcode', $scope.postcode);
                SearchData.set('radius', $scope.radius);
                SearchData.set('minBeds', $scope.minBeds);
                SearchData.set('minPrice', $scope.minPrice);
                SearchData.set('maxPrice', $scope.maxPrice);

                $scope.slide = 'slide-left';
                $location.path('/properties');
            }
        }
}]);

// Create our PropertyListCtrl and inject its dependancies 
propertyControllers.controller('PropertyListCtrl', ['$scope', 'Zoopla', 'SearchData', '$location',
    function($scope, Zoopla, SearchData, $location) {

        $scope.properties = {};

        // Go to the selected property (see the ng-click in property-list.html)
        $scope.go = function(path){
          $scope.slide = 'slide-left';
          $location.path(path);
        }

        // Get properites based on search details from API
        Zoopla.getProperties(
            {
                postcode: SearchData.get('postcode'),
                radius: SearchData.get('radius'),
                minBeds: SearchData.get('minBeds'),
                minPrice: SearchData.get('minPrice')

            }, function(responce) {

                if (responce.result_count === 0) { 
                    alert("No listings found");
                    $location.path('/home');
                }

                else if (responce.listing) {
                    $scope.properties = responce.listing;
                }

                else if (responce.error_string) {
                    alert(responce.error_string);
                    $location.path('/home');
                }
        });

}]);

// Create our PropertyDetailCtrl and inject its dependancies 
propertyControllers.controller('PropertyDetailCtrl', ['$scope', 'Zoopla', '$routeParams',
    function($scope, Zoopla, $routeParams) {
        
        // Grab the selected property ID from the URL
        $scope.propertyId = $routeParams.propertyId;

        // Get the individual property details from the API
        Zoopla.getProperty(
            {
                propertyId: $scope.propertyId
                
            }, function(responce) {

                if (responce.listing[0]) {
                    $scope.property = responce.listing[0];
                } else {
                    alert("Property not found");
                }

            });
}]);