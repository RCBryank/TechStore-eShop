<?php

namespace App\Http\Controllers;

use App\Models\ProductinCart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductinCartController extends Controller
{
    //
    public function productincart($id)
    {
        return productincart::find($id);
    }

    public function store($data, $idwebuser)
    {
        $prevrow = ProductinCart::select("ID")->where("ID_Product", $data["ID_Product"])->where("ID_WebUser", $idwebuser)->first();

        if (empty($prevrow)) {
            $productincart = ProductinCart::create([
                "Quantity" => $data["Quantity"],
                "ID_Product" => $data["ID_Product"],
                "ID_WebUser" => $idwebuser
            ]);
        } else {
            $this->updatequantity($data["Quantity"], $prevrow["ID"]);
        }
    }

    public function updatequantity($quantity, $id)
    {
        $productincart = ProductinCart::find($id);
        $productincart->Quantity = $quantity;
        $productincart->save();
    }

    public function delete($id)
    {
        ProductinCart::destroy($id);
    }
}
