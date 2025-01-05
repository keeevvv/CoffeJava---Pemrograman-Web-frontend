<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\BagController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\AuthMiddleware;



Route::get('/login', [AuthController::class, 'showLogin'])->name('login.show');
Route::post('/login', [AuthController::class, 'login'])->name('login');
//showRegister
Route::get('/register', [AuthController::class, 'showRegister'])->name('showRegister.show');
Route::post('/register', [AuthController::class, 'Register'])->name('Register');
Route::get('/check-login', [AuthController::class, 'checkLogin']);

Route::get('/product/{id}', [AuthController::class, 'showProductDetail'])->name('product.detail');
Route::get('/', [AuthController::class, 'showHome'])->name('home.show');
Route::post('/addToCart', [AuthController::class, 'addToCart'])->name('addToCart')->middleware(AuthMiddleware::class);

Route::get('/product/{id}', [AuthController::class, 'showProductDetail'])->name('product.detail');//kevin
Route::get('/', [AuthController::class, 'showHome'])->name('home.show');//kevin//adrian
Route::post('/addToCart', [AuthController::class, 'addToCart'])->name('addToCart')->middleware(AuthMiddleware::class);//kevin
Route::delete("/delete/favorite/{id}", [AuthController::class, 'deleteFavorites'])->middleware(AuthMiddleware::class);//kevin

Route::get('/profile', [ProfileController::class, 'show'])->name('profile.show')->middleware(AuthMiddleware::class);;
Route::get('/profile/setting', [ProfileController::class, 'showSetting'])->name('profile.setting')->middleware(AuthMiddleware::class);
Route::post('/profile/setting/password', [ProfileController::class, 'updatePassword'])->name('profile.password')->middleware(AuthMiddleware::class);
Route::post('/profile/setting/edit', [ProfileController::class, 'updateProfile'])->name('profile.update')->middleware(AuthMiddleware::class);
Route::get('/profile/orders', [ProfileController::class, 'getAllOrders'])->name('profile.order')->middleware(AuthMiddleware::class);

Route::get('/favorites', [FavoriteController::class, 'loadFavorites'])->name('favorites.show')->middleware(AuthMiddleware::class);
Route::post('/addToFavorites', [FavoriteController::class, 'addFavorites'])->name('favorites.add')->middleware(AuthMiddleware::class);
Route::delete('/favorites/{id}', [FavoriteController::class, 'deleteFavorites'])->name('favorites.delete')->middleware(AuthMiddleware::class);

// //SHOP PAGE
Route::get('/shop', [ShopController::class, 'openShopPage'])->name('shop.show');



//BAG PAGE
Route::get('/bag', [BagController::class, 'show'])->name('bag.show')->middleware(AuthMiddleware::class);
Route::get('/bag/addnewaddress', [BagController::class, 'showAddNewAddress'])->name('bag.addNewAddress')->middleware(AuthMiddleware::class);
Route::get('/bag/addresslist', [BagController::class, 'showAddressList'])->name('bag.addressList')->middleware(AuthMiddleware::class);
Route::get('/bag/checkout', [BagController::class, 'showCheckout'])->name('bag.showCheckout')->middleware(AuthMiddleware::class);
Route::post('/bag/store-total', [BagController::class, 'storeTotalPrice'])->name('bag.storeTotalPrice')->middleware(AuthMiddleware::class);
Route::post('/bag/select-shipping', [BagController::class, 'selectShippingAddress'])->name('bag.selectShippingAddress')->middleware(AuthMiddleware::class);
Route::post('/bag/add-shipping', [BagController::class, 'storeNewShippingAddress'])->name('bag.storeNewShippingAddress')->middleware(AuthMiddleware::class);
Route::post('/bag/update-quantity', [BagController::class, 'updateQuantity'])->name('bag.updateQuantity')->middleware(AuthMiddleware::class);
Route::delete('/bag/delete-item', [BagController::class, 'deleteItem'])->name('bag.deleteItem')->middleware(AuthMiddleware::class);
Route::post('/bag/transaction', [BagController::class, 'handleTransaction'])->name('bag.handleTransaction')->middleware(AuthMiddleware::class);