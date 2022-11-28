<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//User
Route::match(['post'],          'users-data',                               ['as' => 'users-data',              'uses' => 'api\UserApiController@getUserData']);
Route::match(['get', 'post'],   'users/ajaxAction',                         ['as' => 'ajaxAction',              'uses' => 'api\UserApiController@ajaxAction']);
Route::match(['get', 'post'],   'get-user-details',                         ['as' => 'get-user-details',        'uses' => 'api\UserApiController@getUserDetails']);
Route::match(['get', 'post'],   'remove-user',                              ['as' => 'remove-user',             'uses' => 'api\UserApiController@removeUser']);


//Division
Route::match(['post'],          'division-data',                            ['as' => 'division-data',           'uses' => 'api\DivisionApiController@getDivisionData']);
Route::match(['post'],          'division/ajaxAction',                      ['as' => 'ajaxAction',              'uses' => 'api\DivisionApiController@ajaxAction']);
Route::match(['post'],          'get-division-details',                     ['as' => 'get-division-details',    'uses' => 'api\DivisionApiController@getDivisionDetails']);
Route::match(['post'],          'remove-division',                          ['as' => 'remove-division',         'uses' => 'api\DivisionApiController@removeDivision']);
Route::match(['post'],          'get-division-name',                        ['as' => 'get-division-name',       'uses'  => 'api\DivisionApiController@getDivisionName']);

//Scheme
Route::match(['post'],          'scheme-data',                              ['as' => 'scheme-data',             'uses' => 'api\SchemeApiController@getSchemeData']);
Route::match(['post'],          'scheme/ajaxAction',                        ['as' => 'ajaxAction',              'uses' => 'api\SchemeApiController@ajaxAction']);
Route::match(['post'],          'get-scheme-details',                       ['as' => 'get-scheme-details',      'uses' => 'api\SchemeApiController@getSchemeDetails']);
Route::match(['post'],          'remove-scheme',                            ['as' => 'remove-scheme',           'uses' => 'api\SchemeApiController@removeScheme']);
Route::match(['post'],          'get-scheme-name',                          ['as' => 'get-scheme-name',         'uses' => 'api\SchemeApiController@getSchemeName']);

//Sub-Scheme
Route::match(['post'],          'sub-scheme-data',                          ['as' => 'sub-scheme-data',         'uses'  => 'api\SubSchemeApiController@getSubSchemeData']);
Route::match(['post'],          'sub-scheme/ajaxAction',                    ['as' => 'ajaxAction',              'uses'  => 'api\SubSchemeApiController@ajaxAction']);
Route::match(['post'],          'get-sub-scheme-details',                   ['as' => 'get-sub-scheme-details',  'uses'  => 'api\SubSchemeApiController@getSubSchemeDetails']);
Route::match(['post'],          'get-sub-scheme-name',                      ['as' => 'get-sub-scheme-name',     'uses'  => 'api\SubSchemeApiController@getSubSchemeName']);
Route::match(['post'],          'remove-sub-scheme',                        ['as' => 'remove-sub-scheme',       'uses'  => 'api\SubSchemeApiController@removeSubScheme']);

//customer
Route::match(['post'],          'customer-data',                            ['as' => 'customer-data',           'uses' => 'api\CustomerApiController@getCustomerData']);
Route::match(['post'],          'customer/ajaxAction',                      ['as' => 'ajaxAction',              'uses' => 'api\CustomerApiController@ajaxAction']);
Route::match(['post'],          'get-customer-details',                     ['as' => 'get-customer-details',    'uses' => 'api\CustomerApiController@getCustomerDetails']);
Route::match(['post'],          'remove-customer',                          ['as' => 'remove-customer',         'uses'  => 'api\CustomerApiController@removeCustomer']);

Route::match(['post'],          'transaction-data',                         ['as' => 'transaction-data',        'uses' => 'api\CustomerTransactionApiController@getTransactionData']);
Route::match(['post'],          'customertransaction/ajaxAction',           ['as' => 'ajaxAction',              'uses' => 'api\CustomerTransactionApiController@ajaxAction']);
Route::match(['post'],          'customertransaction-data',                 ['as' => 'customertransaction-data','uses' => 'api\CustomerTransactionApiController@getCustomertransactionData']);
Route::match(['post'],          'get-customertransaction-details',          ['as' => 'get-customertransaction-details', 'uses' => 'api\CustomerTransactionApiController@getCustomertransactionDetails']);

Route::match(['post'],          'vyavahar-data',                            ['as' => 'vyavahar-data',           'uses' => 'api\CustomerTransactionApiController@getVyavaharData']);
Route::match(['post'],          'vyavahar/ajaxAction',                      ['as' => 'ajaxAction',              'uses' => 'api\CustomerTransactionApiController@ajaxAction']);
Route::match(['post'],          'customertransactionloan/ajaxAction',       ['as' => 'ajaxAction',                          'uses'  => 'api\CustomerTransactionApiController@ajaxAction']);

//FD
Route::match(['post'],         'fd/ajaxAction',                             ['as' => 'ajaxAction',              'uses'  => 'api\CustomerTransactionApiController@ajaxAction']);

//REPORTS
Route::match(['post'],          'reports-data',                             ['as' => 'reports-data',            'uses' => 'api\ReportsApiController@getReportsData']);

//Vasulat
// Route::match(['post'],          'customertransactionloan-data',             ['as' => 'customertransactionloan-data',        'uses'  => 'api\CustomerTransactionApiController@getCustomertransactionloanData']);
// Route::match(['post'],          'get-customertransactionloan-details',      ['as' => 'get-customertransactionloan-details', 'uses'  => 'api\CustomerTransactionApiController@getCustomertransactionloanDetails']);
Route::match(['post'],          'loan-transaction-data',                    ['as' => 'loan-transaction-data',      'uses' => 'api\ReportsApiController@getLoanTransactionData']);
Route::match(['post'],          'get-customer-name',                        ['as' => 'get-customer-name',          'uses'  => 'api\CustomerApiController@getCustomerName']);
Route::match(['post'],          'get-total-customer-account',               ['as' => 'get-total-customer-account', 'uses'  => 'api\CustomerApiController@getTotalCustomerAccount']);

