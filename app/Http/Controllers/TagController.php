<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductTag;
use App\Models\Tag;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Termwind\Components\Raw;

class TagController extends Controller
{
    //
    public function all(): array
    {
        $results = array();

        $results = Tag::all("ID", "Name")->toArray();

        return $results;
    }

    public function searchquerytag(Request $request)
    {
        $data = [
            "Query" => $request["q"],
            "MinPrice" => $request["minprice"],
            "MaxPrice" => $request["maxprice"],
            "MinRating" => $request["minrating"],
            "BrandID" => $request["brand"],
            "Tags" => $request["tags"]
        ];

        $tagquery = Product::select("product.ID", DB::raw("AVG(productrating.Rating) as AvgRating"))
            //->where("product.ID", 1)
            ->leftjoin("productrating", "productrating.ID_Product", "product.ID")
            ->groupBy("product.ID");

        if ($data["MaxPrice"] > 0 && $data["MinPrice"] > 0)
            $tagquery->where("product.Price", ">=", $data["MinPrice"])->where("product.Price", "<=", $data["MaxPrice"]);

        if ($data["MinRating"] > 0)
            $tagquery->having("AvgRating", ">=", $data['MinRating']);

        if ($data["BrandID"] > 0)
            $tagquery->where("product.ID_Brand", "=", $data["BrandID"]);

        if (!empty($data["Tags"])) {
            $i = 0;
            foreach ($data["Tags"] as $tag) {
                $tagquery->join("producttag as producttag_$i", function ($join) use ($i, $tag) {
                    $join->on("producttag_$i.ID_Product", '=', 'product.ID')
                        ->where("producttag_$i.ID_Tag", '=', $tag);
                });

                $i = $i + 1;
            }
        }


        $tagquery->whereColumn("product.ID", "producttag.ID_Product");

        $query = ProductTag::select(DB::raw("DISTINCT(producttag.ID_Tag) as ID"), "tag.Name as Tag_Name")
            ->join("tag", "tag.ID", "producttag.ID_Tag")
            ->whereExists($tagquery);

        $results = $query->get();

        return json_encode($results);
    }
}
