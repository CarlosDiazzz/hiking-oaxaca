<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Crea el usuario Admin
        User::firstOrCreate(
            ['email' => 'admin@hikingoaxaca.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password')
            ]
        );

        // 2. Crea las 12 paradas oficiales del tour
        $this->call([
            StopSeeder::class,
        ]);
    }
}