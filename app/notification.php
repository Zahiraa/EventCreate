<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class notification extends Model
{
    public function users()
    {
        return $this->belongsToMany('App\User','user_notification')->withTimestamps()->with('media')->with('role');;

    }

    public function event()
    {
        return $this->belongsTo('App\Event');
    }
}
