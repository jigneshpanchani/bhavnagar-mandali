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
Route::match(['post'],          'users-data',                        ['as' => 'users-data',        'uses' => 'api\UserApiController@getUserData']);
Route::match(['get', 'post'],   'users/ajaxAction',                  ['as' => 'ajaxAction',        'uses' => 'api\UserApiController@ajaxAction']);
Route::match(['get', 'post'],   'get-user-details',                  ['as' => 'get-user-details',  'uses' => 'api\UserApiController@getUserDetails']);
Route::match(['get', 'post'],   'remove-user',                       ['as' => 'remove-user',        'uses' => 'api\UserApiController@removeUser']);


  //Division
Route::match(['post'],          'division-data',                     ['as' => 'division-data',          'uses' => 'api\DivisionApiController@getDivisionData']);
Route::match(['post'],          'division/ajaxAction',               ['as' => 'ajaxAction',             'uses' => 'api\DivisionApiController@ajaxAction']);
Route::match(['post'],          'get-division-details',              ['as' => 'get-division-details',   'uses' => 'api\DivisionApiController@getDivisionDetails']);
Route::match(['post'],          'remove-division',                   ['as' => 'remove-division',        'uses' => 'api\DivisionApiController@removeDivision']);
Route::match(['post'],          'get-divison-name',                  ['as' => 'get-divison-name',        'uses'  => 'api\DivisionApiController@getDivisonName']);   

  //Sceme
Route::match(['post'],          'sceme-data',                        ['as' => 'sceme-data',                'uses' => 'api\ScemeApiController@getScemeData']);
Route::match(['post'],          'sceme/ajaxAction',                  ['as' => 'ajaxAction',                'uses' => 'api\ScemeApiController@ajaxAction']);
Route::match(['post'],          'get-sceme-details',                 ['as' => 'get-sceme-details',         'uses' => 'api\ScemeApiController@getScemeDetails']);
Route::match(['post'],          'remove-sceme',                      ['as' => 'remove-sceme',              'uses' => 'api\ScemeApiController@removeSceme']);
Route::match(['post'],          'get-sceme-name',                    ['as' => 'get-sceme-name',            'uses' => 'api\ScemeApiController@getScemeName']);

    //Sub-Sceme
Route::match(['post'],          'sub-sceme-data',                     ['as' => 'sub-sceme-data',          'uses'  => 'api\SubScemeApiController@getSubScemeData']);
Route::match(['post'],          'sub-sceme/ajaxAction',               ['as' => 'ajaxAction',              'uses'  => 'api\SubScemeApiController@ajaxAction']);   
Route::match(['post'],          'get-sub-sceme-details',              ['as' => 'get-sub-sceme-details',   'uses'  => 'api\SubScemeApiController@getSubScemeDetails']); 
Route::match(['post'],          'get-sub-sceme-name',                 ['as' => 'get-sub-sceme-name',      'uses'  => 'api\SubScemeApiController@getSubScemeName']); 
Route::match(['post'],          'remove-sub-sceme',                   ['as' => 'remove-sub-sceme',        'uses'  => 'api\SubScemeApiController@removeSubSceme']);



   //customer
Route::match(['post'],          'customer-data',                       ['as' => 'customer-data',                 'uses' => 'api\CustomerApiController@getCustomerData']); 
Route::match(['post'],          'customer/ajaxAction',                 ['as' => 'ajaxAction',                    'uses' => 'api\CustomerApiController@ajaxAction']); 
Route::match(['post'],          'get-customer-details',                ['as' => 'get-customer-details',          'uses' => 'api\CustomerApiController@getCustomerDetails']);
Route::match(['post'],          'remove-customer',                     ['as' => 'remove-customer',               'uses'  => 'api\CustomerApiController@removeCustomer']);


Route::match(['post'],          'transaction-data',                    ['as' => 'transaction-data',                   'uses' => 'api\CustomerTransactionApiController@getTransactionData']); 
Route::match(['post'],          'customertransaction/ajaxAction',      ['as' => 'ajaxAction',                         'uses' => 'api\CustomerTransactionApiController@ajaxAction']);
Route::match(['post'],          'customertransaction-data',            ['as' => 'customertransaction-data',           'uses' => 'api\CustomerTransactionApiController@getCustomertransactionData']);  
Route::match(['post'],          'get-customertransaction-details',     ['as' => 'get-customertransaction-details',    'uses' => 'api\CustomerTransactionApiController@getCustomertransactionDetails']);  


Route::match(['post'],          'customertransactionloan/ajaxAction',    ['as' => 'ajaxAction',                            'uses'  => 'api\CustomerTransactionApiController@ajaxAction']);
Route::match(['post'],          'customertransactionloan-data',          ['as' => 'customertransactionloan-data',          'uses'  => 'api\CustomerTransactionApiController@getCustomertransactionloanData']);  
Route::match(['post'],          'get-customertransactionloan-details',   ['as' => 'get-customertransactionloan-details',   'uses'  => 'api\CustomerTransactionApiController@getCustomertransactionloanDetails']); 
Route::match(['post'],          'get-customer-name',                     ['as' => 'get-customer-name',                     'uses'  => 'api\CustomerApiController@getCustomerName']);   

Route::match(['post'],          'vyavahar-data',                         ['as' => 'vyavahar-data',                         'uses' => 'api\CustomerTransactionApiController@getVyavaharData']); 
Route::match(['post'],          'vyavahar/ajaxAction',                   ['as' => 'ajaxAction',                            'uses' => 'api\CustomerTransactionApiController@ajaxAction']);

//FD
Route::match(['post'],         'fd/ajaxAction',                          ['as' => 'ajaxAction',                            'uses'  => 'api\CustomerTransactionApiController@ajaxAction']);

//REPORTS
Route::match(['post'],          'reports-data',                         ['as' => 'reports-data',                           'uses' => 'api\ReportsApiController@getReportsData']);

