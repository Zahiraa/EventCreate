<?php

use Illuminate\Database\Seeder;

class CommentaireSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();
        for($i=0;$i<3;$i++){
            for($j=1;$j<6;$j++){
            \App\Commentaire::create([
                'message'=>$faker->text(80),

                'event_id'=>$j,
                'user_id'=>$faker->numberBetween(1,5),

            ]);
        }
        }
    }
}
