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

    public function showLogin(Request $request){
        if ($request->session()->has('access_token')) {
            return Inertia::location('/');
        }
        return Inertia::render('Login');
    }

    public function showHome(Request $request){
        $isLoggedIn = $this->checkLoginStatus($request);

        return Inertia::render('Index', [
            'isLoggedIn' => $isLoggedIn,
        ]);
    }

    public function showProductDetail(Request $request)
{
    
    $isLoggedIn = $this->checkLoginStatus($request);
   
    
    return Inertia::render('ProductDetail', [
        'isLoggedIn' => $isLoggedIn,
    ]);
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
