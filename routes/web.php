<?php

use App\Http\Controllers\BrandController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductCommentController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductinCartController;
use App\Http\Controllers\ProductRatingController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\WebUserController;
use App\Http\Controllers\WebUserProfileController;
use App\Http\Middleware\SysAdmin;
use App\Models\ProductComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    if (Auth::check())
        return redirect("inicio");
    else {
        return Inertia::render('LandingPage');
    }
})->name('landingpage');

Route::get('/inicio', function () {
    return Inertia::render('home');
})->name('inicio');

Route::get('/inicio2', function () {
    return Inertia::render('WebSite2');
});

Route::post('/signup', [WebUserController::class, "store"])->name("signup");
Route::get('/logout', function () {
    if (Auth::check())
        Auth::logout();
    return redirect('/inicio');
});

Route::post('/login/attempt', [LoginController::class, "Login"])->name("attemptlogin");

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

/* ======= SYSADMIN ========= */
Route::middleware([SysAdmin::class])->group(function () {
    Route::get('/producto/nuevo', function () {
        return Inertia::render('ProductCreate');
    });

    Route::post('/producto/store', [ProductController::class, 'store'])->name('product-store');
});

/* ======= AUTH ========= */
Route::middleware(['auth'])->group(function () {
    Route::get('/perfil', [WebUserProfileController::class, 'profile']);
    Route::get('/carrito', [WebUserProfileController::class, "cart"])->name('cart');
    Route::get('/historialdecompras', [WebUserProfileController::class, 'purchasehistory'])->name('purchasehistory');

    Route::get('/purchasehistory/{page}', [WebUserProfileController::class, 'getpurchasehistorylist'])->name('get-purchasehistory-paginated');

    Route::put('/updateprofile', [WebUserProfileController::class, 'updateprofile'])->name('profile-update');
    Route::put('/updatepassword', [WebUserProfileController::class, 'updatepassword'])->name('password-update');

    Route::post('/addtocart', [WebUserProfileController::class, 'addproductocart'])->name('add-to-cart');
    Route::post('/removefromcart', [WebUserProfileController::class, 'removeproductfromcart'])->name('remove-from-cart');
    Route::post('/setproductincartquantity', [WebUserProfileController::class, 'setproductincartquantity'])->name('set-productincart-quantity');
    Route::post('/confirmpurchase', [WebUserProfileController::class, 'confirmpurchase'])->name('confirm-purchase');

    Route::post('/writecomment', [WebUserProfileController::class, 'writecomment'])->name('write-comment');
    Route::post('/deletecomment', [WebUserProfileController::class, 'deletecomment'])->name('delete-comment');

    Route::post('/rateproduct', [WebUserProfileController::class, 'rateproduct'])->name('rate-product');
    Route::get('/getauthproductrated/{id}', [WebUserProfileController::class, 'getauthproductrate'])->whereNumber('id');
});

/* ======= ALL ========= */
Route::get('/producto/{product_uri}', [ProductController::class, "view"]);
Route::get('/product/{id}', [ProductController::class, "product"])->whereNumber('id');/**/
Route::get('/product/{id}/avgrating', [ProductRatingController::class, "getproductrate"])->whereNumber('id');

Route::get('/busqueda', [ProductController::class, "searchresults"])->name('search');

Route::get('/product/{id}/comments/{orderBy}/{page}', [ProductCommentController::class, "getproductcomments"])->whereNumber('id')->whereAlpha("orderBy")->whereNumber("page");

Route::get('/search', [ProductController::class, "searchquery"])->name('search-query');
Route::get('/search-brand-related', [BrandController::class, "searchquerybrands"])->name('searchbrand-query');
Route::get('/search-tag-related', [TagController::class, "searchquerytag"])->name('searchtag-query');

Route::get('/canrate/{id}', [WebUserProfileController::class, "canrate"])->whereNumber("id");
Route::get('/cancomment', [WebUserProfileController::class, "cancomment"]);

Route::get('/popular-by-category/{id}', [ProductController::class, "getpopularproductsbycategory"])->whereNumber('id');
Route::get('/related-brand-products/{id}', [ProductController::class, "getrelatedbrandproducts"])->whereNumber('id');
Route::get('/products-discount', [ProductController::class, "getdiscountproducts"]);
Route::get('/producto-categorias', [ProductCategoryController::class, "all"]);
Route::get('/producto-categorias/{id}', [ProductCategoryController::class, "find"])->whereNumber('id');
Route::get('/marca', [BrandController::class, "all"]);
Route::get('/tag', [TagController::class, "all"]);


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
