<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    protected $guarded = [];
    public function events()
    {
        return $this->belongsToMany('App\Event','event_ticket')->withTimestamps();

    }

    public function payments()
    {
        return $this->hasMany('App\Payments');
    }

}
