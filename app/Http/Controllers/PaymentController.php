<?php

namespace App\Http\Controllers;

use App\Payment\Cashier;
use App\Payments;
use Illuminate\Http\Request;


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
        dump($request->all(),$event,$ticket,$user);
        return response()->json($payment, 201);
    }
}
