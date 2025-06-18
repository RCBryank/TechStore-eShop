<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductRating extends Model
{
    //
    protected $table = "productrating";
    protected $primaryKey = "ID";

    public $fillable = ["Rating", "ID_Product", "ID_WebUser"];

    public $timestamps = false;
}
