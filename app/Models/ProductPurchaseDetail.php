<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductPurchaseDetail extends Model
{
    //
    protected $table = "productpurchasedetail";
    protected $primaryKey = "ID";

    public $fillable = ["DatePurchase", "Quantity", "PriceUnitProduct", "ID_Product", "ID_WebUser"];

    public $timestamps = false;
}
