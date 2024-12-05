<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Index');
Route::inertia('/login', 'Login');
Route::inertia('/product/1', 'ProductDetail');
Route::inertia('/profile', 'Profile');
Route::inertia('/profile/shipping', 'Shipping');

// Route::get('/login', function () {
//     return inertia('Login');
// });

// Route::get('/product/1', function () {
//     return inertia('ProductDetail');
// });

