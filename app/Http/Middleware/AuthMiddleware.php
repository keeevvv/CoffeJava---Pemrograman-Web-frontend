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
use Illuminate\Support\Facades\Log;

class AuthMiddleware
{
    public function handle(Request $request, Closure $next)
    {

        $accessToken = $request->session()->get('access_token');
        $refreshToken = $request->session()->get('refresh_token');


        if ($accessToken != null) {
            try {
                JWT::decode($accessToken, new Key(env('ACCESS_TOKEN'), 'HS256'));
            } catch (Exception $e) {

                $accessToken = $this->requestNewToken($request);

                if ($accessToken == null) {
                    
                    return Inertia::location('/login');
                }
                $request->session()->put('access_token', $accessToken);
            }
        } else {


            $request->session()->flush();
            if ($request->method() === 'POST') {
                // Menyimpan URL GET terakhir yang diakses sebelum POST
                session(['url.intended' => url()->previous()]);
            } else {
                session(['url.intended' => url()->current()]);
            }
            
        
            return Inertia::location('/login');
            //return redirect()->intended('/');
        }



        return $next($request);
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

            // Jika request gagal

        } catch (Exception $e) {
            $request->session()->flush();
            return Inertia::location('/login');
            abort(500, 'Error requesting new access token');
        }
    }
}
