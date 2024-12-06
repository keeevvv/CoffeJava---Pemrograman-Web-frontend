<?php
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Index');


Route::get('/login', [AuthController::class, 'showLogin'])->name('login.show');
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::get('/check-login', [AuthController::class, 'checkLogin']);

Route::inertia('/product/1', 'ProductDetail');

// Route::get('/login', function () {
//     return inertia('Login');
// });

// Route::get('/product/1', function () {
//     return inertia('ProductDetail');
// });

