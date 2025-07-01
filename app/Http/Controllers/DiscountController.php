<?php

namespace App\Http\Controllers;

use App\Models\Discount;
use Illuminate\Http\Request;

class DiscountController extends Controller
{
    //
    public function store($data, $idproduct)
    {
        $result = Discount::create([
            "ID_Product" => $idproduct,
            "Discount" => $data["Discount"]
        ]);
    }
}
