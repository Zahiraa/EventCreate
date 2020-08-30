<?php

namespace App\Http\Controllers;

use App\Media;
use Illuminate\Http\Request;

class MediaController extends Controller
{
    public function index()
    {
        return Media::with('event')->with('user')->whereNotIn("title", ["assurance","autorisation"])->get();
    }


    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'title' => 'required|max:20',
            'url' => 'required',
        ]);
        $media = Media::create($request->all());

        return response()->json($media, 201);
    }

    public function show(Media $media)
    {
        return $media;
    }

    public function edit(Media $media)
    {
        //
    }


    public function update(Request $request, Media $media)
    {
        $media->update($request->all());

        return response()->json($media, 200);
    }

    public function destroy(Media $media)
    {
        $media->delete();

        return response()->json(null, 204);
    }
}
