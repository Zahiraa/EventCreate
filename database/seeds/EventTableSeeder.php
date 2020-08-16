<?php

use Illuminate\Database\Seeder;

class EventTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();


        for ($i = 0; $i < 5; $i++) {
          \App\Event::create([
                'title' => $faker->text(15),
                'place' => $faker->text(15),
                'status' => $faker->boolean(false),
                'description' => $faker->realText(),
                'date' => $faker->date('Y-m-d'),
                'budget' => $faker->randomFloat(2,60,190),

            ]);
        }
    }
}
