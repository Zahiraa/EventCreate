<?php

namespace App\Http\Controllers;

use App\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return  ['tickets'=>Ticket::all()];

    }

    public function checkTicket(Request $request){
        $data=$request->input('data');
        $ticket = Ticket::where('name', '=', $data['name'])->first();
        if ($ticket === null) {
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
    public function createTicket(Request $request)
    {
        $data=$request->input('data');
        dump($data);
        $ticket=new Ticket();
        $ticket->name=$data['name'];
        $ticket->price=$data['price'];
        $ticket->save();


        return response()->json($ticket, 201);
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
     * @param  \App\Ticket  $ticket
     * @return \Illuminate\Http\Response
     */
    public function show(Ticket $ticket)
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
        $ticket=Ticket::find($id);
        return response()->json($ticket, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Ticket  $ticket
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Ticket $ticket)
    {
        $ticket->update($request->all());

        return response()->json($ticket, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Ticket  $ticket
     * @return \Illuminate\Http\Response
     */
    public function destroy(Ticket $ticket)
    {
        //
    }
    public function delete(Ticket $ticket)
    {
        $ticket->delete();

        return response()->json(null, 204);
    }
}
