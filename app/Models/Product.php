<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    //
    protected $table = "product";
    protected $primaryKey = "ID";
    
    protected $fillable = ["Name", "Description", "Price", "ID_Brand", "ID_ProductCategory", "URI"];

    use SoftDeletes;
}
