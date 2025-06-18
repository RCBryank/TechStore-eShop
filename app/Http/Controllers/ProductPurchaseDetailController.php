<?php

namespace App\Http\Controllers;

use App\Models\ProductPurchaseDetail;
use Illuminate\Http\Request;

class ProductPurchaseDetailController extends Controller
{
    //
    public function store($data, $idproduct, $idwebuser)
    {
        $productpurchasedetail = ProductPurchaseDetail::create([
            "DatePurchase" => now(),
            "Quantity" => $data["Quantity"],
            "PriceUnitProduct" => $data["PriceUnitProduct"],
            "ID_Product" => $idproduct,
            "ID_WebUser" => $idwebuser
        ]);
    }

    public function checkuserproductpurchase($idwebuser, $idproduct)
    {
        $result = ProductPurchaseDetail::select("ID")->where("ID_WebUser", $idwebuser)->where("ID_Product", $idproduct)->first();

        return $result;
    }

    public function getwebuserhistory($idwebuser, $page = 1)
    {
        $history = ProductPurchaseDetail::select("productpurchasedetail.ID", "product.ID as ID_Product", "product.Name", "PriceUnitProduct", "Quantity", "DatePurchase")
            ->join("product", "product.ID", "=", "productpurchasedetail.ID_Product")
            ->where("productpurchasedetail.ID_WebUser", $idwebuser)
            ->paginate($perPage = ProductPurchaseDetailController::CONST_perPageResults, ['*'], 'page', $page);

        return $history;
    }

    const CONST_perPageResults = 10;
}
