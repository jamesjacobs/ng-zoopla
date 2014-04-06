<?php
header('content-type: application/json; charset=utf-8');

/**
 * Retrive list of properties from the Zoopla API based on parameters
 * and serve the results as either JSON or JSONP
 * No exception/error handling or data sanitisation is included for 
 * the purposes of the demo.
 */


/**
 * Set up - your API key
 */
$zooplaKey = "INSERT_YOUR_API_KEY_HERE";


/**
 * Grab the mandatory parameters
 */
$postcode = $_GET['postcode'];
$minimum_beds = $_GET['minimum_beds'];


/**
 * Set defaults
 */
if (isset($_GET['minimum_price'])) {
	$minimum_price = $_GET['minimum_price'];	
} else {
	$minimum_price = '0';
}

if (isset($_GET['maximum_price'])) {
	$maximum_price = $_GET['maximum_price'];
} else {
	$maximum_price = '100000';
}

if (isset($_GET['radius'])) {
	$radius = $_GET['radius'];  
} else {
	$radius = '0.2';
}


/**
 * Data for the API call
 * @var array
 */
$sendData = array('api_key' => $zooplaKey,
	'area' => $postcode,
	'radius' =>  $radius,
	'minimum_beds' => $minimum_beds,
	'minimum_price' => $minimum_price,
	'maximum_price' => $maximum_price,
	'order' => "price",
	'ordering' => "ascending",
	'output_type' => "town");


/**
 * Retrive property list JSON from Zoopla API
 * @var string
 */
$curl = curl_init();
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_URL, 'http://api.zoopla.co.uk/api/v1/property_listings.js?'.http_build_query($sendData));
curl_setopt($curl, CURLOPT_POSTFIELDS, $sendData);
curl_setopt($curl, CURLOPT_HTTPGET, true);
curl_setopt($curl, CURLOPT_HEADER, false);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
$json = curl_exec($curl);
curl_close($curl);


/**
 * Provide either JSON or JSONP depending on type of call
 */
echo isset($_GET['callback']) ? "{$_GET['callback']}($json)": $json;
?>