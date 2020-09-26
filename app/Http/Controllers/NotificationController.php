<?php

namespace App\Http\Controllers;

use App\Event;
use App\User;
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

    public function participerEvent(Request $request){
        $data=$request->input('data');
        $userId=$data['user'];
        $eventId=$data['event'];

     $message="error";
        $user=User::find($userId);
        $event=Event::find($eventId);

        if($user && $event){

            $organisateurId=[1,2,3];
            $organisateur= User::with('events')

                ->whereHas('events', function ($query) use($eventId)
                {
                    $query->where('events.id', '=', $eventId);
                })
                ->whereIn("users.role_id",$organisateurId)
                ->get();

            $role=$user->role->libelle;

            $notification = new \App\notification();
            $text=$role." ".$user->name." demande la participation a l'event ".$event->title." crée le ".$event->created_at;
            $type="participation";
            $notification->text=$text;
            $notification->type=$type;
            $notification->save();

            $event->notifications()->save($notification);

            foreach ($organisateur as $user){

                $user->notifications()->save($notification);
            }
            $message="ok";
        }
        return response(['message'=>$message]);

    }
}
