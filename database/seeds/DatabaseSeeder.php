<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         $this->call(EventTableSeeder::class);
         $this->call(CategorySeeder::class);
         $this->call(MediaSeeder::class);
         $this->call(RoleSeeder::class);
         $this->call(TagSeeder::class);
         $this->call(TicketSeeder::class);
        $this->call(UserSeeder::class);
        $this->call(CommentaireSeeder::class);
    }
}
