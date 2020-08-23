<?php

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();

//        for($i=0;$i<5;$i++){
//            \App\User::create([
//                'name'=>$faker->text(10),
//                'email'=>$faker->email,
//                'password'=>sha1(1234),
//                'role_id'=>App\Role::all()->random(1)[0]->id,
//
//
//            ]);
//        }
//
            $events=\App\Event::all()->take(5);
            $categories=\App\Category::all()->take(5);

        for ($i = 1; $i <= 5; $i++) {
            for ($j = 6; $j <= 8; $j++) {
            DB::table('user_event')->insert([
                'user_id' =>$j,
                'event_id' => $i
            ]);
        }
        }
        //organisateur test
        for ($i = 1; $i <= 5; $i++) {

                DB::table('user_event')->insert([
                    'user_id' =>3,
                    'event_id' => $i
                ]);

        }
        for ($i = 1; $i < 5; $i++) {
            DB::table('category_event')->insert([
                'category_id' =>$categories[$i]->id,
                'event_id' => $events[$i]->id
            ]);
        }
        for ($i = 1; $i < 5; $i++) {
            DB::table('category_event')->insert([
                'category_id' =>2,
                'event_id' => $events[$i]->id
            ]);
        }

        for ($i = 1; $i <= 5; $i++) {
          for ($j = 1; $j <= 3; $j++) {
            DB::table('event_ticket')->insert([
                'ticket_id' =>$j,
                'event_id' => $i
            ]);
          }
        }

    }
}
