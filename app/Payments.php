<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Payments extends Model
{
    public function event()
    {
        return $this->belongsTo('App\Event');
    }
    public function user()
    {
        return $this->belongsTo('App\User');
    }
    public function ticket()
    {
        return $this->belongsTo('App\Ticket');
    }
}
