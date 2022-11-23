<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\admin;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('auth.login');
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified'
])->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');
});


Route::resource('users', 'UserController');

Route::resource('division', 'DivisionController');

Route::resource('sceme', 'ScemeController');

Route::resource('sub-sceme', 'SubScemeController');

Route::resource('customer', 'CustomerController');

Route::resource('customertransaction', 'CustomerTransacionVyavharController');

Route::resource('reports', 'ReportsController');

Route::resource('vyaj-ganatri', 'VyajGanatriController');
// Route::get('customer/customertransation/{id}', [\App\Http\Controllers\admin\CustomerTransacionVyavharController::class, 'customertransation']);







