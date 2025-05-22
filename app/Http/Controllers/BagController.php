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
use Midtrans\config;
use Midtrans\Snap;




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
    public function show(Request $request)
    {
        $accessToken = $request->session()->get('access_token');

        if (!$accessToken) {
            return redirect('/login')->withErrors(['msg' => 'Access token not found. Please login']);
        }
        $refreshToken = $request->session()->get('refresh_token');
        try {
            $response = Http::withHeaders([
                'Authorization' => "Bearer $accessToken",
            ])->get('http://localhost:3000/api/v1/checkout');

            if ($response->successful()) {
                $cart = $response->json();
                $decoded = JWT::decode($refreshToken, new Key(env('REFRESH_TOKEN'), 'HS256'));
                return inertia('Bag', [
                    'user' => [
                        'id' => $decoded->id,
                        'name' => $decoded->name,
                        'email' => $decoded->email,
                        'profileImage' => $decoded->profileImage,
                        'tanggalLahir' => $decoded->tanggalLahir,
                    ],
                    'cart' => $cart,
                    'isLoggedIn' => $this->checkLoginStatus($request),
                ]);
            } else {

                return redirect('/')->withErrors(['msg' => 'Failed to fetch cart data from the API.']);
            }
        } catch (\Exception $e) {

            return redirect('/login')->withErrors(['msg' => 'An error occurred. Please try again.']);
        }
    }

    public function showAddNewAddress(Request $request)
    {
        $accessToken = $request->session()->get('access_token');
        $refreshToken = $request->session()->get('refresh_token');

        if (!$accessToken) {
            return redirect('/login')->withErrors(['msg' => 'Access token not found. Please login']);
        }
        try {
            $decoded = JWT::decode($refreshToken, new Key(env('REFRESH_TOKEN'), 'HS256'));
        } catch (\Exception $e) {
            return redirect('/login')->withErrors(['msg' => 'Failed to decode refresh token. Please login again']);
        }

        return Inertia::render("Shipping_detail", [
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



    //shipping address
    public function showAddressList(Request $request)
    {

        $accessToken = $request->session()->get('access_token');
        $refreshToken = $request->session()->get('refresh_token');

        if (!$accessToken) {
            return redirect('/login')->withErrors(['msg' => 'Access token not found. Please login']);
        }

        try {


            try {
                $decoded = JWT::decode($refreshToken, new Key(env('REFRESH_TOKEN'), 'HS256'));
            } catch (\Exception $e) {
                return redirect('/login')->withErrors(['msg' => 'Failed to decode refresh token. Please login again.']);
            }

            //get shipipng
            $response = Http::withHeaders([
                'Authorization' => "Bearer $accessToken",
            ])->get('http://localhost:3000/api/v1/shipping');

            if ($response->successful()) {
                $shippingData = $response->json();


                return inertia('Shipping_address', [
                    'user' => [
                        'id' => $decoded->id,
                        'name' => $decoded->name,
                        'email' => $decoded->email,
                        'profileImage' => $decoded->profileImage,
                        'tanggalLahir' => $decoded->tanggalLahir,
                    ],
                    'shippingData' => $shippingData,
                    'isLoggedIn' => $this->checkLoginStatus($request),
                ]);
            } else {
                return redirect('/')->withErrors(['msg' => 'Failed to fetch shipping data from the API.']);
            }
        } catch (\Exception $e) {

            return redirect('/login')->withErrors(['msg' => 'An error occurred while fetching shipping data.']);
        }
    }

    public function updateShipping(Request $request, $id)
{
    $accessToken = $request->session()->get('access_token');

    if (!$accessToken) {
        return redirect()->route('bag.addressList')->withErrors(['msg' => 'Unauthorized']);
    }

    $validated = $request->validate([
        'address' => 'required|string|max:255',
        'city' => 'required|string|max:100',
        'country' => 'required|string|max:100',
        'postal' => 'required|string|max:20',
        'courier' => 'required|string|max:100',
        'cost' => 'required|numeric|min:0',
    ]);

    $response = Http::withHeaders([
        'Authorization' => "Bearer $accessToken",
    ])->put("http://localhost:3000/api/v1/shipping/$id", $validated);

    if ($response->successful()) {
        
        return redirect()->route('bag.addressList')->with('success', 'Shipping address updated successfully');
    
    } else {
        return redirect()->back()->withErrors(['msg' => 'Failed to update address.']);
    }
}


public function editShipping($id, Request $request)
{
    $accessToken = $request->session()->get('access_token');
    $refreshToken = $request->session()->get('refresh_token'); 

    if (!$accessToken) {
        return redirect()->back()->withErrors(['msg' => 'Unauthorized']);
    }

    $response = Http::withHeaders([
        'Authorization' => "Bearer $accessToken",
    ])->get("http://localhost:3000/api/v1/shipping/$id");

    if ($response->successful()) {
        $address = $response->json();

        try {
            $decoded = JWT::decode($refreshToken, new Key(env('REFRESH_TOKEN'), 'HS256'));
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['msg' => 'Failed to decode refresh token. Please login again.']);
        }

        return Inertia::render('Shipping_Edit', [
            'addressToEdit' => $address,
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

    return redirect()->back()->withErrors(['msg' => 'Failed to fetch address.']);
}





    public function showCheckout(Request $request)
    {
        $accessToken = $request->session()->get('access_token');
        $refreshToken = $request->session()->get('refresh_token');


        if (!$accessToken) {
            return redirect('/login')->withErrors(['msg' => 'Access token not found. Please login']);
        }
        $shippingId = session('shipping_id');
        $total = session('total');

        if (!$shippingId || !$total) {
            return redirect('/')->withErrors(['msg' => 'Shipping ID or total amount not found in session.']);
        }
        try {
            $response = Http::withHeaders([
                'Authorization' => "Bearer $accessToken",
            ])->get('http://localhost:3000/api/v1/checkout');

            if ($response->successful()) {
                $cart = $response->json();


                if (empty($cart['cart_items'])) {
                    return redirect('/')->withErrors(['msg' => 'Your cart is empty. Add items to your cart before proceeding to checkout']);
                }
            }
        } catch (\Exception $e) {
            return redirect('/login')->withErrors(['msg' => 'An error occurred. Please try again.']);
        }

        try {
            $decoded = JWT::decode($refreshToken, new Key(env('REFRESH_TOKEN'), 'HS256'));
        } catch (\Exception $e) {
            return redirect('/login')->withErrors(['msg' => 'Failed to decode refresh token. Please login again.']);
        }

        try {




            $response = Http::withHeaders([
                'Authorization' => "Bearer $accessToken",
            ])->get('http://localhost:3000/api/v1/shipping/' . $shippingId);

            if ($response->successful()) {
                $address = $response->json();


                return Inertia::render('Checkout', [
                    'user' => [
                        'id' => $decoded->id,
                        'name' => $decoded->name,
                        'email' => $decoded->email,
                        'profileImage' => $decoded->profileImage,
                        'tanggalLahir' => $decoded->tanggalLahir,
                    ],
                    'isLoggedIn' => $this->checkLoginStatus($request),

                    'shipping_id' => $shippingId,
                    'total' => $total,
                    'address' => $address
                ]);
            } else {
                return redirect('/')->withErrors(['msg' => 'Failed to fetch shipping data from the API.']);
            }
        } catch (\Exception $e) {
            return redirect('/')->withErrors(['msg' => 'An error occurred. Please try again.']);
        }
    }


    //Bag functionality


    public function storeTotalPrice(Request $request)
    {

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

    public function updateQuantity(Request $request)
    {

        $accessToken = $request->session()->get('access_token');

        if (!$accessToken) {
            return redirect('/login')->withErrors(['msg' => 'Access token not found, please Login']);
        }

        //get item ID and newqty
        $validatedData = $request->validate([
            'itemId' => 'required|integer',
            'qty' => 'required|integer|min:1',
        ]);

        $itemId = $validatedData['itemId'];
        $newQty = $validatedData['qty'];

        //call api with newqty and dont forget to log

        try {
            $response = Http::withHeaders([
                'Authorization' => "Bearer {$accessToken}",
            ])->put('http://localhost:3000/api/v1/checkout/update', [
                'itemId' => $itemId,
                'qty' => $newQty,
            ]);


            if ($response->successful()) {
                Log::info("Quantity updated successfully for item ID {$itemId} to {$newQty}");
            } else {
                Log::error("Failed to update quantity: " . $response->body());

                return response()->json([
                    'message' => 'Failed to update quantity',
                    'error' => $response->json(),
                ], $response->status());
            }
        } catch (\Exception $e) {
            Log::error('Error updating quantity: ' . $e->getMessage());

            return response()->json([
                'message' => 'An error occurred while updating quantity',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    public function deleteItem(Request $request)
    {
        $accessToken = $request->session()->get('access_token');

        if (!$accessToken) {
            return redirect('login')->withErrors(['msg' => 'Access token not found, please Login']);
        }

        $validatedData = $request->validate([
            'itemId' => 'required|integer',
        ]);

        $itemId = intval($validatedData['itemId']);

        try {
            $body = json_encode(['itemId' => $itemId]);
            $response = Http::withHeaders([
                'Authorization' => "Bearer {$accessToken}",
                'Content-Type' => 'application/json',
            ])->withBody($body, 'application/json')
                ->delete("http://localhost:3000/api/v1/checkout/delete/{$itemId}");

            if ($response->successful()) {
                Log::info("Item {$itemId} deleted successfully");
            } else {

                Log::error("Failed to delete item {$itemId} " . $response->body());


                return response()->json([
                    'error' => 'Failed to delete item',
                    'details' => $response->body()
                ], $response->status());
            }
        } catch (\Exception $e) {
            Log::error("Error deleting item: " . $e->getMessage());
            return response()->json(['error' => 'An error occurred while deleting item'], 500);
        }
    }

    public function handleTransaction(Request $request)
    {
        Log::info('Handling transaction request', ['request_data' => $request->all()]);
    
        $accessToken = $request->session()->get('access_token');
    
        if (!$accessToken) {
            Log::warning('Access token not found in session.');
            return redirect()->route('login')->withErrors(['msg' => 'Access token not found, please Login']);
        }
    
        $validated = $request->validate([
            'shipping_id' => 'required|integer',
            'payment_type' => 'required|string',
        ]);
    
        Log::info('Validated request data', ['validated_data' => $validated]);
    
        try {
            $response = Http::withHeaders([
                'Authorization' => "Bearer {$accessToken}",
                'Content-Type' => 'application/json',
            ])->post('http://localhost:3000/api/v1/transaction', $validated);
    
            $transaction = $response->json();
    
            if (isset($transaction['transaction']['redirect_url'])) {
                Log::info('Transaction initialized successfully', [
                    'transaction_token' => $transaction['transaction']['token'],
                    'redirect_url' => $transaction['transaction']['redirect_url'],
                ]);
                return Inertia::location($transaction['transaction']['redirect_url']);  
                
            } else {
                Log::error('Invalid response structure', ['response' => $response->json()]);
                return response()->json(['status' => 'error', 'message' => 'Invalid response structure from transaction API'], 500);
            }
    
        } catch (\Exception $e) {
            Log::error('Transaction error occurred', ['error' => $e->getMessage()]);
            return response()->json(['status' => 'error', 'message' => 'Transaction initialization failed'], 500);
        }
    }

    





    
//     public function handleTransaction(Request $request)
// {

//     Log::info('Handling transaction request', [
//         'request_data' => $request->all(),  // Log the incoming request data
//     ]);

//     $accessToken = $request->session()->get('access_token');

//     if (!$accessToken) {
//         return redirect()->route('login')->withErrors(['msg' => 'Access token not found, please Login']);
//     }

//     $validated = $request->validate([
//         'shipping_id' => 'required|integer',
//         'payment_type' => 'required|string',
//     ]);

//     Log::info('Validated data', [
//         'shipping_id' => $validated['shipping_id'],
//         'payment_type' => $validated['payment_type']
//     ]);

//     try {
//         $shippingId = $validated['shipping_id'];
//         $paymentType = $validated['payment_type'];

//         Log::info('Sending API request to external service', [
//             'shipping_id' => $shippingId,
//             'payment_type' => $paymentType
//         ]);

//         $response = Http::withHeaders([
//             'Authorization' => "Bearer {$accessToken}",
//             'Content-Type' => 'application/json',
//         ])->post('http://localhost:3000/api/v1/transaction', [
//             'shipping_id' => $shippingId,
//             'payment_type' => $paymentType,
//         ]);

//         Log::info('Received API response', [
//             'response_status' => $response->status(),
//             'response_data' => $response->json(),
//         ]);

//         if ($response->successful()) {
//             $transactionToken = $response->json()['transaction']['token'];
//             $redirect_url = $response->json()['transaction']['redirect_url'];

//             Log::info('Transaction successful', [
//                 'transaction_token' => $transactionToken,
//                 'redirect_url' => $redirect_url,
//             ]);

//             return response()->json([
//                 'status' => 'success',
//                 'transaction' => [
//                     'token' => $transactionToken,
//                     'redirect_url' => $redirect_url,
//                 ],
//             ]);
//         } else {

//             Log::error('Failed to fetch transaction data from backend', [
//                 'status' => $response->status(),
//                 'message' => 'Failed to fetch transaction data from backend.',
//                 'response_data' => $response->json(),
//             ]);

//             return response()->json([
//                 'status' => 'error',
//                 'message' => 'Failed to fetch transaction data from backend.',
//             ], $response->status());
//         }
//     } catch (\Exception $e) {
//         Log::error('Exception occurred during transaction process', [
//             'error_message' => $e->getMessage(),
//             'stack_trace' => $e->getTraceAsString(),
//         ]);


//         return response()->json([
//             'status' => 'error',
//             'message' => $e->getMessage(),
//         ], 500);
//     }
// }
}
