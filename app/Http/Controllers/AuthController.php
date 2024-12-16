<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
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
    }

    public function showProductDetail(Request $request)
    {


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
                ]);
            } catch (\Throwable $th) {
                //throw $th;
            }
        } else {
            return Inertia::render('ProductDetail', [

                'isLoggedIn' => $isLoggedIn,
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
}
