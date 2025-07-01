<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductTag extends Model
{
    //
    protected $table = "producttag";
    protected $primaryKey = "ID";

    public $fillable = ["ID_Product", "ID_Tag"];

    public $timestamps = false;
}
