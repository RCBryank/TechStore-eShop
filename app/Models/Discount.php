<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    //
    protected $table = "discount";
    protected $primaryKey = "ID";

    public $fillable = ["ID_Product", "Discount"];

    public $timestamps = false;
}
