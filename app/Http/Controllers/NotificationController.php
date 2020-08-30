<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function getNotificationsByUser($userId){

        $notifications= \App\notification::with('users')
            ->whereHas('users', function ($query) use($userId)
            {
                $query->where('users.id', '=',$userId);
            })
            ->get();
       return ['notifications'=>$notifications];
    }
}
