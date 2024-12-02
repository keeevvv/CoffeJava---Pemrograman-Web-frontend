<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return inertia('Login');
});

Route::get('/product/1', function () {
    return inertia('ProductDetail');
});
