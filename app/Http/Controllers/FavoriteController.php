<?php
namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Inertia\Inertia;

class FavoriteController extends Controller
{
    private function getUserDataFromToken($token)
    {
        if (!$token) return null;

        $decoded = JWT::decode($token, new Key(env('ACCESS_TOKEN'), 'HS256'));
        return [
            'id' => $decoded->id,
            'name' => $decoded->name,
            'email' => $decoded->email,
            'profileImage' => $decoded->profileImage,
            'tanggalLahir' => $decoded->tanggalLahir,
        ];
    }

    public function getToken(Request $request)
    {
        $accessToken = $request->session()->get('access_token');
        if (!$accessToken) {
            return response()->json(['message' => 'Unauthorized Token'], 403);
        }
        return $accessToken;
    }

    public function checkLoginStatus(Request $request)
    {
        $isLoggedIn = $request->session()->has('access_token');

        return [
            'isLoggedIn' => $isLoggedIn,
        ];
    }

    public function loadFavorites(Request $request)
    {
        try {
            $token = $this->getToken($request);
            if (!$token) return redirect()->route('login');

            $response = Http::withHeaders([
                'Authorization' => "Bearer {$token} ",
            ])->get('http://localhost:3000/api/v1/favorites');

            if (!$response->successful()) {
                Log::error('Failed to fetch favorites', [
                    'status' => $response->status(),
                    'body' => $response->body()
                ]);
                return redirect()->back()->with('error', 'Failed to load favorites');
            }

            //yang diganti
            return Inertia::render('Favorite', [
                'user' => $this->getUserDataFromToken($token),
                'auth'=> [
                    'favorites' => $response->json(),
                ],
                'isLoggedIn' => [
                    'isLoggedIn' => true
                ]
            ]);

        } catch (Exception $e) {
            Log::error('Error in loadFavorites:', ['error' => $e->getMessage()]);
            return redirect()->back()->with('error', 'Failed to load favorites');
        }
    }

    public function addFavorites(Request $request)
    {

        $body = [
            'productId' => $request->input('productId'),
        ];

        try {
            $token = $this->getToken($request);
            if (!$token) return redirect()->route('login');

            Log::info('Data yang dikirim ke API:', [
                'token' => $token,
                'productId' => $request->input('productId')
            ]);


            $response = Http::withHeaders([
                'Authorization' => "Bearer {$token} ",
                'Content-Type' => 'application/json',
            ])->post('http://localhost:3000/api/v1/favorites', $body);

            if (!$response->successful()) {
                Log::error('Failed to add favorite', [
                    'status' => $response->status(),
                    'body' => $response->body()
                ]);
                return redirect()->back()->with('error', 'Failed to add to favorites');
            }

            return redirect()->back()
                ->with('success', 'Item successfully added to favorites');

        } catch (Exception $e) {
            Log::error('Error in addFavorites:', ['error' => $e->getMessage()]);
            return redirect()->back()->with('error', 'Failed to add favorite');
        }
    }

    public function deleteFavorites(Request $request, $id)
    {
        try {
            $token = $this->getToken($request);
            if (!$token) return redirect()->route('login');

            $response = Http::withHeaders([
                'Authorization' => "Bearer {$token} ",
                'Content-Type' => 'application/json',
            ])->delete("http://localhost:3000/api/v1/favorites/{$id}");

            if (!$response->successful()) {
                Log::error('Failed to delete favorite', [
                    'status' => $response->status(),
                    'body' => $response->body()
                ]);
                return redirect()->back()->with('error', 'Failed to delete from favorites');
            }

            return redirect()->route('favorites.index')
                ->with('success', 'Item successfully removed from favorites');

            // return Inertia::render('Favorite', [
            //     /// 'user' => $this->getUserDataFromToken($token),
            //     'auth'=> [
            //         'favorites' => $response->json(),
            //     ]
            //     // 'isLoggedIn' => true
            // ])->with('success', 'Item successfully removed from favorites');

        } catch (Exception $e) {
            Log::error('Error in deleteFavorites:', ['error' => $e->getMessage()]);
            return redirect()->back()->with('error', 'Failed to delete favorite');
        }
    }
}


//   return Inertia::render('Favorite', [
//                 /// 'user' => $this->getUserDataFromToken($token),
//                 'auth'=> [
//                     'favorites' => $response->json(),
//                 ]
//                 // 'isLoggedIn' => true
//             ])->with('success', 'Item successfully removed from favorites');

// 'pName' => $request->input('pName'),
//             'images' => $request->input('images'),
//             'price' => $request->input('price'),
//             'desc' => $request->input('desc'),
