<?php
namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class ShopController extends Controller
{
    public function checkLoginStatus(Request $request)
    {
        $isLoggedIn = $request->session()->has('access_token');

        return [
            'isLoggedIn' => $isLoggedIn,
        ];
    }

    public function openShopPage(Request $request)
{
    $isLoggedIn = $this->checkLoginStatus($request);
    $accessToken = $request->session()->get('access_token');

    // Ambil produk dari API
    try {
        $queryParams = [
            'categoryId' => $request->query('categoryId'),
            'subcategoryId' => $request->query('subcategoryId'),
            'specificSubcategoryId' => $request->query('specificSubcategoryId'),
            'search' => $request->query('search'),
            'limit' => $request->query('limit', 20), // Default 20
            'page' => $request->query('page', 1),   // Default page 1
        ];

        $response = Http::get('http://localhost:3000/api/v1/products', $queryParams);

        if ($response->successful()) {
            $data = $response->json();
            // Jika pengguna sudah login, dekode token dan ambil data pengguna
            if ($accessToken) {
                try {
                    $decoded = JWT::decode($accessToken, new Key(env('ACCESS_TOKEN'), 'HS256'));
                    return Inertia::render('Shop', [
                        'user' => [
                            'id' => $decoded->id,
                            'name' => $decoded->name,
                            'email' => $decoded->email,
                            'profileImage' => $decoded->profileImage,
                            'tanggalLahir' => $decoded->tanggalLahir,
                        ],
                        'isLoggedIn' => $isLoggedIn,
                        'products' => $data['data'] ?? [],
                        'pagination' => $data['pagination'] ?? [],
                    ]);
                } catch (\Exception $e) {
                    return Inertia::render('Shop', [
                        'isLoggedIn' => $isLoggedIn,
                        'error' => 'Invalid token. Please login again.',
                        'products' => $data['data'] ?? [],
                        'pagination' => $data['pagination'] ?? [],
                    ]);
                }
            }

            // Jika pengguna tidak login, tetap kembalikan produk
            return Inertia::render('Shop', [
                'isLoggedIn' => $isLoggedIn,
                'products' => $data['data'] ?? [],
                'pagination' => $data['pagination'] ?? [],
            ]);
        } else {
            return Inertia::render('Shop', [
                'isLoggedIn' => $isLoggedIn,
                'error' => 'Failed to fetch products.',
            ]);
        }
    } catch (\Exception $e) {
        return Inertia::render('Shop', [
            'isLoggedIn' => $isLoggedIn,
            'error' => 'An error occurred: ' . $e->getMessage(),
        ]);
    }
}
}