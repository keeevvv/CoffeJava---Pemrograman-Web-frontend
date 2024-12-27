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
                ]);
            } catch (\Exception $e) {
                return Inertia::render('Shop', [
                    'isLoggedIn' => $isLoggedIn,
                    'error' => 'Invalid token. Please login again.',
                ]);
            }
        }

        return Inertia::render('Shop', [
            'isLoggedIn' => $isLoggedIn,
        ]);
    }
}