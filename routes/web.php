<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FavoriteController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\AuthMiddleware;





Route::get('/login', [AuthController::class, 'showLogin'])->name('login.show');
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::get('/check-login', [AuthController::class, 'checkLogin']);

Route::get('/product/{id}', [AuthController::class, 'showProductDetail'])->name('product.detail');
Route::get('/', [AuthController::class, 'showHome'])->name('home.show');
Route::post('/addToCart', [AuthController::class, 'addToCart'])->name('addToCart')->middleware(AuthMiddleware::class);


Route::get('/profile', [ProfileController::class, 'show'])->name('profile.show');
Route::get('/profile/shipping', [ProfileController::class, 'showShipping'])->name('profile.shipping');
Route::get('/profile/setting', [ProfileController::class, 'showSetting'])->name('profile.setting');
Route::post('/profile/setting/password', [ProfileController::class, 'updatePassword'])->name('profile.password');
Route::post('/profile/setting/edit', [ProfileController::class, 'updateProfile'])->name('profile.update');
Route::get('/profile/shipping', [ProfileController::class, 'showShipping'])->name('profile.shipping');

Route::get("/bag", function () {
    return inertia("Test");
});

Route::get('/favorites', [FavoriteController::class, 'loadFavorites'])->name('favorites.show')->middleware(AuthMiddleware::class);


Route::post('/favorites/{id}', [FavoriteController::class, 'addFavorites'])->name('favorites.add')->middleware(AuthMiddleware::class);

Route::delete('/favorites/{id}', [FavoriteController::class, 'deleteFavorites'])->name('favorites.delete')->middleware(AuthMiddleware::class);

// Route::get('/login', function () {
//     return inertia('Login');
// });

// Route::get('/product/1', function () {
//     return inertia('ProductDetail');
// });
