<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use Illuminate\Http\Request;

class ProductCategoryController extends Controller
{
    //
    public function find($id): string
    {
        $category = ProductCategory::select("Name", "Description")->find($id);

        return json_encode($category);
    }

    public function all(): array
    {
        $results = array();

        $results = ProductCategory::all("ID", "Name")->toArray();

        return $results;
    }
}
