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
                'status' => $faker->boolean(true),
                'description' => $faker->realText(),
              "date"=>$faker->dateTimeBetween('+1 day', '+5 days'),
                'budget' => $faker->randomFloat(2,60,190),

            ]);
        }

        for ($i = 0; $i < 2; $i++) {
            \App\Event::create([
                'title' => $faker->text(15),
                'place' => $faker->text(15),
                'status' => $faker->boolean(true),
                'description' => $faker->realText(),
                'date' => $faker->dateTimeThisYear('now', '+1 month'),
                'budget' => $faker->randomFloat(2,60,190),

            ]);
        }
    }
}
