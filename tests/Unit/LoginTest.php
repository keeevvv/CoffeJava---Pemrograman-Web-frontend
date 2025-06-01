<?php

namespace Tests\Unit;
use Inertia\Testing\AssertableInertia as Assert; 
use Tests\TestCase;
use Illuminate\Support\Facades\Http;

class LoginTest extends TestCase
{
    
    public function  test_user_can_login_and_token_saved_in_session()
    {
        
        Http::fake([
            'http://localhost:3000/api/v1/login' => Http::response([
                'accessToken' => 'fake-access-token',
                'refreshToken' => 'fake-refresh-token',
            ], 200),
        ]);
  
        $response = $this->post('/login', [
           'email' => 'user@example.com',
            'password' => 'wrongpassword',
        ]);
       
      
       $response->assertStatus(302);
        $response->assertRedirect('/');
   
        $this->assertEquals('fake-access-token', session('access_token'));
        $this->assertEquals('fake-refresh-token', session('refresh_token'));
    }

    public function test_login_with_invalid_credentials()
    {
       
        $expectedErrorMessage = 'Invalid email or password.';
      
        Http::fake([
           
            'http://localhost:3000/api/v1/login' => Http::response(
              
                ['msg' => $expectedErrorMessage],
                401 
            ),
        ]);
    
        $response = $this->post('/login', [
            'email' => 'user@example.com',
            'password' => 'wrongpassword',
        ]);
        $response->assertStatus(200);
      
        $this->assertNull(session('access_token'));
        $this->assertNull(session('refresh_token'));
 
      
        $response->assertInertia(function (Assert $page) use ($expectedErrorMessage) {
            $page->component('Login') 
               
                 ->has('errors') 
          
                 ->where('errors.login', $expectedErrorMessage);
        });
    }

    public function test_logged_in_user_redirected_from_login_to_home()
    {
    
         $this->withSession([
            'access_token' => 'fake-access-token',
            'refresh_token' => 'fake-refresh-token',
        ]);

    
        $response = $this->get('/login');

      
        $response->assertRedirect('/');
    }

    public function test_guest_can_see_login_page()
    {
       
        $this->withSession([]); 
      
       
        $response = $this->get('/login');
      
        $response->assertOk();
       
        $this->assertFalse(session()->has('access_token'));
        $this->assertFalse(session()->has('refresh_token'));

    }     
}
