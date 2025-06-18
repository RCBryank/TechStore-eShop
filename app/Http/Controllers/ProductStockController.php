<?php

namespace App\Http\Controllers;

use App\Models\ProductStock;
use Illuminate\Http\Request;

class ProductStockController extends Controller
{
    //
    public function store($data, $idproduct)
    {
        $productstock = ProductStock::create([
            "Stock" => $data["Stock"],
            "ID_Product" => $idproduct
        ]);
    }

    public function reduceStock($idproduct, $reducedstock)
    {
        $prod = ProductStock::where("ID_Product", $idproduct)->first();

        if (isset($prod)) {
            $prod->Stock = $prod->Stock - $reducedstock;
            $prod->save();
        }
    }
}
