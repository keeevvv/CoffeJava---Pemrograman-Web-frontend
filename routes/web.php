<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\AuthMiddleware;





Route::get('/login', [AuthController::class, 'showLogin'])->name('login.show');
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::get('/check-login', [AuthController::class, 'checkLogin']);

Route::get('/product/{id}', [AuthController::class, 'showProductDetail'])->name('product.detail');
Route::get('/', [AuthController::class, 'showHome'])->name('home.show')->middleware(AuthMiddleware::class);

Route::get('/profile', [ProfileController::class, 'show'])->name('profile.show');
Route::inertia('/profile/shipping', 'Shipping');
Route::inertia('/profile/setting', 'Setting');

// Route::get('/login', function () {
//     return inertia('Login');
// });

// Route::get('/product/1', function () {
//     return inertia('ProductDetail');
// });

