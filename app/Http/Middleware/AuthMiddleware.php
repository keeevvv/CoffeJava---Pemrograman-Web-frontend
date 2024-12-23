<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Firebase\JWT\SignatureInvalidException;
use Firebase\JWT\ExpiredException;
use Exception;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;

class AuthMiddleware
{
    public function handle(Request $request, Closure $next)
    {

        $accessToken = $request->session()->get('access_token');


        if ($accessToken != null) {
            try {






                JWT::decode($accessToken, new Key(env('ACCESS_TOKEN'), 'HS256'));
            } catch (Exception $e) {

                $accessToken = $this->requestNewToken($request);
                $request->session()->put('access_token', $accessToken);
            }
        } else {
            $request->session()->put('url.intended', $request->fullUrl());
            $request->session()->flush();
            return Inertia::location('/login');
        }



        return $next($request);
    }


    private function requestNewToken(Request $request)
    {
        try {
            // Kirim request ke API untuk mendapatkan token baru
            $response = Http::get('http://localhost:3000/api/v1/token');
           

            if ($response->successful()) {
                $data = $response->json();
               
                return $data['accessToken'];
            } else {
                $response = Http::delete('http://localhost:3000/api/v1/logout');
                $request->session()->flush();
                return Inertia::location('/login');
            }

            // Jika request gagal
            abort(401, 'Unable to fetch new access token');
        } catch (Exception $e) {
            $request->session()->flush();
            return Inertia::location('/login');
            abort(500, 'Error requesting new access token');
        }
    }
}
