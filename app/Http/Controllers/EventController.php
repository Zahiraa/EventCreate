<?php

namespace App\Http\Controllers;

use App\Category;
use App\Critere;
use App\Event;
use App\Media;
use App\Tags;
use App\Ticket;
use App\User;
use Faker\Provider\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
Use \Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class EventController extends Controller
{
    public function userss()
    {
//        return Event::all();
        $users=  \App\User::all();
        return $users;
    }
    public function index()
    {
//        return Event::all();
        $events= Event::with('media')->with('categories')->get();
        return $events;
    }
    public function indexOfEventsThisMonth()
    {
        $currentMonth = date('m');
        $currentYear= date('Y');
        $data = DB::table("events")
            ->select("media.url","events.id as id","events.title as title","events.description as description")
            ->join('media','media.event_id','events.id')
            ->whereRaw('MONTH(events.created_at) = ? ',[$currentMonth])
            ->whereRaw('YEAR(events.created_at) = ? ',[$currentYear])
            ->get();
        return   ['events'=>$data];
    }
    public function countdownNextEvent()
    {
       $date=
        \DB::table('events')
            ->selectRaw('id,date, datediff(date, now()) as diff')
            ->whereRaw('datediff(date, now()) > ?', [0])
            ->orderBy("events.date","asc")
            ->get();
       return ['date'=>$date];
    }
    public function indexOfEventsNextMonth()
    {
        $currentMonth = date('m', strtotime('+1 month'));
        $currentYear= date('Y');

      $data = Event::select("events.id as id","events.title as title","events.description as description")
           ->whereRaw('MONTH(events.date) = ? ',[$currentMonth])
           ->whereRaw('YEAR(events.date) = ? ',[$currentYear]);
           $y=$data->with('media')->get();
        return   ['events'=>$y];
    }
    public function show( $event)
    {
        $exist=Event::find($event);
        if(is_null($exist)){
            return response()->json("Event not found !", 404);
        }
        $events= Event::with('media')->with('user')->with('categories')->with("tickets")->get();
        $re= $events->find($event);
        return ['event'=>$re,"event_medias"=>$re->media];

    }
    public function showMedia(Event $event)
    {
        return[
            'info' => $event->media
        ];

    }

    public function store(Request $request)
    {


        $id=$request->input('categories');
       $tags=($request->input('tags'));
        $uniqueItems = array_unique($tags);

        $id_user=$request->input('user');
        $medias=$request->input('media');


        $this->validate($request, [
            'title' => 'required|max:50',
            'description' => 'required',
            'date' => 'required',

        ]);

        $event = new Event();
        $event->title=$request->get('title');
        $event->place=$request->get('place');
        $event->status=$request->get('status');
        $event->description=$request->get('description');
        $event->date=$request->get('date');
        $event->save();

        foreach ($uniqueItems as $tag){
            $item=Tags::find($tag);
            $event->tags()->sync($item);
        }
        $cat=Category::find($id);
        $event->categories()->sync($cat);

        foreach ($medias as $url) {

                $column = 'title';
                $media = Media::where($column, '=', $url)->first();

                if ($media) {
                    $event->media()->save($media);
                }
        }
        foreach ($id_user as $id){
            $user=User::find($id);
            $event->user()->save($user);
        }


        return response()->json($event, 201);

    }

    public function edit($id){
        $event=Event::find($id);
        return response()->json($event, 200);
    }

    public function update(Request $request, Event $event)
    {
        $event->update($request->all());

        return response()->json($event, 200);
    }

    public function delete(Event $event)
    {
        $event->delete();

        return response()->json(null, 204);
    }

    public function getRecommendedEvents(Event $eventId){

        $events=[];
        $event= Event::with('media')->with('categories')->get()
            ->find($eventId);
        if(is_null(($event))){
            return response()->json('no recommendations', 200);
        }
        foreach($event->categories as $category) {
            $events = $category->events;
        }
        return  ["events"=>compact(array('events'))];
//        return  ["events"=>$event];

    }
    public function getdateEvents(){

        $data = DB::table("events")
            ->select("date")
            ->distinct()
            ->orderBy('date','desc')
            ->get();

        return ['dates'=>$data];
    }
    public function getFirstdateEvents(){

        $data = DB::table("events")
            ->select("events.*")
            ->distinct()
            ->orderBy('date',"desc")
            ->first();

        return ['events'=>array($data)];
    }
    public function getEventByDate($date){

         $data =   Event::select('events.*') ->where("date",'=',$date)->with('media')->get();

        return ['events'=>$data];
    }

    public function upload(Request $request){

        $path = public_path() . '/images/';
        //autorisation
        $autorisation=$request->files->get('autorisation');
        if($autorisation){
            $autorisation->move($path, $autorisation->getClientOriginalName());

            $media = new Media();
            $media->url = '/images/' . $autorisation->getClientOriginalName();
            $media->title = "autorisation";
            $media->save();
        }

        //assurance
        $assurance=$request->files->get('assurance');
        if($assurance){
            $assurance->move($path, $assurance->getClientOriginalName());

            $media = new Media();
            $media->url = '/images/' . $assurance->getClientOriginalName();
            $media->title = "assurance";
            $media->save();
        }
        //medias
       if($request->files->get('image')) {
           $file_names = $request->files->get('image');

           foreach ($file_names as $file) {

               $file->move($path, $file->getClientOriginalName());

               $media = new Media();
               $media->url = '/images/' . $file->getClientOriginalName();
               $media->title = $file->getClientOriginalName();
               $media->save();
           }
       }
    }

    public function  stepsCreateEvent(Request $request){
       // dd($request);
$data=$request->input('data');

        $id=$data['categoryID'];
        $tags=$data['tagsID'];
        $uniqueItems = array_unique($tags);

        $id_user=$data['users'];
        $medias=$data['media'];

        $assurance=$data['assurance'];
        $autorisation=$data['autorisation'];

       //critere
        $age=$data['limit_age'];
        $places=$data['limit_places'];

//        $this->validate($data, [
//            'title' => 'required|max:50',
//            'description' => 'required',
//            'date' => 'required',
//
//        ]);
        //tickets
        $tickets=$data['ticket'];
        $uniqueTickets = array_unique($tickets);
        $event = new Event();

        $event->title=$data['title'];
        $event->place=$data['place'];
        $event->status=$data['status'];
        $event->description=$data['description'];
        $event->date=$data['date'];
        $event->budget=$data['budget'];

        $event->save();

        if($uniqueItems){
            foreach ($uniqueItems as $tag){
                $item=Tags::find($tag);
                $event->tags()->save($item);
            }
        }

        //tickets
        foreach ($uniqueTickets as $ticket){
            $item=Ticket::find($ticket);
            $event->tickets()->save($item);
        }

        $cat=Category::find($id);
        $event->categories()->sync($cat);

        foreach ($medias as $url) {
           foreach ($url as $item) {

            $column = 'title';
            $media = Media::where($column, '=', $item)->first();
             dump($media);
            if ($media) {
                $event->media()->save($media);
            }
        }
        }
        //assurance
        if ($assurance) {

            $column = 'title';
            $column2 = 'url';
            $name=explode('\\',$assurance);
            $media_assurance = Media::where($column, '=', "assurance")->where($column2,"=",'/images/'.$name[2])->first();
            dump($media_assurance);
            if ($media_assurance) {
                $event->media()->save($media_assurance);
            }
        }
        //autorisation
        if ($autorisation) {

            $column = 'title';
            $column2 = 'url';
            $name=explode('\\',$autorisation);
            $media_at = Media::where($column, '=', "autorisation")->where($column2,"=",'/images/'.$name[2])->first();
            dump($media_at);
            if ($media_at) {
                $event->media()->save($media_at);
            }
        }
        //artists
        foreach ($id_user as $id){
            $user=User::find($id);
            $event->user()->save($user);
        }
        //critere
        if($age && $places){
            $critere=new Critere();
            $critere->limite_age=(int)$age;
            $critere->limite_places=(int)$places;
            $critere->save();
            dump($critere);
            $event->critere()->save($critere);
        }


        return response()->json($event, 201);
    }
}
