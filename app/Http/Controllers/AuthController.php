<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;
use Illuminate\Support\Facades\Http;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Support\Facades\Log;
//kevin
class AuthController extends Controller
{

    public function checkLoginStatus(Request $request)
    {
        $isLoggedIn = $request->session()->has('access_token');

        return [
            'isLoggedIn' => $isLoggedIn,
        ];
    }

    public function showLogin(Request $request)
    {

        if ($request->session()->has('access_token')) {
            return Inertia::location('/');
        }
        return Inertia::render('Login');
    }

    public function showHome(Request $request)
    {
        $isLoggedIn = $this->checkLoginStatus($request);

        $refreshToken = $request->session()->get('refresh_token');


        if ($refreshToken != null) {
            try {
                $decoded = JWT::decode($refreshToken, new Key(env('REFRESH_TOKEN'), 'HS256'));

                return Inertia::render('Index', [
                    'user' => [
                        'id' => $decoded->id,
                        'name' => $decoded->name,
                        'email' => $decoded->email,
                        'profileImage' => $decoded->profileImage,
                        'tanggalLahir' => $decoded->tanggalLahir,
                    ],
                    'isLoggedIn' => $isLoggedIn,
                ]);
            } catch (Exception $e) {
                $request->session()->flush();
                return Inertia::location('/');
            }
        } else {
            return Inertia::render(('Index'), [
                'isLoggedIn' => $isLoggedIn,
            ]);
        }
    }

    private function requestNewToken(Request $request)
    {
        $refreshToken = $request->session()->get('refresh_token');

        try {


            $response = Http::withHeaders([
                'Authorization' => "Bearer {$refreshToken}"
            ])->get('http://localhost:3000/api/v1/token');

            if ($response->successful()) {


                $data = $response->json();

                return $data['accessToken'];
            } else {

                $request->session()->flush();
                return null;
            }
        } catch (Exception $e) {
            $request->session()->flush();
            return Inertia::location('/login');
            abort(500, 'Error requesting new access token');
        }
    }
    public function getToken(Request $request)
    {
        $accessToken = $request->session()->get('access_token');
        if (!$accessToken) {
            return response()->json(['message' => 'Unauthorized Token'], 403);
        }
        return $accessToken;
    }

    public function deleteFavorites(Request $request, $id)
    {

        try {
            $token = $this->getToken($request);
            if (!$token) return redirect()->route('login');

            $response = Http::withHeaders([
                'Authorization' => "Bearer {$token} ",
                'Content-Type' => 'application/json',
            ])->delete("http://localhost:3000/api/v1/favorites", [
                'productId' => (int)$id
            ]);

            if (!$response->successful()) {

                Log::error('Failed to delete favorite', [
                    'status' => $response->status(),
                    'body' => $response->body()
                ]);
                return redirect()->back()->with('error', 'Failed to delete from favorites');
            }

            return redirect()->back()->with('success', 'Item successfully removed from favorites');
        } catch (Exception $e) {
            Log::error('Error in deleteFavorites:', ['error' => $e->getMessage()]);
            return redirect()->back()->with('error', 'Failed to delete favorite');
        }
    }
    public function showProductDetail(Request $request, $id)
    {



        $response = Http::get("http://localhost:3000/api/v1/product/{$id}");
        if (!$response->successful()) {
            abort(404);
        }


        $data = $response->json();

        $categoryId = $data["data"]["categories"][0]["category_id"];
        $Categoryresponse = Http::get("http://localhost:3000/api/v1/products?categoryId={$categoryId}");
        $categoryData = $Categoryresponse->json()["data"];





        $isLoggedIn = $this->checkLoginStatus($request);
        $refreshToken = $request->session()->get('refresh_token');



        if ($refreshToken != null) {


            try {
                $decoded = JWT::decode($refreshToken, new Key(env('REFRESH_TOKEN'), 'HS256'));
                $newAccesshToken = $this->requestNewToken($request);

                if ($newAccesshToken == null) {
                    return Inertia::render('ProductDetail', [

                        'isLoggedIn' => $isLoggedIn,
                        'product' => $data,
                        'similarCategoryProduct' => $categoryData
                    ]);
                }


                $responseFavorite = Http::withHeaders([
                    'Authorization' => "Bearer {$newAccesshToken} ",
                ])->get('http://localhost:3000/api/v1/favorites');
                $isAddedFavorite =  false;

                if ($responseFavorite->successful()) {
                    $listFavorite = $responseFavorite->json();



                    foreach ($listFavorite as $favorite) {

                        if ($favorite["product_id"] === (int)$id) {
                            $isAddedFavorite =  true;
                            break;
                        }
                    }
                }




                return Inertia::render('ProductDetail', [
                    'user' => [
                        'id' => $decoded->id,
                        'name' => $decoded->name,
                        'email' => $decoded->email,
                        'profileImage' => $decoded->profileImage,
                        'tanggalLahir' => $decoded->tanggalLahir,
                    ],
                    'isLoggedIn' => $isLoggedIn,
                    'product' => $data,
                    'similarCategoryProduct' => $categoryData,
                    'isAddedFavorite' => $isAddedFavorite
                ]);
            } catch (Exception $e) {
                $request->session()->flush();
                return Inertia::location("/product/{$id}");
            }
        } else {
            return Inertia::render('ProductDetail', [

                'isLoggedIn' => $isLoggedIn,
                'product' => $data,
                'similarCategoryProduct' => $categoryData,
                'isAddedFavorite' => false
            ]);
        }
    }

    public function login(Request $request)
    {


        $response = Http::post('http://localhost:3000/api/v1/login', [
            'email' => $request->input('email'),
            'password' => $request->input('password'),
        ]);

        if ($response->successful()) {

            $tokens = $response->json();



            $request->session()->put('access_token', $tokens['accessToken']);
            $request->session()->put('refresh_token', $tokens['refreshToken']);


            return redirect()->intended('/');
        } else {

            return Inertia::render('Login', [
                'errors' => [
                    'login' => $response->json()['msg'],
                ],
            ]);
        }
    }


    public function addToCart(Request $request)
    {

        $accessToken =  $request->session()->get('access_token');
        $headers = [
            'Authorization' => "Bearer {$accessToken}",

            'Content-Type' => 'application/json',
        ];

        $body = [
            'quantity' => $request->input('quantity'),
            'product_id' => $request->input('product_id'),
            'size' => $request->input('size'),
        ];

        try {
            $response = Http::withHeaders($headers)->post("http://localhost:3000/api/v1/checkout", $body);


            if ($response->successful()) {



                return redirect()->back()->with('success', 'Product added to cart successfully!');
            } else {


                if ($response->status() == 409) {
                    return redirect()->back()->with('error', 'this product is already in your cart. please go to bag to edit the quantity');
                }
                return redirect()->back()->with('error', 'Failed to add product to cart. Please try again.');
            }
        } catch (Exception $e) {

            return redirect()->back()->with('error', 'An error occurred: ' . $e->getMessage());
        }
    }
}
