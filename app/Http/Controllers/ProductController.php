<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductMedia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function view($product_uri)
    {
        $product = Product::select("ID")->where('URI', $product_uri)->first();

        $data = [
            'ID_Product' => $product["ID"]
        ];

        return Inertia::render('ProductView', $data);
    }

    public function product($id)
    {
        $product = Product::select("product.ID", "product.Name", "product.Description", "Price", "Discount", "Stock", "ID_Brand", "brand.Name as Brand_Name", "productcategory.Name as ProductCategory_Name", "ID_ProductCategory")
            ->join('brand', 'brand.ID', '=', 'product.ID_Brand')
            ->leftjoin('discount', 'discount.ID_Product', 'product.ID')
            ->join('productcategory', 'productcategory.ID', '=', 'product.ID_ProductCategory')
            ->join('productstock', 'productstock.ID_Product', '=', 'product.ID')
            ->find($id);

        $array_media = ProductMedia::select("ID", "FileName", "PublicPath")->where("ID_Product", $id)->get();


        return json_encode(array(
            "ID" => $id,
            "Name" => $product["Name"],
            "Description" => $product["Description"],
            "Price" => $product["Price"],
            "Discount" => $product["Discount"],
            "Stock" => $product["Stock"],
            "ID_Brand" => $product["ID_Brand"],
            "Brand_Name" => $product["Brand_Name"],
            "ID_ProductCategory" => $product["ID_ProductCategory"],
            "ProductCategory_Name" => $product["ProductCategory_Name"],
            "Media" => $array_media
        ));
    }

    //
    public function store(Request $request)
    {
        $files = $request->file("ProductFiles");

        $product = Product::create([
            'Name' => $request["Name"],
            'Description' => $request["Description"],
            'Price' => $request["Price"],
            'ID_Brand' => $request["ID_Brand"],
            'ID_ProductCategory' => $request["ID_ProductCategory"],
            'URI' => ProductController::GenerateRandomCode($request["Name"])
        ]);

        if (isset($files)) {
            $productmediacontroller = new ProductMediaController();
            foreach ($files as $file) {
                $productmediacontroller->store($file, $product->ID);
            }
        }

        $productstock = new ProductStockController();
        $productstock->store(array("Stock" => $request["Stock"]), $product->ID);

        $producttags = new ProductTagController();

        if (!empty($request["Tags"])) {
            foreach ($request["Tags"] as $tag) {
                $producttags->store(array("ID_Tag" => $tag), $product->ID);
            }
        }

        $discountcontroller = new DiscountController();
        $discountcontroller->store(array("Discount" => $request["Discount"]), $product->ID);

        //return Inertia::render('ProductCreate', ["Success" => true]);
    }

    public function searchresults(Request $request)
    {
        $query = $request["q"];

        $minprice = $request["minprice"];
        $maxprice = $request["maxprice"];

        $minrating = $request["minrating"];

        $brand = $request["brand"];

        $tags = $request["tags"];

        return Inertia::render('SearchResults');
    }

    public function searchquery(Request $request)
    {
        $data = [
            "Query" => $request["q"],
            "MinPrice" => $request["minprice"],
            "MaxPrice" => $request["maxprice"],
            "MinRating" => $request["minrating"],
            "BrandID" => $request["brand"],
            "Tags" => $request["tags"],
            "Page" => $request["currentpage"],
            "Order" => $request["order"]
        ];

        $nameproduct = $request["q"];

        $query = Product::select("product.ID", "product.Name", "brand.Name as Brand_Name", "Price", DB::raw("CONCAT('producto/', URI) as URIProduct"), DB::raw("AVG(Rating) as AvgRating"), "productmedia.FileName", "productmedia.PublicPath as ProductPhoto")
            ->join("brand", "brand.ID", "=", "product.ID_Brand")
            ->join("productmedia", "productmedia.ID_Product", "product.ID")
            ->leftjoin("productrating", "productrating.ID_Product", "product.ID")
            ->where("product.Name", "like", "%$nameproduct%")
            ->groupBy("product.ID");

        if ($data["MaxPrice"] > 0 && $data["MinPrice"] > 0)
            $query->where("product.Price", ">=", $data["MinPrice"])->where("product.Price", "<=", $data["MaxPrice"]);

        if ($data["BrandID"] > 0)
            $query->where("brand.ID", "=", $data["BrandID"]);

        if ($data["MinRating"] > 0)
            $query->having("AvgRating", ">=", $data['MinRating']);

        if (!empty($data["Tags"])) {
            $i = 0;
            foreach ($data["Tags"] as $tag) {
                $query->addSelect(DB::raw("MAX(producttag_$i.ID_Product) as Tag_$i, tag_$i.Name as 'NameTag[$i]'"));
                $query->leftjoin("producttag as producttag_$i", function ($join) use ($i, $tag) {
                    $join->on("producttag_$i.ID_Product", '=', 'product.ID')
                        ->where("producttag_$i.ID_Tag", '=', $tag);
                });

                $query->join("tag as tag_$i", "tag_$i.ID", "producttag_$i.ID_Tag");

                $query->having("Tag_$i", ">", "0");

                $i = $i + 1;
            }
        }

        switch ($data["Order"]) {
            default:
            case "0":
                $query->orderBy("product.Price", "ASC");
                break;
            case "1":
                $query->orderBy("product.Price", "DESC");
                break;
            case "2":
                $query->orderBy("product.Name", "ASC");
                break;
        }

        $query->orderBy("productmedia.ID", "ASC");

        $results = $query->paginate(ProductController::CONST_SearchResultsperPage, ['*'], 'page', $data["Page"]);

        foreach ($results->items() as $item) {
            $tags = $item->producttags->toArray();
        };

        return json_encode($results);
    }

    public function getrelatedbrandproducts($idbrand): string
    {
        $products = Product::select("product.ID", "product.Name", "product.Price", "Discount", DB::raw("CONCAT('/producto/', URI) as URIProduct"), "productmedia.FileName", "productmedia.PublicPath as ProductPhoto")
            ->join("productmedia", "productmedia.ID_Product", "product.ID")
            ->Join("brand", "brand.ID", "product.ID_Brand")
            ->leftjoin("discount", "discount.ID_Product", "product.ID")
            ->where("product.ID_Brand", $idbrand)
            ->groupBy("product.ID")
            ->orderBy("Discount", "DESC")
            ->orderBy("productmedia.ID", "ASC")
            ->limit(3)
            ->get();

        return json_encode($products);
    }

    public function getpopularproductsbycategory($category = 1, $count = 3): string
    {
        $products = Product::select("product.ID", "product.Name", "product.Price", "Discount", DB::raw("CONCAT('producto/', URI) as URIProduct"), DB::raw("COUNT(DISTINCT(productpurchasedetail.ID)) as Count_Purchases"), "productmedia.FileName", "productmedia.PublicPath as ProductPhoto")
            ->join("productmedia", "productmedia.ID_Product", "product.ID")
            ->leftjoin("discount", "discount.ID_Product", "product.ID")
            ->leftjoin("productpurchasedetail", "productpurchasedetail.ID_Product", "product.ID")
            ->where("product.ID_ProductCategory", $category)
            ->groupBy("product.ID")
            ->orderBy("Count_Purchases", "DESC")
            ->orderBy("productmedia.ID", "ASC")
            ->get();

        return json_encode($products);
    }

    public function getdiscountproducts()
    {
        $products = Product::select("product.ID", "product.Name", "product.Price", "Discount", DB::raw("CONCAT('/producto/', URI) as URIProduct"), "productmedia.FileName", "productmedia.PublicPath as ProductPhoto")
            ->join("productmedia", "productmedia.ID_Product", "product.ID")
            ->join("brand", "brand.ID", "product.ID_Brand")
            ->join("discount", "discount.ID_Product", "product.ID")
            ->groupBy("product.ID")
            ->orderBy("Discount", "DESC")
            ->orderBy("productmedia.ID", "ASC")
            ->limit(8)
            ->get();

        return json_encode($products);
    }

    private static function GenerateRandomCode($product_name): string
    {
        $array_tobereplaced = array(' ', 'á', 'é', 'í', 'ó', 'ú', 'Á', 'É', 'Í', 'Ó', 'Ú', 'à', 'è', 'ì', 'ò', 'ù', 'À', 'È', 'Ì', 'Ò', 'Ù', 'ä', 'ë', 'ï', 'ö', 'ü', 'Ä', 'Ë', 'Ï', 'Ö', 'Ü', 'ñ', 'Ñ', 'ç', 'Ç');
        $array_toreplace = array('-', 'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U', 'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U', 'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U', 'n', 'N', 'c', 'C');
        $array_invalidspecialcharacters = array('$', '"', '#', '%', '&', '\'', '(', ')', '*', '+', ',', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '`', '{', '|', '}', '~');

        $formatted_productname = str_replace($array_invalidspecialcharacters, '', $product_name);
        $formatted_productname = trim($formatted_productname);
        $formatted_productname = preg_replace("/[[:blank:]]+/", " ", $formatted_productname);
        $formatted_productname = str_replace($array_tobereplaced, $array_toreplace, $formatted_productname);

        $code = "$formatted_productname-";

        for ($i = 0; $i < ProductController::CONST_LengthRandomCode; $i++)
            $code .= ProductController::CONST_URIAllowedCharacters[rand(0, count(ProductController::CONST_URIAllowedCharacters))];

        return $code;
    }

    const CONST_SearchResultsperPage = 10;
    const CONST_LengthRandomCode = 6;
    const CONST_URIAllowedCharacters = array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
}
