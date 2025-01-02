<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;




class BagController extends Controller
{

    //miscellaneous
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
    //show pages

public function showAddNewAddress(Request $request){

    
    $accessToken = $request->session()->get('access_token');

    if (!$accessToken) {
        return redirect('/login')->withErrors(['msg' => 'Access token not found. Please login']);
    }

 return Inertia::render("Shipping_detail");

}


//shipping address
public function showAddressList(Request $request) {
  
    $accessToken = $request->session()->get('access_token');

    if (!$accessToken) {
        return redirect('/login')->withErrors(['msg' => 'Access token not found. Please login']);
    }

    try {
        //get shipipng
        $response = Http::withHeaders([
            'Authorization' => "Bearer $accessToken",
        ])->get('http://localhost:3000/api/v1/shipping');

        if ($response->successful()) {
            $shippingData = $response->json(); 

            
            return inertia('Shipping_address', ['shippingData' => $shippingData]);
        } else {
            return redirect('/')->withErrors(['msg' => 'Failed to fetch shipping data from the API.']);
        }
    } catch (\Exception $e) {
        
        return redirect('/login')->withErrors(['msg' => 'An error occurred while fetching shipping data.']);
    }
}


public function showCheckout(Request $request){
$accessToken = $request->session()->get('access_token');

if(!$accessToken){
    return redirect('/login')->withErrors(['msg' => 'Access token not found. Please login']);
}
$shippingId = session('shipping_id');
$total = session('total');

if(!$shippingId || !$total){
    return redirect('/')->withErrors(['msg' => 'Shipping ID or total amount not found in session.']);
}

try{
   


    
    $response = Http::withHeaders([
        'Authorization' => "Bearer $accessToken",
    ])->get('http://localhost:3000/api/v1/shipping/' . $shippingId);

    if($response->successful()){
        $address = $response->json();


        return Inertia::render('Checkout', [
            'shipping_id' => $shippingId,
            'total' => $total,
            'address' => $address
        ]);

    } else {
        return redirect('/')->withErrors(['msg' => 'Failed to fetch shipping data from the API.']);
    }
    
} catch(\Exception $e){
    return redirect('/')->withErrors(['msg' => 'An error occurred. Please try again.']);
}

    
    
}


//Bag functionality


public function storeTotalPrice(Request $request){

    //validate
    $validated = $request->validate([
        'totalPrice' => 'required|numeric|min:0',
    ]);
    //store
    session(['total' => $validated['totalPrice']]);
    //go to list
    return Inertia::location(route('bag.addressList'));
}

 public function fetchCartData(Request $request)
 {
    //you still using this?
     $accessToken = $request->session()->get('access_token');
     if (!$accessToken) {
         return response()->json(['message' => 'Unauthorized Token'], 403);
     }

     try {
         $response = Http::withHeaders([
             'Authorization' => "Bearer {$accessToken}",
         ])->get(env('API_BASE_URL') . '/checkout');

         if ($response->successful()) {
             return response()->json($response->json());
         } else {
             return response()->json(['message' => 'Failed to fetch cart data'], $response->status());
         }
     } catch (\Exception $e) {
         return response()->json(['message' => 'An error occurred while fetching cart data', 'error' => $e->getMessage()], 500);
     }

    }
public function selectShippingAddress(Request $request)
{
   
    $validatedData = $request->validate([
        'shipping_id' => 'required|integer', 
    ]);

  
    session(['shipping_id' => $validatedData['shipping_id']]);

   
    return Inertia::location(route('bag.showCheckout'));
}

public function storeNewShippingAddress(Request $request)
{
    $accessToken = $request->session()->get('access_token');

    if (!$accessToken) {
        return redirect('/login')->withErrors(['msg' => 'Access token not found. Please login']);
    }

    Log::info('storenewshipping address called');
    
    //validate
    $validatedData = $request->validate([
        'address' => 'required|string',
        'city' => 'required|string',
        'country' => 'required|string',
        'postal' => 'required|string',
        'courier' => 'required|string',
        'cost' => 'required|integer',
    ]);
    
    Log::info('data validated');
    Log::info('Validated Data: ', $validatedData);

    $body = [
        'address' => $validatedData['address'],
        'city' => $validatedData['city'],
        'country' => $validatedData['country'],
        'postal' => $validatedData['postal'],
        'courier' => $validatedData['courier'],
        'cost' => $validatedData['cost'],
    ];


    try {
        //posting
        $response = Http::withHeaders([
            'Authorization' => "Bearer {$accessToken}", 
        ])->post('http://localhost:3000/api/v1/shipping', $body);

        Log::info('posting...');


        if ($response->successful()) {
            Log::info('post successful');


            $shippingId = $response->json()['shippingAddress']['shipping_id'];
            session(['shipping_id' => $shippingId]);


            return Inertia::location(route('bag.addressList'));
        } else {
            Log::error('Failed to save the shipping address.', [
                'response' => $response->body()
            ]);
            return back()->withErrors(['msg' => 'Failed to save the shipping address.']);
        }
    } catch (\Exception $e) {
        Log::error('Error occurred', [
            'message' => $e->getMessage(),
            'trace' => $e->getTraceAsString(),
        ]);
        return back()->withErrors(['msg' => 'An error occurred while saving the shipping address.']);
    }
}



}


