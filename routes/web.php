<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Index');
Route::inertia('/login', 'Login');
Route::inertia('/product/1', 'ProductDetail');

// Route::get('/login', function () {
//     return inertia('Login');
// });

// Route::get('/product/1', function () {
//     return inertia('ProductDetail');
// });

