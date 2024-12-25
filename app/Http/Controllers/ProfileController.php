<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

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

        try {
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
        } catch (\Exception $e) {
            return redirect('/login')->withErrors(['msg' => 'Invalid token. Please login again.']);
        }
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
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'An error occurred: ' . $e->getMessage());
        }
    }


    // public function updateProfile(Request $request)
    // {
    //     $accessToken = $request->session()->get('access_token');
    //     if (!$accessToken) {
    //         return redirect('/login')->withErrors(['msg' => 'Access token not found. Please login again.']);
    //     }

    //     try {
    //         $decoded = JWT::decode($accessToken, new Key(env('ACCESS_TOKEN'), 'HS256'));

    //         $validated = $request->validate([
    //             'nama' => 'nullable|string|max:255',
    //             'email' => 'nullable|email|max:255',
    //             'profileImage' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    //         ]);

    //         $updateData = [];
    //         if (!empty($validated['nama'])) $updateData['nama'] = $validated['nama'];
    //         if (!empty($validated['email'])) $updateData['email'] = $validated['email'];

    //         if ($request->hasFile('profileImage')) {
    //             $image = $request->file('profileImage');
    //             $imagePath = $image->store('profile_images', 'public');
    //             $updateData['profileImage'] = $imagePath;
    //         }

    //         $response = Http::withHeaders([
    //             'Authorization' => "Bearer {$accessToken}",
    //         ])->put("http://localhost:3000/api/v1/editUser/{$decoded->id}", $updateData);

    //         if ($response->successful()) {
    //             $newAccessToken = $response->json('accessToken') ?? null;
    //             $newRefreshToken = $response->json('refreshToken') ?? null;

    //             if ($newAccessToken && $newRefreshToken) {
    //                 $request->session()->put('access_token', $newAccessToken);
    //                 $request->session()->put('refresh_token', $newRefreshToken);
    //             }

    //             if (isset($updateData['profileImage'])) {
    //                 $filePath = $updateData['profileImage'];
    //                 $cloudResponse = Http::withHeaders([
    //                     'Authorization' => "Bearer {$newAccessToken}",
    //                 ])->post("http://localhost:3000/api/v1/editProfile/{$decoded->id}", [
    //                     'profileImage' => $filePath,
    //                 ]);

    //                 if (!$cloudResponse->successful()) {
    //                     return redirect()->back()->withErrors(['msg' => 'Failed to upload profile image.']);
    //                 }
    //             }

    //             return redirect()->route('profile.setting')->with('success', 'Profile updated successfully');
    //         } else {
    //             return redirect()->back()->withErrors(['msg' => 'Failed to update profile.']);
    //         }
    //     } catch (\Illuminate\Validation\ValidationException $e) {
    //         return redirect()->back()->withErrors($e->errors());
    //     } catch (\Firebase\JWT\ExpiredException $e) {
    //         return redirect('/login')->withErrors(['msg' => 'Token has expired. Please login again.']);
    //     } catch (\Exception $e) {
    //         return redirect('/login')->withErrors(['msg' => 'An unexpected error occurred. Please login again.']);
    //     }
    // }

    public function updateProfile(Request $request)
    {
        $accessToken = $request->session()->get('access_token');
        if (!$accessToken) {
            return redirect('/login')->withErrors(['msg' => 'Access token not found. Please login again.']);
        }

        try {
            $decoded = JWT::decode($accessToken, new Key(env('ACCESS_TOKEN'), 'HS256'));

            $validated = $request->validate([
                'nama' => 'nullable|string|max:255',
                'email' => 'nullable|email|max:255',
                'profileImage' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            $updateData = [];
            if (!empty($validated['nama'])) $updateData['nama'] = $validated['nama'];
            if (!empty($validated['email'])) $updateData['email'] = $validated['email'];

            if ($request->hasFile('profileImage')) {
                $image = $request->file('profileImage');
                $imagePath = $image->store('profile_images', 'public');
                $imageUrl = Storage::url($imagePath);

                $updateData['profileImage'] = $imageUrl;

                $cloudResponse = Http::withHeaders([
                    'Authorization' => "Bearer {$accessToken}",
                ])->attach(
                    'image',
                    file_get_contents($request->file('profileImage')->getRealPath()), // Isi file
                    $request->file('profileImage')->getClientOriginalName() // Nama file yang di-upload
                )->post("http://localhost:3000/api/v1/editProfile/{$decoded->id}");

                if (!$cloudResponse->successful()) {
                    return redirect()->back()->withErrors(['msg' => 'Failed to upload profile image to external server.']);
                }

                $newAccessToken = $cloudResponse->json('accessToken');
                $newRefreshToken = $cloudResponse->json('refreshToken');

                if ($newAccessToken && $newRefreshToken) {
                    $request->session()->put('access_token', $newAccessToken);
                    $request->session()->put('refresh_token', $newRefreshToken);
                }
            }

            $response = Http::withHeaders([
                'Authorization' => "Bearer {$accessToken}",
            ])->put("http://localhost:3000/api/v1/editUser/{$decoded->id}", $updateData);

            if ($response->successful()) {

                if ($newAccessToken && $newRefreshToken) {
                    $request->session()->put('access_token', $newAccessToken);
                    $request->session()->put('refresh_token', $newRefreshToken);
                }
                return redirect()->route('profile.setting')->with('success', 'Profile updated successfully');
            } else {
                return redirect()->back()->withErrors(['msg' => 'Failed to update profile.']);
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            return redirect()->back()->withErrors($e->errors());
        } catch (\Firebase\JWT\ExpiredException $e) {
            return redirect('/login')->withErrors(['msg' => 'Token has expired. Please login again.']);
        } catch (\Exception $e) {
            return redirect('/login')->withErrors(['msg' => 'An unexpected error occurred. Please login again.']);
        }
    }



}
