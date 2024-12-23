<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function checkLoginStatus(Request $request)
    {
        $isLoggedIn = $request->session()->has('access_token');

        return [
            'isLoggedIn' => $isLoggedIn,
        ];
    }

    public function show(Request $request)
    {
        $accessToken = $request->session()->get('access_token');

        if (!$accessToken) {
            return redirect('/login')->withErrors(['msg' => 'Access token not found. Please login again.']);
        }

        try {
            $decoded = JWT::decode($accessToken, new Key(env('ACCESS_TOKEN'), 'HS256'));

            return Inertia::render('Profile', [
                'user' => [
                    'id' => $decoded->id,
                    'name' => $decoded->name,
                    'email' => $decoded->email,
                    'profileImage' => $decoded->profileImage,
                    'tanggalLahir' => $decoded->tanggalLahir,
                ],
                'isLoggedIn' => $this->checkLoginStatus($request),
            ]);
        } catch (\Exception $e) {
            return redirect('/login')->withErrors(['msg' => 'Invalid token. Please login again.']);
        }
    }

    public function showShipping(Request $request) {
        $accessToken = $request->session()->get('access_token');
        $decoded = JWT::decode($accessToken, new Key(env('ACCESS_TOKEN'), 'HS256'));
        return Inertia::render('Shipping', [
            'user' => [
                'id' => $decoded->id,
                'name' => $decoded->name,
                'email' => $decoded->email,
                'profileImage' => $decoded->profileImage,
                'tanggalLahir' => $decoded->tanggalLahir,
            ],
            'isLoggedIn' => $this->checkLoginStatus($request),
        ]);
    }

    public function showSetting(Request $request) {
        $accessToken = $request->session()->get('access_token');
        $decoded = JWT::decode($accessToken, new Key(env('ACCESS_TOKEN'), 'HS256'));
        return Inertia::render('Setting', [
            'user' => [
                'id' => $decoded->id,
                'name' => $decoded->name,
                'email' => $decoded->email,
                'profileImage' => $decoded->profileImage,
                'tanggalLahir' => $decoded->tanggalLahir,
            ],
            'isLoggedIn' => $this->checkLoginStatus($request),
        ]);
    }
}
