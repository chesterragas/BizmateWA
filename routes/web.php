<?php

use Illuminate\Support\Facades\Route;

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
    return view('login');
})->name('login');

Route::get('/homemap', function () {
    return view('main');
})->middleware(['auth'])->name('main');

require __DIR__.'/auth.php';

Route::view('/{any}', 'main')
    ->middleware('auth')
    ->where('any', '.*');
