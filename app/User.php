<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [];
//    protected $fillable = [
//        'name', 'email', 'password','role_id',
//    ];
    public function setPasswordAttribute($password)
    {
        return $this->attributes['password'] = bcrypt($password);
    }
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function role()
    {
        return $this->belongsTo('App\Role');
    }
    public function media()
    {
        return $this->hasOne('App\Media');
    }
    public function events()
    {
        return $this->belongsToMany('App\Event','user_event')->withTimestamps();

    }

    public function comments()
    {
        return $this->hasMany('App\Commentaire');
    }
    public function payments()
    {
        return $this->hasMany('App\Payments');
    }

    public function notifications()
    {
        return $this->belongsToMany('App\notification','user_notification')->withTimestamps();
    }
}
