<?php

namespace App\Http\Controllers;

use App\Event;
use App\Payment\Cashier;
use App\Payments;
use App\Ticket;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{
    public function pay(Request $request){

        $event=$request->input('event');
        $ticket=$request->input('ticket');
        $user=$request->input('user');

        $payment=new Payments();
        $payment->user_id=$user;
        $payment->event_id=$event;
        $payment->ticket_id=$ticket;
        $payment->status=true;
        $payment->save();

        $evenement=Event::with('critere')->find($event)->first();
        $critere=$evenement->critere;
        $critere->update(
            [
                'places_reserves'=>(int)($critere->places_reserves)+1
            ]);

        dump($request->all(),$event,$ticket,$user);
        return response()->json($payment, 201);
    }

    public function paymentsByUser($user){

        $data = DB::table("events")
            ->select("payments.status as status","payments.created_at as datePayment","events.title as event","events.date as dateEvent","tickets.price as price","users.name as name")
            ->join('payments','payments.event_id','events.id')
            ->join('tickets','payments.ticket_id','tickets.id')
            ->join('users','payments.user_id','users.id')
            ->where("users.id","=",$user)
            ->where("payments.status","=",true)
            ->get();
        return   ['payments'=>$data];


    }

    public function paymentsByUserAndEvent($user,$event){

        $data = DB::table("events")
            ->select("payments.status as status","payments.created_at as datePayment","events.title as event","events.date as dateEvent","tickets.price as price","users.name as name","tickets.name as ticket")
            ->join('payments','payments.event_id','events.id')
            ->join('tickets','payments.ticket_id','tickets.id')
            ->join('users','payments.user_id','users.id')
            ->where("users.id","=",$user)
            ->where("events.id","=",$event)
            ->where("payments.status","=",true)
            ->get();
        return   ['payments'=>$data];


    }

    public function index(){
        $data = DB::table("events")
            ->select("payments.status as status","payments.created_at as datePayment","events.title as event","events.date as dateEvent","tickets.price as price","users.name as user","users.email as username","tickets.name as ticket")
            ->join('payments','payments.event_id','events.id')
            ->join('tickets','payments.ticket_id','tickets.id')
            ->join('users','payments.user_id','users.id')
            ->where("payments.status","=",true)
            ->get();
        return   ['payments'=>$data];

    }
}
