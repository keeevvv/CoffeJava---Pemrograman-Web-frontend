<?php
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;




Route::get('/login', [AuthController::class, 'showLogin'])->name('login.show');
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::get('/check-login', [AuthController::class, 'checkLogin']);

Route::get('/product/1', [AuthController::class, 'showProductDetail'])->name('product.detail');
Route::get('/', [AuthController::class, 'showHome'])->name('home.show');
Route::inertia('/profile', 'Profile');
Route::inertia('/profile/shipping', 'Shipping');

// Route::get('/login', function () {
//     return inertia('Login');
// });

// Route::get('/product/1', function () {
//     return inertia('ProductDetail');
// });

