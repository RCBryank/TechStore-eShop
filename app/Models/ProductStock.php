<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductStock extends Model
{
    //
    protected $table = "productstock";
    protected $primaryKey = "ID";

    public $fillable = ["Stock", "ID_Product"];

    public $timestamps = false;
}
