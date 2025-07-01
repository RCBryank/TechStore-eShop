<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductTag;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Http\Request;

class ProductTagController extends Controller
{
    //
    public function store($data, $idproduct)
    {
        $result = ProductTag::create(
            [
                "ID_Product" => $idproduct,
                "ID_Tag" => $data["ID_Tag"]
            ]
        );
    }
}
