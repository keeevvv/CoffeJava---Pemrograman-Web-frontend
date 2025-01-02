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
        $page = $request->query('page', 1); // Default ke 1 jika 'page' tidak ada

        
       
        $isLoggedIn = $this->checkLoginStatus($request);
        $refreshToken = $request->session()->get('refresh_token');

        if (!$isLoggedIn['isLoggedIn']) {
            return redirect()->route('login');
        }
       
        try {
            $categories = $this->fetchCategories();

            $subCategories = $this->fetchSubCategories();

            $specificCategories = $this->fetchSpecificCategories();
          
           
            $categoryId = $request->query('categoryId');
            $subcategoryId = $request->query('subcategoryId');
            $specificSubcategoryId = $request->query('specificSubcategoryId');
            $search = $request->query('search', ''); 

            
            $products = $this->fetchProducts($request, $page, $categoryId, $subcategoryId, $specificSubcategoryId, $search) ?? [
                'data' => [],
                'pagination' => [],
            ];

            $user = null;
            if ($refreshToken) {
                try {
                    $decoded = JWT::decode($refreshToken, new Key(env('REFRESH_TOKEN'), 'HS256'));
                    $user = [
                        'id' => $decoded->id,
                        'name' => $decoded->name,
                        'email' => $decoded->email,
                        'profileImage' => $decoded->profileImage,
                        'tanggalLahir' => $decoded->tanggalLahir,
                    ];
                } catch (\Exception $e) {
                    return redirect()->route('login');
                }
            } else {
                return redirect()->route('login');
            }
    
            return Inertia::render('Shop', [
                'user' => $user,
                'isLoggedIn' => $isLoggedIn,
                'categories' => $categories, 
                'subCategories' => $subCategories,
                'specificCategories' => $specificCategories,
            'products' => $products['data'] ?? [],
            'pagination' => $products['pagination'] ?? [],
            ]);
        } catch (\Exception $e) {
            return Inertia::render('Shop', [
                'isLoggedIn' => $isLoggedIn,
                'error' => 'An error occurred: ' . $e->getMessage(),
            ]);
        }
    }

    //fetch produk
    private function fetchProducts(Request $request, $page, $categoryId = null, $subcategoryId = null, $specificSubcategoryId = null, $search = '')
{
    $queryParams = [
        'categoryId' => $categoryId,
        'subcategoryId' => $subcategoryId,
        'specificSubcategoryId' => $specificSubcategoryId,
        'search' => $search,
        'limit' => $request->query('limit', 20),
        'page' => $page,
    ];

    try {
        $response = Http::get("http://localhost:3000/api/v1/products", $queryParams);
        if ($response->successful()) {
            return $response->json();
        } else {
            return ['error' => 'Failed to fetch products: ' . $response->status()];
        }
    } catch (\Exception $e) {
        return ['error' => 'An error occurred while fetching products: ' . $e->getMessage()];
    }
}

    //fetch kategori
    private function fetchCategories(){
        try {
            $response = Http::get("http://localhost:3000/api/v1/categories");
            if ($response->successful()) {
                return $response->json();
            } else {
                return ['error' => 'Failed to fetch categories: ' . $response->status()];
            }
        } catch (\Exception $e) {
            return ['error' => 'An error occurred while fetching categories: ' . $e->getMessage()];
        }
    }

    //fetch subkategori
    private function fetchSubCategories(){
        try {
            $response = Http::get("http://localhost:3000/api/v1/subcategory");
            if ($response->successful()) {
                return $response->json();
            } else {
                return ['error' => 'Failed to fetch subcategories: ' . $response->status()];
            }
        } catch (\Exception $e) {
            return ['error' => 'An error occurred while fetching subcategories: ' . $e->getMessage()];
        }
    }

    //fetch spesifik
    private function fetchSpecificCategories(){
        try {
            $response = Http::get("http://localhost:3000/api/v1/specific-subcategories");
            if ($response->successful()) {
                return $response->json();
            } else {
                return ['error' => 'Failed to fetch specific subcategories: ' . $response->status()];
            }
        } catch (\Exception $e) {
            return ['error' => 'An error occurred while fetching specific subcategories: ' . $e->getMessage()];
        }
    }
}
