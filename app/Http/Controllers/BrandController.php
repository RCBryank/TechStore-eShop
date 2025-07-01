<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Product;
use App\Models\ProductRating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BrandController extends Controller
{
    //
    public function all(): array
    {
        $results = array();

        $results = Brand::all("ID", "Name")->toArray();

        return $results;
    }

    public function searchquerybrands(Request $request)
    {
        $data = [
            "Query" => $request["q"],
            "MinPrice" => $request["minprice"],
            "MaxPrice" => $request["maxprice"],
            "MinRating" => $request["minrating"],
            "BrandID" => $request["brand"],
            "Tags" => $request["tags"],
        ];

        /*
        $subquery = Product::select(DB::raw("DISTINCT(product.ID) as Product_ID"), DB::raw("AVG(Rating) as AvgRating"))
            ->leftjoin("productrating", "productrating.ID_Product", "product.ID")
            ->where("product.Name", "like", "%" . $data["Query"] . "%")
            ->groupBy("product.ID")
            ->whereColumn("product.ID", "product.ID");
        ;

        if (!empty($data["Tags"])) {
            $i = 0;
            foreach ($data["Tags"] as $tag) {
                $subquery->addSelect(DB::raw("MAX(producttag_$i.ID_Product) as Tag_$i, tag_$i.Name as 'NameTag[$i]'"));
                $subquery->leftjoin("producttag as producttag_$i", function ($join) use ($i, $tag) {
                    $join->on("producttag_$i.ID_Product", '=', 'product.ID')
                        ->where("producttag_$i.ID_Tag", '=', $tag);
                });

                $subquery->join("tag as tag_$i", "tag_$i.ID", "producttag_$i.ID_Tag");

                $subquery->having("Tag_$i", ">", "0");

                $i = $i + 1;
            }
        }

        if ($data["MaxPrice"] > 0 && $data["MinPrice"] > 0)
            $subquery->where("product.Price", ">=", $data["MinPrice"])->where("product.Price", "<=", $data["MaxPrice"]);

        if ($data["MinRating"] > 0)
            $subquery->having("AvgRating", ">=", $data['MinRating']);


        $query = Product::select("product.ID as ID_Product", "brand.ID as Brand_ID") //Product::select(DB::raw("DISTINCT(brand.ID) as ID"), "Brand.Name as Brand_Name", DB::raw("COUNT(DISTINCT(product.ID)) as Count"))
            ->join("brand", "product.ID_Brand", "brand.ID")
            ->whereExists($subquery);

        //dd($query->toSql());

        $results = $query->get();
*/

        /*
        $subquery = Product::select("brand.ID")
            ->where("product.ID", 1)
            ->whereColumn("brand.ID", "product.ID_Brand");

        $query = Brand::select("Brand.Name")
            ->whereExists($subquery);

        $results = $query->get();*/

        $query = DB::table(function ($query) use ($data) {

            $subquery = DB::table("product as pr")->select("pr.ID")->where("pr.Name", "like", "%" . $data["Query"] . "%")
                ->whereColumn("pr.ID", "product.ID");

            if ($data["MaxPrice"] > 0 && $data["MinPrice"] > 0)
                $subquery->where("pr.Price", ">=", $data["MinPrice"])->where("pr.Price", "<=", $data["MaxPrice"]);

            if ($data["MinRating"] > 0) {
                $subquery->addSelect(DB::raw("AVG(rating) as AvgRating"))
                    ->join("productrating", "productrating.ID_Product", "pr.ID")
                    ->groupBy("productrating.ID_Product")
                    ->having("AvgRating", ">=", $data['MinRating']);
            }


            if (!empty($data["Tags"])) {
                $subquery->join("producttag", "producttag.ID_Product", "pr.ID");

                $i = 0;
                foreach ($data["Tags"] as $tag) {
                    //$subquery->where("producttag.ID_Tag", $tag);
                    $subquery->addSelect(DB::raw("MAX(producttag_$i.ID_Product) as Tag_$i, tag_$i.Name as 'NameTag[$i]'"));
                    $subquery->leftjoin("producttag as producttag_$i", function ($join) use ($i, $tag) {
                        $join->on("producttag_$i.ID_Product", '=', 'product.ID')
                            ->where("producttag_$i.ID_Tag", '=', $tag);
                    });

                    $subquery->join("tag as tag_$i", "tag_$i.ID", "producttag_$i.ID_Tag");

                    $subquery->having("Tag_$i", ">", "0");

                    $i = $i + 1;
                }
            }/**/

            $query->from("product")
                ->select("product.ID_Brand as ID", "brand.Name as Brand_Name", DB::raw("COUNT(product.ID) as Count"))
                ->join("brand", "brand.ID", "product.ID_Brand")
                ->groupBy("product.ID_Brand")
                ->whereExists($subquery);

            //dd($query->toSql());
        }, "cuenta")
            ->select("ID", "Brand_Name", "Count");

        $results = $query->get();

        return json_encode($results);
    }
}
