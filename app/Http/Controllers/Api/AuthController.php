<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\User as User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
   public function register(Request $request){

      $validateData= $request->validate([
           'name'=>'required',
           'email' => 'required|string|email',
           'password' => 'required|string',
          // 'remember_me' => 'boolean'
       ]);
       $user=User::create($validateData);
       $accessToken=$user->createToken('authToken')->accessToken;
       return response(['id'=>$user->id,'name'=>$user->name,"email"=>$user->email,'role_id'=>$user->role_id,"activation_token"=>$accessToken]);
    }

    public function login(Request $request){

        $validateData= $request->validate([

            'email' => 'required|string|email',
            'password' => 'required|string',

        ]);

        if(!Auth::guard('api')->attempt($validateData)){

            return response()->json([
                'success' => false,
                'massage'=>"Invalid data !"

            ]);
        }

        $accessToken=\auth()->user()->createToken('authToken')->accessToken;
        $id=(\auth()->user()->id);
        $name=(\auth()->user()->name);
        $email=(\auth()->user()->email);
        $role_id=(\auth()->user()->role->id);


//        return response(['user'=>\auth()->user(),"token"=>$accessToken]);
        return response()->json([
            'success' => true,
            'id'=>$id,'name'=>$name,"email"=>$email,'role_id'=>$role_id,"access_token"=>$accessToken

        ], 201);
    }
}
