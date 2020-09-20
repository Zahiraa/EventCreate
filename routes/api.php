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
Route::get('events/indexArchivedEvents', 'EventController@indexArchivedEvents');
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
Route::post('comment/new','CommentaireController@createComment');
Route::post('categories/create','CategoryController@createCategory');
Route::post('categories/checkCategory','CategoryController@checkCategory');
Route::post('tags/create','TagsController@createTag');
Route::post('tags/checkTag','TagsController@checkTag');
Route::post('tickets/create','TicketController@createTicket');
Route::post('tickets/checkTicket','TicketController@checkTicket');
Route::post('roles/create','RoleController@createRole');
Route::post('roles/checkRole','RoleController@checkRole');


Route::post('events/create', 'EventController@store');


Route::get('event/{id}/edit', 'EventController@edit');
Route::get('category/{id}/edit', 'CategoryController@edit');
Route::get('tags/{id}/edit', 'TagsController@edit');
Route::get('ticket/{id}/edit', 'TicketController@edit');
Route::get('role/{id}/edit', 'RoleController@edit');

Route::put('event/{event}/update', 'EventController@update');
Route::put('eventWithAllInfos/{event}/update', 'EventController@update');
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
Route::get('payments', 'PaymentController@index');


Route::get('medias/{media}','MediaController@show');


Route::get('findTicket/{name}','TicketController@findTicket');



Route::post('medias', 'MediaController@store');

Route::put('medias/{media}', 'MediaController@update');
Route::post('register', 'Api\AuthController@register');
Route::post('login', 'Api\AuthController@login');

Route::group([
    'prefix' => 'auth'
], function () {
//    Route::post('login', 'AuthController@login');
//    Route::post('register', 'AuthController@register');
    Route::get('logout', 'AuthController@logout');

    Route::group([
        'middleware' => 'auth:api'
    ], function () {
        Route::get('logout', 'AuthController@logout');
        // Route::get('user', 'AuthController@user');
    });

 });
Route::get('users/liste','UserController@liste');
Route::get('user/{id}/show','UserController@show');
Route::get('user/{id}/indexPayment','UserController@indexPayment');
Route::get('user/{id}/edit','UserController@edit');
Route::put('user/{id}/update','UserController@update');
Route::delete('user/{id}/delete','UserController@delete');
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
Route::get('getNotificationsByUser/{userId}', 'NotificationController@getNotificationsByUser');


//paymnet
Route::post('/payment/pay','PaymentController@pay');
Route::get('/payments/{user}','PaymentController@paymentsByUser');
Route::get('/paymentsByUserAndEvent/{user}/{event}','PaymentController@paymentsByUserAndEvent');


Route::view('/api/{path?}', 'layout');

