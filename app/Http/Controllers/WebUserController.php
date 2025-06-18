<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWebUserPostRequest;
use App\Models\WebUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class WebUserController extends Controller
{
    //

    public function store(StoreWebUserPostRequest $request)
    {
        $validated = $request->validated();

        $Model = new WebUser();
        $Model->Email = $request["email"];
        $Model->UserPassword = Hash::make($request["password"]);
        $Model->Name = $request["name"];
        $Model->LastName = $request->post("lastname", null);
        $Model->Address = $request->post("address", null);
        $Model->Phone = $request->post("phone", null);

        $Model->save();
    }

    public function update($data, $id)
    {
        $webuser = WebUser::find($id);
        if (array_key_exists("Email", $data))
            $webuser->Email = $data["Email"];
        if (array_key_exists("LastName", $data))
            $webuser->LastName = $data["LastName"];

        $webuser->save();
    }

    public function updatepassword($newpassword, $id){
        
        $webuser = WebUser::find($id);
        $webuser->UserPassword = Hash::make($newpassword);
        //-- Generar nuevo remember_token
        $webuser->save();
    }
}
