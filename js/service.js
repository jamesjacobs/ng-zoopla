// Factory for getting properties lists and individual propertyes based on search data
propertyApp.factory("Zoopla", function($resource, $log) {
	return {
		getProperties: function(data, onSuccess) {
			var properties = $resource("http://blog.jamesjacobs.me/demos/ng-zoopla/services/get_properties.php?", {
					callback: 'JSON_CALLBACK',
					postcode: (data.postcode) ? data.postcode:  'AA11AA',
					minimum_beds: (data.minBeds) ? data.minBeds:  '3',
					minimum_price: (data.minPrice) ? data.minPrice:  '50000',
					maximum_price: (data.maxPrice) ? data.maxPrice:  '100000',
					radius: (data.radius) ? data.radius:  '10',
				}, 

				{fetch : {method:'JSONP'}}
			);

			properties.fetch(
				function success(response) {
					//console.log(response);

					onSuccess(response);
				}, 
            	function error(response) {
            		console.log(response);
            		console.log("Error in getProperties service method");
            	}
			);
		},

		getProperty: function(data, onSuccess) {

			var property = $resource("http://blog.jamesjacobs.me/demos/ng-zoopla/services/get_property.php", {
					callback: 'JSON_CALLBACK',
					id: data.propertyId
				}, 

				{fetch : {method:'JSONP'}}
			);

			property.fetch(
				function success(response) {
					console.log(response);
					onSuccess(response);
				}, 
            	function error(response) {
            		console.log("Error in getProperty service method");
            	}
			);
		}
	};
});

// Service for the sharing of data between controllers, without using rootScope/global scope
propertyApp.service('SearchData', function() {

	var data = {};

	return {

		get: function(varname) {

			return (typeof data[varname] !== 'undefined') ? data[varname] : false;
		},

		set: function(varname, value) {
			data[varname] = value;
		}
	}
});