<?php

namespace App\Http\Controllers;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use App\Event;
use App\Role;

use Illuminate\Support\Facades\DB;

class UserController extends Controller
{

    use HandlesAuthorization;

    /**
     * liste users
     */
    public function liste(){
        $data = DB::table("roles")
            ->select("users.id","users.name","users.last_name","users.email","roles.libelle as role")
            ->join('users', 'users.role_id', '=', 'roles.id')
            ->orderBy("roles.libelle","asc")
          ->get();

        return response()->json($data, 201);

    }

    /**
     * show user detaille
     */
    public function show($id)
    {
      $data = DB::table("roles")
            ->select("roles.libelle as role","users.*")
            ->join('users', 'users.role_id', '=', 'roles.id')
          ->where('users.id',"=",$id)
            ->orderBy("roles.libelle","asc")
          ->get()->first();

        return response()->json($data, 201);

    }


    public function index()
    {

        return User::with('role')->with('media')->whereBetween('role_id', [6, 11])->get();
    }
    public function showArtist(User $user)
    {
        return User::with('role')->with('media')->with('events')->with('media') ->whereBetween('role_id', [6, 11])->where('id','=',$user->id)->get();
    }

    public function showUser(User $user)
    {

        return User::with('role')->with('media')->with('events')->with('media')->where('id','=',$user->id)->get();
    }

    public function showEvents(User $user)
    {
       // $events= Event::with('media')->get()->find(1);


      $events=$user->events;
        $media=[];
        foreach($events as $event) {
            $media = $event->media;
        }

        return  ['events'=>$events,"media"=>compact(array('media'))];

    }
    public function indexPayment($id)
    {
       $user=User::with('role')->with('media')->with('payments','events')->where('id', '=',$id)->get()->first();
        return ['payments'=>$user->payments->count()];

    }
    public function edit($id){
//        $user=User::find($id);
//        return response()->json($user, 200);

            $data = DB::table("roles")
                ->select("users.id","users.name","users.last_name as last name","roles.libelle as role","users.email","users.facebook","users.instagram","users.biography","users.city","users.date_naissance as date de naissance","users.created_at")
                ->join('users', 'users.role_id', '=', 'roles.id')
                ->where('users.id',"=",$id)
                ->get()->first();

            return response()->json($data, 201);


    }

    public function update(Request $request, User $user,$id)
    {

        $user=$user::find($id);
       if($user->update($request->all())){

            return response()->json($user,201);
        }
    }

    public function delete(User $user,$id)
    {
        $user=$user::find($id);
        if($user->delete()){
            return response()->json($user,201);
        }
    }
    public function showUserByRole(string  $libelle)
    {
        $role=Role::where('libelle','=',$libelle)->firstOrFail();
        $users=[];
        if($role){
            $users= User::with('role')->with('media')
                ->with('events')->with('media')
            ->where('role_id',"=",$role->id)->get();

        }

        return ['artists'=>$users];
    }
}
