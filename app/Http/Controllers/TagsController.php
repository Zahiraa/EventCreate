<?php

namespace App\Http\Controllers;

use App\Tags;
use Illuminate\Http\Request;

class TagsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ['tags'=>Tags::all()];
    }

    public function checkTag(Request $request){
        $data=$request->input('data');
        $tag = Tags::where('libelle', '=', $data['libelle'])->first();
        if ($tag === null) {
            return response(['exist'=>false], 200);
        }
        else{
            return response(['exist'=>true], 200);
        }
    }


    public function createTag(Request $request)
    {
        $data=$request->input('data');
        dump($data);
        $tag=new Tags();
        $tag->libelle=$data['libelle'];
        $tag->save();


        return response()->json($tag, 201);
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
     * @param  \App\Tags  $tags
     * @return \Illuminate\Http\Response
     */
    public function show(Tags $tags)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Tags  $tags
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $tag=Tags::find($id);
        return response()->json($tag, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Tags  $tags
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Tags $tags)
    {
        $tags->update($request->all());

        return response()->json($tags, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Tags  $tags
     * @return \Illuminate\Http\Response
     */
    public function destroy(Tags $tags)
    {
        //
    }
    public function delete(Tags $tag)
    {
        $tag->delete();

        return response()->json(null, 204);
    }
}
