<?php

namespace App\Http\Controllers;

use App\Models\ProductRating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductRatingController extends Controller
{
    //
    public function store($data, $idwebuser)
    {
        $prevrow = ProductRating::select("ID")->where("ID_Product", $data["ID_Product"])->where("ID_WebUser", $idwebuser)->first();

        if (empty($prevrow)) {
            $result = ProductRating::create([
                "Rating" => $data["Rating"],
                "ID_Product" => $data["ID_Product"],
                "ID_WebUser" => $idwebuser
            ]);
        } else {
            $this->updaterating($data["Rating"], $prevrow["ID"]);
        }
    }

    public function updaterating($rating, $id)
    {
        $result = ProductRating::find($id);

        $result->Rating = $rating;

        $result->save();
    }

    public function getproductrate($idproduct)
    {
        $rating = ProductRating::select("ID_Product", DB::raw("AVG(Rating) as AvgRating"), DB::raw("COUNT(*) as TotalRates"))->where("ID_Product", $idproduct)->first();

        return json_encode($rating);
    }

    public function getauthproductrate($idproduct, $idwebuser)
    {
        $rating = ProductRating::select("ID", "Rating")->where("ID_Product", $idproduct)->where("ID_WebUser", $idwebuser)->first();

        return $rating;
    }
}
