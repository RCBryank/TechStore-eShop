<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductMedia extends Model
{
    //
    protected $table = "productmedia";
    protected $primaryKey = "ID";

    public $fillable = ["FileName", "HomePath", "PublicPath", "FileSizeKB", "ID_Product", "MediaExtension"];

    public $timestamps = false;
}
