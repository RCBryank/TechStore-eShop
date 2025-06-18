<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductCategory extends Model
{
    //
    protected $table  = "productcategory";
    protected $primaryKey = "ID";

    public $timestamps = false;
}
