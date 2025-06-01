<?php

namespace Tests\Unit;
use Inertia\Testing\AssertableInertia as Assert; 
use Tests\TestCase;
use Illuminate\Support\Facades\Http;

class RegisterTest extends TestCase
{
    public function test_user_can_register_successfully_and_redirected_to_login()
{
    Http::fake([
        'http://localhost:3000/api/v1/register' => Http::response([], 200),
    ]);

    $response = $this->post('/register', [
        'nama' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password123',
        'confirmPassword' => 'password123',
        'gender' => 'male',
        'tanggalLahir' => '2000-01-01',
    ]);

    $response->assertRedirect('/login');
    $response->assertSessionHas('success', 'Registration successful! Please log in.');
}


public function test_register_failed_and_error_is_returned()
{
    Http::fake([
        'http://localhost:3000/api/v1/register' => Http::response([
            'msg' => 'Email already exists'
        ], 422),
    ]);

    $response = $this->from('/register')->post('/register', [
        'nama' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password123',
        'confirmPassword' => 'password123',
        'gender' => 'male',
        'tanggalLahir' => '2000-01-01',
    ]);

    $response->assertRedirect('/register');
    $response->assertSessionHasErrors([
        'register' => 'Email already exists'
    ]);
}


public function test_logged_in_user_redirected_from_register_to_home()
{
    $this->withSession([
        'access_token' => 'fake-token',
        'refresh_token' => 'fake-refresh-token',
    ]);

    $response = $this->get('/register');

    $response->assertRedirect('/');
}


public function test_guest_can_see_register_page()
{
    $this->withSession([]); 

    $response = $this->get('/register');

    $response->assertOk();
    $this->assertFalse(session()->has('access_token'));
    $this->assertFalse(session()->has('refresh_token'));
    
}
}
