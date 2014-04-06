<?php
header('content-type: application/json; charset=utf-8');

/**
 * Retrive single property from the Zoopla API based on property ID
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
$id = $_GET['id'];


/**
 * Data for the API call
 * @var array
 */
$sendData = array('api_key' => $zooplaKey,
                  'listing_id' => $id);

/**
 * Retrive single property JSON from Zoopla API
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
echo isset($_GET['callback']) ? "{$_GET['callback']}($json)" : $json;
?>