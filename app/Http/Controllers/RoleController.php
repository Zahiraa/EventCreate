<?php

namespace App\Http\Controllers;

use App\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ['roles'=>Role::all()];
    }

    public function checkRole(Request $request){
        $data=$request->input('data');
        $role = Role::where('libelle', '=', $data['libelle'])->first();
        if ($role === null) {
            return response(['exist'=>false], 200);
        }
        else{
            return response(['exist'=>true], 200);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     *
     */
    public function createRole(Request $request)
    {
        $data=$request->input('data');
        dump($data);
        $role=new Role();
        $role->libelle=$data['libelle'];
        $role->save();


        return response()->json($role, 201);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function show(Role $role)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *

     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $role=Role::find($id);
        return response()->json($role, 200);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Role $role)
    {
        $role->update($request->all());

        return response()->json($role, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function destroy(Role $role)
    {
        //
    }
    public function delete(Role $role)
    {
        $role->delete();

        return response()->json(null, 204);
    }
}
