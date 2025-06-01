<?php

namespace Tests\Unit;
use Inertia\Testing\AssertableInertia ;
use Tests\TestCase;
use Illuminate\Support\Facades\Http;

class ProductDetailTest extends TestCase
{
    public function test_product_detail_successfully_shows_product_page()
    {
        $fakeProduct = [
            'data' => [
                'product_id' => 1,
                'pName' => 'Tasty Steel Chicken',
                'sale' => true,
                'discount' => 23.761882927999,
                'brand' => 'Kohler, Klocko and Feest',
                'decs' => 'Our snake-friendly Shoes ensures beloved comfort for your pets',
                'price' => 956.81774266616,
                'rattings' => [],
                'categories' => [
                    ['category_id' => 29, 'category_name' => 'Automotive'],
                    ['category_id' => 36, 'category_name' => 'Baby'],
                    ['category_id' => 37, 'category_name' => 'Sports'],
                ],
                'subCategories' => [
                    ['sub_category_id' => 56, 'sub_category_name' => 'Recycled'],
                    ['sub_category_id' => 64, 'sub_category_name' => 'Elegant'],
                    ['sub_category_id' => 93, 'sub_category_name' => 'Licensed'],
                    ['sub_category_id' => 95, 'sub_category_name' => 'Luxurious'],
                    ['sub_category_id' => 97, 'sub_category_name' => 'Incredible'],
                ],
                'specificSubCategories' => [
                    ['specific_sub_category_id' => 3, 'specific_sub_category_name' => 'Towels'],
                    ['specific_sub_category_id' => 28, 'specific_sub_category_name' => 'Sausages'],
                    ['specific_sub_category_id' => 44, 'specific_sub_category_name' => 'Sausages'],
                    ['specific_sub_category_id' => 57, 'specific_sub_category_name' => 'Computer'],
                ],
                'images' => [
                    "https://loremflickr.com/172/1398?lock=4927232568223950",
                    "https://loremflickr.com/3923/3194?lock=522116275387688",
                    "https://loremflickr.com/3785/3579?lock=3791512538251352",
                    "https://loremflickr.com/313/2797?lock=8616260639633759",
                    "https://loremflickr.com/2504/2079?lock=2805444616704410",
                ],
                'stock' => [
                    ['stock_id' => 1, 'size' => 'M', 'quantity' => 5]
                ],
            ],
        ];
    
        Http::fake([
            'http://localhost:3000/api/v1/product/1' => Http::response($fakeProduct, 200),
        ]);
    
        $response = $this->get('/product/1');
    
        $response->assertOk();
    
        $response->assertInertia(fn ($page) =>
            $page->component('ProductDetail')
                ->has('product')
                ->where('product.data.pName', 'Tasty Steel Chicken')
                ->where('product.data.sale', true)
                ->where('product.data.brand', 'Kohler, Klocko and Feest')
                ->where('product.data.images.0', 'https://loremflickr.com/172/1398?lock=4927232568223950')
                ->where('product.data.stock.0.size', 'M')
        );
    }


public function test_product_detail_not_found_returns_404()
{

    Http::fake([
        'http://localhost:3000/api/v1/product/999' => Http::response(null, 404),
    ]);

    $response = $this->get('/product/999');

    
    $response->assertNotFound();
}
}
