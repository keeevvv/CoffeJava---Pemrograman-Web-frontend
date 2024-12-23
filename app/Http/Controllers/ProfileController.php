<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
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
        if (!$accessToken) {
            return redirect('/login')->withErrors(['msg' => 'Access token not found. Please login again.']);
        }
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
        if (!$accessToken) {
            return redirect('/login')->withErrors(['msg' => 'Access token not found. Please login again.']);
        }
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

    public function updatePassword(Request $request)
    {
        $validated = $request->validate([
            'currentPassword' => 'required|string',
            'newPassword' => 'required|string|min:8',
            'confirmNewPassword' => 'required|string|same:newPassword',
        ]);

        $accessToken = $request->session()->get('access_token');
        if (!$accessToken) {
            return redirect('/login')->withErrors(['msg' => 'Access token not found. Please login again.']);
        }

        $headers = [
            'Authorization' => "Bearer {$accessToken}",
            'Content-Type' => 'application/json',
        ];

        $body = [
            'currentPassword' => $validated['currentPassword'],
            'newPassword' => $validated['newPassword'],
            'confirmNewPassword' => $validated['confirmNewPassword'],
        ];

        try {
            $response = Http::withHeaders($headers)->put("http://localhost:3000/api/v1/" . $request->id . "/change-password", $body);

            if ($response->successful()) {
                return redirect()->route('profile.setting')->with('success', 'Password updated successfully');
            } else {
                return redirect()->back()->with('error', $response->json()['msg'] ?? 'Failed to update password');
            }
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'An error occurred: ' . $e->getMessage());
        }
    }

}
