<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductComment extends Model
{
    //
    protected $table = "productcomment";
    protected $primaryKey = "ID";

    public $fillable = ["Message", "ID_Product", "ID_WebUser"];

    public $timestamps = true;
}
