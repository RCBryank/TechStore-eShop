<?php

namespace App\Http\Controllers;

use App\Models\ProductMedia;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;

class ProductMediaController extends Controller
{
    //
    public function store(UploadedFile $file, $idProduct)
    {
        if ($file->isValid()) {
            $path = $file->store('images', 'public');

            $productmedia = ProductMedia::create([
                'FileName' => $file->getClientOriginalName(),
                'HomePath' => 'storage/' . $path,
                'PublicPath' => '/storage/' . $path,
                'FileSizeKB' => $file->getSize() / 1024,
                'ID_Product' => $idProduct,
                'MediaExtension' => $file->getClientOriginalExtension()
            ]);
        }
    }
}
