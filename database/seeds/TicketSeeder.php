<?php

use Illuminate\Database\Seeder;

class TicketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();
        $names=['Basic','Regular','Professional','Premium'];
        $prices=[39,59,79,99];
        for($i=0;$i<4;$i++){
            \App\Ticket::create([

                'name'=>$names[$i],
                'price'=>$prices[$i],

            ]);
        }
    }
}
