<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthController extends Controller
{
    public function showLogin(){
        return Inertia::render('Login');
    }

    public function login(Request $request)
    {
     
       

       
     
       
       
        $response = Http::post('http://localhost:3000/api/v1/login', [
            'email' => $request->input('email'),
            'password' => $request->input('password'),
        ]);
       
        if ($response->successful()) {
            
            $tokens = $response->json();
         
             return Inertia::location('/');
        } else {
         
            return Inertia::render('Login', [
                'errors' => [
                    'login' => $response->json()['msg'],
                ],
            ]);
        }
       

        
    }

    public function checkLogin(Request $request){
        $token = $request->bearerToken();
        if ($token) {
            try {
                $decoded = JWT::decode($token, new Key(env('ACCESS_TOKEN'), 'HS256'));
                return response()->json(['loggedIn' => true]);
            } catch (\Exception $e) {
                return response()->json(['loggedIn' => false]);
            }
        }
        return response()->json(['loggedIn' => false]);
    }
}
