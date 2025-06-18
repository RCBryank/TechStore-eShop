<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class WebUser extends Authenticatable
{
    //
    protected $table = "webuser";
    protected $primaryKey = "ID";

    protected $hidden = ["UserPassword", "remember_token"];

    public function username()
    {
        return 'Email';
    }

    public function getAuthPassword()
    {
        return $this->UserPassword;
    }

    use SoftDeletes;

    const ID_SysAdmin = 1;
    const ID_Admin = 2;
}
