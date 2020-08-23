<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class MediaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $faker = \Faker\Factory::create();
        $roles=['admin','user','organisateur','super_admin','lead singer','drums player','lead guitarist','backing vocal','bassist','keyboard player'];

        for($i=0;$i<10;$i++){
            \App\Role::create([
                'libelle'=>$roles[$i],
            ]);
        }

        for($i=0;$i<10;$i++){
            \App\User::create([
                'name'=>$faker->firstName,
                'last_name'=>$faker->lastName,
                'facebook'=>'https://www.facebook.com',
                'instagram'=>'https://www.instagram.com',
                'city'=>$faker->city,
                'date_naissance'=>$faker->dateTimeThisCentury(),
                'biography'=>$faker->text(200),
                'email'=>$faker->email,
                'password'=>sha1(1234),
                 'role_id'=>($i+1)
            ]);
        }
//        4 artistes fixtures
        for($i=0;$i<5;$i++){
            DB::table('users')->insert([
                'name'=>$faker->firstName,
                'last_name'=>$faker->lastName,
                'facebook'=>'https://www.facebook.com',
                'instagram'=>'https://www.instagram.com',
                'city'=>$faker->city,
                'date_naissance'=>$faker->dateTimeThisCentury(),
                'biography'=>$faker->text(200),
                'email'=>$faker->email,
                'password'=> Hash::make("1234"),
            ]);
        }




        $url=[
            "https://i.picsum.photos/id/1005/5760/3840.jpg?hmac=2acSJCOwz9q_dKtDZdSB-OIK1HUcwBeXco_RMMTUgfY",
            ' https://i.picsum.photos/id/1027/2848/4272.jpg?hmac=EAR-f6uEqI1iZJjB6-NzoZTnmaX0oI0th3z8Y78UpKM',
            "https://i.picsum.photos/id/334/2304/1536.jpg?hmac=ihrh84KbSSW-zvp-oRz8FGCVOWvPAD3SZvYPS0v3mv8",
            'https://i.picsum.photos/id/349/3264/2176.jpg?hmac=WNt0QoaZyFRaiL5yitDV4LOXzdHV5Z9tHUxbc6KdBSY',
            "https://i.picsum.photos/id/1005/5760/3840.jpg?hmac=2acSJCOwz9q_dKtDZdSB-OIK1HUcwBeXco_RMMTUgfY",
            ' https://i.picsum.photos/id/1027/2848/4272.jpg?hmac=EAR-f6uEqI1iZJjB6-NzoZTnmaX0oI0th3z8Y78UpKM',
            "https://i.picsum.photos/id/334/2304/1536.jpg?hmac=ihrh84KbSSW-zvp-oRz8FGCVOWvPAD3SZvYPS0v3mv8",
            'https://i.picsum.photos/id/349/3264/2176.jpg?hmac=WNt0QoaZyFRaiL5yitDV4LOXzdHV5Z9tHUxbc6KdBSY',
            'https://i.picsum.photos/id/1027/2848/4272.jpg?hmac=EAR-f6uEqI1iZJjB6-NzoZTnmaX0oI0th3z8Y78UpKM',
            "https://i.picsum.photos/id/1005/5760/3840.jpg?hmac=2acSJCOwz9q_dKtDZdSB-OIK1HUcwBeXco_RMMTUgfY",
        ];
        $events=[
            'https://i.picsum.photos/id/209/1920/1280.jpg?hmac=VkEKEKhTEKOSFL4n-N4aLnbGGpV5hxuCs2tx_ny4y5g',
            'https://i.picsum.photos/id/232/3000/1987.jpg?hmac=f8y2eAXUUB5pUL5uXYYdXFcLfWLPGiyNuSfVeCN-R0I',
            'https://i.picsum.photos/id/104/3840/2160.jpg?hmac=Rv0qxBiYb65Htow4mdeDlyT5kLM23Z2cDlN53YYldZU',
            'https://i.picsum.photos/id/1082/5416/3611.jpg?hmac=GrASx5oGYbTwT4xyJDYkurgXFFfgj37WHvaJNe8Sr1E',
            'https://i.picsum.photos/id/117/1544/1024.jpg?hmac=xFWtVUv1xkFVVidifC3drKerU_k_za4w28fv5etvxRc',
            'https://i.picsum.photos/id/195/768/1024.jpg?hmac=rksrWrgeGQzOdzXlnzsTWy2L2zYq4gQei3TBMWCmXsI',
        ];
        //medias for users
        for($i=7;$i<10;$i++){

            \App\Media::create([
                'title'=>$faker->text(10),
                'url'=>$url[$i],
                'event_id'=>null,
                'user_id'=>intval($i)

            ]);
        }

//        medias for events
        $artists=[1,2,3,4,5];

        for($i=0;$i<6;$i++){
            \App\Media::create([
                'title'=>$faker->text(10),
                'url'=>$events[$i],
                'event_id'=>intval($i+1),
                'user_id'=>null,

            ]);
        }
        //criteres

        for($i=0;$i<5;$i++){

            \App\Critere::create([
                'limite_places'=>$faker->numberBetween(50,250),
                'limite_age'=>$faker->numberBetween(30,50),
                'event_id'=>intval($i+1),

            ]);
        }

    }
}
