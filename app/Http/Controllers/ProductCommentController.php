<?php

namespace App\Http\Controllers;

use App\Models\ProductComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductCommentController extends Controller
{
    //
    public function store($data, $idwebuser)
    {
        $comment = ProductComment::create([
            "Message" => $data["Message"],
            "ID_Product" => $data["ID_Product"],
            "ID_WebUser" => $idwebuser
        ]);
    }

    public function delete($id)
    {
        ProductComment::destroy($id);
    }

    public function getproductcomments($idproduct, $order = "desc", $page = 1): string
    {
        $comments = ProductComment::select("productcomment.ID", "Name", "Message", "ID_Product", "ID_WebUser", "productcomment.created_at as DatePublish")
            ->join("webuser", "webuser.ID", "=", "ID_WebUser")
            ->where("ID_Product", $idproduct)
            ->orderBy("DatePublish", $order)
            ->paginate($perPage = ProductCommentController::CONST_perPageResults, ['*'], 'page', $page);

        return json_encode($comments);
    }

    const CONST_perPageResults = 10;
}
