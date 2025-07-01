<?php

namespace App\Http\Controllers;

use App\Models\ProductinCart;
use App\Models\ProductStock;
use App\Models\WebUser;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WebUserProfileController extends Controller
{
    public function profile()
    {
        $idwebuser = Auth::user()->ID;
        $profile = WebUser::find($idwebuser);

        return Inertia::render('Profile', ["Profile" => $profile]);
    }

    public function updateprofile(Request $request)
    {
        $idwebuser = Auth::user()->ID;
        $webusercontroller = new WebUserController();
        $webusercontroller->update(["Email" => $request->Email, "LastName" => $request->LastName], $idwebuser);
    }

    public function updatepassword(Request $request)
    {
        $idwebuser = Auth::user()->ID;

        $webusercontroller = new WebUserController();
        $webusercontroller->updatepassword($request->NewPassword, $idwebuser);
    }

    public function cart()
    {
        $idwebuser = Auth::user()->ID;

        $productincart = ProductinCart::select("productincart.ID", "product.ID as ID_Product", "product.Name", "productincart.Quantity", "productstock.Stock", "Price")
            ->join("product", "product.ID", "=", "productincart.ID_Product")
            ->join("productstock", "productstock.ID_Product", "=", "product.ID")
            ->where("ID_WebUser", "=", $idwebuser)
            ->orderby("productincart.ID", "ASC")
            ->get()->toArray();

        $data = [
            "ListProducts" => $productincart
        ];

        return Inertia::render("UserCart", $data);
    }

    public function purchasehistory()
    {
        $idwebuser = Auth::user()->ID;

        $productpurchasecontroller = new ProductPurchaseDetailController();
        //$history = $productpurchasecontroller->getwebuserhistory($idwebuser);

        return Inertia::render("PurchaseHistory", /*array("perPage" => $history->perPage(), "currentPage" => $history->currentPage(), "lastPage" => $history->lastPage(), "total" => $history->total(), "List" => $history->items())*/);
    }

    public function getpurchasehistorylist($page = 1)
    {
        $idwebuser = Auth::user()->ID;

        $productpurchasecontroller = new ProductPurchaseDetailController();
        $history = $productpurchasecontroller->getwebuserhistory($idwebuser, $page);

        return [
            "perPage" => $history->perPage(),
            "currentPage" => $history->currentPage(),
            "lastPage" => $history->lastPage(),
            "total" => $history->total(),
            "List" => $history->items()
        ];
    }

    public function addproductocart(Request $request)
    {
        $idwebuser = Auth::user()->ID;
        $data = [
            "Quantity" => $request["Quantity"],
            "ID_Product" => $request["ID_Product"]
        ];

        $productincartcontroller = new ProductinCartController();
        $productincartcontroller->store($data, $idwebuser);
    }

    public function removeproductfromcart(Request $request)
    {
        $idproductincart = $request["ID"];

        $prodincartcontroller = new ProductinCartController();
        $prodincartcontroller->delete($idproductincart);
    }

    public function confirmpurchase(): array
    {
        $idwebuser = Auth::user()->ID;

        $productsincart = ProductinCart::select("productincart.ID as ID_ProductinCart", "product.ID as ID_Product", "productincart.Quantity", "Price", "Discount")
            ->join("product", "product.ID", "=", "productincart.ID_Product")
            ->leftjoin("discount", "discount.ID_Product", "productincart.ID_Product")
            ->where("ID_WebUser", "=", $idwebuser)
            ->get()->toArray();

        $prodincartcontroller = new ProductinCartController();
        $productpurchasecontroller = new ProductPurchaseDetailController();
        foreach ($productsincart as $prodincart) {

            $realprice = $prodincart["Price"];
            if ($prodincart["Discount"] != null && $prodincart["Discount"] > 0) {
                $amountdiscount = $realprice * ($prodincart["Discount"] * .01);
                $realprice -= $amountdiscount;
            }

            $data = [
                "Quantity" => $prodincart["Quantity"],
                "PriceUnitProduct" => $realprice
            ];
            $productpurchasecontroller->store($data, $prodincart["ID_Product"], $idwebuser);

            //- eliminar registro de cart si con exito se inserto product purchase detail
            $prodincartcontroller->delete($prodincart["ID_ProductinCart"]);

            //- reducir stock del producto
            $productstockcontroller = new ProductStockController();
            $productstockcontroller->reduceStock($prodincart["ID_Product"], $prodincart["Quantity"]);
        }

        return $productsincart;
    }

    public function setproductincartquantity(Request $request)
    {
        $productincartcontroller = new ProductinCartController();

        $quantity = $request["Quantity"];
        $idproductincart = $request["ProductinCart"];

        $productincartcontroller->updatequantity($quantity, $idproductincart);
    }

    public function writecomment(Request $request)
    {
        $data  = ["Message" => $request["Message"], "ID_Product" => $request["ID_Product"]];
        $idwebuser = Auth::user()->ID;

        $productcommentcontroller = new ProductCommentController();
        $productcommentcontroller->store($data, $idwebuser);
    }

    public function deletecomment(Request $request)
    {
        $productcommentcontroller = new ProductCommentController();
        $productcommentcontroller->delete($request["IDComment"]);
    }

    public function rateproduct(Request $request)
    {
        $idwebuser = Auth::user()->ID;
        $data = ["ID_Product" => $request["ID_Product"], "Rating" => $request["Rating"]];

        $productratecontroller = new ProductRatingController();
        $productratecontroller->store($data, $idwebuser);
    }

    public function canrate($idproduct)
    {
        $idwebuser = Auth::user()->ID;
        $productpurchasecontroller = new ProductPurchaseDetailController();
        $purchasedatleastonce = $productpurchasecontroller->checkuserproductpurchase($idwebuser, $idproduct) != null;

        $validated = Auth::check() && $purchasedatleastonce;

        return json_encode(array("Validated" => $validated));
    }

    public function cancomment()
    {
        $validated = Auth::check();

        return json_encode(array("Validated" => $validated));
    }

    public function getauthproductrate($id)
    {
        $idwebuser = Auth::user()->ID;

        $productratecontroller = new ProductRatingController();
        $result = $productratecontroller->getauthproductrate($id, $idwebuser);
        if (empty($result)) {
            $result = ["ID" => -1, "Rating" => 0];
        }

        return json_encode($result);
    }
}
