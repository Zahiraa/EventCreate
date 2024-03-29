<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ['categories'=>Category::all()];

    }
    public function checkCategory(Request $request){
        $data=$request->input('data');
        $category = Category::where('libelle', '=', $data['libelle'])->first();
        if ($category === null) {
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
    public function createCategory(Request $request)
    {
        $data=$request->input('data');
        dump($data);
        $category=new Category();
        $category->libelle=$data['libelle'];
        $category->save();


        return response()->json($category, 201);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {

        $cat = Category::find($category->id);
        return ['categories'=>$cat];


    }

    /**
     * Show the form for editing the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $category=Category::find($id);
        return response()->json($category, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {

        $category->update($request->all());

        return response()->json($category, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        //
    }
    public function delete(Category $category)
    {
        $category->delete();

        return response()->json(null, 204);
    }
}
