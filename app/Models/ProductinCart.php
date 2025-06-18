<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductinCart extends Model
{
    //
    protected $table = "productincart";
    protected $primaryKey = "ID";

    public $fillable = ["Quantity", "ID_Product", "ID_WebUser"];

    public $timestamps = false;
}
