<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::get('events', 'EventController@index');
Route::get('events/indexOfEventsThisMonth', 'EventController@indexOfEventsThisMonth');
Route::get('events/indexOfEventsNextMonth', 'EventController@indexOfEventsNextMonth');
Route::get('users', 'EventController@userss');
Route::get('events/getRecommendedEvents/{eventId}', 'EventController@getRecommendedEvents');
Route::get('events/getdateEvents', 'EventController@getdateEvents');
Route::get('events/getFirstdateEvents', 'EventController@getFirstdateEvents');
Route::get('events/getEventByDate/{date}', 'EventController@getEventByDate');
Route::get('events/countdownNextEvent/', 'EventController@countdownNextEvent');

Route::get('events/{event}','EventController@show');
Route::post('upload','EventController@upload');
Route::post('event/new','EventController@stepsCreateEvent');


Route::post('events/create', 'EventController@store');


Route::get('event/{id}/edit', 'EventController@edit');
Route::get('category/{id}/edit', 'CategoryController@edit');
Route::get('tags/{id}/edit', 'TagsController@edit');
Route::get('ticket/{id}/edit', 'TicketController@edit');
Route::get('role/{id}/edit', 'RoleController@edit');

Route::put('event/{event}/update', 'EventController@update');
Route::put('category/{category}/update', 'CategoryController@update');
Route::put('tags/{tags}/update', 'TagsController@update');
Route::put('ticket/{ticket}/update', 'TicketController@update');
Route::put('role/{role}/update', 'RoleController@update');
Route::post('events', 'EventController@store');
Route::get('event_medias/{event}','EventController@showMedia');
Route::put('events/{event}', 'EventController@update');


Route::delete('events/{event}','EventController@delete');
Route::delete('categories/{category}','CategoryController@delete');
Route::delete('tags/{category}','TagsController@delete');
Route::delete('tickets/{ticket}','TicketController@delete');
Route::delete('roles/{role}','RoleController@delete');
//media
Route::get('medias', 'MediaController@index');
Route::get('tickets', 'TicketController@index');
Route::get('roles', 'RoleController@index');


Route::get('medias/{media}','MediaController@show');



Route::post('medias', 'MediaController@store');

Route::put('medias/{media}', 'MediaController@update');


Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');

    Route::group([
        'middleware' => 'auth:api'
    ], function () {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });

 });
Route::get('users/liste','UserController@liste');
Route::get('user/{id}/show','UserController@show');
Route::get('showUserByRole/{libelle}','UserController@showUserByRole');

Route::delete('medias/{media}','MediaController@destroy');
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();

});

//users
Route::get('artists', 'UserController@index');
Route::get('users/{user}','UserController@showArtist');
Route::get('allUsers/{user}','UserController@showUser');
Route::get('usersShowEvents/{user}','UserController@showEvents');

//category
Route::get('categories', 'CategoryController@index');
Route::get('categories/{category}', 'CategoryController@show');
//tags
Route::get('tags', 'TagsController@index');
