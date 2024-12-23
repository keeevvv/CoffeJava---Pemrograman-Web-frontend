<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;
use Illuminate\Support\Facades\Http;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

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

        $accessToken = $request->session()->get('access_token');

        if ($accessToken != null) {
            try {
                $decoded = JWT::decode($accessToken, new Key(env('ACCESS_TOKEN'), 'HS256'));

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
            }
        } else {
            return Inertia::render(('Index'), [
                'isLoggedIn' => $isLoggedIn,
            ]);
        }
    }

    public function showProductDetail(Request $request, $id)
    {



        $response = Http::get("http://localhost:3000/api/v1/product/{$id}");
        if (!$response->successful()) {
            abort(404);
        }

        $data = $response->json();



        $isLoggedIn = $this->checkLoginStatus($request);
        $accessToken = $request->session()->get('access_token');






        if ($accessToken != null) {

            try {
                $decoded = JWT::decode($accessToken, new Key(env('ACCESS_TOKEN'), 'HS256'));
                return Inertia::render('ProductDetail', [
                    'user' => [
                        'id' => $decoded->id,
                        'name' => $decoded->name,
                        'email' => $decoded->email,
                        'profileImage' => $decoded->profileImage,
                        'tanggalLahir' => $decoded->tanggalLahir,
                    ],
                    'isLoggedIn' => $isLoggedIn,
                    'product' => $data
                ]);
            } catch (\Throwable $th) {
                //throw $th;
            }
        } else {
            return Inertia::render('ProductDetail', [

                'isLoggedIn' => $isLoggedIn,
                'product' => $data
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


            return Inertia::location('/');
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
