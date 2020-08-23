<?php


namespace App\Payment;

use Exception;
use Twocheckout;
use Twocheckout_Charge;
class Cashier
{
    public static function pay($paymentInfo){

//        Twocheckout::privateKey(env('2CHECKOUT_PRIVATE_KEY'));
//        Twocheckout::sellerId(env('2CHECKOUT_SELLER_ID'));
        Twocheckout::privateKey('BE632CB0-BB29-11E3-AFB6-D99C28100996');
        Twocheckout::sellerId('901248204');
        Twocheckout::verifySSL(!(bool)env('2CHECKOUT_IS_SANDBOX'));

      //  Twocheckout::sandbox((bool)env('2CHECKOUT_IS_SANDBOX'));

//        try {
//
//            $charge = Twocheckout_Charge::auth($paymentInfo);
//
//
//            if ($charge['response']['responseCode'] == 'APPROVED') {
//
//                return ['success'=> true,'payload' => $charge];
//            }
//
//        } catch (Exception $e) {
//
//            return ['success'=> false,'message'=>$e->getMessage()];
//        }
//
//        return ['success'=> false,'message'=>'Something went wrong !'];

    }
}
