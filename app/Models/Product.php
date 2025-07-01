<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    //
    protected $table = "product";
    protected $primaryKey = "ID";

    protected $fillable = ["Name", "Description", "Price", "ID_Brand", "ID_ProductCategory", "URI"];

    public function producttags(): HasManyThrough
    {
        return $this->hasManyThrough(Tag::class, ProductTag::class, "ID_Product", "ID", "ID", "ID_Tag");
    }

    use SoftDeletes;
}
